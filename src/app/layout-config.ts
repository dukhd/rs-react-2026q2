import localFont from 'next/font/local';

export const adventPro = localFont({
  src: [
    {
      path: '../assets/fonts/AdventPro-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/AdventPro-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/AdventPro-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/AdventPro-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-advent',
  display: 'swap',
  preload: false,
});
