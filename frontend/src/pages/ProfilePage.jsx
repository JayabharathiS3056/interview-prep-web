import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

const ProfilePage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [profilePic, setProfilePic] = useState(user?.profilePic || "");
  const [preview, setPreview] = useState(user?.profilePic || "");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // ← Add this size check
  if (file.size > 2 * 1024 * 1024) {
    setError("Image too large! Please upload an image under 2MB.");
    return;
  }

  const reader = new FileReader();
  reader.onloadend = () => {
    setProfilePic(reader.result);
    setPreview(reader.result);
  };
  reader.readAsDataURL(file);
};

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await axiosInstance.put("/auth/profile", { name, profilePic });
      login({ ...res.data });
      setSuccess("Profile updated successfully! ✅");
    } catch (err) {
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen text-white"
      style={{ background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)" }}>

      {/* Navbar */}
      <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <h1 className="text-2xl font-extrabold text-white">
          Prep<span className="text-yellow-300">AI</span>
        </h1>
        <button onClick={() => navigate("/dashboard")}
          className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm hover:bg-white/20 transition">
          ← Back to Dashboard
        </button>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-extrabold mb-2">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-400">Profile</span>
        </h2>
        <p className="text-white/50 mb-10">Manage your account details and profile picture</p>

        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-3xl p-8 shadow-2xl">

          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-28 h-28 rounded-full border-4 border-yellow-300/50 overflow-hidden bg-white/10 flex items-center justify-center">
                {preview ? (
                  <img src={preview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl">👤</span>
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-gradient-to-r from-yellow-300 to-pink-400 text-indigo-900 text-xs font-bold px-2 py-1 rounded-full cursor-pointer hover:scale-105 transition">
                Edit
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
            <p className="text-white/40 text-xs mt-3">Click "Edit" to upload a profile photo</p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Email</p>
              <p className="text-white font-semibold text-sm">{user?.email}</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Member Since</p>
              <p className="text-white font-semibold text-sm">
                {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              </p>
            </div>
          </div>

          {/* Edit Form */}
          {success && (
            <p className="text-green-400 text-sm bg-green-400/10 py-2 px-4 rounded-xl mb-4 text-center">
              {success}
            </p>
          )}
          {error && (
            <p className="text-red-400 text-sm bg-red-400/10 py-2 px-4 rounded-xl mb-4 text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-white/60 text-sm mb-1 block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                required
              />
            </div>
            <div>
              <label className="text-white/60 text-sm mb-1 block">Email Address</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/40 cursor-not-allowed"
              />
              <p className="text-white/30 text-xs mt-1">Email cannot be changed</p>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-gradient-to-r from-yellow-300 to-pink-400 text-indigo-900 font-bold py-3 rounded-xl hover:scale-105 transition-transform disabled:opacity-60 disabled:scale-100"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;