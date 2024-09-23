// components/SearchBar.js
import { useState } from 'react';

const cities = ['台北市', '桃園市', '台中市', '台南市', '高雄市'];
const gameTypes = ['HomeGame', '桌遊店'];
const playTimes = ['早上', '中午', '下午', '晚上'];
const playerCounts = ['2人', '2-4人', '4-6人', '6-8人', '8人以上'];
const gameDurations = ['1小時內', '1-3小時', '3小時以上'];
const tags = ['派對', '陣營', '策略', '心機', '卡牌', '兒童', '家庭'];

const SearchBar = () => {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [searchKeyword, setSearchKeyword] = useState('');
  
  const [selectedTags, setSelectedTags] = useState({
    gameTypes: [],
    partyTypes: [],
    playTimes: [],
    playerCounts: [],
    gameDurations: []
  });

  const handleTagChange = (tag, group) => {
    if (tag === '不限') {
      setSelectedTags(prev => ({
        ...prev,
        [group]: []
      }));
    } else {
      setSelectedTags(prev => ({
        ...prev,
        [group]: prev[group].includes(tag) 
          ? prev[group].filter(t => t !== tag) 
          : [...prev[group], tag]
      }));
    }
  };

  const handleSearch = () => {
    console.log(`${searchKeyword} 的搜尋`);
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
        <button className="btn" style={{ backgroundColor: '#EFB880', color: 'white', fontSize: '22px' }} onClick={handleSearch}>
          搜尋
        </button>
      </div>

      {[ 
        { title: '遊戲種類', tags: ['不限', ...tags], group: 'gameTypes' },
        { title: '揪團類型', tags: ['不限', ...gameTypes], group: 'partyTypes' },
        { title: '遊玩時段', tags: ['不限', ...playTimes], group: 'playTimes' },
        { title: '遊戲人數', tags: ['不限', ...playerCounts], group: 'playerCounts' },
        { title: '遊戲時長', tags: ['不限', ...gameDurations], group: 'gameDurations' } // 改為「遊戲時長」
      ].map(({ title, tags, group }) => (
        <div className="mb-4" key={title} style={{ marginLeft: '15%', marginRight: '15%' }}>
          <h3 className="inline text-white font-bold text-lg">{title}</h3>
          <div className="inline ml-4" style={{ marginLeft: '5%' }}> {/* 標籤位置設為百分之5 */}
            {tags.map((tag) => (
              <label key={tag} className="mr-4">
                {tag === '不限' ? (
                  <button
                    className={`p-1 rounded ${selectedTags[group].length === 0 ? 'text-[#EFB880]' : 'text-white'} border-0`}
                    onClick={() => handleTagChange(tag, group)}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    {tag}
                  </button>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      className={`mr-1 cursor-pointer border-2 rounded ${selectedTags[group].includes(tag) ? 'border-transparent bg-[#EFB880]' : 'border-white bg-transparent'}`}
                      checked={selectedTags[group].includes(tag)}
                      onChange={() => handleTagChange(tag, group)}
                    />
                    <span className={`inline-block p-1 rounded ${selectedTags[group].includes(tag) ? 'text-[#EFB880]' : 'text-white'}`}>
                      {tag}
                    </span>
                  </>
                )}
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchBar;
