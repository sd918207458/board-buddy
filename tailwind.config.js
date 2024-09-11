/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryColor: {
          DEFAULT: "#5C6FC7", // 默認主色
          dark: '#4D5DA7',   // 暗色版本
        } ,    //board-buddy:primary color
        secondaryColor:{
          DEFAULT: "#F9C748", // 默認主色
          light: '#FAD065',   // 亮色版本
        } ,    //board-buddy:secondary color
      },
    },
  },
  plugins: [daisyui],
};
