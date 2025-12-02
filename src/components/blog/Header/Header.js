'use client'
import clsx from 'clsx';
import { Rss, Sun } from 'lucide-react';
import React from 'react';

import Logo from '@/components/blog/Logo';

import VisuallyHidden from '@/components/visually-hidden';
import { COLOR_COOKIE_NAME, DARK_TOKENS, LIGHT_TOKENS } from '@/constants';
import Cookies from 'js-cookie';
import { Moon } from 'lucide-react';
import styles from './Header.module.css';

function Header({ initialTheme, className, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme)

  function handleToggleTheme() {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    Cookies.set(COLOR_COOKIE_NAME, newTheme, {
      expires: 1000,
    })

    const newTokens = newTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS;
    const root = document.documentElement;
    root.setAttribute('data-color-theme', newTheme)
    Object.entries(newTokens).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }

  return (
    <header
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>
            View RSS feed
          </VisuallyHidden>
        </button>
        <button className={styles.action} onClick={handleToggleTheme}>
          {theme === 'light' ? <Sun size="1.5rem" /> : <Moon />}
          <VisuallyHidden>
            Toggle dark / light mode
          </VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
