import axios from "axios";

const API_URL = "http://localhost:8080/api";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ✅ List folders
export const getFolders = async (parentId = null) => {
  try {
    const params = {};
    if (parentId) params.parentId = parentId;

    const res = await axios.get(`${API_URL}/folders`, {
      headers: getAuthHeaders(),
      params,
    });

    return res.data;
  } catch (err) {
    console.error("getFolders error:", err);
    throw err;
  }
};

// ✅ Create folder
export const createFolder = async (name, parentId = null) => {
  try {
    const body = { name };
    if (parentId) body.parentId = parentId;

    const res = await axios.post(`${API_URL}/folders`, body, {
      headers: getAuthHeaders(),
    });

    return res.data;
  } catch (err) {
    console.error("createFolder error:", err);
    throw err;
  }
};

// ✅ Delete folder
export const deleteFolder = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/folders/${id}`, {
      headers: getAuthHeaders(),
    });
    return res.data;
  } catch (err) {
    console.error("deleteFolder error:", err);
    throw err;
  }
};

// ✅ Rename folder
export const renameFolder = async (id, name) => {
  try {
    const res = await axios.patch(
      `${API_URL}/folders/${id}`,
      { name },
      { headers: getAuthHeaders() }
    );
    return res.data;
  } catch (err) {
    console.error("renameFolder error:", err);
    throw err;
  }
};

// ✅ Share folder (POST fixed)
export const shareFolder = async (id) => {
  try {
    const res = await axios.get(`/api/folders/${id}/share`);
    return { url: res.data.link }; // wrap in { url } so frontend works
  } catch (err) {
    console.error("shareFolder error:", err);
    throw err;
  }
};
