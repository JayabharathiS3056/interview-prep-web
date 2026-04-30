import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ role: "", experience: "", description: "" });
  const [error, setError] = useState("");

  // Fetch all sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axiosInstance.get("/sessions");
        setSessions(res.data);
      } catch (err) {
        console.error("Failed to fetch sessions", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();
    setError("");
    setCreating(true);
    try {
      const res = await axiosInstance.post("/sessions", form);
      setSessions([res.data.session, ...sessions]);
      setShowModal(false);
      setForm({ role: "", experience: "", description: "" });
      navigate(`/session/${res.data.session._id}`);
    } catch (err) {
      setError("Failed to create session. Try again.");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this session?")) return;
    try {
      await axiosInstance.delete(`/sessions/${id}`);
      setSessions(sessions.filter((s) => s._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="min-h-screen text-white"
      style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}>

      {/* ── Navbar ── */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-extrabold text-white">
          Prep<span className="text-yellow-300">AI</span>
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-white/70 text-sm">
            👋 Hello,{" "}
            <span className="text-yellow-300 font-semibold">{user?.name}</span>
          </span>
          <button
            onClick={handleLogout}
            className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm hover:bg-red-500/20 hover:border-red-400 transition"
          >
            Logout
          </button>
          
{/* Profile button */}
<button onClick={() => navigate("/profile")}
  className="flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm hover:bg-white/20 transition">
  {user?.profilePic
    ? <img src={user.profilePic} className="w-6 h-6 rounded-full object-cover" alt="pic" />
    : <span>👤</span>}
  Profile
</button>

        </div>
      </nav>

      {/* ── Body ── */}
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Header Row */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-extrabold">
              My{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400">
                Sessions
              </span>
            </h2>
            <p className="text-white/50 mt-1">
              All your interview prep sessions in one place
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-yellow-300 to-pink-400 text-indigo-900 font-bold px-6 py-3 rounded-full shadow-xl hover:scale-105 transition-transform"
          >
            + New Session
          </button>
        </div>

        {/* Sessions Grid */}
        {loading ? (
          <div className="text-center text-white/50 py-20 text-lg">
            Loading sessions...
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No sessions yet!
            </h3>
            <p className="text-white/50 mb-6">
              Create your first session to start preparing
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-yellow-300 to-pink-400 text-indigo-900 font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
            >
              Create First Session
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <div
                key={session._id}
                onClick={() => navigate(`/session/${session._id}`)}
                className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-6 cursor-pointer hover:border-yellow-300/50 hover:bg-white/15 transition group"
              >
                {/* Role Badge */}
                <span className="inline-block bg-yellow-300/20 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full mb-4 tracking-widest uppercase">
                  {session.role}
                </span>

                <h3 className="text-xl font-bold text-white mb-1">
                  {session.role}
                </h3>
                <p className="text-white/50 text-sm mb-1">
                  Experience: {session.experience}
                </p>
                {session.description && (
                  <p className="text-white/40 text-xs mb-4 line-clamp-2">
                    {session.description}
                  </p>
                )}

                <div className="flex justify-between items-center mt-4">
                  <span className="text-white/30 text-xs">
                    {new Date(session.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </span>
                  <div className="flex gap-2">
                    <span className="text-xs bg-indigo-500/30 text-indigo-300 px-3 py-1 rounded-full">
                      {session.questions?.length || 0} Q&A
                    </span>
                    <button
                      onClick={(e) => handleDelete(session._id, e)}
                      className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full hover:bg-red-500/40 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── New Session Modal ── */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-extrabold text-white">
                New{" "}
                <span className="text-yellow-300">Session</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/50 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm bg-red-400/10 py-2 px-4 rounded-xl mb-4">
                {error}
              </p>
            )}

            <form onSubmit={handleCreateSession} className="space-y-4">
              <div>
                <label className="text-white/60 text-sm mb-1 block">Job Role *</label>
                <input
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  required
                />
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1 block">Experience Level *</label>
                <select
                  value={form.experience}
                  onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  className="w-full bg-indigo-900 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  required
                >
                  <option value="">Select experience</option>
                  <option value="Fresher">Fresher (0 years)</option>
                  <option value="1 year">1 Year</option>
                  <option value="2 years">2 Years</option>
                  <option value="3 years">3 Years</option>
                  <option value="5+ years">5+ Years</option>
                </select>
              </div>
              <div>
                <label className="text-white/60 text-sm mb-1 block">
                  Description <span className="text-white/30">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. React, Node.js, System Design focus..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                />
              </div>
              <button
                type="submit"
                disabled={creating}
                className="w-full bg-gradient-to-r from-yellow-300 to-pink-400 text-indigo-900 font-bold py-3 rounded-xl hover:scale-105 transition-transform disabled:opacity-60 disabled:scale-100"
              >
                {creating ? "⏳ Generating with AI..." : "Generate Q&A 🚀"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;