import React, { useEffect, useState } from 'react';
import EditRoomModal from '@/components/edit_room'; // 确保路径正确


// 假设这些是您的 API 路径
const API_URLS = {
  favorites: 'http://localhost:3005/api/roomheart',
  joinRecords: 'http://localhost:3005/api/joinRecords',
  postRecords: 'http://localhost:3005/api/postRecords',
};



const postRecords = [...Array(6)].map((_, index) => ({
  id: index,
  title: `發文紀錄 ${index + 1}`,
  type: '發文類型',
  image: `https://picsum.photos/200/300?random=${index + 36}`,
}));

// const friendsData = [
//   { name: '小明', avatar: 'https://picsum.photos/50/50?random=1' },
//   { name: '小紅', avatar: 'https://picsum.photos/50/50?random=2' },
//   { name: '小華', avatar: 'https://picsum.photos/50/50?random=3' },
//   { name: '小李', avatar: 'https://picsum.photos/50/50?random=4' },
//   { name: '小張', avatar: 'https://picsum.photos/50/50?random=5' },
// ];

// const messages = {
//   小明: [
//     { from: '我', text: '嗨，小明！' },
//     { from: '小明', text: '你好！' },
//   ],
//   小紅: [
//     { from: '我', text: '小紅，你在嗎？' },
//     { from: '小紅', text: '在的，怎麼了？' },
//   ],
// };

