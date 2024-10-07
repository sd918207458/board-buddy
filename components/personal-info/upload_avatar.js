import { useState } from "react";

// 使用 debounce 防止多次請求
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

export default function UploadAvatar({ onUpload }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = ({ target: { files } }) => {
    const selectedFile = files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  // 拖拽上傳處理
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setPreviewUrl(URL.createObjectURL(droppedFile));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadStatus("請選擇一張圖片上傳");
      return;
    }

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await fetch(
        "http://localhost:3005/api/users/upload-avatar",
        {
          method: "POST",
          body: formData,
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = await response.json();
      if (result.status === "success") {
        const avatarUrl = result.data.avatar;
        setUploadStatus("上傳成功！");
        onUpload(avatarUrl); // 通知父組件更新頭像 URL
        setFile(null); // 清除選擇的檔案
        setPreviewUrl(""); // 清除預覽
      } else if (result.message) {
        setUploadStatus(`上傳失敗: ${result.message}`);
      } else {
        setUploadStatus("上傳失敗，請重試。");
      }
    } catch (error) {
      setUploadStatus("上傳失敗，請檢查網絡連線。");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <h1 className="text-xl font-semibold text-[#003E52] mb-4">上傳頭像</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div
          className={`w-full h-48 border-dashed border-2 rounded-lg flex flex-col items-center justify-center p-4 mb-4 transition-all duration-300 ${
            isDragOver ? "border-[#036672] bg-gray-100" : "border-gray-400"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {previewUrl ? (
            <div className="avatar mb-4">
              <div className="ring-primary ring-[#036672] ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                <img
                  src={previewUrl}
                  alt="圖片預覽"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-600 text-center">
                拖拽圖片到此處，或點擊選擇圖片
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs mb-4"
                />
              </p>
            </>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full bg-[#036672] hover:bg-[#024c52]"
        >
          上傳
        </button>
      </form>
      {uploadStatus && (
        <p
          className={`mt-4 text-center ${
            uploadStatus.includes("失敗") ? "text-red-500" : "text-green-500"
          }`}
        >
          {uploadStatus}
        </p>
      )}
    </div>
  );
}
