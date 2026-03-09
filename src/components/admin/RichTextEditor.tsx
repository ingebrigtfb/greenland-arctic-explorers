"use client";

import { useRef, useEffect, useCallback } from "react";
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Type,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const FONT_SIZES = [
  { label: "Small", value: "2" },
  { label: "Normal", value: "3" },
  { label: "Large", value: "5" },
  { label: "XL", value: "6" },
];

function ToolbarButton({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={title}
      className={`rounded-lg p-1.5 transition-colors ${
        active
          ? "bg-glacier/15 text-glacier"
          : "text-granite hover:bg-frost-light hover:text-arctic-navy"
      }`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (!isInternalChange.current && el.innerHTML !== value) {
      el.innerHTML = value || "";
    }
    isInternalChange.current = false;
  }, [value]);

  const exec = useCallback((command: string, val?: string) => {
    document.execCommand(command, false, val);
    editorRef.current?.focus();
  }, []);

  const handleInput = useCallback(() => {
    const el = editorRef.current;
    if (!el) return;
    isInternalChange.current = true;
    onChange(el.innerHTML);
  }, [onChange]);

  const formatBlock = useCallback(
    (tag: string) => {
      exec("formatBlock", tag);
    },
    [exec]
  );

  return (
    <div className="overflow-hidden rounded-xl border border-mist focus-within:border-glacier focus-within:ring-2 focus-within:ring-glacier/20">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-mist bg-frost-light/50 px-2 py-1.5">
        <ToolbarButton onClick={() => exec("bold")} title="Bold">
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => exec("italic")} title="Italic">
          <Italic className="h-4 w-4" />
        </ToolbarButton>

        <div className="mx-1.5 h-5 w-px bg-mist" />

        <ToolbarButton onClick={() => formatBlock("h2")} title="Heading 1">
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => formatBlock("h3")} title="Heading 2">
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => formatBlock("h4")} title="Heading 3">
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => formatBlock("p")} title="Paragraph">
          <Type className="h-4 w-4" />
        </ToolbarButton>

        <div className="mx-1.5 h-5 w-px bg-mist" />

        <ToolbarButton
          onClick={() => exec("insertUnorderedList")}
          title="Bullet list"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => exec("insertOrderedList")}
          title="Numbered list"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>

        <div className="mx-1.5 h-5 w-px bg-mist" />

        {FONT_SIZES.map((size) => (
          <button
            key={size.value}
            type="button"
            onMouseDown={(e) => {
              e.preventDefault();
              exec("fontSize", size.value);
            }}
            title={`Font size: ${size.label}`}
            className="rounded-lg px-2 py-1 font-heading text-[10px] font-600 uppercase tracking-wider text-granite transition-colors hover:bg-frost-light hover:text-arctic-navy"
          >
            {size.label}
          </button>
        ))}
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        data-placeholder={placeholder}
        className="rich-editor min-h-[200px] px-4 py-3 font-body text-sm text-charcoal outline-none empty:before:pointer-events-none empty:before:text-mist empty:before:content-[attr(data-placeholder)]"
      />
    </div>
  );
}
