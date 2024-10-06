import { useState, useEffect } from "react";

export default function ImageUpload({ onUpload }) {
  const [imageSrc, setImageSrc] = useState(
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
  );
  const [selectedImg, setSelectedImg] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImg(file);
    } else {
      setSelectedImg(null);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedImg) {
      setMessage("請先選擇圖片");
      return;
    }

    const fd = new FormData();
    fd.append("avatar", selectedImg);

    try {
      const res = await fetch("/api/users/upload-avatar", {
        method: "POST",
        body: fd,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 添加token以通過authenticate中介軟體
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        setMessage("上傳成功");
        onUpload(`/avatar/${data.data.avatar}`);
      } else {
        setMessage(`上傳失敗: ${data.message}`);
      }
    } catch (error) {
      console.error("上傳失敗", error);
      setMessage("上傳失敗");
    }
  };

  useEffect(() => {
    if (!selectedImg) {
      setPreviewURL("");
      return;
    }

    const objectURL = URL.createObjectURL(selectedImg);
    setPreviewURL(objectURL);

    return () => {
      URL.revokeObjectURL(objectURL);
    };
  }, [selectedImg]);

  return (
    <div className="form-control my-4 items-center">
      <label className="label text-gray-700 dark:text-gray-300">上傳頭像</label>
      <div className="flex items-center space-x-4">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-[#036672] ring-offset-base-100 ring-offset-2">
            <img src={previewURL || imageSrc} alt="頭像" />
          </div>
        </div>
        <label htmlFor="file" className="flex items-center">
          <input
            type="file"
            className="btn btn-outline btn-neutral bg-[#036672] border-none text-white hover:bg-[#024c52]"
            onChange={handleImageChange}
          />
        </label>
        <button
          className="btn btn-outline btn-neutral bg-[#036672] border-none text-white hover:bg-[#024c52]"
          onClick={handleFileUpload}
        >
          上傳到伺服器
        </button>
      </div>
      {message && <p className="text-center text-red-500 mt-4">{message}</p>}
    </div>
  );
}
