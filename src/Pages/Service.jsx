// pages/Services.jsx
import React, { useState, useEffect } from 'react';

// Services banner image
import servicesBanner from './asset/Services.png';

// Service images
import roofTop3 from './asset/RoofTop3.jpeg';
import pump1 from './asset/Pump1.jpeg';
import commercial2 from './asset/commercial2.jpg';
import industrialSolarPanel1 from './asset/IndustrialSolarPanel1.jpeg';
import commercial3 from './asset/commercial3.jpg';
import industrialSolarpanel2 from './asset/IndustrialSolarpanel2.jpeg';

const THEME = {
  primaryBlue: '#12295e',
  secondaryGreen: '#1f9d55',
  primaryOrange: '#f7931e',
  textGray: '#5a5a6e',
  textDark: '#1a1a2e',
  white: '#ffffff',
  lightBg: '#f5f7fb',
  shadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
  shadowHover: '0 15px 40px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
};

const services = [
  {
    icon: '🏠',
    image: roofTop3,
    title: 'Rooftop Solar',
    description:
      'On-grid, off-grid & hybrid rooftop solar solutions for residential properties.',
    features: [
      'On-grid systems',
      'Off-grid systems',
      'Hybrid systems',
      'Net metering',
    ],
    price: '₹1,80,000',
    emi: '₹3,499/mo',
    tenure: '60 months',
    badge: 'Most Popular',
  },
  {
    icon: '💧',
    image: pump1,
    title: 'Solar Pumps',
    description:
      'Reliable solar water pump solutions for agriculture and residential use.',
    features: [
      'Submersible pumps',
      'Surface pumps',
      'AC/DC pumps',
      'Smart controllers',
    ],
    price: '₹95,000',
    emi: '₹2,199/mo',
    tenure: '48 months',
    badge: 'Subsidy Available',
  },
  {
    icon: '🏢',
    image: commercial2,
    title: 'Commercial Solar',
    description:
      'Reduce operational cost with commercial solar panel installations.',
    features: [
      'Zero electricity bills',
      'Tax benefits',
      'Green certification',
      'High ROI',
    ],
    price: '₹18,00,000',
    emi: '₹28,999/mo',
    tenure: '84 months',
    badge: 'High ROI',
  },
  {
    icon: '🏭',
    image: industrialSolarPanel1,
    title: 'Industrial Solar',
    description:
      'High capacity solar systems designed for industrial applications.',
    features: [
      'MW scale projects',
      'Captive consumption',
      'Open access',
      'Power backup',
    ],
    price: '₹85,00,000+',
    emi: 'Custom plan',
    tenure: 'Talk to us',
    badge: 'MW Scale',
  },
  {
    icon: '🔥',
    image: commercial3,
    title: 'Solar Water Heating',
    description:
      'Efficient solar water heating systems for residential and commercial use.',
    features: [
      'ETC systems',
      'FPC systems',
      'Heat pumps',
      'Custom solutions',
    ],
    price: '₹35,000',
    emi: '₹999/mo',
    tenure: '36 months',
    badge: 'Quick Install',
  },
  {
    icon: '❄️',
    image: industrialSolarpanel2,
    title: 'Solar Air Conditioning',
    description:
      'Solar-powered air conditioning for energy-efficient cooling.',
    features: [
      'Vapor absorption',
      'Hybrid ACs',
      'Solar thermal',
      'Energy savings',
    ],
    price: '₹1,25,000',
    emi: '₹2,999/mo',
    tenure: '42 months',
    badge: 'Energy Saver',
  },
];

