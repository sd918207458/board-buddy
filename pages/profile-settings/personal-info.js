import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import dynamic from "next/dynamic";
import { CSSTransition } from "react-transition-group";

// 動態加載 DatePicker1 來避免 SSR 問題
const DatePicker1 = dynamic(() => import("@/components/datepicker"), {
  ssr: false,
});

export default function PersonalInfo() {
  const [gender, setGender] = useState("");
  const [gameType, setGameType] = useState("");
  const [playTime, setPlayTime] = useState("");
  const [gameTypes, setGameTypes] = useState([]);
  const [playTimes, setPlayTimes] = useState([]);
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
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 使用 useEffect 確保只在客戶端渲染
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gameTypesRes, playTimesRes] = await Promise.all([
          fetch("/game_type.json"),
          fetch("/play_time.json"),
        ]);

        const gameTypesData = await gameTypesRes.json();
        const playTimesData = await playTimesRes.json();

        setGameTypes(gameTypesData.gameTypes || []);
        setPlayTimes(playTimesData.timeSlots || []);
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

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      setTimeout(() => {
        setSubmitMessage("提交成功！資料已儲存。");
        setErrorMessage("");
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
      }, 2000);
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
        <div className="card w-full max-w-lg mx-auto overflow-hidden bg-white dark:bg-gray-800 shadow-lg lg:max-w-4xl rounded-lg">
          <div className="w-full p-4">
            <Breadcrumbs />
          </div>

          <section className="p-6">
            <h2 className="text-2xl font-semibold text-[#003E52] dark:text-white text-center">
              個人資料設定
            </h2>

            <form onSubmit={handleSubmit}>
              {/* 上傳頭像 */}
              <div className="form-control my-4 items-center">
                <label className="label text-gray-700 dark:text-gray-300">
                  上傳頭像
                </label>
                <div className="flex items-center space-x-4">
                  <div className="avatar">
                    <div className="w-24 rounded-full ring ring-[#036672] ring-offset-base-100 ring-offset-2">
                      <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                  </div>
                  <label htmlFor="file" className="flex items-center">
                    <input type="file" id="file" className="hidden" />
                    <button className="btn btn-outline btn-neutral bg-[#036672] border-none text-white hover:bg-[#024c52]">
                      上傳 & 移除
                    </button>
                  </label>
                </div>
              </div>

              {/* 使用者資料輸入 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* 動態生成輸入欄位 */}
                {[
                  {
                    id: "username",
                    label: "使用者名稱",
                    type: "text",
                    required: true,
                  },
                  {
                    id: "phone",
                    label: "手機號碼",
                    type: "tel",
                    required: true,
                  },
                  {
                    id: "emailAddress",
                    label: "電子信箱",
                    type: "email",
                    required: true,
                  },
                  {
                    id: "password",
                    label: "密碼",
                    type: "password",
                    required: true,
                  },
                  { id: "first_name", label: "姓氏", type: "text" },
                  { id: "last_name", label: "名字", type: "text" },
                ].map((field) => (
                  <div className="form-control" key={field.id}>
                    <label
                      htmlFor={field.id}
                      className="label text-gray-700 dark:text-gray-300"
                    >
                      <span className="label-text">
                        {field.label}{" "}
                        {field.required && (
                          <span className="text-red-500">*</span>
                        )}
                      </span>
                    </label>
                    <input
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      value={formData[field.id]}
                      onChange={handleChange}
                      className="input input-bordered border-[#036672] focus:border-[#024c52]"
                      required={field.required}
                    />
                  </div>
                ))}

                {/* 生日選擇 */}
                <div className="form-control">
                  <label className="label text-gray-700 dark:text-gray-300">
                    <span className="label-text">
                      生日 <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    id="birthday"
                    name="birthday"
                    type="date"
                    value={formData.birthday}
                    onChange={handleChange}
                    className="input input-bordered border-[#036672] focus:border-[#024c52]"
                    required
                  />
                </div>

                {/* 性別選擇 */}
                <div className="form-control">
                  <label className="label text-gray-700 dark:text-gray-300">
                    <span className="label-text">
                      性別 <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="select select-bordered border-[#036672] focus:border-[#024c52] w-full mt-4"
                    required
                  >
                    <option disabled value="">
                      請選擇
                    </option>
                    <option value="male">男</option>
                    <option value="female">女</option>
                    <option value="other">其他</option>
                  </select>
                </div>

                {/* 喜歡的遊戲類型選擇 */}
                <div className="form-control">
                  <label className="label text-gray-700 dark:text-gray-300">
                    <span className="label-text">喜歡的遊戲類型</span>
                  </label>
                  <select
                    className="select select-bordered border-[#036672] focus:border-[#024c52] w-full"
                    value={gameType}
                    onChange={(e) => setGameType(e.target.value)}
                  >
                    <option disabled value="">
                      請選擇
                    </option>
                    {gameTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 常玩時段選擇 */}
                <div className="form-control">
                  <label className="label text-gray-700 dark:text-gray-300">
                    <span className="label-text">常玩時段</span>
                  </label>
                  <select
                    className="select select-bordered border-[#036672] focus:border-[#024c52] w-full"
                    value={playTime}
                    onChange={(e) => setPlayTime(e.target.value)}
                  >
                    <option disabled value="">
                      請選擇
                    </option>
                    {playTimes.map((time) => (
                      <option key={time.day} value={time.day}>
                        {time.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 錯誤消息 */}
              <CSSTransition
                in={!!errorMessage}
                timeout={300}
                classNames="fade"
                unmountOnExit
              >
                <div className="mt-4 text-center text-red-500">
                  {errorMessage}
                </div>
              </CSSTransition>

              {/* 成功訊息 */}
              <CSSTransition
                in={!!submitMessage}
                timeout={300}
                classNames="fade"
                unmountOnExit
              >
                <div className="mt-4 text-center text-green-500">
                  {submitMessage}
                </div>
              </CSSTransition>

              {/* 保存修改按鈕 */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className={`btn btn-primary w-full bg-[#036672] hover:bg-[#024c52] border-none ${
                    isSubmitting ? "loading" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "提交中..." : "保存修改"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
