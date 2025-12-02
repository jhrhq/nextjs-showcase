import clsx from 'clsx';
import {
  Spline_Sans_Mono,
  Work_Sans,
} from 'next/font/google';

import Footer from '@/components/blog/Footer';
import Header from '@/components/blog/Header';
import { COLOR_COOKIE_NAME, DARK_TOKENS, LIGHT_TOKENS } from '@/constants';
import { cookies } from 'next/headers';
import './styles.css';

const mainFont = Work_Sans({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family',
});
const monoFont = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'fallback',
  weight: 'variable',
  variable: '--font-family-mono',
});
export const metadata = {
  title: 'Bits & Bytes',
  description: 'A wonderful blog about javascript'
}
function RootLayout({ children }) {
  const savedTheme = cookies().get(COLOR_COOKIE_NAME)
  const theme = savedTheme?.value || 'light';

  return (

    <html
      lang="en"
      className={clsx(mainFont.variable, monoFont.variable)}
      data-color-theme={theme}
      style={theme === 'light' ? LIGHT_TOKENS : DARK_TOKENS}
    >
      <body>
        <Header initialTheme={theme} />
        <main>
          {/* <RespectMotionPreference> */}
          {children}
          {/* </RespectMotionPreference> */}
        </main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
