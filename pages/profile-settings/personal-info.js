import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/NavbarSwitcher";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import InputField from "@/components/personal-info/InputField";
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
  const [avatarUrl, setAvatarUrl] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [gameTypesRes, playTimesRes, userInfoRes] = await Promise.all([
          fetch("/api/game-types"),
          fetch("/api/play-times"),
          fetch("http://localhost:3005/api/users", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        const [gameTypesData, playTimesData, userInfoData] = await Promise.all([
          gameTypesRes.json(),
          playTimesRes.json(),
          userInfoRes.json(),
        ]);

        if (userInfoData.status === "success") {
          const { user } = userInfoData.data;
          setFormData({
            username: user.username,
            phone: user.phone,
            emailAddress: user.email,
            password: "",
            first_name: user.first_name,
            last_name: user.last_name,
            birthday: user.birthday,
            gender: user.gender,
            gameType: user.gameType,
            playTime: user.playTime,
          });
          setAvatarUrl(user.avatar);
        }

        setGameTypes(gameTypesData || []);
        setPlayTimes(playTimesData || []);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const {
      username,
      phone,
      emailAddress,
      birthday,
      gender,
      gameType,
      playTime,
    } = formData;
    if (
      !username ||
      !phone ||
      !emailAddress ||
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
      const completeFormData = { ...formData, avatar: avatarUrl };
      const response = await fetch("http://localhost:3005/api/users/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(completeFormData),
      });

      const result = await response.json();
      if (result.status === "success") {
        setSubmitMessage("提交成功！資料已儲存。");
      } else {
        setErrorMessage(result.message || "提交失敗，請重試！");
      }
    } catch (error) {
      setErrorMessage("提交失敗，請重試！");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>加載中...</div>;
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
            <AvatarUpload onUpload={setAvatarUrl} />
            <form onSubmit={handleSubmit}>
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
                  className={`btn btn-primary w-full bg-[#036672] hover:bg-[#024c52] ${
                    isSubmitting ? "loading" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "提交中..." : "保存修改"}
                </button>
              </div>

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
