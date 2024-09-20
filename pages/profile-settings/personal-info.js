import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import AvatarUpload from "@/components/personal-info/upload_avatar";

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
  const [avatarUrl, setAvatarUrl] = useState(""); // Track avatar upload URL
  const [submitMessage, setSubmitMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };

    fetchData();
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle avatar upload result
  const handleAvatarUpload = (url) => {
    setAvatarUrl(url); // Store uploaded avatar URL
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
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Form validation
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      // Add avatar URL to formData before submission
      const completeFormData = { ...formData, avatarUrl };

      const response = await fetch("/api/save-personal-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeFormData),
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
        setAvatarUrl(""); // Clear avatar after successful submission
      } else {
        setErrorMessage(result.message || "提交失敗，請重試！");
      }
    } catch (error) {
      setErrorMessage("提交失敗，請重試！");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52]">
        <div className="card w-full max-w-lg mx-auto bg-white shadow-lg lg:max-w-4xl rounded-lg">
          <section className="p-6">
            <Breadcrumbs />
            <h2 className="text-2xl font-semibold text-[#003E52] text-center">
              個人資料設定
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Avatar Upload */}
              <AvatarUpload onUpload={handleAvatarUpload} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Username */}
                <div className="form-control">
                  <label className="label" htmlFor="username">
                    使用者名稱
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="form-control">
                  <label className="label" htmlFor="phone">
                    電話號碼
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label" htmlFor="emailAddress">
                    電子郵件
                  </label>
                  <input
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label" htmlFor="password">
                    密碼
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* First Name */}
                <div className="form-control">
                  <label className="label" htmlFor="first_name">
                    名字
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Last Name */}
                <div className="form-control">
                  <label className="label" htmlFor="last_name">
                    姓氏
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Birthday */}
                <div className="form-control">
                  <label className="label" htmlFor="birthday">
                    生日
                  </label>
                  <DatePicker1
                    id="birthday"
                    name="birthday"
                    value={formData.birthday}
                    onChange={(date) =>
                      handleChange({
                        target: { name: "birthday", value: date },
                      })
                    }
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                {/* Gender */}
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

                {/* Game Type */}
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

                {/* Play Time */}
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

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className={`btn btn-primary w-full bg-[#036672] hover:bg-[#024c52] ${
                    isSubmitting ? "loading" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "提交中..." : "保存修改"}
                </button>
              </div>

              {/* Error/Success Messages */}
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
