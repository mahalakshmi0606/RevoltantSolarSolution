// pages/Subsidy.jsx
import React, { useState, useEffect } from 'react';

// Subsidy banner image
import subsidyBanner from './asset/Subsidery.png';

const THEME = {
  primaryBlue: '#12295e',
  secondaryGreen: '#1f9d55',
  primaryOrange: '#f7931e',
  textGray: '#5a5a6e',
  textDark: '#1a1a2e',
  white: '#ffffff',
  lightBg: '#f5f7fb',
  shadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
  shadowHover: '0 10px 30px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
};

const subsidySchemes = [
  {
    title: 'MNRE Solar Subsidy',
    description:
      'Ministry of New and Renewable Energy provides subsidies for residential rooftop solar installations.',
    amount: '40% - 70%',
    eligibility: 'Residential properties',
    icon: '💰',
    fullDetails:
      'The MNRE (Ministry of New and Renewable Energy) subsidy is a central government scheme offering direct financial support for rooftop solar installations. Homeowners can claim 40% subsidy for systems up to 3kW and 20% for systems between 3-10kW, significantly reducing upfront installation costs.',
    documents: [
      'Proof of property ownership',
      'Latest electricity bill',
      'Aadhaar card / government ID',
      'Bank account details for subsidy transfer',
    ],
    process: [
      'Apply through the National Portal for Rooftop Solar',
      'Get technical feasibility approval from DISCOM',
      'Installation by an empanelled vendor',
      'Inspection and net-meter installation',
      'Subsidy credited directly to your bank account',
    ],
  },
  {
    title: 'State Government Schemes',
    description:
      'Various state governments offer additional subsidies and incentives for solar adoption.',
    amount: 'Varies by state',
    eligibility: 'Residential & Commercial',
    icon: '🏛️',
    fullDetails:
      'Many state governments layer additional incentives on top of the central MNRE subsidy — including capital subsidies, reduced GST rates, generation-based incentives, and exemptions on electricity duty. Availability and percentage vary by state and are updated periodically.',
    documents: [
      'State-specific application form',
      'Property tax receipt',
      'Electricity connection details',
      'Installation vendor registration proof',
    ],
    process: [
      'Check your state renewable energy department portal',
      'Submit the state subsidy application alongside MNRE application',
      'Await joint verification (state + DISCOM)',
      'Receive combined subsidy disbursement',
    ],
  },
  {
    title: 'Net Metering Policy',
    description:
      'Export excess solar power to the grid and earn credits on your electricity bill.',
    amount: 'Credit on bills',
    eligibility: 'All consumers',
    icon: '🔌',
    fullDetails:
      'Net metering lets you export any surplus solar power your system generates back to the grid. Your electricity meter runs in reverse, and you receive bill credits for the exported units — effectively using the grid as a battery and lowering your monthly electricity costs.',
    documents: [
      'Net metering application form',
      'Solar installation completion certificate',
      'Latest electricity bill',
      'Site inspection report',
    ],
    process: [
      'Apply to your DISCOM for a net meter after installation',
      'Site inspection by the electricity board',
      'Bi-directional meter installed',
      'Excess units automatically credited each billing cycle',
    ],
  },
  {
    title: 'Tax Benefits',
    description:
      'Accelerated depreciation and tax benefits for commercial and industrial solar installations.',
    amount: 'Tax savings',
    eligibility: 'Commercial & Industrial',
    icon: '📊',
    fullDetails:
      'Businesses investing in solar can claim accelerated depreciation of up to 40% in the first year under the Income Tax Act, substantially reducing taxable income. Combined with lower operating costs, this shortens the payback period for commercial and industrial installations.',
    documents: [
      'Business PAN and GST registration',
      'Solar asset purchase invoice',
      'Installation completion certificate',
      'CA-certified depreciation schedule',
    ],
    process: [
      'Install solar system through a GST-registered vendor',
      'Retain all purchase and installation invoices',
      'Claim accelerated depreciation while filing income tax returns',
      'Consult your CA for the applicable depreciation rate',
    ],
  },
];

