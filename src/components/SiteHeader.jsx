import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CATEGORIES } from "./categories.js";
import logoRivan from "../assets/logo-rivan.png";
import "./SiteHeader.css";

/**
 * `activeTab` still exists so HomePage can pin its own state, but any page
 * under /category/* lights the Category tab without having to say so.
 */
export default function SiteHeader({ activeTab }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const categoryRef = useRef(null);
  const { pathname } = useLocation();

  const currentTab =
    activeTab ??
    (pathname.startsWith("/category")
      ? "Category"
      : pathname.startsWith("/about")
        ? "About"
        : "Home");

  const closeMenu = () => {
    setMenuOpen(false);
    setOpenSubmenu(null);
  };

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handlePointerDown = (event) => {
      if (!categoryRef.current?.contains(event.target)) closeMenu();
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <Link className="site-header__brand" to="/home" data-node-id="6:29">
        <img
          className="site-header__logo"
          src={logoRivan}
          alt="Rivan Security Inc. Academy"
        />
        <span className="site-header__wordmark" data-node-id="1:3">
          RivanCyber Institute
        </span>
      </Link>

      <nav className="site-header__nav" data-node-id="6:30" aria-label="Primary">
        <Link
          className={`nav-tab${currentTab === "Home" ? " is-active" : ""}`}
          to="/home"
          data-node-id="6:31"
        >
          Home
        </Link>

        <div className="site-header__category" ref={categoryRef}>
          <button
            type="button"
            className={`nav-tab${menuOpen || currentTab === "Category" ? " is-active" : ""}`}
            aria-expanded={menuOpen}
            aria-haspopup="true"
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            data-node-id="6:33"
          >
            Category
          </button>

          {menuOpen && (
            <div className="category-menu" role="menu" data-node-id="6:37">
              {CATEGORIES.map((category) =>
                category.children ? (
                  <div
                    key={category.id}
                    className="category-menu__group"
                    onMouseEnter={() => setOpenSubmenu(category.id)}
                    onMouseLeave={() => setOpenSubmenu(null)}
                  >
                    <Link
                      className="category-menu__item category-menu__item--parent"
                      role="menuitem"
                      to={category.path}
                      aria-expanded={openSubmenu === category.id}
                      onClick={closeMenu}
                      onFocus={() => setOpenSubmenu(category.id)}
                      onKeyDown={(event) => {
                        if (event.key === "ArrowRight") {
                          event.preventDefault();
                          setOpenSubmenu(category.id);
                        }
                      }}
                    >
                      {category.label}
                      <span className="category-menu__chevron" aria-hidden="true">
                        ›
                      </span>
                    </Link>

                    {openSubmenu === category.id && (
                      <div className="category-submenu" role="menu">
                        {category.children.map((child) => (
                          <Link
                            key={child.id}
                            className="category-menu__item"
                            role="menuitem"
                            to={child.path}
                            onClick={closeMenu}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={category.id}
                    className="category-menu__item"
                    role="menuitem"
                    to={category.path}
                    onClick={closeMenu}
                    onFocus={() => setOpenSubmenu(null)}
                  >
                    {category.label}
                  </Link>
                )
              )}
            </div>
          )}
        </div>

        <Link
          className={`nav-tab${currentTab === "About" ? " is-active" : ""}`}
          to="/about"
          data-node-id="6:35"
        >
          About
        </Link>
      </nav>
    </header>
  );
}
