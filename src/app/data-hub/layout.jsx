'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar/navbar.jsx';
import Footer from '@/components/Footer/footer.jsx';

const NAV_LINKS = [
  { label: 'Overview', href: '/data-hub' },
  { label: 'Countries & Policy', href: '/data-hub/countries' },
  { label: 'Organizations', href: '/data-hub/organizations' },
  { label: 'Funders', href: '/data-hub/funders' },
  { label: 'Networks', href: '/data-hub/networks' },
];

export default function DataHubLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Sticky sub-navigation */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/data-hub'
                  ? pathname === '/data-hub'
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    relative whitespace-nowrap px-4 py-4 text-sm font-medium transition-colors duration-150
                    ${isActive
                      ? 'text-[#0e8601] border-b-2 border-[#0e8601]'
                      : 'text-[#021d49] hover:text-[#0e8601] border-b-2 border-transparent hover:border-[#0e8601]/30'
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
