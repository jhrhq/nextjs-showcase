import { getNavLinks } from '@/helpers/web-base-helpers';
import Link from 'next/link';
import React from 'react';

async function SiteFooter() {

  return (
    <footer className="site-footer">
      <div className="logo-wrapper">
        <Link href="" className="logo">
          Webzip
        </Link>
        <p className="disclaimer">
          Copyright © 2099 Webzip Inc. All Rights
          Reserved.
        </p>
      </div>

      <div className="link-wrapper">
        <div className="col">
          <h2>Navigation</h2>
          <nav>
            <React.Suspense>
              <PrimaryNavLinks />
            </React.Suspense>
          </nav>
        </div>
      </div>
    </footer>
  );
}



async function PrimaryNavLinks() {
  const navLinks = await getNavLinks();
  return (
    <ol>
      {navLinks.map(({ slug, label, href }) => (
        <li key={slug}>
          <Link href={href}>{label}</Link>
        </li>
      ))}
    </ol>
  );
}




export default SiteFooter;
