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

  // 玩家人数筛选逻辑
  const isPlayerCountMatched = (minperson, maxperson, selectedCounts) => {
    const playerCountRanges = {
      '3人': [2, 3],
      '4-6人': [4, 5, 6],
      '6-9人': [7, 8, 9],
      '9人以上': [10]
    };

    return selectedCounts.length === 0 || selectedCounts.some(count => {
      const range = playerCountRanges[count];
      return minperson <= Math.max(...range) && maxperson >= Math.min(...range);
    });
  };

  // 过滤结果
  const filterResults = () => {
    return allResults.filter(result => {
      const matchesCity = result.location === selectedCity;
      const matchesKeyword = result.room_name.includes(searchKeyword);
      const matchesDate = selectedDate ? result.event_date.split('T')[0] === selectedDate : true;
      const matchesGameType = !selectedTags.partyTypes.length || selectedTags.partyTypes.includes(result.room_type);
      const matchesPlayerCount = isPlayerCountMatched(result.minperson, result.maxperson, selectedTags.playerCounts);
      const matchesTags = !selectedTags.gameTypes.length || 
        selectedTags.gameTypes.some(tag => 
          result.type1 === tag || result.type2 === tag || result.type3 === tag
        );

      return matchesCity && matchesKeyword && matchesDate && matchesGameType && matchesPlayerCount && matchesTags;
    });
  };

  // 监听输入变化
  useEffect(() => {
    const filteredResults = filterResults();
    onSearchResults(filteredResults); // 更新父组件
  }, [searchKeyword, selectedCity, selectedTags, selectedDate, allResults]);

  useEffect(() => {
    fetchAllResults(); // 组件首次加载时抓取数据
  }, []);

  const handleTagChange = (tag, group) => {
    setSelectedTags(prev => {
      const isSelected = prev[group].includes(tag);
      return {
        ...prev,
        [group]: isSelected 
          ? prev[group].filter(t => t !== tag) 
          : [...prev[group], tag]
      };
    });
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSearch = () => {
    const filteredResults = filterResults();
    onSearchResults(filteredResults); // 点击搜索按钮时更新父组件
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
        <button onClick={handleSearch} className="btn btn-primary ml-2">搜尋</button>
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
