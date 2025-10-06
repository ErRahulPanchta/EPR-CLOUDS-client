import React, { useEffect, useState, useCallback } from "react";
import { Folder, File, X, User } from "lucide-react";
import Footer from "../components/Footer";
import {
  getFolders,
  createFolder,
  deleteFolder,
  renameFolder,
  shareFolder,
} from "../api/folderApi";
import {
  getFiles,
  uploadFile,
  uploadFolder,
  deleteFile,
  renameFile,
  shareFile,
} from "../api/fileApi";

export default function Dashboard() {
  const [folderPath, setFolderPath] = useState([]); // array of folders for breadcrumb
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const currentFolder = folderPath[folderPath.length - 1] || null;

  // Fetch folders & files
  const fetchData = async () => {
    setLoading(true);
    try {
      const parentId = currentFolder?.id || null;
      const foldersRes = await getFolders(parentId);
      const filesRes = await getFiles(parentId);
      setFolders(foldersRes || []);
      setFiles(filesRes || []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentFolder]);

  // Upload single file
  const handleUploadFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      await uploadFile(formData, currentFolder?.id);
      fetchData();
    } catch (err) {
      console.error("File upload failed:", err);
    }
  };

  // Upload folder (multiple files)
  const handleUploadFolder = async (e) => {
    const files = e.target.files;
    if (!files.length) return;
    const folderName = prompt("Enter folder name for upload") || "New Folder";
    const formData = new FormData();
    for (const file of files) formData.append("files", file);
    formData.append("folderName", folderName);
    try {
      await uploadFolder(formData, currentFolder?.id);
      fetchData();
    } catch (err) {
      console.error("Folder upload failed:", err);
    }
  };

  // Breadcrumb navigation
  const handleBreadcrumbClick = (index) => {
    setFolderPath(folderPath.slice(0, index + 1));
  };

  // Create folder
  const handleCreateFolder = async () => {
    const name = prompt("Enter folder name");
    if (!name) return;
    try {
      await createFolder(name, currentFolder?.id);
      fetchData();
    } catch (err) {
      console.error("Create folder failed:", err);
    }
  };

  // Rename folder/file
  const handleRename = async (item, type) => {
    const newName = prompt("Enter new name:", item.name);
    if (!newName) return;
    try {
      if (type === "folder") await renameFolder(item.id, newName);
      else await renameFile(item.id, newName);
      fetchData();
    } catch (err) {
      console.error("Rename failed:", err);
    }
  };

  // Delete folder/file
  const handleDelete = async (item, type) => {
    if (!window.confirm(`Delete this ${type}?`)) return;
    try {
      if (type === "folder") await deleteFolder(item.id);
      else await deleteFile(item.id);
      fetchData();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleShare = async (item, type) => {
    try {
      let res;
      if (type === "folder") res = await shareFolder(item.id);
      else res = await shareFile(item.id);

      const link = res.link; // make sure backend sends { link: "..." }
      if (!link) throw new Error("No share link received");

      await navigator.clipboard.writeText(link);
      alert("Share link copied!");
    } catch (err) {
      console.error("Share failed:", err);
      alert("Failed to generate share link");
    }
  };


  // Right-click context menu
  const handleRightClick = (e, item, type) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, item, type });
  };

  // Open folder
  const openFolder = (folder) => setFolderPath([...folderPath, folder]);

  // File preview
  const openPreview = (file) => setPreviewFile(file);
  const closePreview = () => setPreviewFile(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (!previewFile) return;
      const index = files.findIndex((f) => f.id === previewFile.id);
      if (e.key === "Escape") closePreview();
      else if (e.key === "ArrowRight") setPreviewFile(files[index + 1] || files[0]);
      else if (e.key === "ArrowLeft") setPreviewFile(files[index - 1] || files[files.length - 1]);
    },
    [previewFile, files]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const renderPreviewContent = (file) => {
    if (!file) return null;
    const fileUrl = `http://localhost:8080/api/files/${file.id}/download`;
    const type = file.mime_type || "";

    if (type.startsWith("image/"))
      return <img src={fileUrl} alt={file.name} className="max-h-[80vh] mx-auto" />;
    if (type === "application/pdf" || type.startsWith("text/"))
      return <iframe src={fileUrl} title={file.name} className="w-full h-[80vh]" />;
    return (
      <div className="text-center p-6">
        <p>Preview not available.</p>
        <a
          href={fileUrl}
          download={file.name}
          className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
        >
          Download
        </a>
      </div>
    );
  };


  // User actions
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  const goToProfile = () => (window.location.href = "/profile");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="flex justify-between items-center p-4 bg-gray-100 shadow sticky top-0 z-10">
        <h1 className="text-2xl font-bold">My Drive</h1>
        <div className="relative">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white"
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
          >
            <User size={20} />
          </button>
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
              <button onClick={goToProfile} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                Edit Profile
              </button>
              <button onClick={handleLogout} className="block w-full px-4 py-2 text-left hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 p-6 overflow-auto flex flex-col">
        {/* Upload/Create */}
        <div className="flex items-center gap-2 mb-4">
          <label className="cursor-pointer">
            <input type="file" className="hidden" onChange={handleUploadFile} />
            <span className="bg-blue-500 text-white px-3 py-1 rounded">Upload File</span>
          </label>
          <label className="cursor-pointer">
            <input type="file" className="hidden" webkitdirectory="true" directory="true" multiple onChange={handleUploadFolder} />
            <span className="bg-green-500 text-white px-3 py-1 rounded">Upload Folder</span>
          </label>
          <button onClick={handleCreateFolder} className="bg-yellow-500 text-white px-3 py-1 rounded">
            + New Folder
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <span className="cursor-pointer hover:underline" onClick={() => setFolderPath([])}>
            My Drive
          </span>
          {folderPath.map((folder, index) => (
            <React.Fragment key={folder.id}>
              <span>/</span>
              <span
                className={`cursor-pointer hover:underline ${index === folderPath.length - 1 ? "font-bold" : ""}`}
                onClick={() => handleBreadcrumbClick(index)}
              >
                {folder.name}
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Folders & Files */}
        <div className="flex-1">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {folders.map((folder) => (
                <div
                  key={folder.id}
                  className="p-4 border rounded-lg shadow hover:bg-gray-100 cursor-pointer flex flex-col items-center"
                  onClick={() => openFolder(folder)}
                  onContextMenu={(e) => handleRightClick(e, folder, "folder")}
                >
                  <Folder size={32} className="text-yellow-500 mb-2" />
                  <p className="text-sm font-medium text-center truncate">{folder.name}</p>
                </div>
              ))}

              {files.map((file) => (
                <div
                  key={file.id}
                  className="p-4 border rounded-lg shadow hover:bg-gray-100 cursor-pointer flex flex-col items-center"
                  onClick={() => openPreview(file)}
                  onContextMenu={(e) => handleRightClick(e, file, "file")}
                >
                  <File size={32} className="text-blue-500 mb-2" />
                  <p className="text-sm text-center truncate">{file.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Context Menu */}
        {contextMenu && (
          <div
            style={{ top: contextMenu.y, left: contextMenu.x }}
            className="absolute bg-white border rounded shadow-md z-50 p-2"
            onMouseLeave={() => setContextMenu(null)}
          >
            <button
              className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
              onClick={() => { handleRename(contextMenu.item, contextMenu.type); setContextMenu(null); }}
            >
              Rename
            </button>
            <button
              className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
              onClick={() => { handleDelete(contextMenu.item, contextMenu.type); setContextMenu(null); }}
            >
              Delete
            </button>
            <button
              className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
              onClick={() => { handleShare(contextMenu.item, contextMenu.type); setContextMenu(null); }}
            >
              Share
            </button>
          </div>
        )}

        {/* File Preview */}
        {previewFile && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-4 w-11/12 md:w-3/4 lg:w-2/3 relative">
              <button onClick={closePreview} className="absolute top-2 right-2 text-gray-700 hover:text-black">
                <X size={20} />
              </button>
              <h2 className="text-lg font-bold mb-4">{previewFile.name}</h2>
              {renderPreviewContent(previewFile)}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