const Subsidy = () => {
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedScheme
      ? 'hidden'
      : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedScheme]);

  const styles = {
    // ==========================================
    // HERO / BANNER
    // ==========================================
    pageHero: {
      position: 'relative',
      minHeight: isMobile ? '360px' : '450px',
      display: 'flex',
      alignItems: 'center',
      backgroundImage: `url(${subsidyBanner})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
    },

    heroOverlay: {
      position: 'absolute',
      inset: 0,
      background:
        'linear-gradient(90deg, rgba(5, 25, 45, 0.65), rgba(5, 25, 45, 0.15))',
      zIndex: 1,
    },

    heroContent: {
      position: 'relative',
      zIndex: 2,
      width: '100%',
      maxWidth: '1280px',
      margin: '0 auto',
      padding: isMobile ? '70px 20px' : '90px 20px',
      boxSizing: 'border-box',
    },

    heroTitle: {
      color: THEME.white,
      fontSize: isMobile ? '2.2rem' : '3.2rem',
      fontWeight: 800,
      margin: 0,
      lineHeight: 1.2,
      textShadow: '0 3px 10px rgba(0,0,0,0.45)',
    },

    heroSubtitle: {
      color: THEME.white,
      fontSize: isMobile ? '1rem' : '1.15rem',
      marginTop: '15px',
      maxWidth: '550px',
      lineHeight: 1.6,
      textShadow: '0 2px 6px rgba(0,0,0,0.45)',
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
    // CONTENT
    // ==========================================
    subsidyContent: {
      padding: isMobile ? '45px 0' : '60px 0',
      background: THEME.white,
    },

    subsidyIntro: {
      textAlign: 'center',
      maxWidth: '700px',
      margin: '0 auto 50px',
    },

    introHeading: {
      fontSize: isMobile ? '1.8rem' : '2.2rem',
      color: THEME.primaryBlue,
      marginBottom: '15px',
      fontWeight: 800,
    },

    introText: {
      color: THEME.textGray,
      lineHeight: 1.8,
      fontSize: '1rem',
      margin: 0,
    },

    // ==========================================
    // SUBSIDY GRID
    // ==========================================
    subsidyGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile
        ? '1fr'
        : 'repeat(2, 1fr)',
      gap: isMobile ? '20px' : '30px',
      marginBottom: '50px',
    },

    subsidyCard: (isHovered) => ({
      background: THEME.white,
      padding: isMobile ? '24px' : '30px',
      borderRadius: THEME.borderRadius,
      boxShadow: isHovered
        ? THEME.shadowHover
        : THEME.shadow,
      transform: isHovered
        ? 'translateY(-5px)'
        : 'translateY(0)',
      transition: THEME.transition,
      borderLeft: `4px solid ${THEME.primaryOrange}`,
      cursor: 'pointer',
      outline: 'none',
    }),

    subsidyIcon: {
      fontSize: '2.5rem',
      marginBottom: '10px',
    },

    cardTitle: {
      fontWeight: 700,
      color: THEME.primaryBlue,
      marginBottom: '10px',
      fontSize: '1.2rem',
    },

    cardText: {
      color: THEME.textGray,
      lineHeight: 1.6,
      marginBottom: '15px',
    },

    subsidyDetails: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      background: THEME.lightBg,
      padding: '15px',
      borderRadius: '8px',
    },

    detailCol: {
      display: 'flex',
      flexDirection: 'column',
    },

    detailLabel: {
      fontSize: '0.8rem',
      color: THEME.textGray,
      marginBottom: '4px',
    },

    detailValue: {
      fontSize: '1rem',
      color: THEME.textDark,
      fontWeight: 700,
    },

    viewMoreHint: {
      marginTop: '14px',
      fontSize: '0.85rem',
      color: THEME.primaryOrange,
      fontWeight: 600,
    },

    // ==========================================
    // CTA
    // ==========================================
    subsidyCta: {
      textAlign: 'center',
      background: `linear-gradient(
        135deg,
        ${THEME.primaryBlue},
        ${THEME.secondaryGreen}
      )`,
      padding: isMobile ? '30px 20px' : '50px',
      borderRadius: THEME.borderRadius,
      color: THEME.white,
    },

    ctaHeading: {
      fontSize: isMobile ? '1.5rem' : '1.8rem',
      marginBottom: '10px',
      marginTop: 0,
    },

    ctaText: {
      marginBottom: '25px',
      opacity: 0.9,
      lineHeight: 1.6,
    },

    ctaButton: {
      display: 'inline-block',
      background: THEME.primaryOrange,
      color: THEME.white,
      padding: '14px 34px',
      borderRadius: '50px',
      fontWeight: 700,
      textDecoration: 'none',
      transition: THEME.transition,
    },

    // ==========================================
    // MODAL
    // ==========================================
    modalOverlay: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(10, 15, 30, 0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      zIndex: 2000,
    },

    modalCard: {
      background: THEME.white,
      borderRadius: THEME.borderRadius,
      maxWidth: '640px',
      width: '100%',
      maxHeight: '85vh',
      overflowY: 'auto',
      padding: isMobile ? '28px 22px' : '40px',
      position: 'relative',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      boxSizing: 'border-box',
    },

    modalClose: {
      position: 'absolute',
      top: '18px',
      right: '18px',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      border: 'none',
      background: THEME.lightBg,
      color: THEME.textDark,
      fontSize: '1.1rem',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    modalIcon: {
      fontSize: '2.6rem',
      marginBottom: '10px',
    },

    modalTitle: {
      color: THEME.primaryBlue,
      fontSize: '1.5rem',
      fontWeight: 800,
      marginBottom: '14px',
      paddingRight: '40px',
    },

    modalDetailsGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
      background: THEME.lightBg,
      padding: '16px',
      borderRadius: '10px',
      marginBottom: '20px',
    },

    modalSectionHeading: {
      color: THEME.textDark,
      fontSize: '1.05rem',
      fontWeight: 700,
      margin: '22px 0 10px',
    },

    modalParagraph: {
      color: THEME.textGray,
      lineHeight: 1.75,
    },

    modalList: {
      margin: 0,
      paddingLeft: '20px',
      color: THEME.textGray,
      lineHeight: 1.9,
    },
  };

  return (
    <div className="subsidy-page">

      {/* ==========================================
          SUBSIDY HERO BANNER
      ========================================== */}
      <section style={styles.pageHero}>

<div
  style={{
    ...styles.heroContent,
    textAlign: 'right',
    marginLeft: 'auto',
    maxWidth: '600px'
  }}
>
  <h1 style={styles.heroTitle}>
    Subsidy &amp; Incentives
  </h1>

  <p style={styles.heroSubtitle}>
    Government support and incentives to make
    your solar journey more affordable.
  </p>
</div>

      </section>

      {/* ==========================================
          SUBSIDY CONTENT
      ========================================== */}
      <section style={styles.subsidyContent}>
        <div style={styles.container}>

          {/* Introduction */}
          <div style={styles.subsidyIntro}>
            <h2 style={styles.introHeading}>
              Solar Subsidy Programs
            </h2>

            <p style={styles.introText}>
              The Government of India offers various
              subsidy programs to encourage the adoption
              of solar energy. These incentives make solar
              installations more affordable and accelerate
              the transition to clean energy.
            </p>
          </div>

          {/* Subsidy Cards */}
          <div style={styles.subsidyGrid}>
            {subsidySchemes.map((scheme, index) => (
              <SubsidyCard
                key={index}
                scheme={scheme}
                styles={styles}
                onClick={() =>
                  setSelectedScheme(scheme)
                }
              />
            ))}
          </div>

          {/* CTA */}
          <div style={styles.subsidyCta}>
            <h3 style={styles.ctaHeading}>
              Want to know if you're eligible?
            </h3>

            <p style={styles.ctaText}>
              Contact us for a free consultation and
              we'll help you understand all available
              incentives.
            </p>

            <a
              href="/contact"
              style={styles.ctaButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 8px 20px rgba(247, 147, 30, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  'translateY(0)';
                e.currentTarget.style.boxShadow =
                  'none';
              }}
            >
              Get Free Consultation
            </a>
          </div>

        </div>
      </section>

      {/* ==========================================
          DETAIL MODAL
      ========================================== */}
      {selectedScheme && (
        <div
          style={styles.modalOverlay}
          onClick={() => setSelectedScheme(null)}
        >
          <div
            style={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close Button */}
            <button
              type="button"
              style={styles.modalClose}
              onClick={() =>
                setSelectedScheme(null)
              }
              aria-label="Close details"
            >
              ✕
            </button>

            {/* Icon */}
            <div style={styles.modalIcon}>
              {selectedScheme.icon}
            </div>

            {/* Title */}
            <h3 style={styles.modalTitle}>
              {selectedScheme.title}
            </h3>

            {/* Amount + Eligibility */}
            <div style={styles.modalDetailsGrid}>

              <div style={styles.detailCol}>
                <span style={styles.detailLabel}>
                  Amount
                </span>

                <strong style={styles.detailValue}>
                  {selectedScheme.amount}
                </strong>
              </div>

              <div style={styles.detailCol}>
                <span style={styles.detailLabel}>
                  Eligibility
                </span>

                <strong style={styles.detailValue}>
                  {selectedScheme.eligibility}
                </strong>
              </div>

            </div>

            {/* Full Details */}
            <p style={styles.modalParagraph}>
              {selectedScheme.fullDetails}
            </p>

            {/* Documents */}
            <h4 style={styles.modalSectionHeading}>
              Documents Required
            </h4>

            <ul style={styles.modalList}>
              {selectedScheme.documents.map(
                (doc, i) => (
                  <li key={i}>{doc}</li>
                )
              )}
            </ul>

            {/* Process */}
            <h4 style={styles.modalSectionHeading}>
              Application Process
            </h4>

            <ul style={styles.modalList}>
              {selectedScheme.process.map(
                (step, i) => (
                  <li key={i}>{step}</li>
                )
              )}
            </ul>

          </div>
        </div>
      )}

    </div>
  );
};

// ==========================================
// SUBSIDY CARD COMPONENT
// ==========================================
const SubsidyCard = ({
  scheme,
  styles,
  onClick,
}) => {
  const [isHovered, setIsHovered] =
    useState(false);

  return (
    <div
      style={styles.subsidyCard(isHovered)}
      onMouseEnter={() =>
        setIsHovered(true)
      }
      onMouseLeave={() =>
        setIsHovered(false)
      }
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (
          e.key === 'Enter' ||
          e.key === ' '
        ) {
          e.preventDefault();
          onClick();
        }
      }}
    >

      {/* Icon */}
      <div style={styles.subsidyIcon}>
        {scheme.icon}
      </div>

      {/* Title */}
      <h3 style={styles.cardTitle}>
        {scheme.title}
      </h3>

      {/* Description */}
      <p style={styles.cardText}>
        {scheme.description}
      </p>

      {/* Details */}
      <div style={styles.subsidyDetails}>

        <div style={styles.detailCol}>
          <span style={styles.detailLabel}>
            Amount
          </span>

          <strong style={styles.detailValue}>
            {scheme.amount}
          </strong>
        </div>

        <div style={styles.detailCol}>
          <span style={styles.detailLabel}>
            Eligibility
          </span>

          <strong style={styles.detailValue}>
            {scheme.eligibility}
          </strong>
        </div>

      </div>

      {/* View More */}
      <p style={styles.viewMoreHint}>
        Click to view full details →
      </p>

    </div>
  );
};

export default Subsidy;