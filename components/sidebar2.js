import React, { useEffect, useState } from 'react';
import EditRoomModal from '@/components/edit_room'; // 确保路径正确
import NavbarSwitcher from "@/components/NavbarSwitcher"; // 使用 NavbarSwitcher 组件++


// 假设这些是您的 API 路径
const API_URLS = {
  favorites: 'http://localhost:3005/api/roomheart',
  joinRecords: 'http://localhost:3005/api/roomhistory',
  postRecords: 'http://localhost:3005/api/gamecreat',
};



const postRecords = [...Array(6)].map((_, index) => ({
  id: index,
  title: `發文紀錄 ${index + 1}`,
  type: '發文類型',
  image: `https://picsum.photos/200/300?random=${index + 36}`,
}));

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
  const [searchResults, setSearchResults] = useState([]);
  const [friendsData, setFriendsData] = useState([]);
  const [messages, setMessages] = useState({}); // 用于存储聊天消息
  const [uuid, setUUID] = useState(''); // 用于存储 UUID
  const [socket, setSocket] = useState(null); // WebSocket 实例
  const [usersId, setUsersId] = useState(''); // 将 usersId 定义为状态
  const [username, setUsername] = useState(""); // 用于接收 Navbar 中的 username++
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    console.log('当前的 messages 结构:', messages);
  }, [messages]); // 监视 messages 的变化

    // 用于接收从 NavbarSwitcher 传递过来的 username++
    const handleUsernameRetrieved = (retrievedUsername) => {
      setUsername(retrievedUsername);
      console.log("888888888Username:", retrievedUsername); // 输出抓取到的 username
      fetchMemberId(retrievedUsername);
    };
  // 点击更新消息
  const handleUpdateMessages = async () => {
    if (selectedFriend) {
      const friend = friendsData.find(friend => friend.username === selectedFriend);
      if (friend) {
        await fetchMessages(usersId, friend.member_id);
      }
    }
  };
    const handleSelectFriend = (friend) => {
      setSelectedFriend(friend.username);
      fetchMessages(usersId, friend.member_id); // 使用好友的 member_id
    };    
  
    const fetchMessages = async (userId, friendId) => {
      console.log("哈囉", { userId, friendId });
      try {
        const response = await fetch('http://localhost:3005/api/getMessages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, friendId }),
        });
    
        const result = await response.json();
        console.log('请求结果:', result); // 输出请求结果
        console.log('使用者:', userId);
        console.log('使用者好友:', friendId);
    
        if (response.ok) {
          // 输出每条消息的 sender_id 和 receiver_id
          result.messages.forEach(msg => {
            console.log(`Sender ID: ${msg.sender_id}, Receiver ID: ${msg.receiver_id}`);
          });

          // 只有当满足任一条件时才更新 messages
          const filteredMessages = result.messages.filter(msg => 
            (userId === msg.sender_id && friendId === msg.receiver_id) ||
            (userId === msg.receiver_id && friendId === msg.sender_id)
          );

          if (filteredMessages.length > 0) {
            setMessages(prevMessages => {
              const updatedMessages = {
                ...prevMessages,
                [friendId]: filteredMessages, // 存储对应 friendId 的消息
              };
              console.log('更新后的消息:', updatedMessages); // 查看更新后的消息
              return updatedMessages;
            });
          }
        }     
        console.log('当前的 messages 结构:', messages);   
      } catch (error) {
        console.error('加载历史消息失败', error);
      }
    };       
