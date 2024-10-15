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
    策略: [
        "智謀戰",
        "戰略王",
        "權力爭奪",
        "兵臨城下",
        "謀略之路",
        "智者挑戰",
        "兵法爭雄",
        "計謀遊戲",
        "策略巔峰",
        "勝者為王",
        "智勇雙全",
        "圍城之戰",
        "王者策略",
        "反擊計劃",
        "謀略之心"
    ],
    合作: [
        "團隊協作",
        "共贏時刻",
        "密室逃脫",
        "攜手同行",
        "共同冒險",
        "合作挑戰",
        "團結力量",
        "一起打拼",
        "攜手共創",
        "挑戰極限",
        "心心相印",
        "共赴危機",
        "齊心協力",
        "合作之路",
        "朋友之間"
    ],
    推理: [
        "解謎之旅",
        "謎團破解",
        "追尋真相",
        "推理大師",
        "探偵之路",
        "陰謀追蹤",
        "心機遊戲",
        "智慧解碼",
        "破解密碼",
        "線索探索",
        "真相大白",
        "推理迷局",
        "暗影追尋",
        "謎底揭曉",
        "推理之光"
    ],
    陣營: [
        "勢力對抗",
        "派系博弈",
        "陣營之爭",
        "陣線風雲",
        "力量對決",
        "敵友難辨",
        "戰隊爭霸",
        "鬥智鬥勇",
        "合縱連橫",
        "盟友計畫",
        "策略聯盟",
        "陣營爭奪",
        "陣容布局",
        "派系之戰",
        "陣營操控"
    ],
    益智: [
        "智慧挑戰",
        "腦洞大開",
        "思維遊戲",
        "拼圖大師",
        "智力考驗",
        "挑戰思維",
        "巧思奇謀",
        "益智遊樂",
        "腦力激盪",
        "智商對決",
        "解謎挑戰",
        "思維碰撞",
        "腦筋急轉",
        "智慧迷宮",
        "解鎖智慧"
    ],
    多人: [
        "多人狂歡",
        "齊聚一堂",
        "團體遊戲",
        "一起嗨",
        "好友大戰",
        "競技場",
        "多人對決",
        "群雄逐鹿",
        "聯盟挑戰",
        "爭奪賽",
        "挑戰朋友",
        "集結戰隊",
        "鬥智鬥勇",
        "一起遊玩",
        "共創佳績"
    ],
    派對: [
        "派對狂歡",
        "趣味時光",
        "歡樂時刻",
        "派對遊戲",
        "娛樂大會",
        "歡聚一堂",
        "趣味競賽",
        "派對競技",
        "友誼賽",
        "聚會遊戲",
        "狂歡夜",
        "快樂時光",
        "派對計畫",
        "嬉鬧遊戲",
        "輕鬆聚會"
    ],
    小品: [
        "小品集錦",
        "短篇故事",
        "趣味小遊戲",
        "輕鬆一刻",
        "小品大師",
        "短暫樂趣",
        "隨手小品",
        "趣味隨想",
        "小品隨心",
        "小而美",
        "隨機小遊",
        "短暫快樂",
        "小品之光",
        "生活小品",
        "短暫旅程"
    ]
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
                  <label className="mr-4 text-gray-300">
                    <input
                      type="radio"
                      name="room_type"
                      value="1"
                      className="mr-1 "
                      onChange={handleChange}
                    />
                    Home
                  </label>
                  <label className="text-gray-300">
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

