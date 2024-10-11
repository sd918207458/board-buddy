// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';

// const friendsData = [
//   { name: '小明', avatar: 'https://picsum.photos/50/50?random=1' },
//   { name: '小紅', avatar: 'https://picsum.photos/50/50?random=2' },
//   { name: '小華', avatar: 'https://picsum.photos/50/50?random=3' },
//   { name: '小李', avatar: 'https://picsum.photos/50/50?random=4' },
//   { name: '小張', avatar: 'https://picsum.photos/50/50?random=5' },
// ];

// const messages = {
//   herry: [
//     { from: '我', text: '嗨，herry！' },
//     { from: 'herry', text: '你好！' },
//   ],
//   ginny: [
//     { from: '我', text: 'ginny，你在嗎？' },
//     { from: 'ginny', text: '在的，怎麼了？' },
//   ],
// };

const DrawerComponent = () => {
  const [drawerContent, setDrawerContent] = useState('聊天室');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friendsData, setFriendsData] = useState([]);
  const [messages, setMessages] = useState({}); // 用于存储聊天消息
  const [uuid, setUUID] = useState(''); // 用于存储 UUID
  const [socket, setSocket] = useState(null); // WebSocket 实例
  const usersId = 7; // 定义 user_id，确保在整个组件中使用相同的值

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

  const handleSendMessage = () => {
    if (socket && selectedFriend && newMessage) {
      const messageData = {
        from: '我',
        content: newMessage,
        context: 'message',
      };
      
      // 发送消息到 WebSocket
      socket.send(JSON.stringify(messageData));
  
      // 更新 messages 状态
      setMessages(prevMessages => ({
        ...prevMessages,
        [selectedFriend]: [
          ...(prevMessages[selectedFriend] || []),
          { from: '我', text: newMessage }
        ]
      }));
  
      setNewMessage('');
    } else {
      console.error('WebSocket 尚未连接或未选择好友');
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

  const handleOpenDrawer = (content) => {
    setDrawerContent(content);
    document.getElementById('my-drawer-4').checked = true;
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
        // 重新获取好友列表
        fetchFriends(usersId);  // 成功后重新抓取最新的好友数据
      }
    } catch (error) {
      console.error('网络错误:', error);
    }
  };

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="relative">
          <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
            <button className="btn tooltip tooltip-left" data-tip="聊天室" onClick={() => handleOpenDrawer('聊天室')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="#EFB880">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8a9 9 0 1115.556 5.192L21 21l-4.808-1.556A9 9 0 013 8z" />
              </svg>
            </button>
            <button className="btn btn-secondary" onClick={() => handleOpenDrawer('加好友')}>
              加好友
            </button>
          </div>
        </div>
      </div>

      <div className="drawer-side" style={{ zIndex: 50 }}>
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-base-200 rounded-box w-1/4 h-full p-4 relative z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{drawerContent}</h2>
            {drawerContent === '聊天室'}
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
                  <div className="overflow-y-auto h-[calc(80vh-6rem)] mb-4 w-full">
                  {messages[selectedFriend]?.map((msg, index) => (
                    <div key={index} className={`p-2 ${msg.from === '我' ? 'text-right' : ''}`}>
                      {msg.from !== '我' && (
                        <img src={friendsData.find(f => f.name === msg.from)?.avatar} alt={msg.from} className="inline-block w-8 h-8 rounded-full mr-1" />
                      )}
                      <strong>{msg.from !== '我' ? msg.from : ''}:</strong> {msg.text || msg.content}
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
                  {Array.isArray(friendsData) && (
                    <div>
                      {friendsData.filter(friend => friend.username.includes(searchTerm)).map((friend, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 border rounded-lg" onClick={() => setSelectedFriend(friend.username)}>
                          <img src={friend.avatar} alt={friend.username} className="w-10 h-10 rounded-full" />
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
              <input
                type="text"
                placeholder="輸入用戶名..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full mb-4"
              />
              <button className="btn btn-primary mb-4" onClick={handleAddFriend}>
                搜尋
              </button>

              <div className="flex flex-col space-y-2">
                {(searchResults || []).map((user, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 border rounded-lg">
                    <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full" />
                    <span className="font-semibold">{user.username}</span>
                    <button className="btn btn-secondary" onClick={() => handleFriendRequest(user.member_id)}>
                      請求好友
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrawerComponent;