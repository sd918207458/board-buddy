import React from "react";

// 定義一個單獨的表格行組件
const TableRow = ({ user }) => {
  return (
    <tr>
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
            <div className="text-sm opacity-50">{user.location}</div>
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
        <button className="btn btn-ghost btn-xs">訂單詳情</button>
      </th>
    </tr>
  );
};

// 主表格組件
const UserTable = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* 表頭 */}
        <thead>
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
        {/* 表尾
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot> */}
      </table>
    </div>
  );
};

export default UserTable;
