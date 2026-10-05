
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo / Website Name */}
          <Link href="/" className="text-xl font-bold text-gray-900">
            Bangla News <span className="text-red-600">24</span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-5 text-sm text-gray-500">
            <Link
              href="/"
              className="hover:text-red-600 transition"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="hover:text-red-600 transition"
            >
              About
            </Link>

            <Link
              href="/contact"
              className="hover:text-red-600 transition"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Bangla News 24. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

