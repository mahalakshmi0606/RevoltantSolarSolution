// components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/revoltant.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);

      // Close mobile menu when switching to desktop
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleHamburgerKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'Subsidy', path: '/subsidy' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact Us', path: '/contact' },
  ];

  const styles = {
    navbar: {
      background: '#ffffff',
      boxShadow: isScrolled
        ? '0 4px 20px rgba(0, 0, 0, 0.15)'
        : '0 2px 15px rgba(0, 0, 0, 0.10)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,

      // Bigger navbar to accommodate bigger logo
      height: isMobile
        ? '82px'
        : isScrolled
        ? '88px'
        : '100px',

      display: 'flex',
      alignItems: 'center',
      transition: 'height 0.3s ease, box-shadow 0.3s ease',
    },

    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: isMobile ? '0 16px' : '0 25px',
      width: '100%',
    },

    navContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%',
      gap: '20px',
    },

    logo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      textDecoration: 'none',
      transition: 'transform 0.3s ease',
      flexShrink: 0,
    },

    logoImage: {
      // BIGGER LOGO
      height: isMobile
        ? '68px'
        : isScrolled
        ? '76px'
        : '88px',

      width: isMobile ? '190px' : '235px',

      objectFit: 'contain',
      objectPosition: 'left center',
      transition: 'all 0.3s ease',
      display: 'block',
    },

    navLinks: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'stretch' : 'center',
      gap: isMobile ? 0 : '6px',

      position: isMobile ? 'absolute' : 'static',
      top: isMobile ? '82px' : 'auto',
      left: 0,
      right: 0,

      background: isMobile ? '#ffffff' : 'transparent',

      padding: isMobile ? 0 : '0',

      maxHeight:
        isMobile && !isOpen
          ? '0'
          : isMobile && isOpen
          ? '700px'
          : 'none',

      overflow: isMobile ? 'hidden' : 'visible',

      transition:
        'max-height 0.4s ease, opacity 0.3s ease, padding 0.4s ease',

      boxShadow: isMobile
        ? '0 8px 20px rgba(0, 0, 0, 0.12)'
        : 'none',

      opacity: isMobile && !isOpen ? 0 : 1,

      visibility:
        isMobile && !isOpen
          ? 'hidden'
          : 'visible',

      paddingTop: isMobile && isOpen ? '15px' : 0,
      paddingBottom: isMobile && isOpen ? '25px' : 0,
      paddingLeft: isMobile && isOpen ? '18px' : 0,
      paddingRight: isMobile && isOpen ? '18px' : 0,
    },

    navLink: {
      color: '#1a1a2e',
      textDecoration: 'none',

      fontSize: isMobile
        ? '1rem'
        : '0.96rem',

      fontWeight: 500,

      padding: isMobile
        ? '14px 20px'
        : '10px 13px',

      borderRadius: '7px',

      transition: 'all 0.3s ease',

      position: 'relative',
      cursor: 'pointer',

      display: 'block',

      textAlign: isMobile
        ? 'center'
        : 'left',

      borderBottom: isMobile
        ? '1px solid #f0f0f0'
        : 'none',
    },

    activeLink: {
      color: '#f7931e',
      fontWeight: 700,

      background: isMobile
        ? 'rgba(247, 147, 30, 0.12)'
        : 'rgba(247, 147, 30, 0.08)',
    },

    navQuoteBtn: {
      background:
        'linear-gradient(135deg, #f7931e, #ff6b00)',

      color: '#ffffff',

      padding: isMobile
        ? '14px'
        : '12px 22px',

      borderRadius: isMobile
        ? '8px'
        : '50px',

      fontWeight: 700,

      fontSize: isMobile
        ? '0.95rem'
        : '0.84rem',

      letterSpacing: '0.5px',

      textDecoration: 'none',

      transition: 'all 0.3s ease',

      boxShadow:
        '0 4px 15px rgba(247, 147, 30, 0.30)',

      marginTop: isMobile
        ? '12px'
        : 0,

      marginLeft: isMobile
        ? 0
        : '8px',

      border: 'none',
      cursor: 'pointer',

      display: 'block',
      textAlign: 'center',

      width: isMobile
        ? '100%'
        : 'auto',
    },

    hamburger: {
      display: isMobile
        ? 'flex'
        : 'none',

      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',

      gap: '6px',

      cursor: 'pointer',

      width: '46px',
      height: '46px',

      padding: 0,

      borderRadius: '10px',

      background: isOpen
        ? 'rgba(247, 147, 30, 0.10)'
        : 'transparent',

      border: 'none',

      transition:
        'background 0.3s ease',

      // Important for hamburger animation
      position: 'relative',

      flexShrink: 0,
    },

    bar: {
      display: 'block',

      width: '25px',
      height: '2.5px',

      background: isOpen
        ? '#f7931e'
        : '#1a1a2e',

      borderRadius: '4px',

      transition:
        'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease, width 0.3s ease, background 0.3s ease',

      transformOrigin: 'center',

      position: 'absolute',
    },

    bar1: {
      transform: isOpen
        ? 'rotate(45deg)'
        : 'translateY(-8px)',
    },

    bar2: {
      opacity: isOpen ? 0 : 1,

      width: isOpen
        ? '0px'
        : '25px',
    },

    bar3: {
      transform: isOpen
        ? 'rotate(-45deg)'
        : 'translateY(8px)',
    },
  };

  return (
    <nav
      style={styles.navbar}
      aria-label="Primary navigation"
    >
      <div style={styles.container}>
        <div style={styles.navContainer}>

          {/* =========================
              LARGE LOGO
          ========================== */}
          <Link
            to="/"
            style={styles.logo}
            title="Revoltant Solar Solutions - Home"
            aria-label="Revoltant Solar Solutions - Home"
            itemScope
            itemType="https://schema.org/Organization"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                'scale(1)';
            }}
          >
            <img
              src={logo}
              alt="Revoltant Solar Solutions - Solar Panel Installation Company Logo"
              style={styles.logoImage}
              itemProp="logo"
            />

            <meta
              itemProp="name"
              content="Revoltant Solar Solutions"
            />

            <meta
              itemProp="url"
              content="/"
            />
          </Link>

          {/* =========================
              NAVIGATION LINKS
          ========================== */}
          <div
            id="primary-menu"
            style={styles.navLinks}
          >
            {navItems.map(
              ({ label, path }, index) => (
                <NavLink
                  key={index}
                  to={path}
                  title={`${label} - Revoltant Solar Solutions`}
                  style={({ isActive }) => ({
                    ...styles.navLink,
                    ...(isActive
                      ? styles.activeLink
                      : {}),
                  })}
                  onClick={() =>
                    setIsOpen(false)
                  }
                >
                  {label}
                </NavLink>
              )
            )}

            {/* GET FREE QUOTE */}
            <Link
              to="/contact"
              style={styles.navQuoteBtn}
              title="Get a free solar quote from Revoltant Solar Solutions"
              onClick={() =>
                setIsOpen(false)
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 7px 20px rgba(247, 147, 30, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 4px 15px rgba(247, 147, 30, 0.3)';
              }}
            >
              GET FREE QUOTE
            </Link>
          </div>

          {/* =========================
              MOBILE HAMBURGER
          ========================== */}
          <div
            style={styles.hamburger}
            onClick={toggleMenu}
            onKeyDown={handleHamburgerKeyDown}
            role="button"
            tabIndex={0}
            aria-label={
              isOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-expanded={isOpen}
            aria-controls="primary-menu"
            onMouseEnter={(e) => {
              if (isMobile && !isOpen) {
                e.currentTarget.style.background =
                  'rgba(247, 147, 30, 0.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (isMobile && !isOpen) {
                e.currentTarget.style.background =
                  'transparent';
              }
            }}
          >
            <span
              style={{
                ...styles.bar,
                ...styles.bar1,
              }}
            />

            <span
              style={{
                ...styles.bar,
                ...styles.bar2,
              }}
            />

            <span
              style={{
                ...styles.bar,
                ...styles.bar3,
              }}
            />
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;