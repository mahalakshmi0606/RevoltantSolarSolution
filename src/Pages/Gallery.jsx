// pages/Gallery.jsx
import React, { useState, useEffect } from 'react';

// Gallery banner
import galleryBanner from './asset/Gallery.png';

// Local gallery images
import commercial from './asset/Commercial.webp';
import commercial1 from './asset/Commercial1.webp';
import commercial2 from './asset/commercial2.jpg';
import commercial3 from './asset/commercial3.jpg';
import commercial4 from './asset/commercial4.jpg';

import industrial from './asset/IndustrialSolarPanel.jpeg';
import industrial1 from './asset/IndustrialSolarPanel1.jpeg';
import industrial2 from './asset/IndustrialSolarpanel2.jpeg';

import pump from './asset/pump.webp';
import pump1 from './asset/Pump1.jpeg';
import pump2 from './asset/Pump2.webp';

import roofTop from './asset/RoofTop.jpeg';
import roofTop2 from './asset/RoofTop2.jpg';
import roofTop3 from './asset/RoofTop3.jpeg';
import roofTop4 from './asset/RoofTop4.jpeg';

// Theme
const THEME = {
  primaryOrange: '#f7931e',
  white: '#ffffff',
  darkBlue: '#0b2d4d',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
};

const galleryItems = [
  {
    id: 1,
    src: commercial,
    category: 'Commercial',
    title: 'Commercial Solar Installation',
  },
  {
    id: 2,
    src: commercial1,
    category: 'Commercial',
    title: 'Commercial Rooftop Array',
  },
  {
    id: 3,
    src: commercial2,
    category: 'Commercial',
    title: 'Commercial Solar Setup',
  },
  {
    id: 4,
    src: commercial3,
    category: 'Commercial',
    title: 'Commercial Panel Layout',
  },
  {
    id: 5,
    src: commercial4,
    category: 'Commercial',
    title: 'Commercial Solar Site',
  },
  {
    id: 6,
    src: industrial,
    category: 'Industrial',
    title: 'Industrial Solar Panel Installation',
  },
  {
    id: 7,
    src: industrial1,
    category: 'Industrial',
    title: 'Industrial Solar Plant',
  },
  {
    id: 8,
    src: industrial2,
    category: 'Industrial',
    title: 'Industrial Solar Array',
  },
  {
    id: 9,
    src: pump,
    category: 'Solar Pump',
    title: 'Solar Water Pump System',
  },
  {
    id: 10,
    src: pump1,
    category: 'Solar Pump',
    title: 'Solar Pump Installation',
  },
  {
    id: 11,
    src: pump2,
    category: 'Solar Pump',
    title: 'Solar Pump Setup',
  },
  {
    id: 12,
    src: roofTop,
    category: 'Rooftop',
    title: 'Residential Rooftop Solar',
  },
  {
    id: 13,
    src: roofTop2,
    category: 'Rooftop',
    title: 'Rooftop Solar Panels',
  },
  {
    id: 14,
    src: roofTop3,
    category: 'Rooftop',
    title: 'Rooftop Solar Installation',
  },
  {
    id: 15,
    src: roofTop4,
    category: 'Rooftop',
    title: 'Rooftop Solar System',
  },
];

