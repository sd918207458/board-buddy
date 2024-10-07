/** @type {import('tailwindcss').Config} */
const daisyui = require("daisyui");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* 擴展自定義顏色 */
        background: "var(--background)" /* 使用全局變量作為顏色 */,
        foreground: "var(--foreground)" /* 使用全局變量作為顏色 */,
      },
    },
  },
  plugins: [daisyui /* DaisyUI 插件 */],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#036672" /* 定義主色調 */,
          secondary: "#024c52" /* 定義輔助色調 */,
          accent: "#f5a623" /* 定義亮點色 */,
          neutral: "#3d4451" /* 定義中性色調 */,
          "base-100": "#ffffff" /* 定義基本背景色 */,
          info: "#3ABFF8" /* 定義信息色 */,
          success: "#36D399" /* 定義成功色 */,
          warning: "#FBBD23" /* 定義警告色 */,
          error: "#F87272" /* 定義錯誤色 */,
        },
      },
    ],
  },
};
