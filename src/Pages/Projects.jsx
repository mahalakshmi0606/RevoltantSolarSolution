// pages/Projects.jsx
import React, { useState, useEffect } from 'react';

// Project images
import projectBanner from './asset/Project.png';

import roofTop from './asset/RoofTop.jpeg';
import commercial from './asset/Commercial.webp';
import pump from './asset/pump.webp';
import industrialSolarPanel from './asset/IndustrialSolarPanel.jpeg';
import commercial1 from './asset/Commercial1.webp';
import roofTop2 from './asset/RoofTop2.jpg';

const THEME = {
  primaryBlue: '#12295e',
  primaryOrange: '#f7931e',
  textGray: '#5a5a6e',
  textDark: '#1a1a2e',
  white: '#ffffff',
  lightBg: '#f5f7fb',
  shadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
  shadowHover: '0 15px 40px rgba(0, 0, 0, 0.12)',
  borderRadius: '16px',
  transition: 'all 0.3s ease',
};

const projects = [
  {
    id: 1,
    title: 'Residential Rooftop Solar',
    location: 'Chennai, Tamil Nadu',
    capacity: '5 kW',
    type: 'On-Grid',
    image: roofTop,
    completed: 'March 2025',
    story:
      'A family home in Chennai was spending nearly ₹4,500 a month on electricity during peak summer. We designed a 5kW on-grid rooftop system tailored to their south-facing roof, cutting their grid dependency by over 85% within the first billing cycle.',
    highlights: [
      'System pays for itself in under 4 years',
      'Reduced monthly electricity bill by up to 85%',
      'Net metering credits cover cloudy-day usage',
      '25-year performance warranty on panels',
    ],
    savings: '₹3,800/month',
    co2Offset: '5.2 tonnes/year',
  },
  {
    id: 2,
    title: 'Commercial Solar Installation',
    location: 'Coimbatore, Tamil Nadu',
    capacity: '100 kW',
    type: 'Hybrid',
    image: commercial,
    completed: 'January 2025',
    story:
      'A textile trading business in Coimbatore needed to cut rising operational costs without disrupting daytime operations. Our 100kW hybrid installation runs alongside grid power with battery backup, keeping critical equipment running through outages.',
    highlights: [
      'Hybrid setup ensures zero downtime during outages',
      'Cut monthly power costs by roughly 60%',
      'Battery backup for essential machinery',
      'Remote monitoring dashboard for real-time output',
    ],
    savings: '₹68,000/month',
    co2Offset: '104 tonnes/year',
  },
  {
    id: 3,
    title: 'Solar Water Pump Project',
    location: 'Madurai, Tamil Nadu',
    capacity: '10 HP',
    type: 'Off-Grid',
    image: pump,
    completed: 'November 2024',
    story:
      "A farming cooperative near Madurai relied entirely on diesel pumps for irrigation, with fuel costs eating into every harvest's margins. Switching to a 10HP off-grid solar pump removed diesel dependency completely and freed up irrigation timing to daylight hours.",
    highlights: [
      'Zero diesel cost from day one',
      'Runs entirely off-grid, no electricity bill',
      'Low-maintenance submersible pump design',
      'Government subsidy covered part of installation cost',
    ],
    savings: '₹9,500/month in diesel',
    co2Offset: '3.1 tonnes/year',
  },
  {
    id: 4,
    title: 'Industrial Solar Plant',
    location: 'Salem, Tamil Nadu',
    capacity: '500 kW',
    type: 'On-Grid',
    image: industrialSolarPanel,
    completed: 'August 2024',
    story:
      'A steel processing unit in Salem was one of our largest installations to date. The 500kW on-grid plant now supplies a significant share of daytime plant load, engineered around the facility’s existing rooftop and open-yard structures.',
    highlights: [
      'One of our largest commissioned plants',
      'Supplies a major share of daytime industrial load',
      'Custom mounting structure for mixed roof types',
      'Projected ROI within 5 years',
    ],
    savings: '₹3.2 lakh/month',
    co2Offset: '520 tonnes/year',
  },
  {
    id: 5,
    title: 'Hospital Solar Installation',
    location: 'Trichy, Tamil Nadu',
    capacity: '50 kW',
    type: 'Hybrid',
    image: commercial1,
    completed: 'May 2025',
    story:
      'A multi-specialty hospital in Trichy needed uninterrupted power for critical care equipment. The 50kW hybrid system was designed with battery backup prioritized for ICU and operation theatre circuits, keeping essential systems running independent of grid stability.',
    highlights: [
      'Battery backup prioritized for ICU & OT loads',
      'Reduced diesel generator dependency significantly',
      'Silent, maintenance-friendly operation',
      'Designed around 24/7 critical-load reliability',
    ],
    savings: '₹41,000/month',
    co2Offset: '52 tonnes/year',
  },
  {
    id: 6,
    title: 'Educational Campus Solar',
    location: 'Tirunelveli, Tamil Nadu',
    capacity: '75 kW',
    type: 'On-Grid',
    image: roofTop2,
    completed: 'February 2025',
    story:
      'An engineering college campus in Tirunelveli wanted to lower operating costs while giving students a live case study in renewable energy. The 75kW rooftop array now powers classrooms and labs, with real-time generation data used in the college’s own engineering curriculum.',
    highlights: [
      'Powers classrooms, labs and hostel blocks',
      'Live generation data used for student projects',
      'Cut campus electricity costs by nearly half',
      'Installed across three separate rooftop blocks',
    ],
    savings: '₹52,000/month',
    co2Offset: '78 tonnes/year',
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
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

  useEffect(() => {
    document.body.style.overflow = selectedProject
      ? 'hidden'
      : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  const isMobile = screenSize === 'mobile';
  const isTablet = screenSize === 'tablet';

  const styles = {
    // ==========================================
    // PROJECT PAGE HERO / BANNER
    // ==========================================
    pageHero: {
      position: 'relative',
      minHeight: isMobile ? '350px' : '450px',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',

      backgroundImage: `url(${projectBanner})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },

    heroOverlay: {
      position: 'absolute',
      inset: 0,

      background:
        'linear-gradient(90deg, rgba(5, 20, 45, 0.72), rgba(5, 20, 45, 0.18))',

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

      marginTop: '15px',

      maxWidth: '600px',

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
    // PROJECT GRID
    // ==========================================
    projectsGrid: {
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

    projectCard: (isHovered) => ({
      background: THEME.white,

      borderRadius: THEME.borderRadius,

      overflow: 'hidden',

      boxShadow: isHovered
        ? THEME.shadowHover
        : THEME.shadow,

      transform: isHovered
        ? 'translateY(-8px)'
        : 'translateY(0)',

      transition: THEME.transition,

      cursor: 'pointer',
    }),

    projectImageWrap: {
      position: 'relative',

      height: isMobile
        ? '200px'
        : '220px',

      overflow: 'hidden',
    },

    projectImage: (isHovered) => ({
      width: '100%',
      height: '100%',

      objectFit: 'cover',

      transition: THEME.transition,

      transform: isHovered
        ? 'scale(1.05)'
        : 'scale(1)',

      display: 'block',
    }),

    projectBadge: {
      position: 'absolute',

      top: '15px',
      right: '15px',

      background: THEME.primaryOrange,

      color: THEME.white,

      padding: '4px 14px',

      borderRadius: '50px',

      fontSize: '0.75rem',

      fontWeight: 600,
    },

    projectDetails: {
      padding: '20px',
    },

    projectTitle: {
      fontWeight: 700,

      color: THEME.primaryBlue,

      marginBottom: '5px',

      fontSize: '1.1rem',
    },

    projectLocation: {
      color: THEME.textGray,

      fontSize: '0.9rem',

      marginBottom: '10px',
    },

    projectMeta: {
      display: 'flex',
      gap: '15px',
      flexWrap: 'wrap',
    },

    projectMetaSpan: {
      background: THEME.lightBg,

      padding: '4px 14px',

      borderRadius: '50px',

      fontSize: '0.8rem',

      color: THEME.textDark,
    },

    viewMoreHint: {
      marginTop: '12px',

      fontSize: '0.82rem',

      color: THEME.primaryOrange,

      fontWeight: 600,
    },

    // ==========================================
    // MODAL
    // ==========================================
    modalOverlay: {
      position: 'fixed',

      inset: 0,

      background:
        'rgba(10, 15, 30, 0.6)',

      display: 'flex',

      alignItems: 'center',

      justifyContent: 'center',

      padding: '20px',

      zIndex: 2000,
    },

    modalCard: {
      background: THEME.white,

      borderRadius: THEME.borderRadius,

      maxWidth: '680px',

      width: '100%',

      maxHeight: '88vh',

      overflowY: 'auto',

      position: 'relative',

      boxShadow:
        '0 20px 60px rgba(0,0,0,0.3)',
    },

    modalImage: {
      width: '100%',

      height: isMobile
        ? '180px'
        : '260px',

      objectFit: 'cover',

      display: 'block',

      borderTopLeftRadius:
        THEME.borderRadius,

      borderTopRightRadius:
        THEME.borderRadius,
    },

    modalBody: {
      padding: isMobile
        ? '24px'
        : '34px',
    },

    modalClose: {
      position: 'absolute',

      top: '16px',
      right: '16px',

      width: '36px',
      height: '36px',

      borderRadius: '50%',

      border: 'none',

      background:
        'rgba(0,0,0,0.5)',

      color: THEME.white,

      fontSize: '1.1rem',

      cursor: 'pointer',

      display: 'flex',

      alignItems: 'center',

      justifyContent: 'center',
    },

    modalBadgeRow: {
      display: 'flex',

      gap: '10px',

      flexWrap: 'wrap',

      marginBottom: '14px',
    },

    modalTypeBadge: {
      background: THEME.primaryOrange,

      color: THEME.white,

      padding: '4px 14px',

      borderRadius: '50px',

      fontSize: '0.75rem',

      fontWeight: 600,
    },

    modalDateBadge: {
      background: THEME.lightBg,

      color: THEME.textDark,

      padding: '4px 14px',

      borderRadius: '50px',

      fontSize: '0.75rem',

      fontWeight: 600,
    },

    modalTitle: {
      color: THEME.primaryBlue,

      fontSize: '1.5rem',

      fontWeight: 800,

      marginBottom: '4px',
    },

    modalLocation: {
      color: THEME.textGray,

      fontSize: '0.95rem',

      marginBottom: '20px',
    },

    modalStatsGrid: {
      display: 'grid',

      gridTemplateColumns:
        'repeat(3, 1fr)',

      gap: '12px',

      background: THEME.lightBg,

      padding: '16px',

      borderRadius: '10px',

      marginBottom: '20px',
    },

    modalStatCol: {
      display: 'flex',

      flexDirection: 'column',
    },

    modalStatLabel: {
      fontSize: '0.75rem',

      color: THEME.textGray,
    },

    modalStatValue: {
      fontSize: '0.95rem',

      color: THEME.textDark,

      fontWeight: 700,
    },

    modalSectionHeading: {
      color: THEME.textDark,

      fontSize: '1.05rem',

      fontWeight: 700,

      margin: '20px 0 10px',
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
    <div className="projects-page">

      {/* ==========================================
          PROJECT PAGE HERO / BANNER
      ========================================== */}
      <section style={styles.pageHero}>

        {/* Dark overlay for readable text */}
        <div style={styles.heroOverlay}></div>

        {/* Hero content */}
        <div style={styles.heroContent}>

          <h1 style={styles.heroTitle}>
            Our Projects
          </h1>

          <p style={styles.heroSubtitle}>
            Explore our successful solar installations
            and renewable energy projects.
          </p>

        </div>

      </section>

      {/* ==========================================
          PROJECTS GRID
      ========================================== */}
      <section>
        <div style={styles.container}>

          <div style={styles.projectsGrid}>

            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                styles={styles}
                onClick={() =>
                  setSelectedProject(project)
                }
              />
            ))}

          </div>

        </div>
      </section>

      {/* ==========================================
          PROJECT DETAIL MODAL
      ========================================== */}
      {selectedProject && (
        <div
          style={styles.modalOverlay}
          onClick={() =>
            setSelectedProject(null)
          }
        >

          <div
            style={styles.modalCard}
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Project Image */}
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              style={styles.modalImage}
            />

            {/* Close Button */}
            <button
              type="button"
              style={styles.modalClose}
              onClick={() =>
                setSelectedProject(null)
              }
              aria-label="Close details"
            >
              ✕
            </button>

            <div style={styles.modalBody}>

              {/* Badges */}
              <div style={styles.modalBadgeRow}>

                <span
                  style={
                    styles.modalTypeBadge
                  }
                >
                  {selectedProject.type}
                </span>

                <span
                  style={
                    styles.modalDateBadge
                  }
                >
                  Completed{' '}
                  {selectedProject.completed}
                </span>

              </div>

              {/* Title */}
              <h3 style={styles.modalTitle}>
                {selectedProject.title}
              </h3>

              {/* Location */}
              <p style={styles.modalLocation}>
                📍 {selectedProject.location}
              </p>

              {/* Stats */}
              <div
                style={styles.modalStatsGrid}
              >

                <div
                  style={styles.modalStatCol}
                >
                  <span
                    style={
                      styles.modalStatLabel
                    }
                  >
                    Capacity
                  </span>

                  <strong
                    style={
                      styles.modalStatValue
                    }
                  >
                    {selectedProject.capacity}
                  </strong>
                </div>

                <div
                  style={styles.modalStatCol}
                >
                  <span
                    style={
                      styles.modalStatLabel
                    }
                  >
                    Est. Savings
                  </span>

                  <strong
                    style={
                      styles.modalStatValue
                    }
                  >
                    {selectedProject.savings}
                  </strong>
                </div>

                <div
                  style={styles.modalStatCol}
                >
                  <span
                    style={
                      styles.modalStatLabel
                    }
                  >
                    CO₂ Offset
                  </span>

                  <strong
                    style={
                      styles.modalStatValue
                    }
                  >
                    {selectedProject.co2Offset}
                  </strong>
                </div>

              </div>

              {/* Project Story */}
              <h4
                style={
                  styles.modalSectionHeading
                }
              >
                Project Story
              </h4>

              <p
                style={styles.modalParagraph}
              >
                {selectedProject.story}
              </p>

              {/* Highlights */}
              <h4
                style={
                  styles.modalSectionHeading
                }
              >
                Highlights
              </h4>

              <ul style={styles.modalList}>
                {selectedProject.highlights.map(
                  (point, i) => (
                    <li key={i}>
                      {point}
                    </li>
                  )
                )}
              </ul>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

// ==========================================
// PROJECT CARD COMPONENT
// ==========================================
const ProjectCard = ({
  project,
  styles,
  onClick,
}) => {
  const [isHovered, setIsHovered] =
    useState(false);

  return (
    <div
      style={styles.projectCard(
        isHovered
      )}

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

      {/* Project Image */}
      <div
        style={styles.projectImageWrap}
      >

        <img
          src={project.image}
          alt={project.title}
          style={styles.projectImage(
            isHovered
          )}
          loading="lazy"
        />

        {/* Project Type */}
        <div
          style={styles.projectBadge}
        >
          <span>
            {project.type}
          </span>
        </div>

      </div>

      {/* Project Information */}
      <div
        style={styles.projectDetails}
      >

        <h3
          style={styles.projectTitle}
        >
          {project.title}
        </h3>

        <p
          style={styles.projectLocation}
        >
          📍 {project.location}
        </p>

        <div
          style={styles.projectMeta}
        >
          <span
            style={styles.projectMetaSpan}
          >
            ⚡ {project.capacity}
          </span>
        </div>

        <p
          style={styles.viewMoreHint}
        >
          Click to view project story →
        </p>

      </div>

    </div>
  );
};

export default Projects;