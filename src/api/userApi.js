import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const res = await axios.get(`${API_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.data || !res.data.user) {
      console.error("Backend response:", res.data);
      throw new Error("User data is missing");
    }

    return res.data.user;
  } catch (err) {
    console.error("getCurrentUser error:", err);
    throw err;
  }
};

// Update user profile
export const updateUserProfile = async ({ name, phone, avatar_url }) => {
  try {
    const res = await axios.put(
      `${API_URL}/api/auth/me`,
      { name, phone, avatar_url },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    if (!res.data || !res.data.user) {
      throw new Error("Failed to update profile");
    }
    return res.data.user;
  } catch (err) {
    console.error("updateUserProfile error:", err);
    throw err;
  }
};

// Upload avatar file
export const uploadAvatar = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios.post(`${API_URL}/api/upload/avatar`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    if (!res.data || !res.data.url) {
      throw new Error("Avatar upload failed");
    }
    return res.data.url;
  } catch (err) {
    console.error("uploadAvatar error:", err);
    throw err;
  }
};
