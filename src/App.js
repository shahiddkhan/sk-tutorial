import { useState, useEffect, useRef } from "react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  navy: "#0A1628",
  navyMid: "#162544",
  navyLight: "#1E3A6E",
  teal: "#0EA5C9",
  tealBright: "#38BDF8",
  tealDark: "#0284A8",
  gold: "#F59E0B",
  goldBright: "#FCD34D",
  white: "#FFFFFF",
  lightBg: "#F0F6FF",
  muted: "#64748B",
  text: "#0F172A",
  surface: "#FAFCFF",
  border: "rgba(14,165,201,0.15)",
};

// ─── GLOBAL STYLES ─────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { overflow-x: hidden; }

  .nav-link {
    cursor: pointer; padding: 8px 14px; border-radius: 6px;
    font-weight: 500; font-size: 0.88rem; transition: all 0.2s;
    color: rgba(255,255,255,0.82); white-space: nowrap; font-family: 'Outfit', sans-serif;
  }
  .nav-link:hover { color: #38BDF8 !important; opacity: 1 !important; }
  .nav-scrolled { color: #0F172A !important; }
  .nav-scrolled:hover { color: #0EA5C9 !important; }

  .btn-primary {
    background: linear-gradient(135deg, #0EA5C9, #38BDF8);
    color: #fff; border: none; padding: 13px 28px; border-radius: 10px;
    font-weight: 700; font-size: 0.93rem; cursor: pointer;
    font-family: 'Outfit', sans-serif; letter-spacing: 0.3px;
    box-shadow: 0 4px 20px rgba(14,165,201,0.4);
    transition: all 0.3s; display: inline-flex; align-items: center; gap: 6px;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(14,165,201,0.55); background: linear-gradient(135deg, #0284A8, #0EA5C9); }

  .btn-gold {
    background: linear-gradient(135deg, #F59E0B, #FCD34D);
    color: #0A1628; border: none; padding: 13px 28px; border-radius: 10px;
    font-weight: 700; font-size: 0.93rem; cursor: pointer;
    font-family: 'Outfit', sans-serif; letter-spacing: 0.3px;
    box-shadow: 0 4px 20px rgba(245,158,11,0.35);
    transition: all 0.3s; display: inline-flex; align-items: center; gap: 6px;
  }
  .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(245,158,11,0.5); }

  .btn-outline {
    background: transparent; color: #fff;
    border: 2px solid rgba(255,255,255,0.4); padding: 12px 28px;
    border-radius: 10px; font-weight: 600; font-size: 0.93rem;
    cursor: pointer; font-family: 'Outfit', sans-serif; transition: all 0.3s;
  }
  .btn-outline:hover { background: rgba(255,255,255,0.1); border-color: #38BDF8; color: #38BDF8; }

  .course-card {
    background: white; border-radius: 20px; padding: 32px 28px;
    box-shadow: 0 2px 20px rgba(10,22,40,0.06);
    border: 1px solid rgba(14,165,201,0.1); transition: all 0.35s;
    position: relative; overflow: hidden; height: 100%;
  }
  .course-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #0EA5C9, #38BDF8, #FCD34D);
  }
  .course-card:hover { transform: translateY(-8px); box-shadow: 0 20px 56px rgba(14,165,201,0.15); border-color: rgba(14,165,201,0.25); }

  .faculty-card {
    background: white; border-radius: 20px; padding: 36px 24px;
    text-align: center; box-shadow: 0 2px 20px rgba(10,22,40,0.06);
    border: 1px solid rgba(14,165,201,0.08); transition: all 0.35s;
  }
  .faculty-card:hover { transform: translateY(-8px); box-shadow: 0 20px 56px rgba(14,165,201,0.15); border-color: rgba(14,165,201,0.2); }

  .testi-card {
    background: white; border-radius: 20px; padding: 36px 32px;
    box-shadow: 0 2px 20px rgba(10,22,40,0.06);
    border: 1px solid rgba(14,165,201,0.08); transition: all 0.35s; position: relative;
  }
  .testi-card::before {
    content: '"'; position: absolute; top: 12px; left: 24px;
    font-size: 6rem; color: #0EA5C9; opacity: 0.12;
    font-family: 'Playfair Display', serif; line-height: 1;
  }
  .testi-card:hover { transform: translateY(-5px); box-shadow: 0 20px 56px rgba(14,165,201,0.12); border-color: rgba(14,165,201,0.2); }

  .form-ctrl {
    width: 100%; padding: 13px 16px;
    border: 2px solid #E2EDF8; border-radius: 10px;
    font-size: 0.93rem; font-family: 'Outfit', sans-serif;
    color: #0F172A; background: white; transition: border-color 0.2s; outline: none;
  }
  .form-ctrl:focus { border-color: #0EA5C9; box-shadow: 0 0 0 3px rgba(14,165,201,0.1); }

  .whatsapp-fab {
    position: fixed; bottom: 28px; right: 28px;
    width: 62px; height: 62px; background: #25D366; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 24px rgba(37,211,102,0.45); cursor: pointer; z-index: 999;
    transition: all 0.3s; text-decoration: none;
  }
  .whatsapp-fab:hover { transform: scale(1.12); box-shadow: 0 8px 36px rgba(37,211,102,0.55); }

  .tag {
    display: inline-block;
    background: rgba(14,165,201,0.08); color: #0EA5C9;
    border: 1px solid rgba(14,165,201,0.22); padding: 6px 18px;
    border-radius: 100px; font-size: 0.75rem; font-weight: 700;
    letter-spacing: 1px; text-transform: uppercase; margin-bottom: 14px;
  }
  .tag-light {
    background: rgba(255,255,255,0.1); color: #38BDF8;
    border-color: rgba(255,255,255,0.18);
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.9rem, 3.8vw, 2.8rem);
    color: #0A1628; line-height: 1.2; margin-bottom: 14px;
  }
  .section-sub {
    color: #64748B; font-size: 1rem; max-width: 560px;
    margin: 0 auto 52px; line-height: 1.75; font-family: 'Outfit', sans-serif;
  }
  .gold-line { position: relative; display: inline-block; }
  .gold-line::after {
    content: ''; position: absolute; bottom: -5px; left: 0; right: 0;
    height: 3px; background: linear-gradient(90deg, #0EA5C9, #38BDF8); border-radius: 2px;
  }

  .footer-link {
    color: rgba(255,255,255,0.5); font-size: 0.88rem;
    cursor: pointer; display: block; padding: 5px 0; transition: color 0.2s;
    font-family: 'Outfit', sans-serif;
  }
  .footer-link:hover { color: #38BDF8; }

  /* SK Tutorial Logo Style */
  .sk-logo-text {
    font-family: 'Outfit', sans-serif;
    font-weight: 800;
    letter-spacing: -0.5px;
    line-height: 1;
  }
  .sk-logo-badge {
    background: linear-gradient(135deg, #0EA5C9, #38BDF8);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 16px rgba(14,165,201,0.4);
  }

  @media (max-width: 900px) {
    .g2 { grid-template-columns: 1fr !important; }
    .g3 { grid-template-columns: 1fr 1fr !important; }
    .g4 { grid-template-columns: 1fr 1fr !important; }
    .hide-m { display: none !important; }
    .show-m { display: flex !important; }
    .hero-btns { flex-direction: column !important; align-items: flex-start !important; }
    .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
  }
  @media (max-width: 560px) {
    .g3 { grid-template-columns: 1fr !important; }
    .stats-g { grid-template-columns: 1fr 1fr !important; }
  }

  @keyframes modalSlideUp {
    from { opacity: 0; transform: translateY(60px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)   scale(1);    }
  }
  .faculty-modal {
    animation: modalSlideUp 0.38s cubic-bezier(0.34, 1.26, 0.64, 1) forwards;
  }
  .faculty-card { cursor: pointer; }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  .float-card { animation: float 4s ease-in-out infinite; }
  .float-card:nth-child(2) { animation-delay: 1s; }
  .float-card:nth-child(3) { animation-delay: 2s; }
  .float-card:nth-child(4) { animation-delay: 0.5s; }

  ::selection { background: rgba(14,165,201,0.2); color: #0A1628; }
`;

// ─── REVEAL ANIMATION ──────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, dir = "up" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const t = vis
    ? "translate(0,0)"
    : dir === "up"
      ? "translateY(36px)"
      : dir === "left"
        ? "translateX(-36px)"
        : dir === "right"
          ? "translateX(36px)"
          : "translateY(36px)";
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: t,
        transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}

// ─── ANIMATED COUNTER ──────────────────────────────────────────────────────────
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const step = end / (duration / 16);
          let cur = 0;
          const timer = setInterval(() => {
            cur += step;
            if (cur >= end) {
              setCount(end);
              clearInterval(timer);
            } else setCount(Math.floor(cur));
          }, 16);
        }
      },
      { threshold: 0.3 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── DATA ──────────────────────────────────────────────────────────────────────
const COURSES = [
  {
    title: "Class 10th",
    icon: "📖",
    color: "#0A2A5C",
    subjects: ["Mathematics", "Science", "English", "SST"],
    focus: "Board Examinations",
    duration: "1 Year",
    batch: "25 Students",
    highlights: [
      "Complete CBSE / ICSE / SSC syllabus coverage",
      "Chapter-wise tests every fortnight",
      "Special focus on scoring in board pattern",
      "Doubt-clearing sessions twice a week",
      "Full-length mock board exams",
    ],
    schedule: "Mon – Sat · 2 hrs/day",
  },
  {
    title: "Class 11th Science",
    icon: "🔬",
    color: "#1A3A6E",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    focus: "Concept Building & Board Prep",
    duration: "1 Year",
    batch: "25 Students",
    highlights: [
      "Strong conceptual foundation from scratch",
      "NCERT + advanced reference material",
      "Early JEE / NEET orientation included",
      "Weekly performance analysis reports",
      "Parent-teacher progress meetings every quarter",
    ],
    schedule: "Mon – Sat · 2.5 hrs/day",
  },
  {
    title: "Class 12th Science",
    icon: "🎓",
    color: "#0A2A5C",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    focus: "Boards + Competitive Entry",
    duration: "1 Year",
    batch: "25 Students",
    highlights: [
      "Simultaneous board + entrance exam preparation",
      "Full-length JEE Mains & NEET mock tests",
      "Previous 10-year board paper analysis",
      "Rank booster sessions in final 3 months",
      "Personal mentoring for college selection",
    ],
    schedule: "Mon – Sat · 3 hrs/day",
  },
  {
    title: "JEE Mains & Advanced",
    icon: "⚡",
    color: "#1A3A6E",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    focus: "IIT & NIT Admissions",
    duration: "1 Year",
    batch: "25 Students",
    highlights: [
      "IIT-pattern problem-solving workshops",
      "20+ full-length JEE Mains mock tests",
      "10+ JEE Advanced level mock papers",
      "Topic-wise DPPs (Daily Practice Problems)",
      "One-on-one doubt sessions with IIT alumni faculty",
    ],
    schedule: "Mon – Sat · 4 hrs/day",
  },
  {
    title: "NEET Preparation",
    icon: "🩺",
    color: "#0A2A5C",
    subjects: ["Physics", "Chemistry", "Biology"],
    focus: "Medical College Admissions",
    duration: "1 Year",
    batch: "25 Students",
    highlights: [
      "Complete NCERT Biology mastery program",
      "25+ full-length NEET mock tests",
      "Diagram & mnemonic-based Biology sessions",
      "Physics & Chemistry at NEET difficulty level",
      "All-India NEET ranking mock series",
    ],
    schedule: "Mon – Sat · 4 hrs/day",
  },
  {
    title: "Foundation Batch (8th & 9th)",
    icon: "🌱",
    color: "#1A3A6E",
    subjects: ["Mathematics", "Science", "English"],
    focus: "Academic Foundation",
    duration: "1 Year",
    batch: "20 Students",
    highlights: [
      "Early concept clarity for future board success",
      "Olympiad preparation included",
      "Interactive learning with visual aids",
      "Monthly parent feedback sessions",
      "Personality development workshops",
    ],
    schedule: "Mon – Fri · 1.5 hrs/day",
  },
];

const FACULTY = [
  {
    name: "Dr. Rajesh Sharma",
    subject: "Physics",
    exp: "15 Years",
    qual: "Ph.D. IIT Bombay",
    init: "RS",
    bio: "Dr. Sharma is a gold medallist from IIT Bombay with 15 years of teaching JEE Physics. His intuitive approach to mechanics and electromagnetism has helped hundreds of students secure top AIR ranks. He simplifies complex concepts using real-world analogies that students never forget.",
    achievements: [
      "Mentor to 200+ JEE Advanced qualifiers",
      "Authored 3 Physics study modules",
      "IIT Bombay Gold Medallist",
      "Ex-visiting faculty at FIITJEE Mumbai",
    ],
  },
  {
    name: "Prof. Anjali Mehta",
    subject: "Chemistry",
    exp: "12 Years",
    qual: "M.Sc. Mumbai University",
    init: "AM",
    bio: "Prof. Mehta brings 12 years of Chemistry mastery to every class. Her structured approach to Organic, Inorganic, and Physical Chemistry is renowned across Mumbai's coaching circuit. She holds a university rank and has an exceptional NEET Chemistry track record.",
    achievements: [
      "University Rank Holder — Mumbai University",
      "Guided 150+ NEET top scorers",
      "Specialist in Organic Chemistry mechanisms",
      "Developed SK Tutorial's signature Chemistry test series",
    ],
  },
  {
    name: "Mr. Vikram Patel",
    subject: "Mathematics",
    exp: "10 Years",
    qual: "M.Tech IIT Delhi",
    init: "VP",
    bio: "Mr. Patel is an M.Tech graduate from IIT Delhi who left a software career to pursue teaching — his true passion. His problem-solving workshops for Calculus, Algebra, and Coordinate Geometry are considered legendary by students who have cleared JEE under his guidance.",
    achievements: [
      "IIT Delhi M.Tech — Computer Science",
      "Trained 300+ JEE Mathematics students",
      "Perfect scorer coach — 3 students scored 120/120",
      "Conducts weekly doubt-clearing marathons",
    ],
  },
  {
    name: "Dr. Priya Nair",
    subject: "Biology",
    exp: "8 Years",
    qual: "Ph.D. AIIMS Mumbai",
    init: "PN",
    bio: "Dr. Nair holds a Ph.D. from AIIMS Mumbai and is the cornerstone of SK Tutorial's NEET Biology program. Her visual teaching methodology — using diagrams, mnemonics, and case studies — makes even the toughest chapters in Botany and Zoology engaging and easy to retain.",
    achievements: [
      "Ph.D. from AIIMS Mumbai",
      "Mentored 5 students to NEET 700+ scores",
      "Specialist in Botany & Human Physiology",
      "Published research in cellular biology",
    ],
  },
];

const RESULTS = [
  {
    year: "2024",
    items: [
      { name: "Aryan Kapoor", score: "AIR 245", exam: "JEE Advanced" },
      { name: "Priya Singh", score: "720/720", exam: "NEET UG" },
      { name: "Rahul Malhotra", score: "98.5%", exam: "CBSE Boards" },
    ],
  },
  {
    year: "2023",
    items: [
      { name: "Sneha Joshi", score: "AIR 89", exam: "JEE Mains" },
      { name: "Amit Thakur", score: "715/720", exam: "NEET UG" },
      { name: "Kavya Rao", score: "97.8%", exam: "CBSE Boards" },
    ],
  },
  {
    year: "2022",
    items: [
      { name: "Dev Pandey", score: "AIR 156", exam: "JEE Advanced" },
      { name: "Riya Sharma", score: "710/720", exam: "NEET UG" },
      { name: "Harsh Mehta", score: "99.2%", exam: "CBSE Boards" },
    ],
  },
];

const TESTIMONIALS = [
  {
    name: "Aryan Kapoor",
    result: "JEE Advanced — AIR 245",
    text: "SK Tutorial completely transformed my preparation strategy. The faculty's depth of knowledge and personal attention made cracking JEE feel achievable.",
    init: "AK",
  },
  {
    name: "Priya Singh",
    result: "NEET UG — 720/720 Perfect Score",
    text: "Achieving a perfect NEET score seemed impossible until I joined SK Tutorial. The structured approach, mock test series, and constant faculty support were extraordinary.",
    init: "PS",
  },
  {
    name: "Rohan Desai",
    result: "Class 12 Boards — 95.8%",
    text: "Regular tests and detailed performance analysis helped me identify weak areas early. SK Tutorial truly delivers on every promise it makes to its students.",
    init: "RD",
  },
  {
    name: "Sneha Joshi",
    result: "JEE Mains — AIR 89",
    text: "The study material quality at SK Tutorial is unmatched anywhere in Mumbai. Every concept was explained with absolute clarity backed by rigorous practice sessions.",
    init: "SJ",
  },
];

const STATS = [
  { label: "Students Enrolled", value: 5000, suffix: "+", icon: "👨‍🎓" },
  { label: "Years of Excellence", value: 15, suffix: "+", icon: "🏆" },
  { label: "JEE / NEET Selections", value: 1200, suffix: "+", icon: "🎯" },
  { label: "Satisfaction Rate", value: 98, suffix: "%", icon: "⭐" },
];

const NAV = [
  "Home",
  "Courses",
  "Faculty",
  "Results",
  "Testimonials",
  "Admission",
  "Contact",
];

// ─── COURSE MODAL ──────────────────────────────────────────────────────────────
function CourseModal({ course: c, onClose }) {
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        background: "rgba(10,22,40,0.6)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        className="faculty-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 24,
          width: "100%",
          maxWidth: 540,
          boxShadow: "0 32px 80px rgba(10,22,40,0.25)",
          overflow: "hidden",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            zIndex: 10,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "none",
            background: "rgba(255,255,255,0.2)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            color: "#fff",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.3)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
          }
        >
          ✕
        </button>

        {/* Header */}
        <div
          style={{
            background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`,
            padding: "40px 36px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: 14 }}>{c.icon}</div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.55rem",
              color: C.white,
              marginBottom: 8,
            }}
          >
            {c.title}
          </h2>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(56,189,248,0.2)",
              border: "1px solid rgba(56,189,248,0.35)",
              borderRadius: 100,
              padding: "5px 16px",
            }}
          >
            <span
              style={{
                color: C.tealBright,
                fontWeight: 700,
                fontSize: "0.82rem",
              }}
            >
              🎯 {c.focus}
            </span>
          </div>
          {/* Quick stats row */}
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              marginTop: 20,
              flexWrap: "wrap",
            }}
          >
            {[
              ["📅", c.duration],
              ["👥", c.batch],
              ["🕐", c.schedule],
            ].map(([icon, val]) => (
              <span
                key={val}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.85)",
                  borderRadius: 100,
                  padding: "5px 14px",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                }}
              >
                {icon} {val}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "28px 36px 36px" }}>
          {/* Subjects */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.78rem",
                color: C.navy,
                textTransform: "uppercase",
                letterSpacing: "0.9px",
                marginBottom: 12,
              }}
            >
              Subjects Covered
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {c.subjects.map((s) => (
                <span
                  key={s}
                  style={{
                    background: C.lightBg,
                    color: C.navyMid,
                    borderRadius: 8,
                    padding: "6px 14px",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.78rem",
                color: C.navy,
                textTransform: "uppercase",
                letterSpacing: "0.9px",
                marginBottom: 12,
              }}
            >
              What's Included
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {c.highlights.map((h, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
                >
                  <span
                    style={{
                      color: C.teal,
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      marginTop: 1,
                      flexShrink: 0,
                    }}
                  >
                    ✦
                  </span>
                  <span
                    style={{
                      color: C.text,
                      fontSize: "0.88rem",
                      lineHeight: 1.55,
                    }}
                  >
                    {h}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", padding: "14px" }}
            onClick={() => {
              onClose();
              setTimeout(
                () =>
                  document
                    .getElementById("admission")
                    ?.scrollIntoView({ behavior: "smooth" }),
                120,
              );
            }}
          >
            Enquire Now →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── FACULTY MODAL ─────────────────────────────────────────────────────────────
function FacultyModal({ faculty: f, onClose }) {
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        background: "rgba(10,22,40,0.6)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        className="faculty-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: 24,
          width: "100%",
          maxWidth: 520,
          boxShadow: "0 32px 80px rgba(10,22,40,0.25)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            zIndex: 10,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "none",
            background: "rgba(10,22,40,0.07)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.1rem",
            color: C.navy,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(10,22,40,0.14)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(10,22,40,0.07)")
          }
        >
          ✕
        </button>

        {/* Header strip */}
        <div
          style={{
            background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`,
            padding: "40px 36px 32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.teal}, ${C.tealBright})`,
              color: C.white,
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.2rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 18px",
              boxShadow: "0 8px 32px rgba(14,165,201,0.4)",
            }}
          >
            {f.init}
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.5rem",
              color: C.white,
              marginBottom: 6,
            }}
          >
            {f.name}
          </h2>
          <div
            style={{
              color: C.tealBright,
              fontWeight: 700,
              fontSize: "0.88rem",
              marginBottom: 10,
            }}
          >
            {f.subject}
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.85)",
                borderRadius: 100,
                padding: "4px 14px",
                fontSize: "0.78rem",
              }}
            >
              📅 {f.exp} Experience
            </span>
            <span
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.85)",
                borderRadius: 100,
                padding: "4px 14px",
                fontSize: "0.78rem",
              }}
            >
              🎓 {f.qual}
            </span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "28px 36px 36px" }}>
          {/* Bio */}
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.78rem",
                color: C.navy,
                textTransform: "uppercase",
                letterSpacing: "0.9px",
                marginBottom: 10,
              }}
            >
              About
            </div>
            <p style={{ color: C.muted, fontSize: "0.91rem", lineHeight: 1.8 }}>
              {f.bio}
            </p>
          </div>

          {/* Achievements */}
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: "0.78rem",
                color: C.navy,
                textTransform: "uppercase",
                letterSpacing: "0.9px",
                marginBottom: 12,
              }}
            >
              Key Achievements
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {f.achievements.map((a, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
                >
                  <span
                    style={{
                      color: C.teal,
                      fontWeight: 700,
                      fontSize: "0.9rem",
                      marginTop: 1,
                      flexShrink: 0,
                    }}
                  >
                    ✦
                  </span>
                  <span
                    style={{
                      color: C.text,
                      fontSize: "0.88rem",
                      lineHeight: 1.55,
                    }}
                  >
                    {a}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    studentName: "",
    parentName: "",
    phone: "",
    email: "",
    course: "",
    batch: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();

    const text = `New Admission Enquiry — SK Tutorial

Student Name: ${form.studentName}
Parent Name: ${form.parentName}
Phone: ${form.phone}
Email: ${form.email || "Not provided"}
Course: ${form.course}
Batch Time: ${form.batch || "Not specified"}
Message: ${form.message || "No message"}`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/918779009398?text=${encoded}`, "_blank");

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4500);
    setForm({
      studentName: "",
      parentName: "",
      phone: "",
      email: "",
      course: "",
      batch: "",
      message: "",
    });
  };

  return (
    <div
      style={{
        fontFamily: "'Outfit', sans-serif",
        color: C.text,
        overflowX: "hidden",
      }}
    >
      <style>{GLOBAL_CSS}</style>

      {/* ═══ NAVBAR ═══════════════════════════════════════════════════════════ */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: 72,
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled ? "0 1px 24px rgba(10,22,40,0.08)" : "none",
          transition: "all 0.4s ease",
          borderBottom: scrolled ? "1px solid rgba(14,165,201,0.1)" : "none",
        }}
      >
        {/* SK Tutorial Logo */}
        <div
          onClick={() => go("home")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          <div
            className="sk-logo-badge"
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
            }}
          >
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "1.05rem",
                color: "#fff",
                letterSpacing: "-0.5px",
              }}
            >
              SK
            </span>
          </div>
          <div>
            <div
              className="sk-logo-text"
              style={{
                fontSize: "1.15rem",
                color: scrolled ? C.navy : C.white,
                lineHeight: 1.1,
              }}
            >
              SK Tutorial
            </div>
            <div
              style={{
                fontSize: "0.6rem",
                color: scrolled ? C.teal : "rgba(56,189,248,0.85)",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                fontWeight: 600,
                marginTop: 1,
              }}
            >
              Expert Coaching · Mumbai
            </div>
          </div>
        </div>

        {/* Desktop links */}
        <div className="hide-m" style={{ display: "flex", gap: 2 }}>
          {NAV.map((n) => (
            <span
              key={n}
              className={`nav-link ${scrolled ? "nav-scrolled" : ""}`}
              onClick={() => go(n.toLowerCase())}
            >
              {n}
            </span>
          ))}
        </div>

        {/* Enroll CTA + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            className="btn-primary hide-m"
            style={{ padding: "10px 22px", fontSize: "0.84rem" }}
            onClick={() => go("admission")}
          >
            Enroll Now →
          </button>
          <div
            className="show-m"
            style={{
              display: "none",
              flexDirection: "column",
              gap: 5,
              cursor: "pointer",
              padding: "8px 4px",
            }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 24,
                  height: 2,
                  background: scrolled ? C.navy : C.white,
                  borderRadius: 2,
                }}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          background: C.navy,
          padding: "80px 32px 40px",
          zIndex: 90,
          transform: menuOpen ? "translateY(0)" : "translateY(-105%)",
          transition: "transform 0.38s cubic-bezier(.4,0,.2,1)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute",
            top: 22,
            right: 28,
            color: C.white,
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ✕
        </div>
        {NAV.map((n) => (
          <div
            key={n}
            onClick={() => go(n.toLowerCase())}
            style={{
              color: C.white,
              fontSize: "1.1rem",
              fontWeight: 500,
              padding: "15px 0",
              borderBottom: "1px solid rgba(255,255,255,0.09)",
              cursor: "pointer",
            }}
          >
            {n}
          </div>
        ))}
        <button
          className="btn-primary"
          style={{ marginTop: 28, width: "100%", justifyContent: "center" }}
          onClick={() => go("admission")}
        >
          Enroll Now →
        </button>
      </div>

      {/* ═══ HERO ════════════════════════════════════════════════════════════ */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          background: `linear-gradient(140deg, ${C.navy} 0%, #0F2444 50%, #0A1E3D 100%)`,
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: 72,
        }}
      >
        {/* Decorative blobs */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-5%",
            width: "60%",
            height: "140%",
            background: `radial-gradient(ellipse, rgba(14,165,201,0.08) 0%, transparent 65%)`,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: "45%",
            height: "80%",
            background: `radial-gradient(ellipse, rgba(14,165,201,0.05) 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />
        {/* Accent circle top-right */}
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 80,
            width: 320,
            height: 320,
            borderRadius: "50%",
            border: "1px solid rgba(14,165,201,0.12)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 120,
            right: 120,
            width: 240,
            height: 240,
            borderRadius: "50%",
            border: "1px solid rgba(14,165,201,0.08)",
            pointerEvents: "none",
          }}
        />
        {/* Grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`,
            backgroundSize: "64px 64px",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "80px 28px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
            className="g2"
          >
            {/* Left content */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(14,165,201,0.1)",
                  border: "1px solid rgba(14,165,201,0.25)",
                  borderRadius: 100,
                  padding: "7px 18px",
                  marginBottom: 28,
                }}
              >
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: C.tealBright,
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                  }}
                >
                  🎓 Mumbai's Premier Coaching Institute
                </span>
              </div>

              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(2.3rem, 4.8vw, 3.6rem)",
                  color: C.white,
                  lineHeight: 1.16,
                  marginBottom: 24,
                }}
              >
                Expert Coaching for{" "}
                <span style={{ color: C.tealBright }}>10th, 11th, 12th</span>
                <br />
                NEET &amp; JEE
              </h1>

              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "1.05rem",
                  lineHeight: 1.82,
                  marginBottom: 36,
                  maxWidth: 490,
                }}
              >
                Join Mumbai's most trusted coaching institute. Expert faculty,
                proven methodology, and personalized attention to help every
                student achieve extraordinary results.
              </p>

              <div
                className="hero-btns"
                style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
              >
                <button
                  className="btn-primary"
                  onClick={() => go("admission")}
                  style={{ fontSize: "0.96rem", padding: "15px 32px" }}
                >
                  Start Your Journey →
                </button>
                <button
                  className="btn-outline"
                  onClick={() => go("courses")}
                  style={{ fontSize: "0.96rem" }}
                >
                  Explore Courses
                </button>
              </div>

              {/* Mini stats strip */}
              <div
                style={{
                  display: "flex",
                  gap: 36,
                  marginTop: 52,
                  flexWrap: "wrap",
                  paddingTop: 36,
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {[
                  ["5000+", "Students"],
                  ["15+", "Years"],
                  ["1200+", "Selections"],
                  ["98%", "Success Rate"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.75rem",
                        color: C.tealBright,
                        lineHeight: 1,
                      }}
                    >
                      {n}
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.42)",
                        fontSize: "0.78rem",
                        marginTop: 4,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right floating cards */}
            <div
              className="hide-m"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 18,
              }}
            >
              {[
                {
                  icon: "⚡",
                  title: "JEE Coaching",
                  desc: "IIT-JEE Mains & Advanced",
                },
                {
                  icon: "🩺",
                  title: "NEET Coaching",
                  desc: "Medical entrance mastery",
                },
                {
                  icon: "📊",
                  title: "Board Excellence",
                  desc: "10th · 11th · 12th",
                },
                {
                  icon: "👨‍🏫",
                  title: "Expert Faculty",
                  desc: "IIT & AIIMS qualified",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="float-card"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(14,165,201,0.15)",
                    borderRadius: 20,
                    padding: "26px 22px",
                    marginTop: i % 2 === 1 ? 28 : 0,
                    transition: "all 0.3s",
                  }}
                >
                  <div style={{ fontSize: "2.2rem", marginBottom: 12 }}>
                    {card.icon}
                  </div>
                  <div
                    style={{
                      color: C.white,
                      fontWeight: 600,
                      fontSize: "0.94rem",
                      marginBottom: 5,
                    }}
                  >
                    {card.title}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.42)",
                      fontSize: "0.79rem",
                    }}
                  >
                    {card.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div style={{ position: "absolute", bottom: -2, left: 0, right: 0 }}>
          <svg
            viewBox="0 0 1440 60"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
          >
            <path
              d="M0,0 C480,60 960,60 1440,0 L1440,60 L0,60 Z"
              fill={C.lightBg}
            />
          </svg>
        </div>
      </section>

      {/* ═══ STATS ═══════════════════════════════════════════════════════════ */}
      <section style={{ background: C.lightBg, padding: "72px 28px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div
            className="stats-g"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 24,
              textAlign: "center",
            }}
          >
            {STATS.map((s, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  style={{
                    background: C.white,
                    borderRadius: 20,
                    padding: "36px 20px",
                    boxShadow: "0 2px 20px rgba(10,22,40,0.06)",
                    border: "1px solid rgba(14,165,201,0.1)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 3,
                      background: `linear-gradient(90deg, ${C.teal}, ${C.tealBright})`,
                    }}
                  />
                  <div style={{ fontSize: "2.2rem", marginBottom: 10 }}>
                    {s.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "2.6rem",
                      color: C.navy,
                      lineHeight: 1,
                    }}
                  >
                    <Counter end={s.value} suffix={s.suffix} />
                  </div>
                  <div
                    style={{
                      color: C.muted,
                      fontSize: "0.85rem",
                      marginTop: 8,
                      fontWeight: 500,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COURSES ════════════════════════════════════════════════════════ */}
      <section
        id="courses"
        style={{ padding: "100px 28px", background: C.white }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <div className="tag">Our Programs</div>
              <h2 className="section-title">
                Courses We <span className="gold-line">Offer</span>
              </h2>
              <p className="section-sub">
                Carefully designed programs for every academic level — from
                school boards to India's toughest competitive exams.
              </p>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 28,
            }}
            className="g3"
          >
            {COURSES.map((c, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="course-card">
                  <div style={{ fontSize: "2.8rem", marginBottom: 18 }}>
                    {c.icon}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.38rem",
                      color: C.navy,
                      marginBottom: 14,
                    }}
                  >
                    {c.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginBottom: 22,
                    }}
                  >
                    {c.subjects.map((s) => (
                      <span
                        key={s}
                        style={{
                          background: C.lightBg,
                          color: C.navyMid,
                          borderRadius: 6,
                          padding: "5px 11px",
                          fontSize: "0.77rem",
                          fontWeight: 600,
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      borderTop: `1px solid ${C.lightBg}`,
                      paddingTop: 18,
                      display: "flex",
                      gap: 18,
                    }}
                  >
                    <span
                      style={{
                        color: C.muted,
                        fontSize: "0.82rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      👥 {c.batch}
                    </span>
                    <span
                      style={{
                        color: C.muted,
                        fontSize: "0.82rem",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      📅 {c.duration}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                    <button
                      className="btn-primary"
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        padding: "11px 10px",
                        fontSize: "0.84rem",
                      }}
                      onClick={() => go("admission")}
                    >
                      Enquire Now →
                    </button>
                    <button
                      onClick={() => setSelectedCourse(c)}
                      style={{
                        flex: 1,
                        padding: "11px 10px",
                        borderRadius: 10,
                        fontSize: "0.84rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "'Outfit', sans-serif",
                        background: "transparent",
                        color: C.navy,
                        border: `2px solid ${C.navyLight}`,
                        transition: "all 0.25s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = C.navy;
                        e.currentTarget.style.color = "#fff";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = C.navy;
                      }}
                    >
                      Know More ↗
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHY SK TUTORIAL (banner) ══════════════════════════════════════════════ */}
      <section
        style={{
          background: `linear-gradient(135deg, ${C.navy}, #142240)`,
          padding: "72px 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Teal accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: `linear-gradient(90deg, ${C.teal}, ${C.tealBright}, ${C.gold})`,
          }}
        />
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
                  color: C.white,
                }}
              >
                Why Choose{" "}
                <span style={{ color: C.tealBright }}>SK Tutorial?</span>
              </h2>
            </div>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 24,
            }}
            className="g4"
          >
            {[
              {
                icon: "🎯",
                title: "Result-Focused",
                desc: "Every batch is designed around measurable academic outcomes.",
              },
              {
                icon: "👨‍🏫",
                title: "Expert Faculty",
                desc: "IIT & AIIMS alumni with 8–15 years of teaching excellence.",
              },
              {
                icon: "📋",
                title: "Regular Tests",
                desc: "Weekly tests and full mock exams to track your progress.",
              },
              {
                icon: "🤝",
                title: "Personal Attention",
                desc: "Small batch sizes of 25 ensure every student gets noticed.",
              },
            ].map((f, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(14,165,201,0.15)",
                    borderRadius: 18,
                    padding: "30px 24px",
                    textAlign: "center",
                    transition: "all 0.3s",
                  }}
                >
                  <div style={{ fontSize: "2.4rem", marginBottom: 14 }}>
                    {f.icon}
                  </div>
                  <div
                    style={{
                      color: C.white,
                      fontWeight: 700,
                      fontSize: "1rem",
                      marginBottom: 8,
                    }}
                  >
                    {f.title}
                  </div>
                  <div
                    style={{
                      color: "rgba(255,255,255,0.48)",
                      fontSize: "0.84rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {f.desc}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FACULTY ════════════════════════════════════════════════════════ */}
      <section
        id="faculty"
        style={{ padding: "100px 28px", background: C.lightBg }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <div className="tag">Meet the Team</div>
              <h2 className="section-title">
                Our Expert <span className="gold-line">Faculty</span>
              </h2>
              <p className="section-sub">
                Highly qualified educators passionate about student success —
                combining deep subject mastery with proven teaching strategies.
              </p>
            </div>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 28,
            }}
            className="g4"
          >
            {FACULTY.map((f, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  className="faculty-card"
                  onClick={() => setSelectedFaculty(f)}
                >
                  <div
                    style={{
                      width: 84,
                      height: 84,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${C.teal}, ${C.tealBright})`,
                      color: C.white,
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.9rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 22px",
                      boxShadow: "0 8px 28px rgba(14,165,201,0.3)",
                    }}
                  >
                    {f.init}
                  </div>
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: C.navy,
                      marginBottom: 6,
                    }}
                  >
                    {f.name}
                  </h3>
                  <div
                    style={{
                      color: C.teal,
                      fontWeight: 700,
                      fontSize: "0.86rem",
                      marginBottom: 8,
                    }}
                  >
                    {f.subject}
                  </div>
                  <div
                    style={{
                      color: C.muted,
                      fontSize: "0.79rem",
                      marginBottom: 12,
                    }}
                  >
                    {f.qual}
                  </div>
                  <span
                    style={{
                      display: "inline-block",
                      background: "rgba(14,165,201,0.08)",
                      color: C.teal,
                      border: "1px solid rgba(14,165,201,0.2)",
                      borderRadius: 100,
                      padding: "4px 14px",
                      fontSize: "0.74rem",
                      fontWeight: 700,
                    }}
                  >
                    {f.exp} Experience
                  </span>
                  <div
                    style={{
                      marginTop: 14,
                      color: C.teal,
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      letterSpacing: "0.3px",
                    }}
                  >
                    View Profile →
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RESULTS ════════════════════════════════════════════════════════ */}
      <section
        id="results"
        style={{
          padding: "100px 28px",
          background: `linear-gradient(140deg, ${C.navy} 0%, #0F2444 100%)`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="tag tag-light">Our Track Record</div>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.9rem,3.8vw,2.8rem)",
                  color: C.white,
                  marginBottom: 14,
                }}
              >
                Proven <span style={{ color: C.tealBright }}>Results</span>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "1rem",
                  maxWidth: 540,
                  margin: "0 auto",
                }}
              >
                Year after year, our students outperform national averages in
                board exams and competitive entrances.
              </p>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 28,
            }}
            className="g3"
          >
            {RESULTS.map((yr, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <div
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(14,165,201,0.15)",
                    borderRadius: 20,
                    padding: "32px 26px",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 24,
                    }}
                  >
                    <div
                      style={{
                        background: `linear-gradient(135deg, ${C.teal}, ${C.tealBright})`,
                        borderRadius: 10,
                        padding: "8px 18px",
                        color: C.white,
                        fontWeight: 800,
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.1rem",
                      }}
                    >
                      {yr.year}
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.42)",
                        fontSize: "0.82rem",
                      }}
                    >
                      Top Performers
                    </div>
                  </div>
                  {yr.items.map((item, j) => (
                    <div
                      key={j}
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: 10,
                        padding: "14px 16px",
                        marginBottom: j < 2 ? 10 : 0,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            color: C.white,
                            fontWeight: 600,
                            fontSize: "0.88rem",
                          }}
                        >
                          {item.name}
                        </div>
                        <div
                          style={{
                            color: "rgba(255,255,255,0.38)",
                            fontSize: "0.73rem",
                            marginTop: 2,
                          }}
                        >
                          {item.exam}
                        </div>
                      </div>
                      <div
                        style={{
                          color: C.tealBright,
                          fontWeight: 800,
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.score}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Achievement badges */}
          <Reveal delay={0.2}>
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
                marginTop: 48,
                flexWrap: "wrap",
              }}
            >
              {[
                ["🏅", "1200+ JEE/NEET Selections"],
                ["📊", "95%+ Avg. Board Results"],
                ["🎖️", "15 Years of Excellence"],
                ["⭐", "98% Student Satisfaction"],
              ].map(([icon, text]) => (
                <div
                  key={text}
                  style={{
                    background: "rgba(14,165,201,0.1)",
                    border: "1px solid rgba(14,165,201,0.22)",
                    borderRadius: 100,
                    padding: "10px 22px",
                    color: C.white,
                    fontSize: "0.84rem",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  {icon} {text}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══════════════════════════════════════════════════ */}
      <section
        id="testimonials"
        style={{ padding: "100px 28px", background: C.white }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <div className="tag">Student Stories</div>
              <h2 className="section-title">
                What Our <span className="gold-line">Students Say</span>
              </h2>
              <p className="section-sub">
                Real stories from real achievers who trusted SK Tutorial to
                shape their future.
              </p>
            </div>
          </Reveal>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}
            className="g2"
          >
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="testi-card">
                  <div
                    style={{
                      display: "flex",
                      gap: 14,
                      alignItems: "flex-start",
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        width: 54,
                        height: 54,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg, ${C.teal}, ${C.navyLight})`,
                        color: C.white,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.15rem",
                        flexShrink: 0,
                      }}
                    >
                      {t.init}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          color: C.navy,
                          fontSize: "0.97rem",
                        }}
                      >
                        {t.name}
                      </div>
                      <div
                        style={{
                          color: C.teal,
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          marginTop: 3,
                        }}
                      >
                        {t.result}
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      color: C.muted,
                      lineHeight: 1.82,
                      fontSize: "0.93rem",
                    }}
                  >
                    "{t.text}"
                  </p>
                  <div style={{ display: "flex", gap: 2, marginTop: 18 }}>
                    {"★★★★★".split("").map((_, j) => (
                      <span
                        key={j}
                        style={{ color: C.gold, fontSize: "1.05rem" }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ADMISSION FORM ══════════════════════════════════════════════════ */}
      <section
        id="admission"
        style={{ padding: "100px 28px", background: C.lightBg }}
      >
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <div className="tag">Apply Now</div>
              <h2 className="section-title">
                Begin Your <span className="gold-line">Journey</span>
              </h2>
              <p className="section-sub">
                Fill in the form below and our team will contact you within 24
                hours to discuss your needs.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              style={{
                background: C.white,
                borderRadius: 24,
                padding: "52px 44px",
                boxShadow: "0 8px 48px rgba(10,22,40,0.08)",
                border: "1px solid rgba(14,165,201,0.1)",
              }}
            >
              {submitted ? (
                <div style={{ textAlign: "center", padding: "48px 24px" }}>
                  <div style={{ fontSize: "4.5rem", marginBottom: 16 }}>✅</div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.9rem",
                      color: C.navy,
                      marginBottom: 12,
                    }}
                  >
                    Inquiry Submitted!
                  </h3>
                  <p style={{ color: C.muted, fontSize: "1rem" }}>
                    Thank you! Our admissions team will call you within 24
                    hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 22,
                    }}
                    className="g2"
                  >
                    {[
                      {
                        label: "Student Name *",
                        name: "studentName",
                        placeholder: "Full name of student",
                        type: "text",
                        req: true,
                      },
                      {
                        label: "Parent / Guardian Name *",
                        name: "parentName",
                        placeholder: "Parent's full name",
                        type: "text",
                        req: true,
                      },
                      {
                        label: "Phone Number *",
                        name: "phone",
                        placeholder: "+91 87790 09398",
                        type: "tel",
                        req: true,
                      },
                      {
                        label: "Email Address",
                        name: "email",
                        placeholder: "email@example.com",
                        type: "email",
                        req: false,
                      },
                    ].map((f) => (
                      <div key={f.name}>
                        <label
                          style={{
                            display: "block",
                            fontWeight: 600,
                            fontSize: "0.86rem",
                            color: C.text,
                            marginBottom: 8,
                          }}
                        >
                          {f.label}
                        </label>
                        <input
                          className="form-ctrl"
                          type={f.type}
                          name={f.name}
                          placeholder={f.placeholder}
                          value={form[f.name]}
                          onChange={onChange}
                          required={f.req}
                        />
                      </div>
                    ))}

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontWeight: 600,
                          fontSize: "0.86rem",
                          color: C.text,
                          marginBottom: 8,
                        }}
                      >
                        Course Interested In *
                      </label>
                      <select
                        className="form-ctrl"
                        name="course"
                        value={form.course}
                        onChange={onChange}
                        required
                        style={{ cursor: "pointer" }}
                      >
                        <option value="">— Select a course —</option>
                        {COURSES.map((c) => (
                          <option key={c.title}>{c.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        style={{
                          display: "block",
                          fontWeight: 600,
                          fontSize: "0.86rem",
                          color: C.text,
                          marginBottom: 8,
                        }}
                      >
                        Preferred Batch Time
                      </label>
                      <select
                        className="form-ctrl"
                        name="batch"
                        value={form.batch}
                        onChange={onChange}
                        style={{ cursor: "pointer" }}
                      >
                        <option value="">— Select batch time —</option>
                        <option>Morning (7:00 AM – 10:00 AM)</option>
                        <option>Afternoon (12:00 PM – 3:00 PM)</option>
                        <option>Evening (5:00 PM – 8:00 PM)</option>
                        <option>Weekend Batch</option>
                      </select>
                    </div>

                    <div style={{ gridColumn: "1 / -1" }}>
                      <label
                        style={{
                          display: "block",
                          fontWeight: 600,
                          fontSize: "0.86rem",
                          color: C.text,
                          marginBottom: 8,
                        }}
                      >
                        Message (Optional)
                      </label>
                      <textarea
                        className="form-ctrl"
                        name="message"
                        placeholder="Any specific questions, doubts, or requirements..."
                        value={form.message}
                        onChange={onChange}
                        rows={4}
                        style={{ resize: "vertical" }}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      marginTop: 28,
                      width: "100%",
                      justifyContent: "center",
                      padding: "16px",
                      fontSize: "1rem",
                    }}
                  >
                    Submit Inquiry →
                  </button>
                  <p
                    style={{
                      textAlign: "center",
                      color: C.muted,
                      fontSize: "0.8rem",
                      marginTop: 14,
                    }}
                  >
                    Or call us directly at{" "}
                    <a
                      href="tel:8779009398"
                      style={{
                        color: C.teal,
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                    >
                      +91 87790 09398
                    </a>
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CONTACT ════════════════════════════════════════════════════════ */}
      <section
        id="contact"
        style={{ padding: "100px 28px", background: C.white }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center" }}>
              <div className="tag">Find Us</div>
              <h2 className="section-title">
                Get In <span className="gold-line">Touch</span>
              </h2>
              <p className="section-sub">
                We're here to answer all your questions. Visit us, call us, or
                WhatsApp us — anytime.
              </p>
            </div>
          </Reveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.6fr",
              gap: 44,
              alignItems: "start",
            }}
            className="g2"
          >
            {/* Info */}
            <Reveal dir="left">
              <div>
                {[
                  {
                    icon: "📞",
                    title: "Phone",
                    val: "+91 87790 09398",
                    sub: "Mon – Sat · 8 AM – 8 PM",
                  },
                  {
                    icon: "💬",
                    title: "WhatsApp",
                    val: "+91 87790 09398",
                    sub: "Quick responses guaranteed",
                  },
                  {
                    icon: "📍",
                    title: "Address",
                    val: "Mumbai, Maharashtra",
                    sub: "India — 400001",
                  },
                  {
                    icon: "🕐",
                    title: "Hours",
                    val: "Mon – Sat: 8AM – 8PM",
                    sub: "Sunday: 10AM – 2PM",
                  },
                ].map((c, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      gap: 16,
                      padding: "20px 0",
                      borderBottom: i < 3 ? `1px solid ${C.lightBg}` : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        background: "rgba(14,165,201,0.08)",
                        borderRadius: 13,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.4rem",
                        flexShrink: 0,
                        border: "1px solid rgba(14,165,201,0.15)",
                      }}
                    >
                      {c.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontWeight: 700,
                          color: C.navy,
                          fontSize: "0.86rem",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {c.title}
                      </div>
                      <div
                        style={{ color: C.text, fontWeight: 600, marginTop: 3 }}
                      >
                        {c.val}
                      </div>
                      <div
                        style={{
                          color: C.muted,
                          fontSize: "0.79rem",
                          marginTop: 2,
                        }}
                      >
                        {c.sub}
                      </div>
                    </div>
                  </div>
                ))}

                <a
                  href="https://wa.me/918779009398"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    display: "block",
                    marginTop: 24,
                  }}
                >
                  <button
                    style={{
                      background: "#25D366",
                      color: C.white,
                      border: "none",
                      padding: "15px 28px",
                      borderRadius: 12,
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      cursor: "pointer",
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      fontFamily: "'Outfit', sans-serif",
                      boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
                      transition: "all 0.3s",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                      fill="white"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Chat on WhatsApp
                  </button>
                </a>
              </div>
            </Reveal>

            {/* Map */}
            <Reveal dir="right">
              <div
                style={{
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 8px 40px rgba(10,22,40,0.1)",
                  height: 420,
                  border: "1px solid rgba(14,165,201,0.1)",
                }}
              >
                <iframe
                  title="SK Tutorial — Mumbai"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823045!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1699966143297!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: "none", display: "block" }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═════════════════════════════════════════════════════════ */}
      <footer
        style={{
          background: C.navy,
          color: C.white,
          padding: "64px 28px 32px",
          borderTop: `3px solid ${C.teal}`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gap: 52,
              paddingBottom: 44,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Brand */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 18,
                }}
              >
                <div
                  className="sk-logo-badge"
                  style={{ width: 44, height: 44, borderRadius: 12 }}
                >
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 800,
                      fontSize: "1rem",
                      color: "#fff",
                    }}
                  >
                    SK
                  </span>
                </div>
                <span
                  className="sk-logo-text"
                  style={{ fontSize: "1.2rem", color: C.white }}
                >
                  SK Tutorial
                </span>
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.48)",
                  fontSize: "0.88rem",
                  lineHeight: 1.82,
                  maxWidth: 300,
                }}
              >
                Mumbai's most trusted coaching institute for 10th, 11th, 12th,
                JEE &amp; NEET. Shaping futures since 2009.
              </p>
              <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                {["📘", "📷", "🐦", "▶️"].map((ic, i) => (
                  <div
                    key={i}
                    style={{
                      width: 38,
                      height: 38,
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "1rem",
                      transition: "background 0.2s",
                      border: "1px solid rgba(14,165,201,0.15)",
                    }}
                  >
                    {ic}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <div
                style={{
                  fontWeight: 700,
                  marginBottom: 20,
                  color: C.tealBright,
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  letterSpacing: "1.2px",
                }}
              >
                Quick Links
              </div>
              {NAV.map((n) => (
                <span
                  key={n}
                  className="footer-link"
                  onClick={() => go(n.toLowerCase())}
                >
                  → {n}
                </span>
              ))}
            </div>

            {/* Courses */}
            <div>
              <div
                style={{
                  fontWeight: 700,
                  marginBottom: 20,
                  color: C.tealBright,
                  textTransform: "uppercase",
                  fontSize: "0.75rem",
                  letterSpacing: "1.2px",
                }}
              >
                Courses
              </div>
              {COURSES.map((c) => (
                <div
                  key={c.title}
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    marginBottom: 9,
                    fontSize: "0.87rem",
                  }}
                >
                  • {c.title}
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              paddingTop: 26,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <div
              style={{ color: "rgba(255,255,255,0.32)", fontSize: "0.82rem" }}
            >
              © 2024 SK Tutorial. All rights reserved. Mumbai, Maharashtra,
              India.
            </div>
            <div
              style={{ color: "rgba(255,255,255,0.32)", fontSize: "0.82rem" }}
            >
              📞 +91 87790 09398
            </div>
          </div>
        </div>
      </footer>

      {/* ═══ MODALS ══════════════════════════════════════════════════════════ */}
      {selectedCourse && (
        <CourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
      {selectedFaculty && (
        <FacultyModal
          faculty={selectedFaculty}
          onClose={() => setSelectedFaculty(null)}
        />
      )}

      {/* ═══ WHATSAPP FAB ═══════════════════════════════════════════════════ */}
      <a
        href="https://wa.me/918779009398"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        title="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="30" height="30" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}
