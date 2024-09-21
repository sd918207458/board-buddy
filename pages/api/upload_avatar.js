import { useState } from "react";

const AvatarUpload = () => {
  const [imageSrc, setImageSrc] = useState(
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
  );
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // 當選擇文件時觸發
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setErrorMessage(""); // 清除錯誤信息
    }
  };

  // 上傳圖片到後端
  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("請選擇一個檔案。");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.status === "success") {
        setImageSrc(result.profile_picture_url); // 更新頭像
        setSelectedFile(null); // 清除已選檔案
      } else {
        setErrorMessage("上傳失敗: " + result.message);
      }
    } catch (error) {
      setErrorMessage("上傳錯誤: " + error.message);
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
            className="btn btn-outline btn-neutral bg-[#036672] border-none text-white hover:bg-[#024c52]"
            onClick={handleUpload}
          >
            上傳
          </button>
        </label>
      </div>
      {errorMessage && <div className="mt-2 text-red-500">{errorMessage}</div>}
    </div>
  );
};

export default AvatarUpload;
