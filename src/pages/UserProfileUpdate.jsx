// src/pages/UserProfileUpdate.jsx
import React, { useState, useEffect } from "react";
import { getCurrentUser, updateUserProfile, uploadAvatar } from "../api/userApi";

export default function UserProfileUpdate() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        if (!data) throw new Error("User data is missing");
        setUser(data);
        setName(data.name || "");
        setPhone(data.phone || "");
        setAvatar(data.avatar_url || null);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError("Failed to load user profile");
      }
    };
    fetchUser();
  }, []);

  // Handle avatar change
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadAvatar(file);
      setAvatar(url);
    } catch (err) {
      console.error("Avatar upload failed:", err);
      setError("Avatar upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Save profile
  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedUser = await updateUserProfile({ name, phone, avatar_url: avatar });
      setUser(updatedUser);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update failed:", err);
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>Loading user profile...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex flex-col items-center mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-2">
          {avatar ? (
            <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No Avatar
            </div>
          )}
        </div>
        <label className="cursor-pointer text-blue-500">
          {uploading ? "Uploading..." : "Change Avatar"}
          <input type="file" className="hidden" onChange={handleAvatarChange} />
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Phone</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
