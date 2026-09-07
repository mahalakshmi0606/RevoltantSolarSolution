// pages/Contact.jsx
import React, { useState } from 'react';
import ContactUsImage from './asset/ContactUs.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (submitStatus.error || submitStatus.success) {
      setSubmitStatus({
        success: false,
        error: false,
        message: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setSubmitStatus({
      success: false,
      error: false,
      message: ''
    });

    try {
      const API_URL =
        'https://script.google.com/macros/s/AKfycby56-5USlwLx31X79hqSZmxOSHpFwCDVwpeZb_VOj0n1VsZdngsUg72Iv8VxmlTpNealA/exec';

      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      setSubmitStatus({
        success: true,
        error: false,
        message:
          'Thank you for contacting us! We will get back to you soon.'
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);

      setSubmitStatus({
        success: false,
        error: true,
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">

      {/* =====================================================
          INLINE CSS
      ===================================================== */}

      <style>{`

        /* ================= GLOBAL ================= */

        .contact-page {
          width: 100%;
          min-height: 100vh;
          background: #f7f9fc;
          color: #1f2937;
          font-family: Arial, Helvetica, sans-serif;
        }

        .contact-page *,
        .contact-page *::before,
        .contact-page *::after {
          box-sizing: border-box;
        }

        .contact-page .container {
          width: 90%;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* =====================================================
           CONTACT US BANNER
        ===================================================== */

        .contact-page .page-hero {
          width: 100%;
          min-height: 320px;

          display: flex;
          align-items: center;
          justify-content: center;

          position: relative;
          overflow: hidden;

          background-image:
            linear-gradient(
              90deg,
              rgba(0, 39, 90, 0.68),
              rgba(0, 39, 90, 0.25)
            ),
            url(${ContactUsImage});

          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;

          color: #ffffff;
        }

        /*
          Extra overlay for better text visibility
        */

        .contact-page .page-hero::after {
          content: "";
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.05),
              rgba(0, 0, 0, 0.18)
            );

          pointer-events: none;
        }

        .contact-page .page-hero .container {
          position: relative;
          z-index: 2;

          text-align: center;
        }

        .contact-page .page-hero h1 {
          margin: 0 0 14px;

          font-size: 52px;
          font-weight: 700;
          letter-spacing: 0.5px;

          color: #ffffff;

          text-shadow:
            0 3px 10px rgba(0, 0, 0, 0.4);
        }

        .contact-page .page-hero p {
          margin: 0;

          font-size: 19px;
          line-height: 1.6;

          color: #ffffff;

          text-shadow:
            0 2px 7px rgba(0, 0, 0, 0.4);
        }

        /* =====================================================
           CONTACT CONTENT
        ===================================================== */

        .contact-page .contact-content {
          padding: 70px 0;
          background: #f7f9fc;
        }

        .contact-page .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: start;
        }

        /* =====================================================
           CONTACT INFORMATION
        ===================================================== */

        .contact-page .contact-info-section {
          padding: 20px 10px;
        }

        .contact-page .contact-info-section h2 {
          margin: 0 0 15px;

          font-size: 34px;
          font-weight: 700;

          color: #0b3d91;
        }

        .contact-page .contact-info-section > p {
          margin: 0 0 35px;

          max-width: 520px;

          font-size: 16px;
          line-height: 1.7;

          color: #5f6b7a;
        }

        /* =====================================================
           CONTACT DETAILS
        ===================================================== */

        .contact-page .contact-details {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .contact-page .contact-detail {
          display: flex;
          align-items: flex-start;

          gap: 18px;
          padding: 18px;

          background: #ffffff;

          border-radius: 12px;
          border: 1px solid #e5eaf0;

          box-shadow:
            0 5px 20px rgba(0, 0, 0, 0.05);

          transition: all 0.3s ease;
        }

        .contact-page .contact-detail:hover {
          transform: translateY(-3px);

          box-shadow:
            0 10px 25px rgba(0, 0, 0, 0.08);
        }

        .contact-page .contact-detail > span {
          width: 48px;
          height: 48px;
          min-width: 48px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #eaf4ff;

          border-radius: 50%;

          font-size: 22px;
        }

        .contact-page .contact-detail h4 {
          margin: 0 0 7px;

          font-size: 17px;
          font-weight: 700;

          color: #0b3d91;
        }

        .contact-page .contact-detail p {
          margin: 3px 0;

          font-size: 14px;
          line-height: 1.6;

          color: #667085;

          word-break: break-word;
        }

        /* =====================================================
           CONTACT FORM
        ===================================================== */

        .contact-page .contact-form-section {
          width: 100%;
        }

        .contact-page .contact-form-card {
          width: 100%;

          padding: 40px;

          background: #ffffff;

          border-radius: 18px;
          border: 1px solid #e5eaf0;

          box-shadow:
            0 10px 35px rgba(0, 0, 0, 0.08);
        }

        .contact-page .contact-form-card h3 {
          margin: 0 0 25px;

          font-size: 27px;
          font-weight: 700;

          color: #0b3d91;
        }

        /* =====================================================
           STATUS MESSAGES
        ===================================================== */

        .contact-page .success-message {
          margin-bottom: 20px;
          padding: 14px 16px;

          border-radius: 8px;

          background: #e9f9ef;

          color: #187a3d;

          border: 1px solid #b8ebc9;

          font-size: 14px;
          line-height: 1.5;
        }

        .contact-page .error-message {
          margin-bottom: 20px;
          padding: 14px 16px;

          border-radius: 8px;

          background: #fff0f0;

          color: #c62828;

          border: 1px solid #f2b8b8;

          font-size: 14px;
          line-height: 1.5;
        }

        /* =====================================================
           FORM ROW
        ===================================================== */

        .contact-page .form-row {
          display: grid;

          grid-template-columns: 1fr 1fr;

          gap: 15px;
        }

        /* =====================================================
           INPUTS
        ===================================================== */

        .contact-page form input,
        .contact-page form textarea {
          width: 100%;

          border: 1px solid #d9e0e8;

          background: #f9fafb;

          color: #1f2937;

          border-radius: 8px;

          padding: 14px 15px;

          margin-bottom: 15px;

          font-size: 15px;

          font-family: inherit;

          outline: none;

          transition: all 0.25s ease;
        }

        .contact-page form input {
          height: 50px;
        }

        .contact-page form textarea {
          min-height: 130px;

          resize: vertical;
        }

        .contact-page form input::placeholder,
        .contact-page form textarea::placeholder {
          color: #9aa4b2;
        }

        .contact-page form input:focus,
        .contact-page form textarea:focus {
          border-color: #0b3d91;

          background: #ffffff;

          box-shadow:
            0 0 0 3px rgba(11, 61, 145, 0.1);
        }

        /* =====================================================
           BUTTON
        ===================================================== */

        .contact-page .btn-primary {
          width: 100%;

          border: none;

          border-radius: 8px;

          padding: 15px 20px;

          background:
            linear-gradient(
              135deg,
              #ff8a00,
              #ff6a00
            );

          color: #ffffff;

          font-size: 15px;
          font-weight: 700;

          letter-spacing: 0.5px;

          cursor: pointer;

          transition: all 0.3s ease;
        }

        .contact-page .btn-primary:hover {
          transform: translateY(-2px);

          box-shadow:
            0 8px 20px rgba(255, 106, 0, 0.25);
        }

        .contact-page .btn-primary:disabled {
          cursor: not-allowed;

          opacity: 0.65;

          transform: none;

          box-shadow: none;
        }

        /* =====================================================
           TABLET
        ===================================================== */

        @media (max-width: 900px) {

          .contact-page .contact-grid {
            grid-template-columns: 1fr;

            gap: 35px;
          }

          .contact-page .contact-info-section {
            padding: 0;
          }

          .contact-page .contact-info-section h2 {
            font-size: 30px;
          }

          .contact-page .contact-form-card {
            padding: 30px;
          }

          .contact-page .page-hero {
            min-height: 300px;

            background-position: center center;
          }

        }

        /* =====================================================
           MOBILE
        ===================================================== */

        @media (max-width: 600px) {

          .contact-page .container {
            width: 92%;
          }

          /* Banner */

          .contact-page .page-hero {
            min-height: 240px;

            padding: 40px 15px;

            background-position: center center;
          }

          .contact-page .page-hero h1 {
            font-size: 36px;

            margin-bottom: 10px;
          }

          .contact-page .page-hero p {
            font-size: 15px;

            line-height: 1.5;
          }

          /* Content */

          .contact-page .contact-content {
            padding: 45px 0;
          }

          .contact-page .contact-grid {
            gap: 30px;
          }

          /* Contact information */

          .contact-page .contact-info-section h2 {
            font-size: 27px;
          }

          .contact-page .contact-info-section > p {
            font-size: 15px;
          }

          .contact-page .contact-details {
            gap: 18px;
          }

          .contact-page .contact-detail {
            padding: 15px;

            gap: 13px;
          }

          .contact-page .contact-detail > span {
            width: 42px;
            height: 42px;
            min-width: 42px;

            font-size: 19px;
          }

          .contact-page .contact-detail h4 {
            font-size: 16px;
          }

          .contact-page .contact-detail p {
            font-size: 13px;
          }

          /* Form */

          .contact-page .contact-form-card {
            padding: 22px 17px;

            border-radius: 14px;
          }

          .contact-page .contact-form-card h3 {
            font-size: 23px;

            margin-bottom: 20px;
          }

          .contact-page .form-row {
            grid-template-columns: 1fr;

            gap: 0;
          }

          .contact-page form input,
          .contact-page form textarea {
            font-size: 14px;
          }

          .contact-page .btn-primary {
            padding: 14px;

            font-size: 14px;
          }
        }

        /* =====================================================
           SMALL MOBILE
        ===================================================== */

        @media (max-width: 400px) {

          .contact-page .page-hero {
            min-height: 220px;

            background-position: center;
          }

          .contact-page .page-hero h1 {
            font-size: 30px;
          }

          .contact-page .page-hero p {
            font-size: 14px;
          }

          .contact-page .contact-form-card {
            padding: 18px 14px;
          }

          .contact-page .contact-detail {
            flex-direction: row;

            align-items: flex-start;
          }
        }

      `}</style>

      {/* =====================================================
          CONTACT US BANNER
      ===================================================== */}

      <section className="page-hero">
        <div className="container">

          <h1>Contact Us</h1>

          <p>
            We're here to help. Reach out to us today.
          </p>

        </div>
      </section>

      {/* =====================================================
          CONTACT CONTENT
      ===================================================== */}

      <section className="contact-content">

        <div className="container">

          <div className="contact-grid">

            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}

            <div className="contact-info-section">

              <h2>Get In Touch</h2>

              <p>
                Have questions about solar solutions? We're here
                to help. Reach out to us for a free consultation.
              </p>

              <div className="contact-details">

                {/* ADDRESS */}

                <div className="contact-detail">

                  <span>📍</span>

                  <div>

                    <h4>Address</h4>

                    <p>
                      9/67 Padaisalai Salai Street, Aminjikarai,
                      Veerapuram Post, Thirukkazhukunram Taluck,
                      Chengalpattu District - 603109
                    </p>

                  </div>

                </div>

                {/* PHONE */}

                <div className="contact-detail">

                  <span>📞</span>

                  <div>

                    <h4>Phone</h4>

                    <p>+91 76395 30291</p>

                    <p>+91 93841 67482</p>

                  </div>

                </div>

                {/* EMAIL */}

                <div className="contact-detail">

                  <span>✉️</span>

                  <div>

                    <h4>Email</h4>

                    <p>
                      revoltantsolarsolution@gmail.com
                    </p>

                  </div>

                </div>

                {/* WORKING HOURS */}

                <div className="contact-detail">

                  <span>🕐</span>

                  <div>

                    <h4>Working Hours</h4>

                    <p>
                      Mon - Sat: 9:00 AM - 6:00 PM
                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                CONTACT FORM
            ================================================= */}

            <div className="contact-form-section">

              <div className="contact-form-card">

                <h3>
                  Send Us a Message
                </h3>

                {/* SUCCESS */}

                {submitStatus.success && (
                  <div className="success-message">
                    {submitStatus.message}
                  </div>
                )}

                {/* ERROR */}

                {submitStatus.error && (
                  <div className="error-message">
                    {submitStatus.message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  {/* NAME + EMAIL */}

                  <div className="form-row">

                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  {/* PHONE */}

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  {/* SUBJECT */}

                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />

                  {/* MESSAGE */}

                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading
                      ? 'SENDING...'
                      : 'SEND MESSAGE'}
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Contact;