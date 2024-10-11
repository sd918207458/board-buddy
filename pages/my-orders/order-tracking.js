import React, { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import OrderTable from "@/components/table"; // 訂單表格組件

export default function OrderTracking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("orderId");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredData, setFilteredData] = useState([]); // 篩選後的數據
  const [statusFilter, setStatusFilter] = useState(""); // 訂單狀態篩選條件
  const [minAmount, setMinAmount] = useState(""); // 金額範圍篩選
  const [maxAmount, setMaxAmount] = useState(""); // 金額範圍篩選
  const [orders, setOrders] = useState([]); // 保存所有訂單的狀態

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    console.log("Loaded stored orders:", storedOrders);
    setOrders(storedOrders);

    const savedSearchTerm = localStorage.getItem("searchTerm") || "";
    const savedSortKey = localStorage.getItem("sortKey") || "orderId";
    const savedSortOrder = localStorage.getItem("sortOrder") || "asc";
    const savedStatusFilter = localStorage.getItem("statusFilter") || "";
    const savedMinAmount = localStorage.getItem("minAmount") || "";
    const savedMaxAmount = localStorage.getItem("maxAmount") || "";

    setSearchTerm(savedSearchTerm);
    setSortKey(savedSortKey);
    setSortOrder(savedSortOrder);
    setStatusFilter(savedStatusFilter);
    setMinAmount(savedMinAmount);
    setMaxAmount(savedMaxAmount);

    filterAndSortOrders(
      storedOrders,
      savedSearchTerm,
      savedSortKey,
      savedSortOrder,
      savedStatusFilter,
      savedMinAmount,
      savedMaxAmount
    );
  }, []);

  const saveState = (key, value) => {
    localStorage.setItem(key, value);
  };

  const filterAndSortOrders = (
    orders,
    search,
    sortKey,
    sortOrder,
    status,
    minAmt,
    maxAmt
  ) => {
    let filtered = orders.filter((order) =>
      String(order.orderId).includes(search)
    );

    if (status) {
      filtered = filtered.filter((order) => order.status === status);
    }

    if (minAmt) {
      filtered = filtered.filter((order) => order.total >= Number(minAmt));
    }

    if (maxAmt) {
      filtered = filtered.filter((order) => order.total <= Number(maxAmt));
    }

    const sorted = filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      } else {
        return a[sortKey] < b[sortKey] ? 1 : -1;
      }
    });

    console.log("Filtered and sorted orders:", sorted);
    setFilteredData(sorted);
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    saveState("searchTerm", search);
    filterAndSortOrders(
      orders,
      search,
      sortKey,
      sortOrder,
      statusFilter,
      minAmount,
      maxAmount
    );
  };

  const handleSort = (key) => {
    const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(newOrder);
    saveState("sortKey", key);
    saveState("sortOrder", newOrder);
    filterAndSortOrders(
      orders,
      searchTerm,
      key,
      newOrder,
      statusFilter,
      minAmount,
      maxAmount
    );
  };

  const handleFilter = () => {
    saveState("statusFilter", statusFilter);
    saveState("minAmount", minAmount);
    saveState("maxAmount", maxAmount);
    filterAndSortOrders(
      orders,
      searchTerm,
      sortKey,
      sortOrder,
      statusFilter,
      minAmount,
      maxAmount
    );
  };

  const renderTable = () =>
    filteredData.length > 0 ? (
      <OrderTable orders={filteredData} />
    ) : (
      <div className="text-center p-4">目前沒有訂單。</div>
    );

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52] dark:bg-gray-900">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="w-full p-4">
            <Breadcrumbs />
          </div>
          <section className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center">
              我的訂單
            </h2>
          </section>

          <div className="p-6 flex flex-col gap-4">
            <input
              type="text"
              placeholder="搜尋訂單編號"
              value={searchTerm}
              onChange={handleSearch}
              className="input input-bordered"
            />
            <div className="flex gap-4">
              {/* <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="select select-bordered"
              >
                <option value="">全部狀態</option>
                <option value="Pending">尚未出貨</option>
                <option value="Shipped">已出貨</option>
                <option value="Delivered">已送達</option>
                <option value="Canceled">取消訂單</option>
              </select> */}
              <input
                type="number"
                placeholder="最低金額"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                className="input input-bordered"
              />
              <input
                type="number"
                placeholder="最高金額"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                className="input input-bordered"
              />
              <button
                onClick={handleFilter}
                className="btn btn-primary bg-[#003E52]"
              >
                篩選
              </button>
            </div>
          </div>

          <div className="p-6 flex justify-between relative z-10">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn m-1">
                排序方式
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button onClick={() => handleSort("date")}>按日期排序</button>
                </li>
                <li>
                  <button onClick={() => handleSort("total")}>
                    按金額排序
                  </button>
                </li>
                <li>
                  <button onClick={() => handleSort("status")}>
                    按狀態排序
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {renderTable()}
        </div>
      </div>
      <Footer />
    </>
  );
}