const Services = () => {
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

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  const isMobile = screenSize === 'mobile';
  const isTablet = screenSize === 'tablet';

  const styles = {
    // ==========================================
    // SERVICES HERO BANNER
    // ==========================================
    pageHero: {
      position: 'relative',
      minHeight: isMobile ? '320px' : '430px',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      backgroundImage: `url(${servicesBanner})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',

      overflow: 'hidden',
    },

    heroOverlay: {
      position: 'absolute',
      inset: 0,

      background:
        'linear-gradient(90deg, rgba(8, 25, 55, 0.70), rgba(8, 25, 55, 0.20))',

      zIndex: 1,
    },

    heroContent: {
      position: 'relative',
      zIndex: 2,

      width: '100%',
      maxWidth: '1280px',

      margin: '0 auto',

      padding: isMobile
        ? '70px 20px'
        : '90px 20px',

      boxSizing: 'border-box',

      textAlign: 'center',
    },

    heroTitle: {
      color: THEME.white,

      fontSize: isMobile
        ? '2.2rem'
        : '3.2rem',

      fontWeight: 800,

      margin: 0,

      lineHeight: 1.2,

      textShadow:
        '0 3px 10px rgba(0,0,0,0.45)',
    },

    heroSubtitle: {
      color: THEME.white,

      fontSize: isMobile
        ? '1rem'
        : '1.15rem',

      marginTop: '14px',

      lineHeight: 1.6,

      textShadow:
        '0 2px 6px rgba(0,0,0,0.45)',
    },

    // ==========================================
    // CONTAINER
    // ==========================================
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 20px',
      boxSizing: 'border-box',
    },

    // ==========================================
    // SERVICES GRID
    // ==========================================
    servicesGrid: {
      display: 'grid',

      gridTemplateColumns: isMobile
        ? '1fr'
        : isTablet
        ? 'repeat(2, 1fr)'
        : 'repeat(3, 1fr)',

      gap: '30px',

      padding: isMobile
        ? '40px 0'
        : '60px 0',
    },

    card: (isHovered) => ({
      background: THEME.white,

      borderRadius: THEME.borderRadius,

      overflow: 'hidden',

      boxShadow: isHovered
        ? THEME.shadowHover
        : THEME.shadow,

      transform: isHovered
        ? 'translateY(-8px)'
        : 'translateY(0)',

      border: `1px solid ${
        isHovered
          ? THEME.primaryOrange
          : 'rgba(0,0,0,0.05)'
      }`,

      transition: THEME.transition,
    }),

    imageWrap: {
      position: 'relative',

      height: isMobile
        ? '190px'
        : '210px',

      overflow: 'hidden',
    },

    image: (isHovered) => ({
      width: '100%',
      height: '100%',

      objectFit: 'cover',

      transform: isHovered
        ? 'scale(1.08)'
        : 'scale(1)',

      transition: THEME.transition,

      display: 'block',
    }),

    imageOverlay: {
      position: 'absolute',

      inset: 0,

      background:
        'linear-gradient(180deg, rgba(18,41,94,0) 40%, rgba(18,41,94,0.55) 100%)',
    },

    badge: {
      position: 'absolute',

      top: '14px',
      left: '14px',

      background: THEME.primaryOrange,

      color: THEME.white,

      padding: '4px 12px',

      borderRadius: '50px',

      fontSize: '0.72rem',

      fontWeight: 700,

      letterSpacing: '0.3px',
    },

    iconBadge: {
      position: 'absolute',

      bottom: '-24px',
      left: '24px',

      width: '54px',
      height: '54px',

      borderRadius: '14px',

      background: THEME.white,

      boxShadow:
        '0 6px 16px rgba(0,0,0,0.15)',

      display: 'flex',

      alignItems: 'center',
      justifyContent: 'center',

      fontSize: '1.7rem',
    },

    cardBody: {
      padding: '36px 26px 26px',
    },

    cardTitle: {
      fontWeight: 700,

      color: THEME.primaryBlue,

      marginBottom: '8px',

      fontSize: '1.25rem',
    },

    cardText: {
      color: THEME.textGray,

      marginBottom: '16px',

      lineHeight: 1.6,

      fontSize: '0.95rem',
    },

    featureList: {
      listStyle: 'none',

      padding: 0,

      margin: '0 0 20px',
    },

    featureItem: {
      padding: '4px 0',

      color: THEME.textDark,

      fontSize: '0.9rem',

      display: 'flex',

      alignItems: 'center',

      gap: '8px',
    },

    checkMark: {
      color: THEME.secondaryGreen,

      fontWeight: 700,
    },

    // ==========================================
    // PRICING
    // ==========================================
    pricingBox: {
      background: THEME.lightBg,

      borderRadius: '12px',

      padding: '16px 18px',

      display: 'flex',

      justifyContent: 'space-between',

      alignItems: 'center',

      gap: '10px',

      flexWrap: 'wrap',
    },

    priceCol: {
      display: 'flex',

      flexDirection: 'column',
    },

    priceLabel: {
      fontSize: '0.72rem',

      color: THEME.textGray,

      textTransform: 'uppercase',

      letterSpacing: '0.4px',
    },

    priceValue: {
      fontSize: '1.05rem',

      color: THEME.textDark,

      fontWeight: 800,
    },

    emiCol: {
      textAlign: 'right',

      display: 'flex',

      flexDirection: 'column',
    },

    emiValue: {
      fontSize: '1.05rem',

      color: THEME.primaryOrange,

      fontWeight: 800,
    },

    emiTenure: {
      fontSize: '0.75rem',

      color: THEME.textGray,
    },

    // ==========================================
    // CTA SECTION
    // ==========================================
    ctaSection: {
      background:
        `linear-gradient(135deg, ${THEME.primaryBlue}, ${THEME.secondaryGreen})`,

      padding: isMobile
        ? '50px 0'
        : '80px 0',

      textAlign: 'center',

      color: THEME.white,
    },

    ctaHeading: {
      fontSize: isMobile
        ? '1.8rem'
        : '2.5rem',

      marginBottom: '10px',
    },

    ctaText: {
      fontSize: '1.1rem',

      marginBottom: '30px',

      opacity: 0.9,
    },

    ctaButton: {
      display: 'inline-block',

      background: THEME.primaryOrange,

      color: THEME.white,

      padding: '16px 42px',

      borderRadius: '50px',

      fontWeight: 700,

      fontSize: '0.95rem',

      letterSpacing: '0.5px',

      textDecoration: 'none',

      boxShadow:
        '0 8px 20px rgba(247, 147, 30, 0.35)',

      transition: THEME.transition,
    },
  };

  return (
    <div className="services-page">

      {/* ==========================================
          SERVICES PAGE HERO / BANNER
      ========================================== */}
      <section style={styles.pageHero}>

        {/* Dark overlay */}
        <div style={styles.heroOverlay}></div>

        {/* Banner text */}
        <div style={styles.heroContent}>

          <h1 style={styles.heroTitle}>
            Our Services
          </h1>

          <p style={styles.heroSubtitle}>
            Complete Solar Solutions for Every Need
          </p>

        </div>

      </section>

      {/* ==========================================
          SERVICES GRID
      ========================================== */}
      <section>
        <div style={styles.container}>

          <div style={styles.servicesGrid}>

            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                styles={styles}
              />
            ))}

          </div>

        </div>
      </section>

      {/* ==========================================
          CTA
      ========================================== */}
      <section style={styles.ctaSection}>

        <div style={styles.container}>

          <h2 style={styles.ctaHeading}>
            Ready to Switch to Solar?
          </h2>

          <p style={styles.ctaText}>
            Get a free consultation and quote today.
          </p>

          <a
            href="/contact"
            style={styles.ctaButton}

            onMouseEnter={(e) =>
              (e.currentTarget.style.transform =
                'translateY(-3px)')
            }

            onMouseLeave={(e) =>
              (e.currentTarget.style.transform =
                'translateY(0)')
            }
          >
            GET FREE QUOTE
          </a>

        </div>

      </section>

    </div>
  );
};

// ==========================================
// SERVICE CARD
// ==========================================
const ServiceCard = ({
  service,
  styles,
}) => {
  const [isHovered, setIsHovered] =
    useState(false);

  return (
    <div
      style={styles.card(isHovered)}

      onMouseEnter={() =>
        setIsHovered(true)
      }

      onMouseLeave={() =>
        setIsHovered(false)
      }
    >

      {/* Service Image */}
      <div style={styles.imageWrap}>

        <img
          src={service.image}
          alt={service.title}
          style={styles.image(isHovered)}
          loading="lazy"
        />

        <div
          style={styles.imageOverlay}
        />

        {/* Service Badge */}
        <span style={styles.badge}>
          {service.badge}
        </span>

        {/* Service Icon */}
        <div style={styles.iconBadge}>
          {service.icon}
        </div>

      </div>

      {/* Service Content */}
      <div style={styles.cardBody}>

        <h3 style={styles.cardTitle}>
          {service.title}
        </h3>

        <p style={styles.cardText}>
          {service.description}
        </p>

        {/* Features */}
        <ul style={styles.featureList}>

          {service.features.map(
            (feature, i) => (
              <li
                key={i}
                style={styles.featureItem}
              >
                <span
                  style={styles.checkMark}
                >
                  ✓
                </span>

                {feature}
              </li>
            )
          )}

        </ul>

        {/* Pricing */}
        <div
          style={styles.pricingBox}
        >

          <div style={styles.priceCol}>

            <span
              style={styles.priceLabel}
            >
              Starting at
            </span>

            <span
              style={styles.priceValue}
            >
              {service.price}
            </span>

          </div>

          <div style={styles.emiCol}>

            <span
              style={styles.emiValue}
            >
              {service.emi}
            </span>

            <span
              style={styles.emiTenure}
            >
              EMI · {service.tenure}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Services;