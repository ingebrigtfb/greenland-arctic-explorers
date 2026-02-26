"use client";

import { useCallback, useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { getStorageInstance } from "@/lib/firebase";
import type { ContentImage } from "@/lib/types";
import { Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface Props {
  value?: ContentImage;
  folder: string;
  onChange: (img: ContentImage | undefined) => void;
}

export default function ImageUpload({ value, folder, onChange }: Props) {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    (file: File) => {
      setError("");
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Only JPG, PNG, and WebP files are allowed.");
        return;
      }
      if (file.size > MAX_SIZE) {
        setError("File must be under 5 MB.");
        return;
      }

      setUploading(true);
      const storagePath = `${folder}/${Date.now()}-${file.name}`;
      const storageRef = ref(getStorageInstance(), storagePath);
      const task = uploadBytesResumable(storageRef, file);

      task.on(
        "state_changed",
        (snap) => setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
        () => {
          setError("Upload failed. Try again.");
          setUploading(false);
        },
        async () => {
          const url = await getDownloadURL(task.snapshot.ref);
          onChange({ url, storagePath, alt: file.name });
          setUploading(false);
          setProgress(0);
        }
      );
    },
    [folder, onChange]
  );

  const handleRemove = async () => {
    if (value?.storagePath) {
      try {
        await deleteObject(ref(getStorageInstance(), value.storagePath));
      } catch {
        // File may already be deleted
      }
    }
    onChange(undefined);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  };

  if (value?.url) {
    return (
      <div className="group relative overflow-hidden rounded-xl border border-mist">
        <Image src={value.url} alt={value.alt || ""} width={400} height={300} className="h-48 w-full object-cover" />
        <button
          onClick={handleRemove}
          className="absolute right-2 top-2 rounded-lg bg-white/90 p-1.5 text-granite opacity-0 shadow transition-all group-hover:opacity-100 hover:bg-alert-red hover:text-white"
          aria-label="Remove image"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-all ${
          dragOver ? "border-glacier bg-frost-light/50" : "border-mist hover:border-glacier/40 hover:bg-frost-light/30"
        }`}
      >
        {uploading ? (
          <>
            <div className="relative h-10 w-10">
              <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#E5E7EB" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15" fill="none" stroke="#1B4965" strokeWidth="3"
                  strokeDasharray={`${progress * 0.94} 94`} strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="font-heading text-xs font-600 text-glacier">{progress}%</p>
          </>
        ) : (
          <>
            <Upload className="h-6 w-6 text-granite" />
            <p className="font-heading text-xs font-600 text-granite">Drop image here or click to browse</p>
            <p className="font-body text-[11px] text-granite/60">JPG, PNG, WebP · max 5 MB</p>
          </>
        )}
      </div>
      {error && <p className="mt-2 font-body text-xs text-alert-red">{error}</p>}
      <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.webp" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); }} />
    </div>
  );
}
