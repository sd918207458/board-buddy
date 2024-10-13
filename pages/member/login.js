import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/use-auth";
import Footer from "@/components/footer";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFirebase from "@/hooks/use-firebase"; // 引入自定義的 useFirebase hook

export default function Login() {
  const [email, setEmail] = useState(""); // 使用 email 而不是 username
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuth();
  const { loginGoogle } = useFirebase(); // 使用 Firebase Google 登入方法

  // 將 Firebase 登入結果傳遞到後端

  // 用於解析 JWT 的函數
  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("無法解析 JWT", error);
      return null;
    }
  };

  // Google 登入處理
  const handleGoogleLogin = async () => {
    try {
      loginGoogle(async (user) => {
        const { uid, displayName, email, photoURL } = user;

        const response = await fetch("http://localhost:3005/api/google-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            providerId: "google.com",
            uid,
            displayName,
            email,
            photoURL,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Google 登入成功:", data);
          localStorage.setItem("token", data.data.accessToken);
          router.push("/");
        } else {
          toast.error(data.message || "Google 登入失敗");
        }
      });
    } catch (error) {
      console.error("Google 登入錯誤:", error);
      toast.error("Google 登入失敗，請稍後再試");
    }
  };

  // 本地登入邏輯保持不變
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3005/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // 確保 cookies 被發送
      });

      const data = await response.json();

      if (response.ok && data.data.accessToken) {
        console.log("Access Token:", data.data.accessToken);
        localStorage.setItem("token", data.data.accessToken);

        const decodedToken = parseJwt(data.data.accessToken);

        if (decodedToken && decodedToken.id) {
          setAuth({
            isAuth: true,
            userData: {
              id: decodedToken.id,
              email: decodedToken.email,
            },
          });

          router.push("/");
        } else {
          toast.error("無效的存取令牌");
        }
      } else {
        toast.error(data.message || "登入失敗");
      }
    } catch (error) {
      console.error("錯誤:", error);
      toast.error("登入失敗，請稍後再試");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[#003E52] dark:bg-gray-900">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
          <div
            className="hidden bg-cover lg:block lg:w-1/2"
            style={{
              backgroundImage: 'url("/home_assets/首頁大圖.png")',
            }}
          />
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div className="flex justify-center mx-auto">
              <img className="w-auto h-7 sm:h-8" src="/logo.jfif" alt="Logo" />
            </div>

            <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
              登入
            </p>

            <form onSubmit={handleLogin}>
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="LoggingEmail"
                >
                  電子郵件
                </label>
                <input
                  id="LoggingEmail"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mt-4">
                <div className="flex justify-between">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="loggingPassword"
                  >
                    密碼
                  </label>
                  <a
                    href="forgot-password"
                    className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
                  >
                    忘記密碼?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="loggingPassword"
                    className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 dark:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
              </div>

              {/* 保持登入選項 */}
              <div className="mt-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-200">
                    保持登入狀態
                  </span>
                </label>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className={`w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#003E52] rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 ${
                    isLoading ? "loading" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "登入中..." : "登入"}
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4" />

              <span className="text-xs text-gray-500 uppercase dark:text-gray-400">
                還沒有帳戶嗎?
                <a
                  href="register"
                  className="ml-1 text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                >
                  註冊
                </a>
              </span>

              <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4" />
            </div>

            {/* Google 登入按鈕 */}
            <div className="mt-6">
              <button
                onClick={handleGoogleLogin}
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
              >
                使用 Google 登入
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ToastContainer for react-toastify notifications */}
      <ToastContainer />
      <Footer />
    </>
  );
}
