import axios from "axios";

const API_URL = "https://erp-clouds-backend.onrender.com/api";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ✅ List files
export const getFiles = async (folderId = null) => {
  try {
    const params = {};
    if (folderId) params.parentId = folderId;

    const res = await axios.get(`${API_URL}/files`, {
      headers: getAuthHeaders(),
      params,
    });

    return res.data; // return only data for easier handling
  } catch (err) {
    console.error("getFiles error:", err);
    throw err;
  }
};

// ✅ Upload single file
export const uploadFile = async (formData, folderId = null) => {
  try {
    const url = folderId
      ? `${API_URL}/files/upload?folderId=${folderId}`
      : `${API_URL}/files/upload`;

    const res = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...getAuthHeaders(),
      },
    });

    return res.data;
  } catch (err) {
    console.error("uploadFile error:", err);
    throw err;
  }
};

// ✅ Upload folder (multiple files)
export const uploadFolder = async (formData, folderId = null) => {
  try {
    const url = folderId
      ? `${API_URL}/files/upload-folder?folderId=${folderId}`
      : `${API_URL}/files/upload-folder`;

    const res = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...getAuthHeaders(),
      },
    });

    return res.data; // contains { folder: {...}, files: [...] }
  } catch (err) {
    console.error("uploadFolder error:", err);
    throw err;
  }
};

// ✅ Delete file
export const deleteFile = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/files/${id}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (err) {
    console.error("deleteFile error:", err);
    throw err;
  }
};

// ✅ Rename file
export const renameFile = async (id, name) => {
  try {
    const res = await axios.patch(
      `${API_URL}/files/${id}`,
      { name },
      { headers: getAuthHeaders() }
    );
    return res.data;
  } catch (err) {
    console.error("renameFile error:", err);
    throw err;
  }
};

// ✅ Share file (POST fixed)
export const shareFile = async (id) => {
  try {
    const res = await axios.get(`/api/files/${id}/share`);
    return { url: res.data.link }; // wrap in { url }
  } catch (err) {
    console.error("shareFile error:", err);
    throw err;
  }
};
