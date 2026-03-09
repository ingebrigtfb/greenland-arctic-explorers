"use client";

import { useCallback, useState, useRef } from "react";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getStorageInstance } from "@/lib/firebase";
import type { ContentImage } from "@/lib/types";
import { Upload, X, GripVertical } from "lucide-react";
import Image from "next/image";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

interface Props {
  value: ContentImage[];
  folder: string;
  onChange: (images: ContentImage[]) => void;
}

export default function GalleryUpload({ value, folder, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    (files: FileList | File[]) => {
      const fileArr = Array.from(files);
      const invalid = fileArr.find(
        (f) => !ALLOWED_TYPES.includes(f.type) || f.size > MAX_SIZE
      );
      if (invalid) {
        setError(
          !ALLOWED_TYPES.includes(invalid.type)
            ? "Only JPG, PNG, WebP, and GIF files are allowed."
            : "Each file must be under 5 MB."
        );
        return;
      }

      setError("");
      setUploading(true);
      let completed = 0;
      const newImages: ContentImage[] = [];

      fileArr.forEach((file) => {
        const storagePath = `${folder}/gallery/${Date.now()}-${file.name}`;
        const storageRef = ref(getStorageInstance(), storagePath);
        const task = uploadBytesResumable(storageRef, file);

        task.on(
          "state_changed",
          (snap) => {
            const pct = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
            setProgress(
              Math.round((completed * 100 + pct) / fileArr.length)
            );
          },
          () => {
            completed++;
            if (completed === fileArr.length) {
              setUploading(false);
              setProgress(0);
              setError("Some uploads failed.");
            }
          },
          async () => {
            const url = await getDownloadURL(task.snapshot.ref);
            newImages.push({ url, storagePath, alt: file.name });
            completed++;
            if (completed === fileArr.length) {
              onChange([...value, ...newImages]);
              setUploading(false);
              setProgress(0);
            }
          }
        );
      });
    },
    [folder, onChange, value]
  );

  const handleRemove = async (index: number) => {
    const img = value[index];
    if (img?.storagePath) {
      try {
        await deleteObject(ref(getStorageInstance(), img.storagePath));
      } catch {
        // already deleted
      }
    }
    onChange(value.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) upload(e.dataTransfer.files);
  };

  return (
    <div>
      {/* Existing images */}
      {value.length > 0 && (
        <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {value.map((img, i) => (
            <div
              key={img.storagePath || i}
              className="group relative overflow-hidden rounded-xl border border-mist"
            >
              <Image
                src={img.url}
                alt={img.alt || ""}
                width={300}
                height={200}
                className="h-32 w-full object-cover"
              />
              <button
                onClick={() => handleRemove(i)}
                className="absolute right-2 top-2 rounded-lg bg-white/90 p-1.5 text-granite opacity-0 shadow transition-all group-hover:opacity-100 hover:bg-alert-red hover:text-white"
                aria-label="Remove image"
              >
                <X className="h-3.5 w-3.5" />
              </button>
              <div className="absolute left-2 top-2 rounded-lg bg-black/50 px-1.5 py-0.5 font-heading text-[10px] font-600 text-white">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-6 text-center transition-all ${
          dragOver
            ? "border-glacier bg-frost-light/50"
            : "border-mist hover:border-glacier/40 hover:bg-frost-light/30"
        }`}
      >
        {uploading ? (
          <>
            <div className="relative h-10 w-10">
              <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="#1B4965"
                  strokeWidth="3"
                  strokeDasharray={`${progress * 0.94} 94`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="font-heading text-xs font-600 text-glacier">
              {progress}%
            </p>
          </>
        ) : (
          <>
            <Upload className="h-5 w-5 text-granite" />
            <p className="font-heading text-xs font-600 text-granite">
              Drop images here or click to browse
            </p>
            <p className="font-body text-[11px] text-granite/60">
              JPG, PNG, WebP, GIF · max 5 MB each · multiple allowed
            </p>
          </>
        )}
      </div>
      {error && (
        <p className="mt-2 font-body text-xs text-alert-red">{error}</p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.gif"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) upload(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
