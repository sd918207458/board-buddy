import { useState } from "react";

export default function UploadAvatar({ onUpload }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = ({ target: { files } }) => {
    const selectedFile = files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
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
        onUpload(avatarUrl); // 更新頭像 URL
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
        {previewUrl && (
          <div className="avatar mt-4 w-24 h-24 rounded-full border">
            <img
              src={previewUrl}
              alt="圖片預覽"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <button type="submit" className="btn btn-primary mt-4">
          上傳
        </button>
      </form>
      {uploadStatus && <p className="mt-4 text-red-500">{uploadStatus}</p>}
    </div>
  );
}
