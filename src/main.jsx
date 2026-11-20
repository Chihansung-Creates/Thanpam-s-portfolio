import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const artworks = [
  {
    title: "A quieter blue",
    year: "2025",
    medium: "Oil and cold wax on linen",
    description: "A study in stillness, layered pigment, and the space between things.",
    image: "photo-1541961017774-22349e4a1262",
    alt: "Abstract painting in a gallery",
    shape: "portrait",
  },
  {
    title: "Where we begin",
    year: "2025",
    medium: "Acrylic and graphite on canvas",
    description: "Fragments of a remembered landscape, held together by color.",
    image: "photo-1577083552431-6e5fd01aa342",
    alt: "Colorful abstract work on canvas",
    shape: "landscape",
  },
  {
    title: "Soft ground",
    year: "2024",
    medium: "Clay, ash glaze",
    description: "A small vessel shaped by hand, fire, and the marks of its making.",
    image: "photo-1578749556568-bc2c40e68b61",
    alt: "Handmade ceramic vessel",
    shape: "square",
  },
  {
    title: "The long way home",
    year: "2024",
    medium: "Oil on canvas",
    description: "An open-ended journey through color, distance, and familiar forms.",
    image: "photo-1549490349-8643362247b5",
    alt: "Expressive contemporary painting",
    shape: "portrait",
  },
  {
    title: "Held in the light",
    year: "2023",
    medium: "Mixed media on paper",
    description: "Found textures and translucent marks gather into a new memory.",
    image: "photo-1579783902614-a3fb3927b6a5",
    alt: "Textural artwork with layered colors",
    shape: "square",
  },
  {
    title: "Almost still",
    year: "2023",
    medium: "Oil and cold wax on linen",
    description: "An abstract study of quiet movement and restrained color.",
    image: "photo-1536924940846-227afb31e2a5",
    alt: "Abstract contemporary painting in a gallery",
    shape: "landscape",
  },
  {
    title: "Notes from the garden",
    year: "2022",
    medium: "Watercolor and pencil",
    description: "An intimate collection of shapes gathered from a changing garden.",
    image: "photo-1577083288073-40892c0860a4",
    alt: "Colorful abstract work on paper",
    shape: "portrait",
  },
  {
    title: "A place to return",
    year: "2022",
    medium: "Oil and cold wax on panel",
    description: "A soft-edged horizon built from layers of earth and blue.",
    image: "photo-1561214115-f2f134cc4912",
    alt: "Landscape-inspired abstract artwork",
    shape: "square",
  },
];

const imageUrl = (id, width = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const navItems = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Gallery", "#gallery"],
  ["Process", "#process"],
  ["Contact", "#contact"],
];

function ThemeIcon({ dark }) {
  return dark ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.2 15.1A8.3 8.3 0 0 1 8.9 3.8 8.5 8.5 0 1 0 20.2 15.1Z" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.7" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
    </svg>
  );
}

function Navigation({ dark, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navItems
      .map(([, href]) => document.querySelector(href))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.querySelectorAll(".nav-links a").forEach((link) => {
              if (link.getAttribute("href") === `#${entry.target.id}`) {
                link.setAttribute("aria-current", "location");
              } else {
                link.removeAttribute("aria-current");
              }
            });
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="wordmark" href="#home" onClick={closeMenu}>
          Thanpam Kaping<span className="wordmark-dot">.</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="primary-links"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <div className={`nav-links${menuOpen ? " is-open" : ""}`} id="primary-links">
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
            onClick={onThemeToggle}
          >
            <ThemeIcon dark={dark} />
          </button>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-copy reveal">
        <p className="eyebrow"><span className="eyebrow-line" />Independent visual artist</p>
        <h1>Thanpam Kaping <span>— Visual Artist</span></h1>
        <p className="hero-intro">
          Exploring form, memory, and color through contemporary visual stories.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#gallery">
            Explore gallery <span aria-hidden="true">↗</span>
          </a>
          <a className="text-link" href="#about">
            About the artist <span aria-hidden="true">↓</span>
          </a>
        </div>
        <p className="hero-note">A practice in noticing what stays with us.</p>
      </div>
      <div className="hero-visual reveal">
        <div className="hero-image-wrap">
          <img
            className="hero-image"
            src={imageUrl("photo-1506794778202-cad84cf45f1d", 1200)}
            alt="Portrait of contemporary artist Alex Morgan"
            loading="eager"
          />
          <div className="image-index"><span>01</span> / 05</div>
        </div>
        <div className="hero-caption">
          <span>Between observation & imagination</span>
          <span>Brooklyn, NY · 2026</span>
        </div>
        <span className="hero-orbit" aria-hidden="true" />
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to about section">
        <span>Scroll to discover</span><i aria-hidden="true" />
      </a>
    </section>
  );
}