// 监听页面可见性变化
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      // 当页面变为可见时，刷新消息
      handleUpdateMessages();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, [selectedFriend, usersId]);

  // 初始化 WebSocket
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');
    setSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket连接已打开');
    };

    ws.onmessage = (res) => {
      const data = JSON.parse(res.data);
      console.log(data);
      if (data.context === 'user') {
        setUUID(data.uuid);
      } else if (data.context === 'message') {
        setMessages(prevMessages => ({
          ...prevMessages,
          [data.from]: [...(prevMessages[data.from] || []), data],
        }));
      }
    };

    return () => {
      ws.close(); // 组件卸载时关闭 WebSocket 连接
    };
  }, []);


  const handleSendMessage = async () => {
    console.log('当前选择的好友:', selectedFriend);
    console.log('好友数据:', friendsData);
  
    if (socket && selectedFriend && newMessage) {
      // 获取选中的好友的 ID
      const friend = friendsData.find(friend => friend.username === selectedFriend);
      if (!friend) {
        console.error('好友未找到');
        return;
      }
  
      const friendId = friend.member_id;

      const messageData = {
        sender_id: usersId,
        receiver_id: friendId,
        content: newMessage,
        context: 'message',
      };
  
      // 发送消息到 WebSocket
      socket.send(JSON.stringify(messageData));
  
      console.log("使用者:", usersId);
      console.log("使用者的好友:", friendId);
  
      // 调用保存消息的函数
      await saveMessageToDatabase(usersId, friendId, newMessage);
  
      // 只在消息的 sender_id 或 receiver_id 匹配时更新 messages
      // if (friendId === usersId || senderId === friendId) {
        setMessages(prevMessages => ({
          ...prevMessages,
          [friendId]: [
            ...(prevMessages[friendId] || []),
            { sender_id: usersId, content: newMessage },
          ],
        }));
      // }
  
      // 清空输入框
      setNewMessage('');
    } else {
      console.error('WebSocket 尚未连接或未选择好友');
    }
  };  
  
  // 保存消息到数据库
  const saveMessageToDatabase = async (userId, friendId, message) => {
    console.error('userId', userId);
    console.error('friendId', friendId);
    console.error('message', message);
    try {
      await fetch('http://localhost:3005/api/saveMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, friendId, message }),
      });
    } catch (error) {
      console.error('保存消息失败', error);
    }
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

  const handleBack = () => {
    setAlertMessage(''); // 清除警示信息
    setDrawerContent('聊天室');
  };

// 獲取登入者的member_id
const fetchMemberId = async (username) => {
  try {
    const response = await fetch('http://localhost:3005/api/getMemberId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    const result = await response.json();
    if (result.status === 'success') {
      console.log('Member ID:', result.member_id);
      // 这里可以将 member_id 存入状态，或者用于后续的逻辑
      setUsersId(result.member_id); // 更新 usersId 状态
    } else {
      console.error(result.message);
    }
  } catch (error) {
    console.error('请求失败', error);
  }
}; 

// 从数据库获取好友列表
const fetchFriends = async (userId) => {
  console.log("发送的 user_id:", userId); // 打印 user_id
  try {
    const response = await fetch('http://localhost:3005/api/friendData', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId })  // 传递 user_id
    });
    
    const friends = await response.json();
    console.log('好友列表请求:', friends);
    
    if (response.ok) {
      setFriendsData(friends.data); // 直接存储 `data` 部分      
    }
    console.log('我的好友:', friends.data);
  } catch (error) {
    console.error('请求失败', error);
  }
};