const categories = [
  'All',
  'Commercial',
  'Industrial',
  'Solar Pump',
  'Rooftop',
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);
  const [columns, setColumns] = useState(4);

  // Responsive columns
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;

      if (width <= 576) {
        setColumns(1);
      } else if (width <= 768) {
        setColumns(2);
      } else if (width <= 992) {
        setColumns(3);
      } else {
        setColumns(4);
      }
    };

    updateColumns();

    window.addEventListener('resize', updateColumns);

    return () => {
      window.removeEventListener('resize', updateColumns);
    };
  }, []);

  // Filter gallery
  const filteredItems =
    activeFilter === 'All'
      ? galleryItems
      : galleryItems.filter(
          (item) => item.category === activeFilter
        );

  const styles = {
    // =========================
    // HERO / BANNER
    // =========================
    pageHero: {
      position: 'relative',
      minHeight: '420px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: `url(${galleryBanner})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      overflow: 'hidden',
    },

    heroOverlay: {
      position: 'absolute',
      inset: 0,
      background:
        'linear-gradient(90deg, rgba(5, 25, 45, 0.55), rgba(5, 25, 45, 0.10))',
      zIndex: 1,
    },

    heroContent: {
      position: 'relative',
      zIndex: 2,
      width: '100%',
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '70px 20px',
      textAlign: 'left',
    },

    heroTitle: {
      color: THEME.white,
      fontSize: '3.2rem',
      fontWeight: 800,
      margin: 0,
      textShadow: '0 3px 10px rgba(0,0,0,0.4)',
    },

    heroSubtitle: {
      color: THEME.white,
      fontSize: '1.15rem',
      marginTop: '15px',
      maxWidth: '520px',
      lineHeight: 1.6,
      textShadow: '0 2px 6px rgba(0,0,0,0.4)',
    },

    // =========================
    // GALLERY SECTION
    // =========================
    gallerySection: {
      padding: '60px 0',
      background: '#ffffff',
    },

    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 20px',
      boxSizing: 'border-box',
    },

    // =========================
    // FILTER BUTTONS
    // =========================
    galleryFilters: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '12px',
      flexWrap: 'wrap',
      marginBottom: '40px',
    },

    filterBtn: (isActive) => ({
      padding: '11px 28px',
      border: `2px solid ${
        isActive ? THEME.primaryOrange : '#dddddd'
      }`,
      background: isActive
        ? THEME.primaryOrange
        : THEME.white,
      color: isActive
        ? THEME.white
        : THEME.darkBlue,
      borderRadius: '50px',
      cursor: 'pointer',
      fontWeight: 600,
      transition: THEME.transition,
      fontSize: '0.9rem',
      boxShadow: isActive
        ? '0 5px 15px rgba(247, 147, 30, 0.25)'
        : 'none',
    }),

    // =========================
    // GALLERY GRID
    // =========================
    galleryGrid: {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      gap: '20px',
    },

    galleryItem: {
      position: 'relative',
      borderRadius: THEME.borderRadius,
      overflow: 'hidden',
      aspectRatio: '1 / 1',
      cursor: 'pointer',
      background: '#eeeeee',
      boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
    },

    galleryImage: (isHovered) => ({
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.4s ease',
      transform: isHovered
        ? 'scale(1.1)'
        : 'scale(1)',
      display: 'block',
    }),

    galleryOverlay: (isHovered) => ({
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      minHeight: '45%',
      background:
        'linear-gradient(transparent, rgba(0,0,0,0.82))',
      padding: '20px',
      opacity: isHovered ? 1 : 0,
      transition: THEME.transition,
      display: 'flex',
      alignItems: 'flex-end',
      boxSizing: 'border-box',
    }),

    galleryOverlayText: {
      color: THEME.white,
      fontWeight: 600,
      fontSize: '1rem',
      margin: 0,
      lineHeight: 1.4,
    },
  };

  return (
    <div className="gallery-page">

      {/* =========================
          GALLERY HERO BANNER
      ========================= */}
      <section style={styles.pageHero}>

        {/* Dark overlay */}
        <div style={styles.heroOverlay}></div>

        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Gallery
          </h1>

          <p style={styles.heroSubtitle}>
            Explore our completed solar installations,
            projects, and renewable energy solutions.
          </p>
        </div>

      </section>

      {/* =========================
          GALLERY CONTENT
      ========================= */}
      <section style={styles.gallerySection}>
        <div style={styles.container}>

          {/* Filters */}
          <div style={styles.galleryFilters}>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                style={styles.filterBtn(
                  activeFilter === category
                )}
                onClick={() =>
                  setActiveFilter(category)
                }
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div style={styles.galleryGrid}>

            {filteredItems.map((item) => (
              <div
                key={item.id}
                style={styles.galleryItem}
                onMouseEnter={() =>
                  setHoveredId(item.id)
                }
                onMouseLeave={() =>
                  setHoveredId(null)
                }
              >

                <img
                  src={item.src}
                  alt={item.title}
                  style={styles.galleryImage(
                    hoveredId === item.id
                  )}
                  loading="lazy"
                />

                <div
                  style={styles.galleryOverlay(
                    hoveredId === item.id
                  )}
                >
                  <p style={styles.galleryOverlayText}>
                    {item.title}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>
      </section>

    </div>
  );
};

export default Gallery;