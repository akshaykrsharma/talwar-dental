import { clinicPhotos } from "@/assets/images";

/**
 * Hero slideshow photos, in display order.
 * - `id` matches an entry in `content.hero.slideshow.slides` (that is where the caption/alt text comes from)
 * - `position` is the CSS object-position that keeps the important part of the photo visible when cropped
 */
export const HERO_SLIDES = [
  { id: "screen", src: clinicPhotos.xrayScreenRoom, position: "62% 50%" },
  { id: "reception", src: clinicPhotos.reception, position: "30% 50%" },
  { id: "smilewall", src: clinicPhotos.waitingLounge, position: "52% 50%" },
  { id: "xray", src: clinicPhotos.xrayUnit, position: "40% 50%" },
  { id: "room", src: clinicPhotos.treatmentRoom, position: "62% 50%" },
  { id: "chair", src: clinicPhotos.dentalChair, position: "48% 50%" },
  { id: "desk", src: clinicPhotos.frontDesk, position: "55% 50%" },
];