// 初始化时获取好友列表
useEffect(() => {
  fetchFriends(usersId); // 在初始化时传递 user_id
}, [usersId]);

  // 搜索好友
  const handleAddFriend = async () => {
    console.log("你正在搜尋中");
    try {
      const response = await fetch('http://localhost:3005/api/friend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: searchTerm }), // 假设 searchTerm 是搜索框中的输入值
      });
  
      if (response.ok) {
        const result = await response.json();
  
        // 检查返回的结构并提取 data 字段中的数组
        if (result.status === 'success' && Array.isArray(result.data)) {
          // 根据输入的 username 进行过滤
          const filteredUsers = result.data.filter(user => user.username === searchTerm);
  
          setSearchResults(filteredUsers); // 将筛选后的结果设置到状态中
        } else {
          setSearchResults([]); // 如果没有匹配的用户，设置为空数组
          console.log('Unexpected response format:', result);
        }
      } else {
        console.log('搜索失败，状态码:', response.status);
      }
    } catch (error) {
      console.error('请求失败', error);
    }
  };  

  // 请求好友
  const handleFriendRequest = async (friendId) => {
    console.log("friendId:", friendId);
    try {
      const response = await fetch('http://localhost:3005/api/FriendRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: usersId, friend_id: friendId })  // 示例数据
      });
      
      const result = await response.json();
      // 输出请求结果
      console.log('请求结果:', result);  // 这里输出 result
      
      if (response.ok) {
        console.log('好友请求成功', result);
        setAlertMessage('加入好友成功！'); // 设置警示信息
        setSearchTerm(''); // 清空搜索框
        setSearchResults([]); // 清空搜索结果
        fetchFriends(usersId);  // 成功后重新抓取最新的好友数据
      }
    } catch (error) {
      console.error('网络错误:', error);
    }
  };

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

    
    // 设置定时器每5秒更新一次数据
    const interval = setInterval(() => {
      fetchFavorites();
      fetchJoinRecords();
      fetchPostRecords();
    }, 1000); // 5000毫秒 = 5秒

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

    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="relative">
        <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
  <button 
    className="btn tooltip tooltip-left text-[#EFB880] bg-transparent border border-transparent transition duration-300 hover:bg-[#EFB880] hover:text-white" 
    data-tip="我的最愛" 
    onClick={() => handleOpenDrawer('我的最愛')}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  </button>
  <button 
    className="btn tooltip tooltip-left text-[#EFB880] bg-transparent border border-transparent transition duration-300 hover:bg-[#EFB880] hover:text-white" 
    data-tip="加入紀錄" 
    onClick={() => handleOpenDrawer('加入紀錄')}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  </button>
  <button 
    className="btn tooltip tooltip-left text-[#EFB880] bg-transparent border border-transparent transition duration-300 hover:bg-[#EFB880] hover:text-white" 
    data-tip="發文紀錄" 
    onClick={() => handleOpenDrawer('發文紀錄')}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  </button>
  <button 
    className="btn tooltip tooltip-left text-[#EFB880] bg-transparent border border-transparent transition duration-300 hover:bg-[#EFB880] hover:text-white" 
    data-tip="意見回饋" 
    onClick={() => handleOpenDrawer('意見回饋')}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  </button>
