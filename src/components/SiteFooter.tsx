import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-section w-full bg-primary-container text-on-primary-container">
      <div className="page-x mx-auto grid max-w-page grid-cols-1 gap-gutter py-16 md:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link to="/" className="text-headline-md tracking-tight text-primary-fixed">
            MEMENTO
          </Link>
          <p className="text-body-md text-on-primary-container/70">
            © 2024 MEMENTO.
            <br />
            Your memory deserves more than a camera roll.
          </p>
        </div>

        <div className="flex flex-col gap-12 sm:flex-row sm:gap-24 md:col-span-3 md:justify-end">
          <div className="flex flex-col gap-4">
            <span className="text-label-lg uppercase text-secondary-fixed">Shop</span>
            <Link to="/shop" className="text-label-sm text-on-primary-container/70 transition-colors hover:text-secondary-container">
              Shop All
            </Link>
            <Link to="/customize" className="text-label-sm text-on-primary-container/70 transition-colors hover:text-secondary-container">
              Personalization Guide
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-label-lg uppercase text-secondary-fixed">Support</span>
            <Link to="/about" className="text-label-sm text-on-primary-container/70 transition-colors hover:text-secondary-container">
              Shipping &amp; Returns
            </Link>
            <Link to="/about" className="text-label-sm text-on-primary-container/70 transition-colors hover:text-secondary-container">
              Contact Us
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-label-lg uppercase text-secondary-fixed">Legal</span>
            <Link to="/about" className="text-label-sm text-on-primary-container/70 transition-colors hover:text-secondary-container">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
