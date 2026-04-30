import { useState } from "react";
import { Link } from "react-router-dom";
import { Element } from "react-scroll";
import Navbar from "../components/Navbar";
import heroImg from "../assets/hero-img.jpg";

const LandingPage = () => {
  const [isDark, setIsDark] = useState(true);

  const theme = {
    bg: isDark
      ? "linear-gradient(135deg, #0f0c29, #302b63, #24243e)"
      : "linear-gradient(135deg, #e0e7ff, #f0f4ff, #ffffff)",
    text: isDark ? "text-white" : "text-indigo-900",
    subtext: isDark ? "text-white/60" : "text-indigo-700/70",
    card: isDark ? "bg-white/10 border-white/10" : "bg-white border-indigo-200 shadow-md",
    cardHover: isDark ? "hover:border-yellow-300/40" : "hover:border-indigo-400",
    stepCard: isDark
      ? "bg-white/5 border-white/10 hover:bg-white/10"
      : "bg-white border-indigo-100 hover:bg-indigo-50 shadow-sm",
    featureCard: isDark
      ? "from-indigo-500/20 to-purple-500/20 border-white/10"
      : "from-indigo-100 to-purple-100 border-indigo-200",
    ctaBg: isDark
      ? "from-yellow-300/20 to-pink-400/20 border-yellow-300/30"
      : "from-yellow-100 to-pink-100 border-yellow-300",
    footer: isDark ? "text-white/40 border-white/10" : "text-indigo-400 border-indigo-200",
    stepNum: isDark ? "text-yellow-300/30" : "text-indigo-200",
    overlay: isDark
      ? "from-black/90 via-black/60 to-black/10"
      : "from-black/70 via-black/40 to-black/5",
  };

  return (
    <div className="font-sans transition-all duration-500" style={{ background: theme.bg }}>
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      {/* ───── HERO ───── */}
      <Element name="hero">
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <img
            src={heroImg}
            alt="PrepAI Hero"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${theme.overlay}`} />
          <div className="relative z-10 text-white max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-xl">
              <span className="inline-block bg-yellow-300/20 text-yellow-300 text-xs font-bold px-4 py-1 rounded-full mb-4 tracking-widest uppercase">
                AI-Powered Interview Prep
              </span>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
                Ace Your Next{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400">
                  Interview
                </span>{" "}
                with AI
              </h1>
              <p className="text-white/70 text-lg mb-8 max-w-lg">
                Generate personalized interview questions, get AI-powered answers,
                pin important topics, and study smarter — all in one place.
              </p>
              <div className="flex gap-4">
                <Link to="/register"
                  className="bg-gradient-to-r from-yellow-300 to-pink-400 text-indigo-900 font-bold px-8 py-3 rounded-full shadow-xl hover:scale-105 transition-transform">
                  Get Started Free
                </Link>
                <Link to="/login"
                  className="border border-white/30 text-white px-8 py-3 rounded-full hover:bg-white/10 transition">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Element>

      {/* ───── ABOUT ───── */}
      <Element name="about">
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-4xl font-extrabold mb-3 ${theme.text}`}>
              Why <span className="text-yellow-400">PrepAI?</span>
            </h2>
            <p className={`text-lg max-w-xl mx-auto ${theme.subtext}`}>
              We combine the power of AI with a clean, focused study experience
              so you walk into every interview fully confident.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🤖", title: "AI-Generated Q&A", desc: "Get 10+ high-quality interview questions instantly based on your role and experience." },
              { icon: "📌", title: "Pin & Review", desc: "Pin the questions that matter most and revisit them anytime with ease." },
              { icon: "💡", title: "Smart Explanations", desc: "Don't understand an answer? Get a simple AI breakdown in seconds." },
            ].map((card, i) => (
              <div key={i} className={`backdrop-blur rounded-2xl p-6 border transition ${theme.card} ${theme.cardHover}`}>
                <div className="text-4xl mb-3">{card.icon}</div>
                <h3 className={`text-xl font-bold mb-2 ${theme.text}`}>{card.title}</h3>
                <p className={theme.subtext}>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Element>

      {/* ───── EXPLORE / HOW IT WORKS ───── */}
      <Element name="explore">
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className={`text-4xl font-extrabold mb-3 ${theme.text}`}>
              How It <span className="text-pink-400">Works</span>
            </h2>
            <p className={`text-lg ${theme.subtext}`}>Three simple steps to interview success</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Create Account", desc: "Register in seconds with your name, email and password." },
              { step: "02", title: "Start a Session", desc: "Enter your job role and experience level. Let AI do the rest." },
              { step: "03", title: "Study & Ace It", desc: "Review Q&A, pin key questions, take notes and get AI explanations." },
            ].map((item, i) => (
              <div key={i} className={`border rounded-2xl p-6 transition ${theme.stepCard}`}>
                <span className={`text-5xl font-black ${theme.stepNum}`}>{item.step}</span>
                <h3 className={`text-xl font-bold mt-3 mb-2 ${theme.text}`}>{item.title}</h3>
                <p className={theme.subtext}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </Element>

      {/* ───── FEATURES ───── */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className={`text-4xl font-extrabold mb-3 ${theme.text}`}>
            Everything You <span className="text-yellow-400">Need</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: "🔐", title: "Secure Auth", desc: "JWT-based login keeps your data safe." },
            { icon: "🎯", title: "Role-Based", desc: "Questions tailored to your exact job role." },
            { icon: "📝", title: "Note Taking", desc: "Add personal notes to any question." },
            { icon: "💾", title: "Auto Saved", desc: "All sessions saved to MongoDB automatically." },
          ].map((f, i) => (
            <div key={i} className={`bg-gradient-to-br border rounded-2xl p-6 hover:scale-105 transition-transform ${theme.featureCard}`}>
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className={`font-bold text-lg mb-1 ${theme.text}`}>{f.title}</h3>
              <p className={`text-sm ${theme.subtext}`}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── CTA BANNER ───── */}
      <section className="py-16 px-6">
        <div className={`max-w-4xl mx-auto text-center bg-gradient-to-r border rounded-3xl p-12 ${theme.ctaBg}`}>
          <h2 className={`text-4xl font-extrabold mb-4 ${theme.text}`}>
            Ready to Ace Your Interview?
          </h2>
          <p className={`mb-6 text-lg ${theme.subtext}`}>
            Join thousands of candidates who prep smarter with PrepAI.
          </p>
          <Link to="/register"
            className="bg-gradient-to-r from-yellow-300 to-pink-400 text-indigo-900 font-bold px-10 py-4 rounded-full text-lg shadow-xl hover:scale-105 transition-transform inline-block">
            Start For Free 🚀
          </Link>
        </div>
      </section>

      {/* ───── FOOTER ───── */}
      <footer className={`text-center py-6 border-t text-sm ${theme.footer}`}>
        © 2026 PrepAI. Built with ❤️ Happy Coding!
      </footer>
    </div>
  );
};

export default LandingPage;