function About() {
  return (
    <section className="about section-wrap section-pad" id="about">
      <div className="about-image reveal">
        <img
          src={imageUrl("photo-1455390582262-044cdead277a", 1000)}
          alt="A sunlit artist's studio with a desk and creative materials"
          loading="lazy"
        />
        <span className="image-note">The studio, late afternoon</span>
      </div>
      <div className="about-copy reveal">
        <p className="eyebrow"><span className="eyebrow-line" />A little about me</p>
        <h2>Making room for <em>the unexpected.</em></h2>
        <p>
          I’m Thanpam, a visual artist drawn to the stories held in color, texture,
          and everyday forms. My work begins with looking closely: at a place,
          a passing feeling, or something almost forgotten.
        </p>
        <p>
          Working between painting and mixed media, I build layered compositions
          that invite a slower kind of attention. Each piece is an open
          conversation between what I find and what I make.
        </p>
        <div className="artist-details">
          <div><span>Based in</span><strong>Brooklyn, New York</strong></div>
          <div><span>Working with</span><strong>Painting · Mixed media</strong></div>
          <div><span>Availability</span><strong><i className="availability-dot" />Open for select projects</strong></div>
        </div>
        <a className="text-link" href="#contact">Start a conversation <span aria-hidden="true">↗</span></a>
      </div>
      <span className="section-number" aria-hidden="true">01</span>
    </section>
  );
}

function Gallery({ onSelect }) {
  return (
    <section className="gallery section-wrap section-pad" id="gallery">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" />A selection, 2022—25</p>
          <h2>Collected <em>moments.</em></h2>
        </div>
        <p className="section-intro">
          Small observations, shifting into something new. A few works from the studio.
        </p>
      </div>
      <div className="artwork-grid">
        {artworks.map((artwork, index) => (
          <button
            className={`artwork-card artwork-${artwork.shape} reveal`}
            type="button"
            key={artwork.title}
            onClick={() => onSelect(artwork)}
            aria-label={`View ${artwork.title}, ${artwork.year}`}
            style={{ "--reveal-delay": `${(index % 4) * 70}ms` }}
          >
            <span className="artwork-image">
              <img src={imageUrl(artwork.image, 900)} alt={artwork.alt} loading="lazy" />
              <span className="artwork-open" aria-hidden="true">View work <span>↗</span></span>
            </span>
            <span className="artwork-info">
              <span className="artwork-title">{artwork.title}</span>
              <span className="artwork-year">{artwork.year}</span>
              <span className="artwork-medium">{artwork.medium}</span>
            </span>
          </button>
        ))}
      </div>
      <span className="section-number" aria-hidden="true">02</span>
    </section>
  );
}

const processSteps = [
  ["01", "Inspiration", "Collecting fragments: a color, a conversation, a place I pass each day."],
  ["02", "Sketching", "Making quick notes and loose studies, leaving room for things to shift."],
  ["03", "Creation", "Building the work slowly, following the material as much as the idea."],
  ["04", "Final work", "Knowing when to stop, and letting the piece find its own quiet."],
];

