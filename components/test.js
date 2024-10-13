// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import NavbarSwitcher from "@/components/NavbarSwitcher"; // 使用 NavbarSwitcher 组件++

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

const DrawerComponent2 = () => {
  const [drawerContent2, setDrawerContent2] = useState('聊天室');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friendsData, setFriendsData] = useState([]);
  const [messages, setMessages] = useState({}); // 用于存储聊天消息
  const [uuid, setUUID] = useState(''); // 用于存储 UUID
  const [socket, setSocket] = useState(null); // WebSocket 实例
  const [usersId, setUsersId] = useState(''); // 将 usersId 定义为状态
  const [username, setUsername] = useState(""); // 用于接收 Navbar 中的 username++
  const [alertMessage, setAlertMessage] = useState('');

  // useEffect(() => {
  //   const userId = 1; // 你的用户 ID
  //   const friendId = 2; // 你的好友 ID
  //   fetchMessages(userId, friendId);
  // }, []);

  useEffect(() => {
    console.log('当前的 messages 结构:', messages);
  }, [messages]); // 监视 messages 的变化

    // 用于接收从 NavbarSwitcher 传递过来的 username++
    const handleUsernameRetrieved = (retrievedUsername) => {
      setUsername(retrievedUsername);
      console.log("888888888Username:", retrievedUsername); // 输出抓取到的 username
      fetchMemberId(retrievedUsername);
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
    setDrawerContent2('聊天室');
  };

  const handleOpenDrawer2 = (content) => {
    setDrawerContent2(content);
    console.log("聊天室",content);
    document.getElementById('my-drawer-4').checked = true;
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
      <div className="fixed bottom-4 right-4">
  <button
    onClick={() => handleOpenDrawer2('聊天室')} // 保持原有功能
    className="flex flex-col items-center justify-center w-20 h-20 border border-white text-white bg-transparent 
                   transition-transform duration-300 hover:scale-110 hover:bg-[#EFB880] rounded-lg"
  >
    <span>好友</span>
    <span>聊天</span>
  </button>
</div>


      <div className="drawer-side" style={{ zIndex: 60 }}>
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-base-200 rounded-box w-1/4 h-full p-4 relative z-10">
          <div className="flex items-center mb-4 justify-between">
            {drawerContent2 === '加好友' && (
              <div className="flex items-center">
                <button onClick={handleBack} className="text-blue-600 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H3m0 0l6 6m-6-6l6-6" />
                  </svg>
                </button>
                <h2 className="text-xl font-bold">{drawerContent2}</h2>
              </div>
            )}
            {drawerContent2 === '聊天室' && (
              <>
                <h2 className="text-xl font-bold">{drawerContent2}</h2>
                {!selectedFriend && (  // 只有当没有选中的好友时才显示“加好友”按钮
                  <button className="text-blue-600 mr-2" onClick={() => setDrawerContent2('加好友')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>
          {drawerContent2 === '聊天室' && (
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

          {drawerContent2 === '加好友' && (
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

export default DrawerComponent2;