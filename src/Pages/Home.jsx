// src/Pages/Home.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Home.css';

import homeImage from './asset/Home.png';

const WHATSAPP_NUMBER = '919384167482';

// Google Apps Script deployment URL
const SHEET_API_URL =
  'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

// Solar savings assumptions
const AVG_UNITS_PER_KW_PER_DAY = 4;
const AVG_TARIFF_PER_UNIT = 8;

const Home = () => {
  // =========================================================
  // QUOTE FORM
  // =========================================================

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    location: '',
    systemSize: '',
    systemType: '',
  });

  const [submitting, setSubmitting] = useState(false);

  // =========================================================
  // SAVINGS CALCULATOR
  // =========================================================

  const [calcData, setCalcData] = useState({
    billAmount: '',
    systemSize: '',
    systemType: 'On Grid',
  });

  const [calcResult, setCalcResult] = useState(null);

  // =========================================================
  // LEAD FORM
  // =========================================================

  const [showLeadForm, setShowLeadForm] = useState(false);

  const [leadData, setLeadData] = useState({
    name: '',
    mobile: '',
  });

  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // =========================================================
  // FORM CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCalcChange = (e) => {
    const { name, value } = e.target;

    setCalcData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLeadChange = (e) => {
    const { name, value } = e.target;

    setLeadData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // SAVE QUOTE TO GOOGLE SHEET
  // =========================================================

  const saveToSheet = async () => {
    const record = {
      Name: formData.name,
      'Mobile Number': formData.mobile,
      'Email Address': formData.email || '',
      Location: formData.location || '',
      Size: formData.systemSize || '',
      Type: formData.systemType || '',
    };

    try {
      const res = await fetch(SHEET_API_URL, {
        method: 'POST',
        body: JSON.stringify({
          action: 'create',
          record,
        }),
      });

      const json = await res.json();

      if (!json.success) {
        console.error('Sheet write failed:', json.error);
      }
    } catch (error) {
      console.error('Network error submitting to sheet:', error);
    }
  };

  // =========================================================
  // QUOTE SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    await saveToSheet();

    const message =
      `Hello, I would like a solar quotation.\n\n` +
      `*Name:* ${formData.name}\n` +
      `*Mobile:* ${formData.mobile}\n` +
      `*Email:* ${formData.email || '-'}\n` +
      `*Location:* ${formData.location || '-'}\n` +
      `*System Size:* ${formData.systemSize || '-'}\n` +
      `*System Type:* ${formData.systemType || '-'}`;

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');

    setSubmitting(false);
  };

  // =========================================================
  // SAVINGS CALCULATOR
  // =========================================================

  const calculateSavings = () => {
    const bill = Number(calcData.billAmount);
    const systemSize = Number(calcData.systemSize);

    if (!bill || bill <= 0) {
      alert('Please enter your monthly electricity bill.');
      return;
    }

    if (!systemSize || systemSize <= 0) {
      alert('Please enter a valid solar system size.');
      return;
    }

    const monthlyGeneration =
      systemSize *
      AVG_UNITS_PER_KW_PER_DAY *
      30;

    const maximumSolarValue =
      monthlyGeneration *
      AVG_TARIFF_PER_UNIT;

    let systemFactor = 1;

    if (calcData.systemType === 'Hybrid') {
      systemFactor = 0.85;
    }

    if (calcData.systemType === 'Off Grid') {
      systemFactor = 0.70;
    }

    const monthlySavings = Math.min(
      bill,
      maximumSolarValue * systemFactor
    );

    const annualSavings = monthlySavings * 12;

    const lifetimeSavings = annualSavings * 25;

    setCalcResult({
      monthlyGeneration: Math.round(monthlyGeneration),
      monthlySavings: Math.round(monthlySavings),
      annualSavings: Math.round(annualSavings),
      lifetimeSavings: Math.round(lifetimeSavings),
    });
  };

  // =========================================================
  // LEAD FORM
  // =========================================================

  const handleLeadSubmit = async (e) => {
    e.preventDefault();

    if (!leadData.name || !leadData.mobile) {
      alert('Please enter your name and mobile number.');
      return;
    }

    setLeadSubmitting(true);

    const message =
      `Hello, I am interested in solar EMI options.\n\n` +
      `*Name:* ${leadData.name}\n` +
      `*Mobile:* ${leadData.mobile}\n\n` +
      `Please share available EMI and financing options.`;

    const whatsappUrl =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');

    setLeadSubmitting(false);
    setLeadSubmitted(true);

    setTimeout(() => {
      setShowLeadForm(false);
      setLeadSubmitted(false);
      setLeadData({
        name: '',
        mobile: '',
      });
    }, 2500);
  };

  // =========================================================
  // SERVICES
  // =========================================================

  const services = [
    {
      icon: '☀️',
      title: 'ROOFTOP SOLAR',
      text: 'Efficient on-grid, off-grid and hybrid rooftop solar systems for homes and buildings.',
    },
    {
      icon: '💧',
      title: 'SOLAR WATER PUMPS',
      text: 'Reliable solar-powered water pumping solutions for agriculture and irrigation.',
    },
    {
      icon: '💡',
      title: 'SOLAR STREET LIGHTS',
      text: 'Energy-efficient solar street lighting solutions for roads, campuses and outdoor spaces.',
    },
    {
      icon: '📹',
      title: 'SOLAR CAMERAS',
      text: 'Smart solar-powered security camera solutions for locations where wired power is difficult.',
    },
    {
      icon: '🏢',
      title: 'COMMERCIAL SOLAR',
      text: 'Reduce electricity expenses with customized solar solutions for commercial buildings.',
    },
    {
      icon: '🏭',
      title: 'INDUSTRIAL SOLAR',
      text: 'High-capacity solar systems designed for industries and large energy requirements.',
    },
  ];

  return (
    <div className="home-page">

      {/* =====================================================
          SEO
          ===================================================== */}

      <Helmet>
        <title>
          Revoltant Solar Solutions | Rooftop Solar, Solar Pumps & Solar Solutions
        </title>

        <meta
          name="description"
          content="Revoltant Solar Solutions provides rooftop solar, commercial solar, industrial solar, solar water pumps, solar street lights and solar camera solutions."
        />

        <meta
          name="keywords"
          content="solar solutions, rooftop solar, solar panels, solar pumps, solar water pumps, solar street lights, solar cameras, commercial solar, industrial solar, solar EMI, solar installation"
        />

        <meta
          name="robots"
          content="index, follow"
        />

        <link
          rel="canonical"
          href="https://www.revoltant.com/"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Revoltant Solar Solutions"
        />

        <meta
          property="og:description"
          content="Complete solar solutions for residential, commercial and industrial applications."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:image"
          content="/Home.png"
        />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Revoltant Solar Solutions"
        />

        <meta
          name="twitter:description"
          content="Complete solar solutions including rooftop solar, pumps, street lights and solar cameras."
        />
      </Helmet>

      {/* =====================================================
          BREADCRUMB
          ===================================================== */}

      <div className="breadcrumb-bar">
        <div className="container">
          <nav
            className="breadcrumb"
            aria-label="Breadcrumb"
          >
            <Link to="/">Home</Link>
            <span>›</span>
            <span>Solar Solutions</span>
          </nav>
        </div>
      </div>

      {/* =====================================================
          HERO
          ===================================================== */}

      <section
        className="hero"
        style={{
          backgroundImage: `url(${homeImage})`,
        }}
      >
        <div className="hero-overlay">

          <div className="container hero-container">

            {/* HERO CONTENT */}

            <div className="hero-text">

              <div className="hero-badge">
                <span>☀️</span>
                COMPLETE SOLAR SOLUTIONS
              </div>

              <h1>
                POWER YOUR FUTURE
                <br />
                WITH{' '}
                <span>SOLAR ENERGY</span>
              </h1>

              <p className="hero-main-text">
                Smart, reliable and sustainable solar solutions
                for homes, businesses, industries and agriculture.
              </p>

              <div className="hero-tags">
                <span>Residential</span>
                <span>Commercial</span>
                <span>Industrial</span>
                <span>Agriculture</span>
              </div>

              <div className="hero-buttons">

                <Link
                  to="/contact"
                  className="btn btn-primary"
                >
                  GET FREE QUOTE
                  <span>→</span>
                </Link>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  className="btn btn-whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>💬</span>
                  WHATSAPP US
                </a>

              </div>

              <div className="hero-trust">

                <div>
                  <strong>500+</strong>
                  <span>Projects</span>
                </div>

                <div>
                  <strong>1000+</strong>
                  <span>Customers</span>
                </div>

                <div>
                  <strong>10+ MW</strong>
                  <span>Installed</span>
                </div>

                <div>
                  <strong>25+</strong>
                  <span>Years Warranty</span>
                </div>

              </div>

            </div>

            {/* QUOTE FORM */}

            <div className="hero-form">

              <div className="quote-card">

                <div className="quote-card-header">
                  <span className="quote-icon">☀️</span>

                  <div>
                    <h2>Get Your Solar Quote</h2>
                    <p>Start your solar journey today</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>

                  <div className="form-row">

                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number *"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  <input
                    type="text"
                    name="location"
                    placeholder="Your Location"
                    value={formData.location}
                    onChange={handleChange}
                  />

                  <div className="form-row">

                    <select
                      name="systemSize"
                      value={formData.systemSize}
                      onChange={handleChange}
                    >
                      <option value="">
                        System Size
                      </option>
                      <option value="1kW">1 kW</option>
                      <option value="2kW">2 kW</option>
                      <option value="3kW">3 kW</option>
                      <option value="5kW">5 kW</option>
                      <option value="10kW">10 kW</option>
                      <option value="Above 10kW">
                        Above 10 kW
                      </option>
                    </select>

                    <select
                      name="systemType"
                      value={formData.systemType}
                      onChange={handleChange}
                    >
                      <option value="">
                        System Type
                      </option>
                      <option value="On Grid">
                        On Grid
                      </option>
                      <option value="Off Grid">
                        Off Grid
                      </option>
                      <option value="Hybrid">
                        Hybrid
                      </option>
                    </select>

                  </div>

                  <button
                    type="submit"
                    className="quote-submit"
                    disabled={submitting}
                  >
                    {submitting
                      ? 'SENDING...'
                      : 'GET MY QUOTE NOW →'}
                  </button>

                  <small className="form-note">
                    🔒 Your information is safe with us.
                  </small>

                </form>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          HIGHLIGHTS
          ===================================================== */}

      <section className="highlights">

        <div className="container highlights-grid">

          <div className="highlight-card">
            <div className="highlight-icon">⚡</div>
            <div>
              <strong>Reduce Electricity Bills</strong>
              <span>Generate your own clean energy</span>
            </div>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon">🌱</div>
            <div>
              <strong>Clean Energy</strong>
              <span>Build a greener tomorrow</span>
            </div>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon">🛠️</div>
            <div>
              <strong>Professional Installation</strong>
              <span>Quality installation & support</span>
            </div>
          </div>

          <div className="highlight-card">
            <div className="highlight-icon">🛡️</div>
            <div>
              <strong>Long-Term Protection</strong>
              <span>Reliable solar solutions</span>
            </div>
          </div>

        </div>

      </section>

      {/* =====================================================
          SERVICES
          ===================================================== */}

      <section className="services-section">

        <div className="container">

          <div className="section-heading">

            <span className="section-label">
              OUR SOLAR SERVICES
            </span>

            <h2>
              COMPLETE SOLAR
              <span> SOLUTIONS</span>
            </h2>

            <p>
              From rooftop solar systems to solar-powered
              pumps, lighting and security, we provide
              complete renewable energy solutions.
            </p>

          </div>

          <div className="services-grid">

            {services.map((service, index) => (
              <div
                className="service-card"
                key={index}
              >

                <div className="service-number">
                  0{index + 1}
                </div>

                <div className="service-icon">
                  {service.icon}
                </div>

                <h3>{service.title}</h3>

                <p>{service.text}</p>

                <Link
                  to="/contact"
                  className="service-link"
                >
                  Know More →
                </Link>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          EMI SECTION
          ===================================================== */}

      <section className="emi-section">

        <div className="container">

          <div className="emi-box">

            <div className="emi-content">

              <span className="section-label light">
                EASY FINANCING
              </span>

              <h2>
                SOLAR EMI
                <span> OPTIONS AVAILABLE</span>
              </h2>

              <p>
                Make your solar investment easier with
                available EMI and financing options.
                Our team can help you understand the
                available financing facilities for your
                solar project.
              </p>

              <div className="emi-features">

                <div>
                  <span>✓</span>
                  Flexible financing options
                </div>

                <div>
                  <span>✓</span>
                  Easy monthly payment options
                </div>

                <div>
                  <span>✓</span>
                  Assistance with financing process
                </div>

                <div>
                  <span>✓</span>
                  Suitable for eligible solar projects
                </div>

              </div>

              <button
                className="emi-button"
                onClick={() => setShowLeadForm(true)}
              >
                CHECK EMI AVAILABILITY →
              </button>

            </div>

            <div className="emi-visual">

              <div className="emi-circle">
                <span>₹</span>
              </div>

              <strong>
                MAKE SOLAR
                <br />
                MORE AFFORDABLE
              </strong>

              <small>
                Ask our team about available
                EMI / financing options.
              </small>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          SAVINGS CALCULATOR
          ===================================================== */}

      <section className="calculator-section">

        <div className="container">

          <div className="calculator-wrapper">

            <div className="section-heading">

              <span className="section-label">
                SOLAR SAVINGS
              </span>

              <h2>
                SOLAR SAVINGS
                <span> CALCULATOR</span>
              </h2>

              <p>
                Get an estimated idea of how much you
                could save by switching to solar energy.
              </p>

            </div>

            <div className="calculator-box">

              <div className="calculator-inputs">

                <div className="calc-group">

                  <label htmlFor="calcBillAmount">
                    Monthly Electricity Bill
                  </label>

                  <div className="input-with-icon">
                    <span>₹</span>

                    <input
                      id="calcBillAmount"
                      name="billAmount"
                      type="number"
                      min="0"
                      placeholder="5000"
                      value={calcData.billAmount}
                      onChange={handleCalcChange}
                    />
                  </div>

                </div>

                <div className="calc-group">

                  <label htmlFor="calcSystemSize">
                    Solar System Size
                  </label>

                  <div className="input-with-icon">

                    <input
                      id="calcSystemSize"
                      name="systemSize"
                      type="number"
                      min="0.1"
                      step="0.1"
                      placeholder="3"
                      value={calcData.systemSize}
                      onChange={handleCalcChange}
                    />

                    <span>kW</span>

                  </div>

                </div>

                <div className="calc-group">

                  <label htmlFor="calcSystemType">
                    System Type
                  </label>

                  <select
                    id="calcSystemType"
                    name="systemType"
                    value={calcData.systemType}
                    onChange={handleCalcChange}
                  >
                    <option value="On Grid">
                      On Grid
                    </option>

                    <option value="Off Grid">
                      Off Grid
                    </option>

                    <option value="Hybrid">
                      Hybrid
                    </option>
                  </select>

                </div>

              </div>

              {calcResult && (
                <div className="calc-result">

                  <div className="result-main">

                    <span>
                      ESTIMATED ANNUAL SAVINGS
                    </span>

                    <strong>
                      ₹{' '}
                      {calcResult.annualSavings.toLocaleString(
                        'en-IN'
                      )}
                    </strong>

                    <small>
                      per year
                    </small>

                  </div>

                  <div className="result-details">

                    <div>
                      <span>Monthly Savings</span>
                      <strong>
                        ₹{' '}
                        {calcResult.monthlySavings.toLocaleString(
                          'en-IN'
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>Generation</span>
                      <strong>
                        {calcResult.monthlyGeneration.toLocaleString(
                          'en-IN'
                        )}{' '}
                        units/month
                      </strong>
                    </div>

                    <div>
                      <span>25-Year Estimate</span>
                      <strong>
                        ₹{' '}
                        {calcResult.lifetimeSavings.toLocaleString(
                          'en-IN'
                        )}
                      </strong>
                    </div>

                  </div>

                </div>
              )}

              <button
                type="button"
                className="calculate-button"
                onClick={calculateSavings}
              >
                CALCULATE MY SAVINGS →
              </button>

              <p className="calculator-note">
                *This is an estimated calculation based on
                average solar generation and assumed tariff.
                Actual savings may vary depending on location,
                tariff, system performance and usage.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          WHY CHOOSE US
          ===================================================== */}

      <section className="why-section">

        <div className="container why-grid">

          <div className="why-content">

            <span className="section-label">
              WHY REVOLTANT
            </span>

            <h2>
              POWERING A
              <span> BRIGHTER FUTURE</span>
            </h2>

            <p>
              We provide dependable solar solutions designed
              to help customers reduce energy costs while
              moving towards cleaner and more sustainable
              energy.
            </p>

            <div className="why-list">

              <div>
                <span>✓</span>
                Quality solar products
              </div>

              <div>
                <span>✓</span>
                Professional installation
              </div>

              <div>
                <span>✓</span>
                Customized system design
              </div>

              <div>
                <span>✓</span>
                Customer-focused support
              </div>

              <div>
                <span>✓</span>
                Residential, commercial & industrial solutions
              </div>

            </div>

            <Link
              to="/about"
              className="dark-button"
            >
              ABOUT REVOLTANT →
            </Link>

          </div>

          <div className="why-stats">

            <div className="big-stat">
              <strong>500+</strong>
              <span>Solar Projects</span>
            </div>

            <div className="big-stat">
              <strong>1000+</strong>
              <span>Happy Customers</span>
            </div>

            <div className="big-stat">
              <strong>10+ MW</strong>
              <span>Solar Capacity</span>
            </div>

            <div className="big-stat">
              <strong>25+</strong>
              <span>Years of Protection</span>
            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
          ===================================================== */}

      <section className="final-cta">

        <div className="container final-cta-content">

          <div>

            <span>
              READY TO SWITCH TO SOLAR?
            </span>

            <h2>
              LET'S BUILD YOUR
              <strong> SOLAR FUTURE.</strong>
            </h2>

            <p>
              Talk to our team today and find the right
              solar solution for your home or business.
            </p>

          </div>

          <div className="final-buttons">

            <Link
              to="/contact"
              className="btn btn-primary large"
            >
              GET FREE QUOTE →
            </Link>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              className="btn btn-whatsapp large"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 CHAT ON WHATSAPP
            </a>

          </div>

        </div>

      </section>

      {/* =====================================================
          EMI POPUP
          ===================================================== */}

      {showLeadForm && (

        <div
          className="modal-overlay"
          onClick={() => setShowLeadForm(false)}
        >

          <div
            className="emi-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={() => setShowLeadForm(false)}
              aria-label="Close"
            >
              ×
            </button>

            {!leadSubmitted ? (

              <>
                <div className="modal-icon">
                  ₹
                </div>

                <h2>
                  Check EMI Availability
                </h2>

                <p>
                  Enter your details and our team will
                  contact you with available EMI and
                  financing options.
                </p>

                <form onSubmit={handleLeadSubmit}>

                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={leadData.name}
                    onChange={handleLeadChange}
                    required
                  />

                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Mobile Number"
                    value={leadData.mobile}
                    onChange={handleLeadChange}
                    required
                  />

                  <button
                    type="submit"
                    className="quote-submit"
                    disabled={leadSubmitting}
                  >
                    {leadSubmitting
                      ? 'PROCESSING...'
                      : 'CHECK EMI OPTIONS →'}
                  </button>

                </form>
              </>

            ) : (

              <div className="success-message">

                <div className="success-icon">
                  ✓
                </div>

                <h2>
                  Thank You!
                </h2>

                <p>
                  WhatsApp has been opened. Our team
                  can help you with available EMI options.
                </p>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
};

export default Home;