import Image from "next/image";
import { productImage, type Material } from "@/data/materials";
import { cn } from "@/lib/cn";

/**
 * A material's face: the official Material Depot product photograph, or a
 * tonal swatch for conceptual finishes (clearly not a product photo).
 */
export function SampleImage({
  material,
  sizes,
  className,
  height = 700,
}: {
  material: Material;
  sizes: string;
  className?: string;
  height?: number;
}) {
  const src = productImage(material, height);
  if (!src) {
    return (
      <span
        aria-hidden
        className={cn("absolute inset-0 block", className)}
        style={{
          background: `radial-gradient(120% 90% at 30% 20%, rgba(255,255,255,0.35), transparent 60%), ${material.tone}`,
        }}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={`${material.name}${material.code ? ` (${material.code})` : ""} — Material Depot product image`}
      fill
      unoptimized
      sizes={sizes}
      className={cn("object-cover", className)}
    />
  );
}
