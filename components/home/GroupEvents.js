import React from "react";

const GroupEvents = () => {
  return (
    <section className="mt-10 bg-gray-100 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">桌遊揪團活動</h2>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="card w-96 bg-white shadow-lg">
          <figure>
            <img src="/home_assets/揪團活動.jpg" alt="揪團活動1" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">週五桌遊夜 - 經典聚會</h2>
            <p>時間：2024年9月29日 19:00</p>
            <p>地點：台北桌遊店</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">參加活動</button>
            </div>
          </div>
        </div>
        {/* 其他活動卡片 */}
      </div>
    </section>
  );
};

export default GroupEvents;

//後端獲取版本
// import React, { useState, useEffect } from "react";

// const GroupEvents = () => {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/api/events');
//         const data = await response.json();
//         setEvents(data.slice(0, 3)); // 只取前三個活動
//       } catch (error) {
//         console.error("Failed to load events:", error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <section className="mt-10 bg-gray-100 py-10">
//       <h2 className="text-3xl font-bold text-center mb-8">桌遊揪團活動</h2>
//       <div className="flex flex-wrap justify-center gap-8">
//         {events.map((event, index) => (
//           <div key={index} className="card w-96 bg-white shadow-lg">
//             <figure>
//               <img src={event.image} alt={`活動${index + 1}`} />
//             </figure>
//             <div className="card-body">
//               <h2 className="card-title">{event.title}</h2>
//               <p>時間：{event.date}</p>
//               <p>地點：{event.location}</p>
//               <div className="card-actions justify-end">
//                 <button className="btn btn-primary">參加活動</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default GroupEvents;
