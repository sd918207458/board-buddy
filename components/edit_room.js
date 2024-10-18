import React, { useState, useEffect } from 'react';

const gameCategories = [
  "策略", "合作", "推理", "陣營", "益智", "多人", "派對", "小品"
];

const gameTitles = {
  策略: [
      "智謀戰", "戰略王", "權力爭奪", "兵臨城下", "謀略之路",
      "智者挑戰", "兵法爭雄", "計謀遊戲", "策略巔峰", "勝者為王",
      "智勇雙全", "圍城之戰", "王者策略", "反擊計劃", "謀略之心"
  ],
  合作: [
      "團隊協作", "共贏時刻", "密室逃脫", "攜手同行", "共同冒險",
      "合作挑戰", "團結力量", "一起打拼", "攜手共創", "挑戰極限",
      "心心相印", "共赴危機", "齊心協力", "合作之路", "朋友之間"
  ],
  推理: [
      "解謎之旅", "謎團破解", "追尋真相", "推理大師", "探偵之路",
      "陰謀追蹤", "心機遊戲", "智慧解碼", "破解密碼", "線索探索",
      "真相大白", "推理迷局", "暗影追尋", "謎底揭曉", "推理之光"
  ],
  陣營: [
      "勢力對抗", "派系博弈", "陣營之爭", "陣線風雲", "力量對決",
      "敵友難辨", "戰隊爭霸", "鬥智鬥勇", "合縱連橫", "盟友計畫",
      "策略聯盟", "陣營爭奪", "陣容布局", "派系之戰", "陣營操控"
  ],
  益智: [
      "智慧挑戰", "腦洞大開", "思維遊戲", "拼圖大師", "智力考驗",
      "挑戰思維", "巧思奇謀", "益智遊樂", "腦力激盪", "智商對決",
      "解謎挑戰", "思維碰撞", "腦筋急轉", "智慧迷宮", "解鎖智慧"
  ],
  多人: [
      "多人狂歡", "齊聚一堂", "團體遊戲", "一起嗨", "好友大戰",
      "競技場", "多人對決", "群雄逐鹿", "聯盟挑戰", "爭奪賽",
      "挑戰朋友", "集結戰隊", "鬥智鬥勇", "一起遊玩", "共創佳績"
  ],
  派對: [
      "派對狂歡", "趣味時光", "歡樂時刻", "派對遊戲", "娛樂大會",
      "歡聚一堂", "趣味競賽", "派對競技", "友誼賽", "聚會遊戲",
      "狂歡夜", "快樂時光", "派對計畫", "嬉鬧遊戲", "輕鬆聚會"
  ],
  小品: [
      "小品集錦", "短篇故事", "趣味小遊戲", "輕鬆一刻", "小品大師",
      "短暫樂趣", "隨手小品", "趣味隨想", "小品隨心", "小而美",
      "隨機小遊", "短暫快樂", "小品之光", "生活小品", "短暫旅程"
  ]
};

