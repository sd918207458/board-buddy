import React, { useState, useEffect } from "react";

const GameAccordion = () => {
  const [gameTypes, setGameTypes] = useState([]); // 存儲遊戲類型
  const [selectedType, setSelectedType] = useState(null); // 當前選擇的遊戲類型，null 表示沒有選中
  const [games, setGames] = useState([]); // 存儲遊戲名稱
  const [loadingGames, setLoadingGames] = useState(false); // 控制遊戲加載狀態
  const [loadingTypes, setLoadingTypes] = useState(false); // 控制遊戲類型加載狀態
  const [error, setError] = useState(null); // 控制錯誤狀態

  // 獲取遊戲類型
  useEffect(() => {
    setLoadingTypes(true); // 開始加載遊戲類型
    fetch("http://localhost:3005/api/productsGame/typesList")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setGameTypes(data.data); // 將獲取的遊戲類型存儲到狀態中
        } else {
          setError("Failed to fetch game types");
        }
      })
      .catch((err) => {
        setError("Error fetching game types: " + err.message);
      })
      .finally(() => {
        setLoadingTypes(false); // 遊戲類型加載完成
      });
  }, []); // 僅在組件掛載時運行一次

  // 當用戶選擇遊戲類型時，發送 API 請求
  useEffect(() => {
    if (selectedType !== null) {
      // 只在有選擇時加載遊戲
      setLoadingGames(true); // 開始加載遊戲
      setError(null); // 重置錯誤

      // 發送 API 請求
      fetch(
        `http://localhost:3005/api/productsGame/types?product_type=${selectedType}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            setGames(data.data[selectedType] || []); // 更新遊戲數據
          } else {
            setError("Failed to fetch games");
          }
        })
        .catch((err) => {
          setError("Error fetching games: " + err.message);
        })
        .finally(() => {
          setLoadingGames(false); // 遊戲加載完成
        });
    }
  }, [selectedType]); // 當選擇的遊戲類型改變時發送請求

  // 處理點擊遊戲類型按鈕的行為
  const handleAccordionClick = (type) => {
    if (selectedType === type) {
      setSelectedType(null); // 如果再次點擊相同的遊戲類型，關閉它
    } else {
      setSelectedType(type); // 如果點擊其他遊戲類型，展開該類型
    }
  };

  return (
    <div className="bg-white">
      <div className="join join-vertical w-full">
        {/* 如果類型還在加載中，顯示 "Loading game types..." */}
        {loadingTypes && <p>Loading game types...</p>}

        {/* 如果出現錯誤，顯示錯誤信息 */}
        {error && <p className="text-red-500">{error}</p>}

        {/* 遊戲類型選擇器 */}
        {!loadingTypes &&
          gameTypes.length > 0 &&
          gameTypes.map((type) => (
            <div
              key={type}
              className="collapse collapse-arrow join-item border-base-300 border"
            >
              <input
                type="checkbox"
                checked={selectedType === type} // 根據選中的狀態來設置選中狀態
                onChange={() => handleAccordionClick(type)} // 當點擊時更新選擇的類型
              />
              <div className="collapse-title text-xl font-medium">{type}</div>

              {/* 展示遊戲名稱 */}
              {selectedType === type && (
                <div className="collapse-content">
                  {loadingGames ? (
                    <p>Loading games...</p> // 加載中
                  ) : error ? (
                    <p className="text-red-500">{error}</p> // 錯誤信息
                  ) : games.length > 0 ? (
                    <ul className="text-center">
                      {" "}
                      {/* 添加 text-center 讓遊戲名稱置中 */}
                      {games.map((game, index) => (
                        <li key={index}>{game}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No games available</p> // 沒有遊戲
                  )}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default GameAccordion;