const DrawerComponent = () => {
  const [activeTab, setActiveTab] = useState('已成團');
  const [drawerContent, setDrawerContent] = useState('我的最愛');
  const [favorites, setFavorites] = useState([]);
  const [joinRecords, setJoinRecords] = useState([]);
  const [postRecords, setPostRecords] = useState([]); // 确保初始值是数组
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  // 编辑房间状态
  const [isEditing, setIsEditing] = useState(false);
  const [editingRoomData, setEditingRoomData] = useState(null);


  // 获取我的最爱数据
  const fetchFavorites = async () => {
    try {
      const response = await fetch(API_URLS.favorites);
      const data = await response.json();
      if (Array.isArray(data)) {
        setFavorites(data);
      } else {
        console.error('Favorites data is not an array:', data);
        setFavorites([]);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setFavorites([]);
    }
  };

  // 获取加入记录数据
  const fetchJoinRecords = async () => {
    try {
      const response = await fetch(API_URLS.joinRecords);
      const data = await response.json();
      if (Array.isArray(data)) {
        setJoinRecords(data);
      } else {
        console.error('Join records data is not an array:', data);
        setJoinRecords([]);
      }
    } catch (error) {
      console.error('Error fetching join records:', error);
      setJoinRecords([]);
    }
  };

  // 获取发文记录数据并筛选出 member_id 为 tai 的数据
  const fetchPostRecords = async () => {
    try {
      const response = await fetch(API_URLS.postRecords);
      const data = await response.json();
  
      // 檢查 data 物件是否包含 data 鍵
      if (data && Array.isArray(data.data)) {
        // 篩選出 member_id 為 '李台生' 的記錄
        const filteredData = data.data.filter(record => record.member_id === '李台生');
  
        // 檢查篩選結果
        console.log('Filtered Post Records:', filteredData); // 日誌篩選結果
  
        setPostRecords(filteredData);
      } else {
        console.error('Post records data is not an array:', data);
        setPostRecords([]); // 確保設置為空數組
      }
    } catch (error) {
      console.error('Error fetching post records:', error);
      setPostRecords([]); // 確保設置為空數組
    }
  };
  


  useEffect(() => {
    fetchFavorites();
    fetchJoinRecords();
    fetchPostRecords();

   
    
    const friendsData = [
      { name: '小明', avatar: 'https://picsum.photos/50/50?random=1' },
      { name: '小紅', avatar: 'https://picsum.photos/50/50?random=2' },
      { name: '小華', avatar: 'https://picsum.photos/50/50?random=3' },
      { name: '小李', avatar: 'https://picsum.photos/50/50?random=4' },
      { name: '小張', avatar: 'https://picsum.photos/50/50?random=5' },
    ];
    
    const messages = {
      小明: [
        { from: '我', text: '嗨，小明！' },
        { from: '小明', text: '你好！' },
      ],
      小紅: [
        { from: '我', text: '小紅，你在嗎？' },
        { from: '小紅', text: '在的，怎麼了？' },
      ],
    };
    
    // 设置定时器每5秒更新一次数据
    const interval = setInterval(() => {
      fetchFavorites();
      fetchJoinRecords();
      fetchPostRecords();
    }, 5000); // 5000毫秒 = 5秒

    // 清理定时器
    return () => clearInterval(interval);
  }, []);

  const handleOpenDrawer = (content2) => {
    setDrawerContent(content2);
    console.log("我的最愛",content2);
    document.getElementById('my-drawer-4').checked = true;
  };

  const handleDeletePost = async (room_id) => {
    console.log('Calling handleDeletePost with room_id:', room_id); // 確認調用的 ID
    if (!room_id) {
      console.error('無效的 room_id:', room_id);
      alert('無效的 room_id');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3005/api/gamecreat/${room_id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('刪除失敗:', errorData);
        alert(`刪除失敗: ${errorData.message || '未知錯誤'}`);
        return;
      }
  
      // 刪除成功後更新狀態
      setPostRecords(prevRecords => prevRecords.filter(post => post.room_id !== room_id));
      alert('刪除成功');
    } catch (error) {
      console.error('刪除過程中出錯:', error);
      alert('刪除過程中出錯: ' + error.message);
    }
  };
  
  const handleSubmitFeedback = () => {
    console.log('反饋已送出:', selectedFeedback, description);
    setSelectedFeedback('');
    setDescription('');
  };

  // const handleSendMessage = () => {
  //   if (selectedFriend && newMessage) {
  //     messages[selectedFriend].push({ from: '我', text: newMessage });
  //     setNewMessage('');
  //   }
  // };

  const handleBackToChatList = () => {
    setSelectedFriend(null);
  };
  const handleEditPost = (post) => {
    setEditingRoomData(post);
    setIsEditing(true);
};

const handleSaveEdit = async (editedData) => {
    try {
        const response = await fetch(`http://localhost:3005/api/gamecreat/${editedData.get('room_id')}`, {
            method: 'PUT',
            body: editedData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('更新失败:', errorData);
            alert(`更新失败: ${errorData.message || '未知错误'}`);
            return;
        }

        const updatedPost = await response.json();
        setPostRecords(prevRecords => prevRecords.map(post => post.room_id === updatedPost.room_id ? updatedPost : post));
        alert('更新成功');
    } catch (error) {
        console.error('更新过程中出错:', error);
        alert('更新过程中出错: ' + error.toString());
    } finally {
        setIsEditing(false);
        setEditingRoomData(null);
    }
};

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
  <div className="relative">
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
      <button className="btn tooltip tooltip-left" data-tip="我的最愛" onClick={() => handleOpenDrawer('我的最愛')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#EFB880">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>
      <button className="btn tooltip tooltip-left" data-tip="加入紀錄" onClick={() => handleOpenDrawer('加入紀錄')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#EFB880">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      </button>
      <button className="btn tooltip tooltip-left" data-tip="發文紀錄" onClick={() => handleOpenDrawer('發文紀錄')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#EFB880">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 11.5V7.5a2.5 2.5 0 00-2.5-2.5h-15A2.5 2.5 0 001 7.5v4a2.5 2.5 0 002.5 2.5h15A2.5 2.5 0 0021 11.5z" />
        </svg>
      </button>
      <button className="btn tooltip tooltip-left" data-tip="意見回饋" onClick={() => handleOpenDrawer('意見回饋')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#EFB880">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m-3-3h8a2 2 0 002-2V4a2 2 0 00-2-2H4a2 2 0 00-2 2v6a2 2 0 002 2h8z" />
          </svg>
        </button>
      {/* <button className="btn tooltip tooltip-left" data-tip="聊天室" onClick={() => handleOpenDrawer('聊天室')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#EFB880">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8a9 9 0 1115.556 5.192L21 21l-4.808-1.556A9 9 0 013 8z" />
        </svg>
      </button> */}
    </div>
  </div>
</div>

      <div className="drawer-side" style={{zIndex:50}}>
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-base-200 rounded-box w-1/4 h-full p-4 relative z-10">
          <h2 className="text-xl font-bold mb-4">{drawerContent}</h2>
          {drawerContent === '我的最愛' && (
            <>
              <div className="tabs">
                {['已成團', '未成團', '已滿人'].map(tab => (
                  <a key={tab} className={`tab ${activeTab === tab ? 'tab-active' : ''}`} onClick={() => setActiveTab(tab)}>
                    {tab}
                  </a>
                ))}
              </div>
              <div className="overflow-y-auto h-[calc(100%-6rem)] mt-4">
                <div className="flex flex-col space-y-4">
                  {activeTab === '已成團' && favorites.map((item) => (
                    <div key={item.id} className="card bg-base-100 shadow-xl w-full h-48">
                      <div className="flex h-full">
                        <figure className="w-2/5 h-full">
                          <img src={item.imageUrl} alt="Random" className="object-cover w-full h-full" />
                        </figure>
                        <div className="card-body w-3/5 flex flex-col justify-between">
                          <h2 className="card-title">{item.room_name}</h2>
                          <ul className="list-disc list-inside">
                            <li>地址：{item.location}</li>
                            <li>時間：{item.event_date}</li>
                            <li>遊戲：{item.game1}.遊戲：{item.game2}.遊戲：{item.game3}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                  {activeTab === '未成團' && (
                    <p>尚無資料</p>
                  )}
                  {activeTab === '已滿人' && (
                    <p>尚無資料</p>
                  )}
                </div>
              </div>
            </>
          )}
          {drawerContent === '加入紀錄' && (
            <>
              <div className="tabs">
                {['已成團', '未成團'].map(tab => (
                  <a key={tab} className={`tab ${activeTab === tab ? 'tab-active' : ''}`} onClick={() => setActiveTab(tab)}>
                    {tab}
                  </a>
                ))}
              </div>
              <div className="overflow-y-auto h-[calc(100%-6rem)] mt-4">
                <div className="flex flex-col space-y-4">
                  {activeTab === '已成團' && joinRecords.map((record) => (
                    <div key={record.id} className="card bg-base-100 shadow-xl w-full h-48">
                      <div className="flex h-full">
                        <figure className="w-2/5 h-full">
                          <img src={record.imageUrl} alt="Random" className="object-cover w-full h-full" />
                        </figure>
                        <div className="card-body w-3/5 flex flex-col justify-between">
                          <h2 className="card-title">{record.room_name}</h2>
                          <ul className="list-disc list-inside">
                            <li>地址：{record.location}</li>
                            <li>時間：{record.event_date}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                  {activeTab === '未成團' && (
                    <p>尚無資料</p>
                  )}
                </div>
              </div>
            </>
          )}
          {drawerContent === '發文紀錄' && (
              <>
                <div className="overflow-y-auto h-[calc(100%-6rem)] mt-4">
                  <div className="flex flex-col space-y-4">
                    {postRecords.map((post) => (
                      <div key={post.room_id} className="card bg-base-100 shadow-xl w-full h-48 relative">
                        <div className="flex h-full">
                          <figure className="w-2/5 h-full">
                            <img 
                              src={post.img ? `http://localhost:3005/room/${post.img}` : "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"} 
                              alt="Random" 
                              className="object-cover w-full h-full" 
                            />
                          </figure>
                          <div className="card-body w-3/5 flex flex-col justify-between">
                            <h2 className="card-title">{post.room_name}</h2>
                            <ul className="list-disc list-inside">
                              <li>地址：{post.location}</li>
                              <li>時間：{post.event_date}</li>
                              <li>遊戲：{post.game1}.{post.game2}.{post.game3}</li>
                            </ul>
                            <div className="absolute top-2 right-2 space-x-2">
                            <span 
  className="text-blue-500 underline cursor-pointer" 
  onClick={() => handleEditPost(post)}>編輯
</span>

                              <span 
                                className="text-red-500 underline cursor-pointer" 
                                onClick={() => handleDeletePost(post.room_id)}>刪除
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            {/* 这里添加 EditRoomModal */}
            {isEditing && (
                <EditRoomModal
                  roomData={editingRoomData}
                  onClose={() => setIsEditing(false)}
                  onSave={handleSaveEdit}
                />
              )}


          {drawerContent === '意見回饋' && (
            <div className="flex flex-col w-full">
              <select
                value={selectedFeedback}
                onChange={(e) => setSelectedFeedback(e.target.value)}
                className="select select-bordered w-full mb-4">
                <option value="" disabled>建議...</option>
                <option value="會員問題">會員問題</option>
                <option value="揪團問題">揪團問題</option>
                <option value="其他">其他</option>
              </select>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="請描述您的問題或建議"
                className="textarea textarea-bordered h-72 overflow-y-auto mb-4"
              />
              <div className="flex flex-col w-full">
                <button className="btn btn-primary w-1/4 mb-2 self-end" onClick={handleSubmitFeedback}>
                  送出
                </button>
                <img
                  src="https://via.placeholder.com/150x50?text=謝謝指教"
                  alt="謝謝指教"
                  className="w-full"
                />
              </div>
            </div>
          )}
          {/* {drawerContent === '聊天室' && (
            <div className="w-full">
              {selectedFriend ? (
                <>
                  <div className="flex items-center mb-2">
                    <button onClick={handleBackToChatList} className="text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 inline"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H3m0 0l6 6m-6-6l6-6" />
                      </svg>
                    </button>
                    <span className="ml-2 text-xl font-bold">{selectedFriend}</span>
                  </div>
                  <div className="overflow-y-auto h-[calc(80vh-6rem)] mb-4 w-full">
                    {messages[selectedFriend]?.map((msg, index) => (
                      <div key={index} className={`p-2 ${msg.from === '我' ? 'text-right' : ''}`}>
                        {msg.from !== '我' && <img src={friendsData.find(f => f.name === msg.from).avatar} alt={msg.from} className="inline-block w-8 h-8 rounded-full mr-1" />}
                        <strong>{msg.from !== '我' ? msg.from : ''}:</strong> {msg.text}
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="輸入訊息..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="input input-bordered w-full mb-2"
                  />
                  <button className="btn btn-primary" onClick={handleSendMessage}>發送</button>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="搜尋好友..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full mb-4"
                  />
                  <div className="flex flex-col space-y-2">
                    {friendsData.filter(friend => friend.name.includes(searchTerm)).map((friend, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 border rounded-lg cursor-pointer" onClick={() => setSelectedFriend(friend.name)}>
                        <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full" />
                        <span className="font-semibold">{friend.name}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default DrawerComponent;