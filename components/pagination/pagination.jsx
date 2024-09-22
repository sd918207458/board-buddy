import React from "react";

const Pagination = () => {
  return (
    <div>
      <div className="join items-center w-full justify-center">
        <button className="join-item btn">«</button>
        <button className="join-item btn">Page 1</button>
        <button className="join-item btn">Page 2</button>
        <button className="join-item btn btn-disabled">...</button>
        <button className="join-item btn">Page 99</button>
        <button className="join-item btn">»</button>
      </div>
    </div>
  );
};

export default Pagination;
