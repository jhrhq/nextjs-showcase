
import ToastProvider from '../components/next-routing/ToastProvider';
import ToastShelf from '../components/next-routing/ToastShelf/ToastShelf';

import './styles.css';

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
          <ToastShelf />
        </ToastProvider>
      </body>
    </html>
  );
}

export default RootLayout;
