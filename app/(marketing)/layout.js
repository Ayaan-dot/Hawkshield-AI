// app/(marketing)/layout.js
import Footer from '../components/Footer';

export default function MarketingLayout({ children }) {
  return (
    <>
      {children}
      <Footer /> {/* Footer appears on marketing pages */}
    </>
  );
}