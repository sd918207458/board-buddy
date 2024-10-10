import React, { useState } from "react"; // 导入 useState
import NavbarSwitcher from "@/components/NavbarSwitcher"; // 使用 NavbarSwitcher 组件
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useRouter } from "next/router";

export default function Addroom() {
  const [username, setUsername] = useState(""); // 用于接收 Navbar 中的 username
  const router = useRouter();
  const { game } = router.query;

  if (!game) {
    return <p>Loading...</p>;
  }

  const parsedGame = typeof game === "string" ? JSON.parse(game) : game;

  // 加入房间的处理函数
  const handleJoinRoom = async () => {
    const roomId = parsedGame.room_id;  // 从游戏数据中获取 room_id
    const memberId = null; // 这里可以根据实际需求设置 member_id，当前设为 null

    try {
      const response = await fetch('http://localhost:3005/api/roomadd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room_id: roomId,
          member_id: username // 使用从 Navbar 中接收到的 username
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        alert('成功加入房间');
        router.push('http://localhost:3000/game-index'); // 跳转到指定页面
      } else {
        alert(`加入房间失败: ${result.message}`);
      }
    } catch (error) {
      console.error('Error joining room:', error);
      alert('加入房间时发生错误');
    }
  };

  // 处理 username 获取
  const handleUsernameRetrieved = (retrievedUsername) => {
    setUsername(retrievedUsername); // 更新 username
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
      <Breadcrumbs />
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{parsedGame.room_name}</h2>
            <p className="mt-4 text-gray-500">{parsedGame.room_intro}</p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">遊玩遊戲</dt>
                <dd className="mt-2 text-sm text-gray-500">{parsedGame.game1} . {parsedGame.game2} . {parsedGame.game3}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">遊玩時間</dt>
                <dd className="mt-2 text-sm text-gray-500">{parsedGame.event_date}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">遊玩人數</dt>
                <dd className="mt-2 text-sm text-gray-500">{parsedGame.minperson} - {parsedGame.maxperson} 人</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">揪團地址</dt>
                <dd className="mt-2 text-sm text-gray-500">{parsedGame.location}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">揪團規則</dt>
                <dd className="mt-2 text-sm text-gray-500">{parsedGame.roomrule}</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">網站規則</dt>
                <dd className="mt-2 text-sm text-gray-500">不能放鳥</dd>
              </div>
            </dl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg" alt="Game Image 1" className="rounded-lg bg-gray-100" />
            <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg" alt="Game Image 2" className="rounded-lg bg-gray-100" />
            <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg" alt="Game Image 3" className="rounded-lg bg-gray-100" />
            <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg" alt="Game Image 4" className="rounded-lg bg-gray-100" />
          </div>
        </div>
      </div>
      <div className="flex justify-center bg-white py-4"> {/* 增加一些底部边距和白色背景 */}
        <button onClick={handleJoinRoom} className="mx-4 bg-blue-600 text-white px-4 py-2 rounded">加入房間</button>
        <button className="mx-4 bg-green-600 text-white px-4 py-2 rounded">聯絡房主</button>
        <button onClick={() => router.push('http://localhost:3000/game-index')} className="mx-4 bg-gray-600 text-white px-4 py-2 rounded">返回遊戲列表</button>
      </div>

      <Footer />
    </>
  );
}