</div>



          <div className="fixed bottom-4 right-4">
            <button
              onClick={() => handleOpenDrawer('聊天室')} // 保持原有功能
              className="flex flex-col items-center justify-center w-20 h-20 border border-[#EFB880] text-[#EFB880] bg-transparent 
            transition-transform duration-300 hover:scale-110 hover:bg-[#EFB880] hover:text-white rounded-lg"

              >
              <span>好友</span>
              <span>聊天</span>
            </button>
          </div>
        </div>
      </div>

      <div className="drawer-side" style={{zIndex:50}}>
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-base-200 rounded-box w-1/4 h-full p-4 relative z-10">
          {drawerContent === '我的最愛' && (
            <>
            <h2 className="text-xl font-bold mb-4">{drawerContent}</h2>
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
                          <img src={item.img ? `http://localhost:3005/room/${item.img}` : "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"} alt="Random" className="object-cover w-full h-full" />
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
            <h2 className="text-xl font-bold mb-4">{drawerContent}</h2>
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
                          <img src={record.img ? `http://localhost:3005/room/${record.img}` : "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80"} alt="Random" className="object-cover w-full h-full" />
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
              <h2 className="text-xl font-bold mb-4">{drawerContent}</h2>
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
  onClick={() => {
    const confirmDelete = window.confirm("您確定要刪除這個房間嗎？");
    if (confirmDelete) {
      handleDeletePost(post.room_id);
    }
  }}
>
  刪除
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
            <>
            <h2 className="text-xl font-bold mb-4">{drawerContent}</h2>
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
            </>
          )}
          <div className="flex items-center mb-4 justify-between">
            {drawerContent === '加好友' && (
              <div className="flex items-center">
                <button onClick={handleBack} className="text-blue-600 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H3m0 0l6 6m-6-6l6-6" />
                  </svg>
                </button>
                <h2 className="text-xl font-bold">{drawerContent}</h2>
              </div>
            )}
            {drawerContent === '聊天室' && (
              <>
                <h2 className="text-xl font-bold">{drawerContent}</h2>
                {!selectedFriend && (  // 只有当没有选中的好友时才显示“加好友”按钮
                  <button className="text-blue-600 mr-2" onClick={() => setDrawerContent('加好友')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
          {drawerContent === '聊天室' && (
            <div className="w-full">
              {selectedFriend ? (
                <>
                  <div className="flex items-center mb-2">
                    <button onClick={handleBackToChatList} className="text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H3m0 0l6 6m-6-6l6-6" />
                      </svg>
                    </button>
                    <span className="ml-2 text-xl font-bold">{selectedFriend}</span>
                  </div>

                  {/* 查找好友 ID */}
                  {(() => {
                    const friend = friendsData.find(f => f.username === selectedFriend);
                    const friendId = friend ? friend.member_id : null;

                    return (
                      <div className="overflow-y-auto h-[calc(80vh-6rem)] mb-4 w-full">
                        {friendId && messages[friendId]?.map((msg, index) => (
                          <div key={index} className={`p-2 ${msg.sender_id === usersId ? 'text-right' : ''}`}>
                            {msg.sender_id !== usersId && (
                              <img
                                src={
                                  friendsData.find(f => f.member_id === msg.sender_id)?.avatar
                                    ? `http://localhost:3005/avatar/${friendsData.find(f => f.member_id === msg.sender_id).avatar}`
                                    : "/default-avatar.png"
                                }
                                alt={msg.sender_id}
                                className="inline-block w-8 h-8 rounded-full mr-1"
                              />
                            )}
                            <div className={`bg-gray-800 text-white border border-gray-800 rounded-lg p-2 inline-block ${msg.sender_id === usersId ? 'self-end' : ''}`}>
                              {msg.content}
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}

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
                  <div className="flex items-center mb-4">
                    <input
                      type="text"
                      placeholder="搜尋好友..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    {Array.isArray(friendsData) && (
                      <div>
                        {friendsData.filter(friend => friend.username.includes(searchTerm)).map((friend, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 border rounded-lg" onClick={() => handleSelectFriend(friend)}>
                            <img
                                src={
                                  friend.avatar
                                    ? `http://localhost:3005/avatar/${friend.avatar}`
                                    : "/default-avatar.png"
                                }
                                alt={friend.username}
                                className="w-10 h-10 rounded-full"
                              />
                            <span className="font-semibold">{friend.username}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {drawerContent === '加好友' && (
            <div className="w-full">
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  placeholder="輸入用戶名..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input input-bordered w-full"
                />
                <button className="btn btn-primary" onClick={handleAddFriend}>
                  搜尋
                </button>
              </div>

              {alertMessage && (
                <div className="mb-4 text-green-600">
                  {alertMessage} {/* 显示警示信息 */}
                </div>
              )}

              <div className="flex flex-col space-y-2">
                {(searchResults || []).map((user, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 border rounded-lg">
                    <img
                      src={
                        user.avatar
                          ? `http://localhost:3005/avatar/${user.avatar}`
                          : "/default-avatar.png"
                      }
                      alt={user.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-semibold">{user.username}</span>
                    <div className="ml-10 flex items-center">
                      <button className="text-blue-600" onClick={() => handleFriendRequest(user.member_id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </>
  );
};

export default DrawerComponent;