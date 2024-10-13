import React, { useState, useEffect } from 'react';

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
    }
  }, [roomData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      <div className="bg-white p-5 rounded-md w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold">编辑房间</h2>

        <input
          type="text"
          name="room_name"
          value={formData.room_name}
          onChange={handleChange}
          placeholder="房间名称"
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />
        {errors.room_name && <span className="text-red-500">{errors.room_name}</span>}

        <textarea
          name="room_intro"
          value={formData.room_intro}
          onChange={handleChange}
          placeholder="房间介绍"
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />

        <input
          type="date"
          name="event_date"
          value={formData.event_date}
          onChange={handleChange}
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />

        <input
          type="number"
          name="minperson"
          value={formData.minperson}
          onChange={handleChange}
          placeholder="最少人数"
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />
        {errors.minperson && <span className="text-red-500">{errors.minperson}</span>}

        <input
          type="number"
          name="maxperson"
          value={formData.maxperson}
          onChange={handleChange}
          placeholder="最多人数"
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />
        {errors.maxperson && <span className="text-red-500">{errors.maxperson}</span>}

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="活动地点"
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />
        
        <textarea
          name="roomrule"
          value={formData.roomrule}
          onChange={handleChange}
          placeholder="揪团规则"
          className="w-full mb-2 p-2 border border-gray-300 rounded"
        />

        <div className="pt-3.5 mb-5">
          <label className="block text-sm text-gray-500">揪团类型</label>
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
              桌游店
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