function Process() {
  return (
    <section className="process section-wrap section-pad" id="process">
      <div className="section-heading reveal">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" />Inside the studio</p>
          <h2>From first thought <em>to feeling.</em></h2>
        </div>
        <p className="section-intro">
          Every piece takes its own path. This is the rhythm I return to.
        </p>
      </div>
      <div className="process-flow">
        {processSteps.map(([number, title, description], index) => (
          <article className="process-step reveal" key={number} style={{ "--reveal-delay": `${index * 100}ms` }}>
            <div className="process-mark" aria-hidden="true">
              {index === 0 && <svg viewBox="0 0 40 40"><path d="M20 5v30M5 20h30M9.4 9.4l21.2 21.2m0-21.2L9.4 30.6" /><circle cx="20" cy="20" r="8" /></svg>}
              {index === 1 && <svg viewBox="0 0 40 40"><path d="m9 30 3-9L28 5l7 7-14 16-9 2Zm3-9 7 7m3-19 7 7" /></svg>}
              {index === 2 && <svg viewBox="0 0 40 40"><path d="M8 31c7-3 1-13 9-17 8-4 9 10 16 6M8 10h.1M31 31h.1" /><circle cx="20" cy="20" r="15" /></svg>}
              {index === 3 && <svg viewBox="0 0 40 40"><rect x="7" y="7" width="26" height="26" rx="13" /><path d="m14 20 4 4 8-9" /></svg>}
            </div>
            <span className="step-number">{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <span className="section-number" aria-hidden="true">03</span>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <section className="contact section-wrap section-pad" id="contact">
      <div className="contact-copy reveal">
        <p className="eyebrow"><span className="eyebrow-line" />A note is always welcome</p>
        <h2>Let’s make<br /><em>something matter.</em></h2>
        <p>
          Have a commission in mind, an exhibition idea, or simply want to say
          hello? I’d love to hear what you’re thinking.
        </p>
        <a className="contact-email" href="mailto:hello@example.com">hello@example.com <span aria-hidden="true">↗</span></a>
        <div className="social-links">
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a>
          <a href="https://www.behance.net/" target="_blank" rel="noreferrer">Behance <span aria-hidden="true">↗</span></a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <form className="contact-form reveal" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="How should I address you?" required />
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">Email address</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        </div>
        <div className="form-field">
          <label htmlFor="contact-message">A little about your idea</label>
          <textarea id="contact-message" name="message" rows="4" placeholder="Tell me what’s on your mind..." required />
        </div>
        <button className="button button-primary" type="submit">
          Send a note <span aria-hidden="true">↗</span>
        </button>
        <p className={`form-status${submitted ? " is-visible" : ""}`} role="status" aria-live="polite">
          {submitted ? "Thank you for your note. This demo form doesn't send or store messages, but your details were validated locally." : ""}
        </p>
      </form>
      <span className="section-number" aria-hidden="true">04</span>
    </section>
  );
}

function ArtworkDialog({ artwork, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (artwork && !dialogRef.current.open) dialogRef.current.showModal();
  }, [artwork]);

  return (
    <dialog
      className="artwork-dialog"
      ref={dialogRef}
      aria-labelledby="dialog-title"
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key === "Escape") dialogRef.current.close();
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
    >
      {artwork && (
        <div className="dialog-layout">
          <button className="dialog-close" type="button" onClick={() => dialogRef.current.close()} aria-label="Close artwork details">×</button>
          <img className="dialog-image" src={imageUrl(artwork.image, 1400)} alt={artwork.alt} />
          <div className="dialog-content">
            <p className="eyebrow"><span className="eyebrow-line" />{artwork.medium} · {artwork.year}</p>
            <h2 id="dialog-title">{artwork.title}</h2>
            <p>{artwork.description}</p>
            <span className="dialog-note">Selected work · Alex Morgan studio</span>
          </div>
        </div>
      )}
    </dialog>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <a className="footer-wordmark" href="#home">Alex Morgan<span>.</span></a>
      <p>Art made with attention.</p>
      <div className="footer-socials" aria-label="Social links">
        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">ig</a>
        <a href="https://www.behance.net/" target="_blank" rel="noreferrer" aria-label="Behance">Be</a>
        <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
      </div>
      <span className="copyright">© 2026 Alex Morgan. All rights reserved.</span>
      <a className="back-to-top" href="#home" aria-label="Back to top">↑</a>
    </footer>
  );
}

function App() {
  const [dark, setDark] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`site${dark ? " theme-dark" : ""}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navigation dark={dark} onThemeToggle={() => setDark((value) => !value)} />
      <main id="main-content">
        <Hero />
        <About />
        <Gallery onSelect={setSelectedArtwork} />
        <Process />
        <Contact />
      </main>
      <Footer />
      <ArtworkDialog artwork={selectedArtwork} onClose={() => setSelectedArtwork(null)} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>,
);
