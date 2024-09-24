import { useState } from "react";

export default function UploadAvatar() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // 定義 selectedFile

    // 檢查檔案並設定預覽
    if (selectedFile) {
      setFile(selectedFile); // 將檔案設置到 state 中
      const preview = URL.createObjectURL(selectedFile); // 為檔案生成 URL 預覽
      setPreviewUrl(preview); // 設定圖片預覽的 URL
    }
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
          credentials: "include", // 確保有認證cookie傳遞
        }
      );

      const result = await response.json();
      if (result.status === "success") {
        setUploadStatus("上傳成功！");
      } else {
        setUploadStatus("上傳失敗，請重試。");
      }
    } catch (error) {
      setUploadStatus("上傳失敗，請檢查網絡連線。");
    }
  };

  return (
    <div>
      <h1>上傳頭像</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <div className="avatar">
          <div className="w-24 rounded-full">
            {previewUrl && <img src={previewUrl} alt="圖片預覽" width="100" />}
            {/* 圖片預覽 */}
          </div>
        </div>
        <button type="submit">上傳</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
}
