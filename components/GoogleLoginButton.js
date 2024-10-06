import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import toast from "react-hot-toast";
import useFirebase from "@/hooks/use-firebase";
import { googleLogin, getUserById, parseJwt } from "@/services/user";

export default function GoogleLoginButton() {
  const { setAuth } = useAuth();
  const { loginGoogleRedirect, initApp } = useFirebase();

  useEffect(() => {
    initApp(callbackGoogleLoginRedirect);
  }, []);

  // Google登入後，處理伺服器回應
  const callbackGoogleLoginRedirect = async (providerData) => {
    try {
      console.log(providerData);

      // 向伺服器進行Google登入
      const res = await googleLogin(providerData);

      if (res.data.status === "success") {
        const jwtUser = parseJwt(res.data.data.accessToken);
        const res1 = await getUserById(jwtUser.id);

        if (res1.data.status === "success") {
          const dbUser = res1.data.data.user;
          const userData = { ...initUserData };

          for (const key in userData) {
            if (Object.hasOwn(dbUser, key)) {
              userData[key] = dbUser[key] || "";
            }
          }

          // 設定登入資料到全域狀態
          setAuth({
            isAuth: true,
            userData,
          });

          toast.success("已成功登入");
        } else {
          toast.error("登入後無法獲取會員資料");
        }
      } else {
        toast.error("登入失敗");
      }
    } catch (error) {
      toast.error("Google登入處理失敗");
      console.error(error);
    }
  };

  // 處理Google登入
  const handleGoogleLogin = () => {
    loginGoogleRedirect();
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
    >
      使用 Google 登入
    </button>
  );
}
