import localFont from 'next/font/local';

export const neulisNeue = localFont({
  src: [
    {
      path: '../../public/fonts/fonnts.com-Neulis_Neue_Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/fonnts.com-Neulis_Neue_Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/fonnts.com-Neulis_Neue_Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/fonnts.com-Neulis_Neue_Bold.otf',
      weight: '700',
      style: 'normal',
    }
  ],
  display: 'swap',
  variable: '--font-neulis-neue',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

export const neulisSans = localFont({
  src: [
    {
      path: '../../public/fonts/fonnts.com-Neulis_Sans_Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/fonnts.com-Neulis_Sans_Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/fonnts.com-Neulis_Sans_Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/fonnts.com-Neulis_Sans_Bold.otf',
      weight: '700',
      style: 'normal',
    }
  ],
  display: 'swap',
  variable: '--font-neulis-sans',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

export const neulisNeueAdditional = localFont({
  src: [
    {
      path: '../../public/fonts/fonnts.com-Neulis_Neue_Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../../public/fonts/fonnts.com-Neulis_Neue_Extra_Light.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/fonnts.com-Neulis_Neue_Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/fonnts.com-Neulis_Neue_Medium_Italic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/fonnts.com-Neulis_Neue_Bold_Italic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../../public/fonts/fonnts.com-Neulis_Neue_Black.otf',
      weight: '900',
      style: 'normal',
    }
  ],
  display: 'swap',
  variable: '--font-neulis-neue-additional',
  preload: false,
}); 