const EditRoomModal = ({ roomData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    room_name: "",
    room_intro: "",
    event_date: "",
    minperson: "",
    maxperson: "",
    location: "",
    roomrule: "",
    img: null,
    room_type: "1",
  });

  const [gameOptions, setGameOptions] = useState([{ category: "", title: "" }]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (roomData) {
      setFormData({
        room_name: roomData.room_name,
        room_intro: roomData.room_intro,
        event_date: roomData.event_date,
        minperson: roomData.minperson,
        maxperson: roomData.maxperson,
        location: roomData.location,
        roomrule: roomData.roomrule,
        img: roomData.img,
        room_type: roomData.room_type,
      });

      // 如果房间数据中有游戏选项，可以初始化游戏选项
      if (roomData.gameOptions) {
        setGameOptions(roomData.gameOptions);
      }
    }
  }, [roomData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const addGameOption = () => {
    if (gameOptions.length < 3) {
      setGameOptions([...gameOptions, { category: "", title: "" }]);
    }
  };

  const handleSave = () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // 创建 FormData 对象
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    formDataToSend.append('room_id', roomData.room_id); // 添加 room_id

    // 添加游戏选项到 FormData
    gameOptions.forEach((option, index) => {
      formDataToSend.append(`gameOptions[${index}][category]`, option.category);
      formDataToSend.append(`gameOptions[${index}][title]`, option.title);
    });

    onSave(formDataToSend);
    onClose();
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.room_name) errors.room_name = "房间名称是必填的";
    if (!data.minperson) errors.minperson = "最少人数是必填的";
    if (!data.maxperson) errors.maxperson = "最多人数是必填的";
    if (data.minperson && data.maxperson && data.minperson > data.maxperson) {
      errors.maxperson = "最多人数必须大于最少人数";
    }
    return errors;
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
  <div className="bg-white p-5 rounded-md w-full max-w-md shadow-lg overflow-auto max-h-[90vh]">
    <h2 className="text-lg font-bold">編輯房間</h2>

    <div className="mb-2">
      <label className="block text-sm text-gray-700">房間名稱</label>
      <input
        type="text"
        name="room_name"
        value={formData.room_name}
        onChange={handleChange}
        placeholder="房間名稱"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.room_name && <span className="text-red-500">{errors.room_name}</span>}
    </div>

    <div className="mb-2">
      <label className="block text-sm text-gray-700">房間介紹</label>
      <textarea
        name="room_intro"
        value={formData.room_intro}
        onChange={handleChange}
        placeholder="房間介紹"
        className="w-full p-2 border border-gray-300 rounded"
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
    <label className="block text-sm text-gray-500 dark:text-gray-300">
        遊戲選項
    </label>
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


    <div className="mb-2">
      <label className="block text-sm text-gray-700">活動日期</label>
      <input
        type="date"
        name="event_date"
        value={formData.event_date}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>

    <div className="mb-2">
      <label className="block text-sm text-gray-700">最少人數</label>
      <input
        type="number"
        name="minperson"
        value={formData.minperson}
        onChange={handleChange}
        placeholder="最少人數"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.minperson && <span className="text-red-500">{errors.minperson}</span>}
    </div>

    <div className="mb-2">
      <label className="block text-sm text-gray-700">最多人數</label>
      <input
        type="number"
        name="maxperson"
        value={formData.maxperson}
        onChange={handleChange}
        placeholder="最多人數"
        className="w-full p-2 border border-gray-300 rounded"
      />
      {errors.maxperson && <span className="text-red-500">{errors.maxperson}</span>}
    </div>

    <div className="mb-2">
      <label className="block text-sm text-gray-700">活動地點</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="活動地點"
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>

    <div className="mb-2">
      <label className="block text-sm text-gray-700">揪團規則</label>
      <textarea
        name="roomrule"
        value={formData.roomrule}
        onChange={handleChange}
        placeholder="揪團規則"
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>

    <div className="pt-3.5 mb-5">
      <label className="block text-sm text-gray-500">揪團類型</label>
      <div className="flex items-center mt-2">
        <label className="mr-4">
          <input
            type="radio"
            name="room_type"
            value="1"
            checked={formData.room_type === "1"}
            onChange={handleChange}
            className="mr-1"
          />
          Home Game
        </label>
        <label>
          <input
            type="radio"
            name="room_type"
            value="2"
            checked={formData.room_type === "2"}
            onChange={handleChange}
            className="mr-1"
          />
          桌遊店
        </label>
      </div>
    </div>

    <div className="flex justify-between">
      <button 
        onClick={handleSave} 
        className="px-4 py-2 bg-blue-500 text-white rounded transition duration-300 hover:bg-blue-600"
      >
        保存
      </button>
      <button 
        onClick={onClose} 
        className="px-4 py-2 bg-gray-500 text-white rounded transition duration-300 hover:bg-gray-600"
      >
        取消
      </button>
    </div>
  </div>
</div>

  );
};

export default EditRoomModal;
