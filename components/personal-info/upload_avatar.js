import React, { useState } from "react";

const AvatarUpload = () => {
  const [imageSrc, setImageSrc] = useState(
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.status === "success") {
        setImageSrc(result.profile_picture_url); // Update displayed avatar
        setSelectedFile(null); // Clear selected file after upload
      } else {
        console.error("Upload failed", result.message);
        alert(result.message); // Show error to user
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("上傳過程中發生錯誤，請稍後再試。"); // Show error to user
    }
  };

  return (
    <div className="form-control my-4 items-center">
      <label className="label text-gray-700 dark:text-gray-300">上傳頭像</label>
      <div className="flex items-center space-x-4">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-[#036672] ring-offset-base-100 ring-offset-2">
            <img src={imageSrc} alt="頭像" />
          </div>
        </div>
        <label htmlFor="file" className="flex items-center">
          <input
            type="file"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="btn btn-outline btn-neutral bg-[#036672] border-none text-white hover:bg-[#024c52]"
            onClick={handleUpload}
          >
            上傳 & 移除
          </button>
        </label>
      </div>
    </div>
  );
};

export default AvatarUpload;
