import React from "react";

// 定義表格行組件
const TableRow = ({ user }) => {
  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img src={user.avatar} alt={`Avatar of ${user.name}`} />
            </div>
          </div>
          <div>
            <div className="font-bold">{user.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-300">
              {user.location}
            </div>
          </div>
        </div>
      </td>
      <td>
        {user.company}
        <br />
        <span className="badge badge-ghost badge-sm">{user.jobTitle}</span>
      </td>
      <td>{user.favoriteColor}</td>
      <th>
        <button className="btn btn-primary btn-xs">訂單詳情</button>
      </th>
    </tr>
  );
};

// 主表格組件
const UserTable = ({ users }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="table w-full">
        {/* 表頭 */}
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>商品名稱</th>
            <th>訂單編號</th>
            <th>合計</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* 動態生成表格行 */}
          {users.map((user, index) => (
            <TableRow key={index} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
