import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ImageUpload from "@/hooks/useAvatar";
import InputField from "@/components/personal-info/InputField";

const DatePicker1 = dynamic(() => import("@/components/datepicker"), {
  ssr: false,
});

export default function PersonalInfo() {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    emailAddress: "",
    password: "",
    first_name: "",
    last_name: "",
    birthday: "",
    gender: "",
    gameType: "",
    playTime: "",
  });

  const [gameTypes, setGameTypes] = useState([]);
  const [playTimes, setPlayTimes] = useState([]);
  const [submitMessage, setSubmitMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  // 獨立追蹤頭像狀態
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarMessage, setAvatarMessage] = useState("");

  // Fetch game types and play times on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gameTypesRes, playTimesRes] = await Promise.all([
          fetch("/api/game-types"),
          fetch("/api/play-times"),
        ]);

        const gameTypesData = await gameTypesRes.json();
        const playTimesData = await playTimesRes.json();
        setGameTypes(gameTypesData || []);
        setPlayTimes(playTimesData || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load data", error);
        setLoading(false);
      }
    };

    fetchData();
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle avatar upload
  const handleAvatarUpload = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (result.status === "success") {
        setAvatarUrl(result.data.avatar);
        setAvatarMessage("頭像已成功上傳！");
      } else {
        setAvatarMessage("頭像上傳失敗");
      }
    } catch (error) {
      setAvatarMessage("頭像上傳過程出錯，請重試");
    }
  };

  const validateForm = () => {
    const {
      username,
      phone,
      emailAddress,
      password,
      birthday,
      gender,
      gameType,
      playTime,
    } = formData;
    if (
      !username ||
      !phone ||
      !emailAddress ||
      !password ||
      !birthday ||
      !gender ||
      !gameType ||
      !playTime
    ) {
      return "所有欄位都是必填的";
    }
    if (!/\S+@\S+\.\S+/.test(emailAddress)) {
      return "請輸入有效的電子郵件地址";
    }
    if (!/^\d{10}$/.test(phone)) {
      return "請輸入有效的手機號碼";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/save-personal-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage("提交成功！資料已儲存。");
        setFormData({
          username: "",
          phone: "",
          emailAddress: "",
          password: "",
          first_name: "",
          last_name: "",
          birthday: "",
          gender: "",
          gameType: "",
          playTime: "",
        });
      } else {
        setErrorMessage(result.message || "提交失敗，請重試！");
      }
    } catch (error) {
      setErrorMessage("提交失敗，請重試！");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted || loading) {
    return <div>加載中...</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52]">
        <div className="card w-full max-w-lg mx-auto bg-white shadow-lg lg:max-w-4xl rounded-lg">
          <section className="p-6">
            <Breadcrumbs />
            <h2 className="text-2xl font-semibold text-[#003E52] text-center">
              個人資料設定
            </h2>

            <form onSubmit={handleSubmit}>
              <ImageUpload
                onUpload={handleAvatarUpload}
                avatarMessage={avatarMessage}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField
                  label="使用者名稱"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="電話號碼"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <InputField
                  label="電子郵件"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  type="email"
                  required
                />
                <InputField
                  label="密碼"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  type="password"
                  required
                />
                <InputField
                  label="名字"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                <InputField
                  label="姓氏"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
                <InputField
                  label="生日"
                  name="birthday"
                  value={formData.birthday}
                  onChange={handleChange}
                  type="date"
                  required
                />

                <div className="form-control">
                  <label className="label" htmlFor="gender">
                    性別
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>
                      請選擇
                    </option>
                    <option value="male">男</option>
                    <option value="female">女</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="gameType">
                    最喜歡的遊戲類型
                  </label>
                  <select
                    id="gameType"
                    name="gameType"
                    value={formData.gameType}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>
                      請選擇
                    </option>
                    {gameTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label" htmlFor="playTime">
                    常玩時段
                  </label>
                  <select
                    id="playTime"
                    name="playTime"
                    value={formData.playTime}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="" disabled>
                      請選擇
                    </option>
                    {playTimes.map((time) => (
                      <option key={time.id} value={time.id}>
                        {time.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className={`btn btn-primary w-full bg-[#036672]                   hover:bg-[#024c52] ${
                    isSubmitting ? "loading" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "提交中..." : "保存修改"}
                </button>
              </div>

              {/* 錯誤/成功訊息 */}
              {errorMessage && (
                <p className="text-red-500 mt-4">{errorMessage}</p>
              )}
              {submitMessage && (
                <p className="text-green-500 mt-4">{submitMessage}</p>
              )}
            </form>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
