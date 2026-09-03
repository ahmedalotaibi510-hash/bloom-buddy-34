import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { Icon } from "./Icon";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/customize", label: "Customize" },
  { to: "/occasions", label: "Occasions" },
  { to: "/track", label: "Track Order" },
  { to: "/assistant", label: "Assistant" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant/10 bg-surface shadow-sm">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <div className="page-x mx-auto flex w-full max-w-page items-center justify-between py-4">
        <Link
          to="/"
          className="text-display-sm tracking-tighter text-primary transition-transform active:scale-95 md:text-display-lg"
        >
          MEMENTO
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="rounded-lg px-3 py-2 text-label-lg font-medium text-on-surface-variant transition-all duration-300 hover:bg-surface-high/60 hover:text-primary"
              activeProps={{
                className: "border-b-2 border-secondary pb-1 font-bold text-primary hover:bg-transparent",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden gap-2 text-on-surface-variant md:flex">
            <button
              type="button"
              aria-label="Favorites"
              className="rounded-full p-2 transition-colors hover:bg-surface-high/60 hover:text-primary"
            >
              <Icon name="favorite" />
            </button>
            <Link
              to="/checkout"
              aria-label="Cart"
              className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-surface-high/60 hover:text-primary"
            >
              <Icon name="shopping_cart" />
            </Link>
          </div>
          <Link
            to="/customize"
            className="hidden items-center justify-center whitespace-nowrap rounded-lg bg-primary px-6 py-3 text-label-lg text-on-primary transition-colors duration-300 hover:bg-inverse-surface active:scale-95 md:flex"
          >
            Create Your Gift
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-primary md:hidden"
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="page-x flex flex-col gap-1 border-t border-outline-variant/10 pb-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-label-lg text-on-surface-variant"
              activeProps={{ className: "text-primary font-bold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
