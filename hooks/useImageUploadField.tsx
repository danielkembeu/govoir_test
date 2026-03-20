import * as React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react"; // Use a specific icon

interface Props {
  id: string;
  label?: string;
  preview: string | null;
  fallbackSrc?: string | null;
  onChange: (file: File | null) => void;
  className?: string;
}

export function ImageUploadField({
  id,
  label = "Image",
  preview,
  fallbackSrc,
  onChange,
  className,
}: Props) {
  const src = preview ?? fallbackSrc ?? null;

  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="file"
        accept="image/*"
        className="cursor-pointer"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      <div
        className={cn(
          "relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-foreground/10 bg-muted/40",
          src && "border-0",
        )}
      >
        {src ? (
          <Image
            src={src}
            alt="Aperçu"
            fill
            className="object-cover transition-opacity duration-300"
            unoptimized
          />
        ) : (
          <span className="flex flex-col items-center gap-1.5 text-muted-foreground">
            <ImageIcon className="size-6 opacity-40" />
            <span className="text-xs">Aperçu de l'image</span>
          </span>
        )}
      </div>
    </div>
  );
}
