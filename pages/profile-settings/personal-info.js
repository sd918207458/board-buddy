import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import InputField from "@/components/personal-info/InputField";
import AvatarUpload from "@/components/personal-info/upload_avatar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 動態導入日期選擇器，避免 SSR 問題
const DatePicker1 = dynamic(() => import("@/components/datepicker"), {
  ssr: false,
});

export default function PersonalInfo() {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    emailAddress: "",
    first_name: "",
    last_name: "",
    birthday: "",
    gender: "",
    favorite_games: "", // 新增欄位
    preferred_play_times: "", // 新增欄位
  });

  const [avatarUrl, setAvatarUrl] = useState(""); // 用來顯示頭像
  const [isSubmitting, setIsSubmitting] = useState(false);

  const gameOptions = [
    "策略遊戲",
    "合作遊戲",
    "派對遊戲",
    "冒險遊戲",
    "推理解謎遊戲",
    "卡牌遊戲",
    "經濟遊戲",
    "區域控制遊戲",
    "建設遊戲",
    "骰子遊戲",
    "劇本殺/推理遊戲",
    "家庭遊戲",
    "輕策略遊戲",
    "重策略遊戲",
  ];

  const playTimeOptions = [
    "早上 (6 AM - 12 PM)",
    "下午 (12 PM - 4 PM)",
    "傍晚 (4 PM - 6 PM)",
    "晚上 (6 PM - 9 PM)",
    "深夜 (9 PM - 12 AM)",
    "凌晨 (12 AM - 3 AM)",
    "周末白天 (Sat & Sun, 10 AM - 6 PM)",
    "周末晚上 (Sat & Sun, 6 PM - 12 AM)",
  ];

  // 初次加載時取得用戶數據
  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const response = await fetch("http://localhost:3005/api/users/check", {
          method: "GET",
          credentials: "include", // 攜帶 httpOnly cookie
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || "獲取用戶資料失敗");
        }

        const userInfoData = await response.json();
        if (userInfoData.status === "success") {
          const user = userInfoData.data.user || {};
          setFormData({
            username: user.username || "",
            phone: user.phone_number || "",
            emailAddress: user.email || "",
            first_name: user.first_name || "",
            last_name: user.last_name || "",
            birthday: user.date_of_birth || "",
            gender: user.gender || "",
            favorite_games: user.favorite_games || "", // 填入喜歡的遊戲類型
            preferred_play_times: user.preferred_play_times || "", // 填入常玩時段
          });
          setAvatarUrl(user.avatar || "");
        }
      } catch (error) {
        console.error("Failed to load data:", error.message);
        toast.error("無法加載會員資料，請重試。");
      }
    };

    fetchMemberData();
  }, []);

  // 更新表單的資料
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 表單提交處理
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const completeFormData = { ...formData, avatar: avatarUrl };
      const response = await fetch("http://localhost:3005/api/users/update", {
        method: "PUT", // 使用 PUT 方法進行更新
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 攜帶 cookie
        body: JSON.stringify(completeFormData),
      });

      const result = await response.json();
      if (result.status === "success") {
        toast.success("提交成功！資料已儲存。");
      } else {
        toast.error(result.message || "提交失敗，請重試！");
      }
    } catch (error) {
      toast.error("提交失敗，請重試！");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52] relative">
        <div className="card w-full max-w-lg mx-auto bg-white shadow-lg lg:max-w-4xl rounded-lg">
          <section className="p-6">
            <Breadcrumbs />
            <h2 className="text-2xl font-semibold text-[#003E52] text-center">
              個人資料設定
            </h2>
            <AvatarUpload onUpload={setAvatarUrl} avatarUrl={avatarUrl} />
            <form onSubmit={handleSubmit}>
              <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
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
                {/* 喜歡的遊戲類型 */}
                <div className="form-control">
                  <label className="label" htmlFor="favorite_games">
                    喜歡的遊戲類型
                  </label>
                  <select
                    id="favorite_games"
                    name="favorite_games"
                    value={formData.favorite_games}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                  >
                    <option value="" disabled>
                      請選擇
                    </option>
                    {gameOptions.map((game, index) => (
                      <option key={index} value={game}>
                        {game}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 常玩時段 */}
                <div className="form-control">
                  <label className="label" htmlFor="preferred_play_times">
                    常玩時段
                  </label>
                  <select
                    id="preferred_play_times"
                    name="preferred_play_times"
                    value={formData.preferred_play_times}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                  >
                    <option value="" disabled>
                      請選擇
                    </option>
                    {playTimeOptions.map((time, index) => (
                      <option key={index} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className={`btn btn-primary mt-6 w-full bg-[#036672] hover:bg-[#024c52] ${
                  isSubmitting ? "loading" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "提交中..." : "保存修改"}
              </button>
            </form>
          </section>
        </div>
      </div>

      {/* ToastContainer for notifications */}
      <ToastContainer />
      <Footer />
    </>
  );
}
