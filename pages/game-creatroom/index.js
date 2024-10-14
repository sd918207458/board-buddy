import React, { useState } from "react";
import NavbarSwitcher from "@/components/NavbarSwitcher"; // 使用 NavbarSwitcher 组件
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Createroom() {
  const [username, setUsername] = useState(""); // 用于接收 Navbar 中的 username
  const [gameOptions, setGameOptions] = useState([{ category: "", title: "" }]);
  const [formData, setFormData] = useState({
    room_name: "",
    room_intro: "",
    img: null,
    event_date: "",
    minperson: "",
    maxperson: "",
    location: "",
    roomrule: "",
    room_type: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  // 用于接收从 NavbarSwitcher 传递过来的 username
  const handleUsernameRetrieved = (retrievedUsername) => {
    setUsername(retrievedUsername);
  };

  const gameCategories = ["策略", "合作", "推理", "陣營", "益智", "多人", "派對", "小品"];
  const gameTitles = {
    策略: ["遊戲1-1", "遊戲1-2", "遊戲1-3", "遊戲1-4", "遊戲1-5", "遊戲1-6", "遊戲1-7", "遊戲1-8", "遊戲1-9", "遊戲1-10", "遊戲1-11", "遊戲1-12", "遊戲1-13", "遊戲1-14", "遊戲1-15"],
    合作: ["遊戲2-1", "遊戲2-2", "遊戲2-3", "遊戲2-4", "遊戲2-5", "遊戲2-6", "遊戲2-7", "遊戲2-8", "遊戲2-9", "遊戲2-10", "遊戲2-11", "遊戲2-12", "遊戲2-13", "遊戲2-14", "遊戲2-15"],
    推理: ["遊戲3-1", "遊戲3-2", "遊戲3-3", "遊戲3-4", "遊戲3-5", "遊戲3-6", "遊戲3-7", "遊戲3-8", "遊戲3-9", "遊戲3-10", "遊戲3-11", "遊戲3-12", "遊戲3-13", "遊戲3-14", "遊戲3-15"],
    陣營: ["遊戲4-1", "遊戲4-2", "遊戲4-3", "遊戲4-4", "遊戲4-5", "遊戲4-6", "遊戲4-7", "遊戲4-8", "遊戲4-9", "遊戲4-10", "遊戲4-11", "遊戲4-12", "遊戲4-13", "遊戲4-14", "遊戲4-15"],
    益智: ["遊戲5-1", "遊戲5-2", "遊戲5-3", "遊戲5-4", "遊戲5-5", "遊戲5-6", "遊戲5-7", "遊戲5-8", "遊戲5-9", "遊戲5-10", "遊戲5-11", "遊戲5-12", "遊戲5-13", "遊戲5-14", "遊戲5-15"],
    多人: ["遊戲6-1", "遊戲6-2", "遊戲6-3", "遊戲6-4", "遊戲6-5", "遊戲6-6", "遊戲6-7", "遊戲6-8", "遊戲6-9", "遊戲6-10", "遊戲6-11", "遊戲6-12", "遊戲6-13", "遊戲6-14", "遊戲6-15"],
    派對: ["遊戲7-1", "遊戲7-2", "遊戲7-3", "遊戲7-4", "遊戲7-5", "遊戲7-6", "遊戲7-7", "遊戲7-8", "遊戲7-9", "遊戲7-10", "遊戲7-11", "遊戲7-12", "遊戲7-13", "遊戲7-14", "遊戲7-15"],
    小品: ["遊戲8-1", "遊戲8-2", "遊戲8-3", "遊戲8-4", "遊戲8-5", "遊戲8-6", "遊戲8-7", "遊戲8-8", "遊戲8-9", "遊戲8-10", "遊戲8-11", "遊戲8-12", "遊戲8-13", "遊戲8-14", "遊戲8-15"],
  };

  const handleGameOptionChange = (index, field, value) => {
    const updatedOptions = [...gameOptions];
    updatedOptions[index][field] = value;
    setGameOptions(updatedOptions);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, img: file }); // Store the File object
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    if (!formData.room_name || !formData.room_intro) {
      alert("請填寫所有必需字段！");
      setIsLoading(false);
      return;
    }
  
    if (parseInt(formData.minperson) <= 0 || parseInt(formData.maxperson) <= 0) {
      alert("人數必須大於零！");
      setIsLoading(false);
      return;
    }
  
    const types = gameOptions.map(option => option.category);
    const games = gameOptions.map(option => option.title);
  
    const formDataToSend = new FormData();
    formDataToSend.append("room_name", formData.room_name);
    formDataToSend.append("room_intro", formData.room_intro);
    formDataToSend.append("minperson", parseInt(formData.minperson));
    formDataToSend.append("maxperson", parseInt(formData.maxperson));
    formDataToSend.append("event_date", formData.event_date);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("roomrule", formData.roomrule);
    formDataToSend.append("room_type", formData.room_type);
    formDataToSend.append("member_id", username);
    formDataToSend.append("type1", types[0] || "");
    formDataToSend.append("game1", games[0] || "");
    formDataToSend.append("type2", types[1] || "");
    formDataToSend.append("game2", games[1] || "");
    formDataToSend.append("type3", types[2] || "");
    formDataToSend.append("game3", games[2] || "");
  
    if (formData.img) {
      formDataToSend.append("img", formData.img);
    }
  
    // Debugging: Log FormData contents
    for (const [key, value] of formDataToSend.entries()) {
      console.log(key, value);
    }
  
    try {
      const response = await fetch("http://localhost:3005/api/gamecreat", {
        method: "POST",
        body: formDataToSend,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Room created:", data);
        
        // 清除表单数据
        setFormData({
          room_name: "",
          room_intro: "",
          img: null,
          event_date: "",
          minperson: "",
          maxperson: "",
          location: "",
          roomrule: "",
          room_type: ""
        });
        
        setGameOptions([{ category: "", title: "" }]); // 重置游戏选项
      
        alert("房間創建成功！");
      } else {
        const errorData = await response.json();
        alert(`創建房間失敗: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const addGameOption = () => {
    if (gameOptions.length < 3) {
      setGameOptions([...gameOptions, { category: "", title: "" }]);
    }
  };

  return (
    <>
      <div style={{
        position: 'absolute', // 使用绝对定位
        top: '-200px', // 将其定位到视口上方
        left: '50%', // 水平居中
        transform: 'translateX(-50%)', // 确保居中
        zIndex: -1, // 使其在 z 轴上低于其他元素
      }}>
        <NavbarSwitcher onUsernameRetrieved={handleUsernameRetrieved} />
      </div> 
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
                  className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-red-400 bg-white px-5 py-2.5 text-gray-700 focus:border-red-400 focus:outline-none"
                  value={formData.room_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="pt-3.5">
                <label htmlFor="room_intro" className="block text-sm text-gray-500 dark:text-gray-300">揪團介紹</label>
                <input
                  type="text"
                  name="room_intro"
                  placeholder="請輸入介紹"
                  className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-red-400 bg-white px-5 py-2.5 text-gray-700 focus:border-red-400 focus:outline-none"
                  value={formData.room_intro}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="pt-3.5">
                <label htmlFor="img" className="block text-sm text-gray-500 dark:text-gray-300">揪團圖片</label>
                <input
                  type="file"
                  name="img"
                  className="block mt-2 w-full bg-white border border-gray-400 rounded-lg px-5 py-2.5 text-gray-700 focus:border-gray-500 focus:outline-none"
                  onChange={handleFileChange}
                />
              </div>
              <div className="pt-3.5">
                <label className="block text-sm text-gray-500 dark:text-gray-300">遊戲選項</label>
                {gameOptions.map((option, index) => (
                  <div key={index} className="flex mt-2">
                    <select
                      className="mr-2 block w-full border border-gray-400 rounded-lg px-4 py-2"
                      value={option.category}
                      onChange={(e) => handleGameOptionChange(index, "category", e.target.value)}
                    >
                      <option value="">選擇類型</option>
                      {gameCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <select
                      className="block w-full border border-gray-400 rounded-lg px-4 py-2"
                      value={option.title}
                      onChange={(e) => handleGameOptionChange(index, "title", e.target.value)}
                    >
                      <option value="">選擇遊戲</option>
                      {option.category && gameTitles[option.category].map((title) => (
                        <option key={title} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addGameOption}
                  className="mt-2 text-blue-500 hover:underline"
                >
                  新增遊戲選項
                </button>
              </div>
              <div className="pt-3.5">
                <label className="block text-sm text-gray-500 dark:text-gray-300">揪團類型</label>
                <div className="flex items-center mt-2">
                  <label className="mr-4">
                    <input
                      type="radio"
                      name="room_type"
                      value="1"
                      className="mr-1"
                      onChange={handleChange}
                    />
                    Home
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="room_type"
                      value="2"
                      className="mr-1"
                      onChange={handleChange}
                    />
                    桌遊店
                  </label>
                </div>
              </div>
              <div className="pt-3.5">
                <label htmlFor="event_date" className="block text-sm text-gray-500 dark:text-gray-300">活動日期</label>
                <div className="flex items-center">
                  <input
                    type="date"
                    name="event_date"
                    className="block mt-2 w-full border border-gray-400 rounded-lg px-5 py-2.5 text-gray-700 focus:border-gray-500 focus:outline-none"
                    value={formData.event_date}
                    onChange={handleChange}
                    required
                  />
                  <span className="ml-2 text-gray-500 cursor-pointer">📅</span>
                </div>
              </div>

              <div className="pt-3.5">
                <label htmlFor="minperson" className="block text-sm text-gray-500 dark:text-gray-300">最少幾人</label>
                <input
                  type="number"
                  name="minperson"
                  placeholder="請輸入最少人數"
                  className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 focus:border-gray-500 focus:outline-none"
                  value={formData.minperson}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="pt-3.5">
                <label htmlFor="maxperson" className="block text-sm text-gray-500 dark:text-gray-300">最多幾人</label>
                <input
                  type="number"
                  name="maxperson"
                  placeholder="請輸入最多人數"
                  className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 focus:border-gray-500 focus:outline-none"
                  value={formData.maxperson}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="pt-3.5">
                <label htmlFor="location" className="block text-sm text-gray-500 dark:text-gray-300">活動地點</label>
                <input
                  type="text"
                  name="location"
                  placeholder="請輸入活動地點"
                  className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 focus:border-gray-500 focus:outline-none"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="pt-3.5">
                <label htmlFor="roomrule" className="block text-sm text-gray-500 dark:text-gray-300">揪團規則</label>
                <textarea
                  name="roomrule"
                  placeholder="請輸入揪團規則"
                  className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-400 bg-white px-5 py-2.5 text-gray-700 focus:border-gray-500 focus:outline-none"
                  value={formData.roomrule}
                  onChange={handleChange}
                />
              </div>

            
              
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className={`px-6 py-2 text-white bg-blue-500 rounded-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? '創建中...' : '創建'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

