// components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/revoltant.png';

const THEME = {
  navyDark: '#0e1f4d',
  navy: '#12295e',
  orange: '#f7931e',
  white: '#ffffff',
  offWhite: '#eef2f8',
  textDark: '#1a1a2e',
  textMuted: 'rgba(26, 26, 46, 0.7)',
  border: 'rgba(26, 26, 46, 0.12)',
  transition: 'all 0.3s ease',
};

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

const serviceLinks = [
  { label: 'Rooftop Solar', path: '/services' },
  { label: 'Solar Pumps', path: '/services' },
  { label: 'Commercial Solar', path: '/services' },
  { label: 'Industrial Solar', path: '/services' },
  { label: 'Solar Water Heating', path: '/services' },
];

const SocialIconSvg = ({ path }) => (
  <svg
    viewBox="0 0 24 24"
    width="18"
    height="18"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d={path} />
  </svg>
);

const socialLinks = [
  {
    href: 'https://facebook.com',
    label: 'Facebook',
    path: 'M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.45 2.91h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z',
  },
  {
    href: 'https://instagram.com',
    label: 'Instagram',
    path: 'M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45.53c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 1.8c-2.67 0-2.99.01-4.04.06-.87.04-1.34.18-1.65.3-.42.16-.71.35-1.02.66-.31.31-.5.6-.66 1.02-.12.31-.26.78-.3 1.65C4.28 9 4.27 9.32 4.27 12s.01 2.99.06 4.04c.04.87.18 1.34.3 1.65.16.42.35.71.66 1.02.31.31.6.5 1.02.66.31.12.78.26 1.65.3 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.87-.04 1.34-.18 1.65-.3.42-.16.71-.35 1.02-.66.31-.31.5-.6.66-1.02.12-.31.26-.78.3-1.65.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.87-.18-1.34-.3-1.65a2.75 2.75 0 0 0-.66-1.02 2.75 2.75 0 0 0-1.02-.66c-.31-.12-.78-.26-1.65-.3C14.99 3.81 14.67 3.8 12 3.8zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28zm0 1.8a3.34 3.34 0 1 0 0 6.68 3.34 3.34 0 0 0 0-6.68zm5.34-1.99a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z',
  },
  {
    href: 'https://twitter.com',
    label: 'Twitter',
    path: 'M18.9 2h3.1l-6.77 7.74L23.3 22h-6.23l-4.88-6.39L6.6 22H3.5l7.24-8.28L2.7 2h6.38l4.41 5.84L18.9 2zm-1.09 18.17h1.72L7.28 3.73H5.43l12.38 16.44z',
  },
  {
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z',
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;

      if (width <= 576) {
        setScreenSize('mobile');
      } else if (width <= 992) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    updateScreenSize();

    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const isMobile = screenSize === 'mobile';
  const isTablet = screenSize === 'tablet';

  const styles = {
    footer: {
      background: THEME.offWhite,
      color: THEME.textDark,
      padding: isMobile ? '40px 0 0' : '60px 0 0',
      borderTop: `1px solid ${THEME.border}`,
      overflow: 'hidden',
    },

    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: isMobile ? '0 16px' : '0 20px',
      width: '100%',
      boxSizing: 'border-box',
    },

    footerGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile
        ? '1fr'
        : isTablet
        ? '1fr 1fr'
        : '2fr 1fr 1fr 1.2fr',
      gap: isMobile ? '32px' : '40px',
      paddingBottom: isMobile ? '35px' : '50px',
    },

    footerCol: {
      minWidth: 0,
      width: '100%',
      textAlign: isMobile ? 'center' : 'left',
    },

    footerLogo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: isMobile ? 'center' : 'flex-start',
      gap: '10px',
      marginBottom: '18px',
    },

    footerLogoImg: {
      height: isMobile ? '120px' : '190px',
      width: 'auto',
      maxWidth: '100%',
      objectFit: 'contain',
      flexShrink: 0,
      display: 'block',
    },

    footerLogoText: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1.2,
    },

    logoRevoltant: {
      fontSize: '1.3rem',
      fontWeight: 800,
      color: THEME.textDark,
      letterSpacing: '1px',
    },

    logoSolar: {
      fontSize: '0.7rem',
      fontWeight: 600,
      color: THEME.orange,
      letterSpacing: '2px',
      textTransform: 'uppercase',
    },

    footerDescription: {
      color: THEME.textMuted,
      lineHeight: 1.75,
      marginBottom: '22px',
      fontSize: '0.95rem',
      maxWidth: '360px',
      marginLeft: isMobile ? 'auto' : '0',
      marginRight: isMobile ? 'auto' : '0',
      textAlign: isMobile ? 'center' : 'left',
    },

    socialLinks: {
      display: 'flex',
      gap: '12px',
      justifyContent: isMobile ? 'center' : 'flex-start',
      alignItems: 'center',
      flexWrap: 'wrap',
    },

    socialIcon: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: THEME.white,
      boxShadow: '0 2px 8px rgba(14, 31, 77, 0.1)',
      color: THEME.navyDark,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      transition: THEME.transition,
      flexShrink: 0,
    },

    colHeading: {
      color: THEME.navyDark,
      fontWeight: 700,
      fontSize: '1.1rem',
      marginBottom: '22px',
      textAlign: isMobile ? 'center' : 'left',
    },

    linkList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      alignItems: isMobile ? 'center' : 'flex-start',
    },

    footerLink: {
      color: THEME.textMuted,
      textDecoration: 'none',
      fontSize: '0.95rem',
      transition: THEME.transition,
      display: 'inline-block',
      maxWidth: '100%',
    },

    contactList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },

    contactItem: {
      color: THEME.textMuted,
      fontSize: '0.95rem',
      lineHeight: 1.6,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: isMobile ? 'center' : 'flex-start',
      gap: '8px',
      textAlign: isMobile ? 'center' : 'left',
      maxWidth: '100%',
      overflowWrap: 'anywhere',
    },

    contactLink: {
      color: THEME.textMuted,
      textDecoration: 'none',
      transition: THEME.transition,
      overflowWrap: 'anywhere',
      wordBreak: 'break-word',
    },

    footerBottom: {
      borderTop: `1px solid ${THEME.border}`,
      padding: isMobile ? '18px 0' : '20px 0',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: isMobile ? '8px' : '10px',
      textAlign: isMobile ? 'center' : 'left',
    },

    footerBottomText: {
      color: THEME.textMuted,
      fontSize: '0.85rem',
      margin: 0,
      lineHeight: 1.6,
      maxWidth: isMobile ? '100%' : 'none',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.footerGrid}>

          {/* Company Information */}
          <div style={styles.footerCol}>
            <div style={styles.footerLogo}>
              <img
                src={logo}
                alt="Revoltant Solar Solutions Logo"
                style={styles.footerLogoImg}
              />
            </div>

            <div style={styles.socialLinks}>
              {socialLinks.map(({ href, label, path }) => (
                <a
                  key={label}
                  href={href}
                  style={styles.socialIcon}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = THEME.orange;
                    e.currentTarget.style.color = THEME.white;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = THEME.white;
                    e.currentTarget.style.color = THEME.navyDark;
                  }}
                >
                  <SocialIconSvg path={path} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div style={styles.footerCol}>
            <h4 style={styles.colHeading}>Quick Links</h4>

            <ul style={styles.linkList}>
              {quickLinks.map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    style={styles.footerLink}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = THEME.orange;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = THEME.textMuted;
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div style={styles.footerCol}>
            <h4 style={styles.colHeading}>Our Services</h4>

            <ul style={styles.linkList}>
              {serviceLinks.map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    style={styles.footerLink}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = THEME.orange;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = THEME.textMuted;
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div style={styles.footerCol}>
            <h4 style={styles.colHeading}>Contact Us</h4>

            <ul style={styles.contactList}>

              <li style={styles.contactItem}>
                <span>📍</span>
                <span>
                  9/67 Padaisalai Salai Street, Aminjikarai, Veerapuram Post,
                  Thirukkazhukunram Taluck, Chengalpattu District - 603109
                </span>
              </li>

              <li style={styles.contactItem}>
                <span>📞</span>
                <a
                  href="tel:+917639530291"
                  style={styles.contactLink}
                >
                  +91 93841 67482
                  
                </a>
              </li>

              <li style={styles.contactItem}>
                <span>📞</span>
                <a
                  href="tel:+919384167482"
                  style={styles.contactLink}
                >
                  +91 94453 53576
                </a>
              </li>

              <li style={styles.contactItem}>
                <span>✉️</span>
                <a
                  href="mailto:revoltantsolarsolution@gmail.com"
                  style={styles.contactLink}
                >
                  revoltantsolarsolution@gmail.com
                </a>
              </li>

            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div style={styles.footerBottom}>

          <p style={styles.footerBottomText}>
            &copy; {currentYear} Revoltant Solar Solutions. All rights reserved.
          </p>

          <p style={styles.footerBottomText}>
            Save Energy · Save Money · Save Future
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;