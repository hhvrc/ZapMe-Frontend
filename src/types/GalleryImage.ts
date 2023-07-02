export type GalleryImage = {
  title: string;
  original: { url: string; width: number; height: number };
  preview: { url: string; width: number; height: number };
  thumbnail: { url: string; width: number; height: number };
};