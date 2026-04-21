export type ImageSize = 's' | 'l';

export const POSTER_SIZES: Readonly<Record<ImageSize, string>> = {
  s: 'w-[100px] h-[150px] aspect-[2/3]',
  l: 'w-[213px] h-[320px] aspect-[213/320]',
};
