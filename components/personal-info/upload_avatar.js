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
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-xl font-semibold mt-6 text-[#003E52]">上傳頭像</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4"
      >
        {previewUrl && (
          <div className="avatar mt-4">
            <div className="ring-primary ring-[#003E52] ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img
                src={previewUrl}
                alt="圖片預覽"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input file-input-bordered file-input-primary w-full max-w-xs "
        />
        <button
          type="submit"
          className="btn btn-primary w-full max-w-xs bg-[#003E52]"
        >
          上傳
        </button>
      </form>
      {uploadStatus && (
        <p className="mt-4 text-red-500 text-center ">{uploadStatus}</p>
      )}
    </div>
  );
}
