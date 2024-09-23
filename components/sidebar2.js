import { useState } from 'react';

const images = {
  已成團: [...Array(6)].map((_, index) => `https://picsum.photos/200/300?random=${index}`),
  未成團: [...Array(6)].map((_, index) => `https://picsum.photos/200/300?random=${index + 6}`),
  已滿人: [...Array(6)].map((_, index) => `https://picsum.photos/200/300?random=${index + 12}`),
};

const historyImages = {
  已成團: [...Array(6)].map((_, index) => `https://picsum.photos/200/300?random=${index + 18}`),
  未成團: [...Array(6)].map((_, index) => `https://picsum.photos/200/300?random=${index + 24}`),
};

const postRecords = [...Array(6)].map((_, index) => ({
  id: index,
  title: `發文紀錄 ${index + 1}`,
  type: '發文類型',
  image: `https://picsum.photos/200/300?random=${index + 36}`,
}));

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

const DrawerComponent = () => {
  const [activeTab, setActiveTab] = useState('已成團');
  const [drawerContent, setDrawerContent] = useState('我的最愛');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState('');
  const [description, setDescription] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const handleOpenDrawer = (content) => {
    setDrawerContent(content);
    document.getElementById('my-drawer-4').checked = true; // 打開抽屜
  };

  const handleSubmitFeedback = () => {
    console.log('反饋已送出:', selectedFeedback, description);
    setSelectedFeedback('');
    setDescription('');
  };

  const handleSendMessage = () => {
    if (selectedFriend && newMessage) {
      messages[selectedFriend].push({ from: '我', text: newMessage });
      setNewMessage('');
    }
  };

  const handleBackToChatList = () => {
    setSelectedFriend(null);
  };

  const handleDeletePost = (id) => {
    if (window.confirm('是否刪除此筆揪團？')) {
      console.log(`刪除發文紀錄 ID: ${id}`);
      // 此處可加入刪除邏輯
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
      <button className="btn tooltip tooltip-left" data-tip="聊天室" onClick={() => handleOpenDrawer('聊天室')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#EFB880">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8a9 9 0 1115.556 5.192L21 21l-4.808-1.556A9 9 0 013 8z" />
        </svg>
      </button>
    </div>
  </div>
</div>

      <div className="drawer-side">
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
                  {images[activeTab].map((src, index) => (
                    <div key={index} className="card bg-base-100 shadow-xl w-full h-48">
                      <div className="flex h-full">
                        <figure className="w-2/5 h-full">
                          <img src={src} alt="Random" className="object-cover w-full h-full" />
                        </figure>
                        <div className="card-body w-3/5 flex flex-col justify-between">
                          <h2 className="card-title">標題 {index + 1}</h2>
                          <ul className="list-disc list-inside">
                            <li>類型：動作</li>
                            <li>地址：某地點</li>
                            <li>時間：{new Date().toLocaleString()}</li>
                            <li>遊戲：大冒險</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
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
                  {historyImages[activeTab].map((src, index) => (
                    <div key={index} className="card bg-base-100 shadow-xl w-full h-48">
                      <div className="flex h-full">
                        <figure className="w-2/5 h-full">
                          <img src={src} alt="Random" className="object-cover w-full h-full" />
                        </figure>
                        <div className="card-body w-3/5 flex flex-col justify-between">
                          <h2 className="card-title">加入紀錄 {index + 1}</h2>
                          <ul className="list-disc list-inside">
                            <li>類型：冒險</li>
                            <li>地址：某地點</li>
                            <li>時間：{new Date().toLocaleString()}</li>
                            <li>遊戲：偉大的冒險</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          {drawerContent === '發文紀錄' && (
            <div className="overflow-y-auto h-[calc(100%-6rem)] mt-4">
              <div className="flex flex-col space-y-4">
                {postRecords.map((record) => (
                  <div key={record.id} className="card bg-base-100 shadow-xl w-full h-48 relative">
                    <div className="flex h-full">
                      <figure className="w-2/5 h-full">
                        <img src={record.image} alt="Random" className="object-cover w-full h-full" />
                      </figure>
                      <div className="card-body w-3/5 flex flex-col justify-between">
                        <h2 className="card-title">{record.title}</h2>
                        <ul className="list-disc list-inside">
                          <li>類型：{record.type}</li>
                          <li>時間：{new Date().toLocaleString()}</li>
                          <li>內容：這是發文的詳細描述。</li>
                        </ul>
                        <div className="absolute top-2 right-2 flex space-x-2">
  <button
    className="text-lightgray hover:font-bold hover:underline text-xs"
    onClick={() => handleEdit(record.id)}
  >
    編輯
  </button>
  <button
    className="text-lightgray hover:font-bold hover:underline text-xs"
    onClick={() => handleDeletePost(record.id)}
  >
    刪除
  </button>
</div>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
          {drawerContent === '聊天室' && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default DrawerComponent;
