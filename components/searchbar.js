import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const cities = ['台北市', '桃園市', '台中市', '台南市', '高雄市'];
const gameTypes = ['HomeGame', '桌遊店'];
const playerCounts = ['3人', '4-6人', '7-9人', '10人以上'];
const tags = ['策略', '合作', '推理', '陣營', '益智', '多人', '派對', '小品'];

const SearchBar = ({ onSearchResults }) => {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedTags, setSelectedTags] = useState({
    gameTypes: [],
    partyTypes: [],
    playerCounts: []
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [allResults, setAllResults] = useState([]);

  // 数据抓取函数
  const fetchAllResults = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/search');
      const data = await response.json();
      setAllResults(data); // 将数据存储到状态中
      onSearchResults(data); // 初始加载时将数据传递给父组件
    } catch (error) {
      console.error('Error fetching all results:', error);
    }
  };

  // 过滤结果
  const filterResults = () => {
    return allResults.filter(result => {
      // 城市篩選
      const matchesCity = result.location.includes(selectedCity);

      // 遊戲種類篩選
      const matchesTags = selectedTags.gameTypes.length === 0 || 
        [result.type1, result.type2, result.type3].some(type => 
          selectedTags.gameTypes.includes(type)
        );

      // 揪團類型篩選
      const matchesGameType = selectedTags.partyTypes.length === 0 || 
        selectedTags.partyTypes.includes(result.room_type === 1 ? "HomeGame" : "桌遊店");

      // 遊戲人數篩選
      const matchesPlayerCount = selectedTags.playerCounts.length === 0 || 
        selectedTags.playerCounts.some(count => {
          if (count === '10人以上') {
            return result.maxperson >= 10; // 確保 maxperson 大於等於 10
          }

          const playerCountRanges = {
            '3人': 3,
            '4-6人': [4, 5, 6],
            '7-9人': [7, 8, 9]
          };

          const range = playerCountRanges[count];
          return Array.isArray(range)
            ? result.maxperson >= Math.min(...range) && result.maxperson <= Math.max(...range)
            : result.maxperson === range; // 直接比較
        });

      // 活動日期篩選
      const matchesDate = selectedDate ? result.event_date.split('T')[0] === selectedDate : true;

      // 當標題下的標籤都沒有被選擇時，將該標題的篩選資料包含所有資料
      const gameTypesMatch = selectedTags.gameTypes.length > 0 ? matchesTags : true;
      const partyTypesMatch = selectedTags.partyTypes.length > 0 ? matchesGameType : true;

      // 將所有條件組合
      return matchesCity && gameTypesMatch && partyTypesMatch && matchesPlayerCount && matchesDate;
    });
  };

  // 监听输入变化
  useEffect(() => {
    fetchAllResults(); // 组件首次加载时抓取数据
  }, []);

  // 監聽標籤變化的效果
  useEffect(() => {
    const filteredResults = filterResults();
    onSearchResults(filteredResults); // 更新父组件
  }, [searchKeyword, selectedCity, selectedTags, selectedDate, allResults]);

  const handleTagChange = (tag, group) => {
    setSelectedTags(prev => {
      // 如果選擇的是「不限」，清空該組的所有標籤
      if (tag === '不限') {
        return {
          ...prev,
          [group]: [], // 清空標籤
        };
      }

      // 處理其他標籤的選擇
      const isSelected = prev[group].includes(tag);
      const updatedTags = {
        ...prev,
        [group]: isSelected 
          ? prev[group].filter(t => t !== tag) 
          : [...prev[group], tag]
      };
      
      // 每次更改標籤後立刻更新結果
      const filteredResults = filterResults();
      onSearchResults(filteredResults);

      return updatedTags;
    });
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    
    // 每次選擇日期後立刻更新結果
    const filteredResults = filterResults();
    onSearchResults(filteredResults);
  };

  return (
    <div className="p-6">
      <div className="mb-4 text-center">
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="select select-bordered w-48 mr-2 bg-transparent text-[#EFB880] text-lg"
          style={{ fontSize: '22px' }}
        >
          {cities.map((city) => (
            <option key={city} value={city} className="text-black">{city}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="搜尋關鍵字"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="input input-bordered w-64 mr-2 bg-transparent text-white text-lg transition duration-200 focus:outline-none focus:border-2 focus:border-transparent hover:border-[#EFB880] hover:border-2"
          style={{ fontSize: '22px' }}
        />
        <button onClick={() => { /* 可以在這裡觸發搜尋邏輯 */ }} className="btn btn-primary ml-2">搜尋</button>
      </div>

      {/* 遊戲種類 */}
      <div className="mb-4" style={{ marginLeft: '15%', marginRight: '15%' }}>
        <h3 className="inline text-white font-bold text-lg">遊戲種類</h3>
        <div className="inline ml-4" style={{ marginLeft: '5%' }}>
          {['不限', ...tags].map(tag => (
            <label key={tag} className="mr-4">
              {tag === '不限' ? (
                <button
                  className={`p-1 rounded ${selectedTags.gameTypes.length === 0 ? 'text-[#EFB880]' : 'text-white'} border-0`}
                  onClick={() => handleTagChange(tag, 'gameTypes')}
                  style={{ backgroundColor: 'transparent' }}
                >
                  {tag}
                </button>
              ) : (
                <>
                  <input
                    type="checkbox"
                    className={`mr-1 cursor-pointer border-2 rounded ${selectedTags.gameTypes.includes(tag) ? 'border-transparent bg-[#EFB880]' : 'border-white bg-transparent'}`}
                    checked={selectedTags.gameTypes.includes(tag)}
                    onChange={() => handleTagChange(tag, 'gameTypes')}
                  />
                  <span className={`inline-block p-1 rounded ${selectedTags.gameTypes.includes(tag) ? 'text-[#EFB880]' : 'text-white'}`}>
                    {tag}
                  </span>
                </>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* 揪團類型 */}
      <div className="mb-4" style={{ marginLeft: '15%', marginRight: '15%' }}>
        <h3 className="inline text-white font-bold text-lg">揪團類型</h3>
        <div className="inline ml-4" style={{ marginLeft: '5%' }}>
          {['不限', ...gameTypes].map(tag => (
            <label key={tag} className="mr-4">
              {tag === '不限' ? (
                <button
                  className={`p-1 rounded ${selectedTags.partyTypes.length === 0 ? 'text-[#EFB880]' : 'text-white'} border-0`}
                  onClick={() => handleTagChange(tag, 'partyTypes')}
                  style={{ backgroundColor: 'transparent' }}
                >
                  {tag}
                </button>
              ) : (
                <>
                  <input
                    type="checkbox"
                    className={`mr-1 cursor-pointer border-2 rounded ${selectedTags.partyTypes.includes(tag) ? 'border-transparent bg-[#EFB880]' : 'border-white bg-transparent'}`}
                    checked={selectedTags.partyTypes.includes(tag)}
                    onChange={() => handleTagChange(tag, 'partyTypes')}
                  />
                  <span className={`inline-block p-1 rounded ${selectedTags.partyTypes.includes(tag) ? 'text-[#EFB880]' : 'text-white'}`}>
                    {tag}
                  </span>
                </>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* 遊戲人數 */}
      <div className="mb-4" style={{ marginLeft: '15%', marginRight: '15%' }}>
        <h3 className="inline text-white font-bold text-lg">遊戲人數</h3>
        <div className="inline ml-4" style={{ marginLeft: '5%' }}>
          {['不限', ...playerCounts].map(tag => (
            <label key={tag} className="mr-4">
              {tag === '不限' ? (
                <button
                  className={`p-1 rounded ${selectedTags.playerCounts.length === 0 ? 'text-[#EFB880]' : 'text-white'} border-0`}
                  onClick={() => handleTagChange(tag, 'playerCounts')}
                  style={{ backgroundColor: 'transparent' }}
                >
                  {tag}
                </button>
              ) : (
                <>
                  <input
                    type="checkbox"
                    className={`mr-1 cursor-pointer border-2 rounded ${selectedTags.playerCounts.includes(tag) ? 'border-transparent bg-[#EFB880]' : 'border-white bg-transparent'}`}
                    checked={selectedTags.playerCounts.includes(tag)}
                    onChange={() => handleTagChange(tag, 'playerCounts')}
                  />
                  <span className={`inline-block p-1 rounded ${selectedTags.playerCounts.includes(tag) ? 'text-[#EFB880]' : 'text-white'}`}>
                    {tag}
                  </span>
                </>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* 活動日期 */}
      <div className="mb-4" style={{ marginLeft: '15%', marginRight: '15%' }}>
        <h3 className="inline text-white font-bold text-lg">活動日期</h3>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="input input-bordered ml-2 w-48"
        />
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearchResults: PropTypes.func.isRequired,
};

export default SearchBar;
