import { useEffect, useState } from 'react';

// 假设这些是您的 API 路径
const API_URLS = {
  favorites: 'http://localhost:3005/api/roomheart',
  joinRecords: 'http://localhost:3005/api/joinRecords',
  postRecords: 'http://localhost:3005/api/postRecords',
};

const DrawerComponent = () => {
  const [activeTab, setActiveTab] = useState('已成團');
  const [drawerContent, setDrawerContent] = useState('我的最愛');
  const [favorites, setFavorites] = useState([]);
  const [joinRecords, setJoinRecords] = useState([]);
  const [postRecords, setPostRecords] = useState([]); // 确保初始值是数组

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

  // 获取发文记录数据
  const fetchPostRecords = async () => {
    try {
      const response = await fetch(API_URLS.postRecords);
      const data = await response.json();
      if (Array.isArray(data)) {
        setPostRecords(data);
      } else {
        console.error('Post records data is not an array:', data);
        setPostRecords([]); // 确保设置为数组
      }
    } catch (error) {
      console.error('Error fetching post records:', error);
      setPostRecords([]); // 确保设置为数组
    }
  };

  useEffect(() => {
    fetchFavorites();
    fetchJoinRecords();
    fetchPostRecords();

    // 设置定时器每5秒更新一次数据
    const interval = setInterval(() => {
      fetchFavorites();
      fetchJoinRecords();
      fetchPostRecords();
    }, 5000); // 5000毫秒 = 5秒

    // 清理定时器
    return () => clearInterval(interval);
  }, []);

  const handleOpenDrawer = (content) => {
    setDrawerContent(content);
    document.getElementById('my-drawer-4').checked = true;
  };

  const handleDeletePost = (id) => {
    if (window.confirm('是否刪除此筆揪團？')) {
      console.log(`刪除發文紀錄 ID: ${id}`);
      // 此处可加入删除逻辑
    }
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Drawer Button */}
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
                {activeTab === '已成團' && joinRecords.map((item) => (
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
              </div>
            </>
          )}
          {drawerContent === '發文紀錄' && (
            <>
              <div className="overflow-y-auto h-[calc(100%-6rem)] mt-4">
                {postRecords.map((item) => (
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
                        <button onClick={() => handleDeletePost(item.id)} className="btn btn-danger">刪除</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrawerComponent;