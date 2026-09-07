// pages/About.jsx
import React, { useEffect, useState } from 'react';
import AboutUsImage from './asset/AboutUs.png';

const THEME = {
  primaryBlue: '#12295e',
  secondaryGreen: '#1f9d55',
  primaryOrange: '#f7931e',
  textGray: '#5a5a6e',
  textDark: '#1a1a2e',
  white: '#ffffff',
  lightBg: '#f5f7fb',
  shadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
  shadowHover: '0 12px 30px rgba(0, 0, 0, 0.12)',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
};

const About = () => {
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
    page: {
      width: '100%',
      background: THEME.white,
      overflow: 'hidden',
    },

    /* Hero */
    pageHero: {
      position: 'relative',
      width: '100%',
      height: isMobile ? '230px' : isTablet ? '300px' : '380px',
      overflow: 'hidden',
      background: THEME.primaryBlue,
    },

    heroImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center',
      display: 'block',
    },

    heroOverlay: {
      position: 'absolute',
      inset: 0,
      background:
        'linear-gradient(90deg, rgba(18,41,94,0.78) 0%, rgba(18,41,94,0.35) 50%, rgba(18,41,94,0.15) 100%)',
    },

    heroContent: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '20px',
    },

    heroTitle: {
      color: THEME.white,
      fontSize: isMobile ? '2rem' : isTablet ? '2.5rem' : '3.2rem',
      fontWeight: 800,
      margin: 0,
      textShadow: '0 3px 10px rgba(0,0,0,0.35)',
    },

    heroSubtitle: {
      color: THEME.white,
      fontSize: isMobile ? '0.95rem' : '1.15rem',
      marginTop: '12px',
      opacity: 0.95,
    },

    /* Main */
    aboutContent: {
      padding: isMobile ? '45px 0' : '70px 0',
    },

    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: isMobile ? '0 18px' : '0 25px',
    },

    /* About Grid */
    aboutGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile
        ? '1fr'
        : isTablet
        ? '1fr'
        : '1.05fr 0.95fr',
      gap: isMobile ? '35px' : '55px',
      alignItems: 'center',
    },

    aboutText: {
      width: '100%',
    },

    sectionHeading: {
      color: THEME.primaryBlue,
      fontSize: isMobile ? '1.8rem' : '2.2rem',
      fontWeight: 800,
      margin: '0 0 18px',
    },

    headingLine: {
      width: '65px',
      height: '4px',
      background: THEME.primaryOrange,
      borderRadius: '10px',
      marginBottom: '22px',
    },

    paragraph: {
      color: THEME.textGray,
      fontSize: isMobile ? '0.95rem' : '1rem',
      lineHeight: 1.8,
      marginBottom: '18px',
    },

    /* Mission / Vision */
    aboutMission: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '18px',
      marginTop: '30px',
    },

    missionItem: {
      background: THEME.lightBg,
      padding: '22px',
      borderRadius: THEME.borderRadius,
      borderLeft: `4px solid ${THEME.primaryOrange}`,
      transition: THEME.transition,
    },

    missionTitle: {
      color: THEME.primaryBlue,
      fontSize: '1.05rem',
      fontWeight: 700,
      margin: '0 0 8px',
    },

    missionText: {
      color: THEME.textGray,
      fontSize: '0.9rem',
      lineHeight: 1.6,
      margin: 0,
    },

    /* Image */
    aboutImageWrapper: {
      width: '100%',
      borderRadius: THEME.borderRadius,
      overflow: 'hidden',
      boxShadow: '0 12px 35px rgba(18,41,94,0.15)',
      background: THEME.lightBg,
    },

    aboutImage: {
      width: '100%',
      height: isMobile ? '260px' : isTablet ? '350px' : '440px',
      objectFit: 'cover',
      objectPosition: 'center',
      display: 'block',
    },

    /* Why Choose */
    whyChoose: {
      marginTop: isMobile ? '55px' : '85px',
      textAlign: 'center',
    },

    whyHeading: {
      color: THEME.primaryBlue,
      fontSize: isMobile ? '1.8rem' : '2.2rem',
      fontWeight: 800,
      margin: '0 0 12px',
    },

    whySubtitle: {
      color: THEME.textGray,
      maxWidth: '650px',
      margin: '0 auto 40px',
      lineHeight: 1.7,
      fontSize: '0.95rem',
    },

    whyGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile
        ? '1fr'
        : isTablet
        ? 'repeat(2, 1fr)'
        : 'repeat(3, 1fr)',
      gap: '22px',
      textAlign: 'left',
    },

    whyItem: {
      background: THEME.white,
      border: '1px solid rgba(18,41,94,0.08)',
      borderRadius: THEME.borderRadius,
      padding: '26px 22px',
      boxShadow: THEME.shadow,
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      transition: THEME.transition,
    },

    whyIcon: {
      width: '48px',
      height: '48px',
      minWidth: '48px',
      borderRadius: '12px',
      background: 'rgba(247,147,30,0.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.5rem',
    },

    whyTitle: {
      color: THEME.textDark,
      fontSize: '0.95rem',
      fontWeight: 700,
      margin: 0,
      lineHeight: 1.4,
    },

    /* Bottom CTA */
    ctaSection: {
      marginTop: isMobile ? '55px' : '80px',
      background: `linear-gradient(135deg, ${THEME.primaryBlue}, ${THEME.secondaryGreen})`,
      borderRadius: THEME.borderRadius,
      padding: isMobile ? '35px 20px' : '50px 30px',
      textAlign: 'center',
      color: THEME.white,
    },

    ctaHeading: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      margin: '0 0 10px',
      fontWeight: 800,
    },

    ctaText: {
      margin: '0 auto 25px',
      opacity: 0.9,
      lineHeight: 1.6,
      maxWidth: '650px',
      fontSize: isMobile ? '0.9rem' : '1rem',
    },

    ctaButton: {
      display: 'inline-block',
      background: THEME.primaryOrange,
      color: THEME.white,
      padding: '13px 30px',
      borderRadius: '50px',
      textDecoration: 'none',
      fontWeight: 700,
      fontSize: '0.9rem',
      transition: THEME.transition,
    },
  };

  return (
    <div className="about-page" style={styles.page}>

      {/* ================= HERO ================= */}
      <section style={styles.pageHero}>
        <img
          src={AboutUsImage}
          alt="Revoltant Solar Solutions"
          style={styles.heroImage}
        />

        <div style={styles.heroOverlay}></div>

        <div style={styles.heroContent}>
          <div>
            <h1 style={styles.heroTitle}>About Us</h1>
            <p style={styles.heroSubtitle}>
              Powering a Brighter & Sustainable Future
            </p>
          </div>
        </div>
      </section>

      {/* ================= ABOUT CONTENT ================= */}
      <section style={styles.aboutContent}>
        <div style={styles.container}>

          <div style={styles.aboutGrid}>

            {/* Text */}
            <div style={styles.aboutText}>

              <h2 style={styles.sectionHeading}>
                Who We Are
              </h2>

              <div style={styles.headingLine}></div>

              <p style={styles.paragraph}>
                Revoltant Solar Solutions is a leading provider of
                high-quality solar energy solutions for residential,
                commercial, and industrial applications. We are committed
                to helping our customers reduce their electricity bills
                while contributing to a cleaner, greener planet.
              </p>

              <p style={styles.paragraph}>
                With years of experience in the solar industry, we provide
                end-to-end solutions from consultation and design to
                installation and maintenance. Our team of experts ensures
                that every project is delivered with the highest standards
                of quality and professionalism.
              </p>

              {/* Mission & Vision */}
              <div style={styles.aboutMission}>

                <div
                  style={styles.missionItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow =
                      THEME.shadowHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <h4 style={styles.missionTitle}>
                    🎯 Our Mission
                  </h4>

                  <p style={styles.missionText}>
                    To make clean, renewable solar energy accessible
                    to everyone.
                  </p>
                </div>

                <div
                  style={styles.missionItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow =
                      THEME.shadowHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <h4 style={styles.missionTitle}>
                    👁️ Our Vision
                  </h4>

                  <p style={styles.missionText}>
                    A sustainable future powered by solar energy.
                  </p>
                </div>

              </div>
            </div>

            {/* About Image */}
            <div style={styles.aboutImageWrapper}>
              <img
                src={AboutUsImage}
                alt="Solar energy solutions by Revoltant Solar Solutions"
                style={styles.aboutImage}
              />
            </div>

          </div>

          {/* ================= WHY CHOOSE US ================= */}
          <div style={styles.whyChoose}>

            <h2 style={styles.whyHeading}>
              Why Choose Us?
            </h2>

            <p style={styles.whySubtitle}>
              We combine quality products, professional installation,
              reliable service, and affordable solutions to make your
              transition to solar simple and worthwhile.
            </p>

            <div style={styles.whyGrid}>

              <WhyItem
                icon="⭐"
                title="Premium Quality Solar Products"
                styles={styles}
              />

              <WhyItem
                icon="🔧"
                title="Expert Installation Team"
                styles={styles}
              />

              <WhyItem
                icon="✅"
                title="MNRE Approved Systems"
                styles={styles}
              />

              <WhyItem
                icon="⏰"
                title="On Time Project Delivery"
                styles={styles}
              />

              <WhyItem
                icon="🛠️"
                title="Best After Sales Support"
                styles={styles}
              />

              <WhyItem
                icon="💰"
                title="Affordable Pricing"
                styles={styles}
              />

            </div>

          </div>

          {/* ================= CTA ================= */}
          <div style={styles.ctaSection}>

            <h2 style={styles.ctaHeading}>
              Ready to Switch to Solar?
            </h2>

            <p style={styles.ctaText}>
              Let Revoltant Solar Solutions help you choose the right
              solar solution for your home, business, or industry.
            </p>

            <a
              href="/contact"
              style={styles.ctaButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              GET FREE CONSULTATION
            </a>

          </div>

        </div>
      </section>

    </div>
  );
};


/* ================= WHY ITEM ================= */

const WhyItem = ({ icon, title, styles }) => {
  return (
    <div
      style={styles.whyItem}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = styles.whyItem.boxShadow
          ? styles.whyItem.boxShadow
          : THEME.shadowHover;
        e.currentTarget.style.borderColor = THEME.primaryOrange;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = THEME.shadow;
        e.currentTarget.style.borderColor =
          'rgba(18,41,94,0.08)';
      }}
    >
      <div style={styles.whyIcon}>
        {icon}
      </div>

      <h4 style={styles.whyTitle}>
        {title}
      </h4>
    </div>
  );
};

export default About;