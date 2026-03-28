import { Link } from "@tanstack/react-router";
import { SiInstagram, SiPinterest } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const utm = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-[oklch(0.22_0_0)] text-[oklch(0.92_0_0)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div>
            <div className="font-serif text-base font-semibold tracking-widest uppercase mb-1">
              Leelaz Art
            </div>
            <div className="text-xs tracking-widest text-[oklch(0.65_0_0)] uppercase mb-3">
              By Pooja Rathore
            </div>
            <p className="text-sm text-[oklch(0.65_0_0)] leading-relaxed">
              Original sketches &amp; commissioned artwork capturing the quiet
              beauty in everyday subjects.
            </p>
          </div>

          <nav className="flex flex-col gap-2" aria-label="Footer navigation">
            {[
              { label: "Home", path: "/" },
              { label: "Gallery", path: "/gallery" },
              { label: "About", path: "/about" },
              { label: "Commissions", path: "/commissions" },
              { label: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xs tracking-wider uppercase text-[oklch(0.65_0_0)] hover:text-[oklch(0.92_0_0)] transition-colors"
                data-ocid="footer.link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex md:justify-end gap-4">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[oklch(0.65_0_0)] hover:text-[oklch(0.92_0_0)] transition-colors"
              data-ocid="footer.link"
            >
              <SiInstagram size={20} />
            </a>
            <a
              href="https://www.pinterest.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
              className="text-[oklch(0.65_0_0)] hover:text-[oklch(0.92_0_0)] transition-colors"
              data-ocid="footer.link"
            >
              <SiPinterest size={20} />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[oklch(0.30_0_0)] flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-[oklch(0.50_0_0)]">
          <span>
            &copy; {year} Leelaz Art by Pooja Rathore. All rights reserved.
          </span>
          <span>
            Built with &hearts; using{" "}
            <a
              href={utm}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[oklch(0.72_0_0)] transition-colors"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
