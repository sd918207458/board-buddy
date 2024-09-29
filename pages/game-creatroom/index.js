import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Createroom() {
  const [gameTitles, setGameTitles] = useState([""]); // 初始为一个空的输入框
  const [formData, setFormData] = useState({
    room_name: "",
    room_intro: "",
    img: null,
    event_date: "",
    minperson: "",
    maxperson: "",
    location: "",
    roomrule: "",
  });
  const [isLoading, setIsLoading] = useState(false); // 加载状态

  const addGameTitle = () => {
    if (gameTitles.length < 3) {
      setGameTitles([...gameTitles, ""]); // 增加一个新的空输入框
    }
  };

  const handleGameTitleChange = (index, value) => {
    const updatedTitles = [...gameTitles];
    updatedTitles[index] = value; // 更新特定索引的游戏标题
    setGameTitles(updatedTitles);
  };

  const handleFileChange = (e) => {

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, img: reader.result }); // 将文件转换为 Base64 字符串
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // 开始加载状态

    // 简单验证
    if (!formData.room_name || !formData.room_intro) {
      alert("请填写所有必需字段！");
      setIsLoading(false); // 结束加载状态
      return;
    }

    if (parseInt(formData.minperson) <= 0 || parseInt(formData.maxperson) <= 0) {
      alert("人数必须大于零！");
      setIsLoading(false); // 结束加载状态
      return;
    }


    const jsonData = {
      room_name: formData.room_name,
      room_intro: formData.room_intro,
      minperson: parseInt(formData.minperson),
      maxperson: parseInt(formData.maxperson),
      event_date: formData.event_date,
      location: formData.location,
      img: formData.img, // Base64 格式的图片
      roomrule: formData.roomrule,
      games: gameTitles, // 游戏标题数组
    };


    try {
      const response = await fetch(`http://localhost:3005/api/gamecreat`, {
        method: "POST",

        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),

      });

      if (response.ok) {
        const data = await response.json();
        console.log("Room created:", data);
        // 重置表单
        setFormData({
          room_name: "",
          room_intro: "",
          img: null,
          event_date: "",
          minperson: "",
          maxperson: "",
          location: "",
          roomrule: "",
        });
        setGameTitles([""]); // 重置游戏标题
        alert("房间创建成功！");
      } else {
        const errorData = await response.json();
        alert(`创建房间失败: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // 结束加载状态
    }
  };

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className="bg-[#003E52] min-h-screen">
        <div className="columns-2 flex m-auto size-4/5 rounded border-2 border-slate-200 p-4 relative">
          <div className="m-auto">
            <form onSubmit={handleSubmit}>
              <div className="pt-3.5">
                <label htmlFor="room_name" className="block text-sm text-gray-500 dark:text-gray-300">揪團標題</label>
                <input
                  type="text"
                  name="room_name"
                  placeholder="請輸入標題"
                  className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-red-400 bg-white px-5 py-2.5 text-gray-700 focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-40 dark:border-red-400 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-red-300"
                  value={formData.room_name}
                  onChange={handleChange}
                />
              </div>
              <div className="pt-3.5">
                <label htmlFor="room_intro" className="block text-sm text-gray-500 dark:text-gray-300">揪團簡介</label>
                <textarea
                  name="room_intro"
                  placeholder="請輸入簡介"
                  className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                  value={formData.room_intro}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="pt-3.5">
                <label htmlFor="img" className="block text-sm text-gray-500 dark:text-gray-300">揪團圖片</label>
                <input
                  type="file"
                  name="img"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  onChange={handleFileChange}
                />
              </div>

              {/* 遊玩遊戲輸入框 */}
              <div className="pt-3.5">
                <label htmlFor="gameTitle" className="block text-sm text-gray-500 dark:text-gray-300">遊玩遊戲</label>
                {gameTitles.map((title, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => handleGameTitleChange(index, e.target.value)}
                      placeholder="請輸入遊玩遊戲"
                      className="block w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    />
                  </div>
                ))}
                <button type="button" className="mt-2 p-2 bg-blue-500 text-white rounded-lg" onClick={addGameTitle}>+</button>
              </div>
              <div className="pt-3.5">
                <label htmlFor="event_date" className="block text-sm text-gray-500 dark:text-gray-300">揪團時間</label>
                <input
                  type="date"
                  name="event_date"
                  className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                  value={formData.event_date}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-between">
                <div className="pt-3.5">
                  <label htmlFor="minperson" className="block text-sm text-gray-500 dark:text-gray-300">最少幾人</label>
                  <input
                    type="number"
                    name="minperson"
                    placeholder="人數"
                    className="block mt-2 w-2/5 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    value={formData.minperson}
                    onChange={handleChange}
                  />
                </div>
                <div className="pt-3.5">
                  <label htmlFor="maxperson" className="block text-sm text-gray-500 dark:text-gray-300">最多幾人</label>
                  <input
                    type="number"
                    name="maxperson"
                    placeholder="人數"
                    className="block mt-2 w-2/5 placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                    value={formData.maxperson}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="pt-3.5">
                <label htmlFor="location" className="block text-sm text-gray-500 dark:text-gray-300">地點</label>
                <input
                  type="text"
                  name="location"
                  placeholder="請輸入地點"
                  className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="pt-3.5">
                <label htmlFor="roomrule" className="block text-sm text-gray-500 dark:text-gray-300">房間規則</label>
                <textarea
                  name="roomrule"
                  placeholder="請輸入房間規則"
                  className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                  value={formData.roomrule}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="mt-4 px-4 py-2 text-white bg-blue-600 rounded">创建房间</button>
              {isLoading && <p>加载中...</p>}
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
