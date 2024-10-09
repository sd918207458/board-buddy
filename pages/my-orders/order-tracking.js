
import React, { useState, useEffect } from "react";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import OrderTable from "@/components/table"; // 訂單表格組件

export default function OrderTracking() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("orderNumber");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredData, setFilteredData] = useState([]); // 篩選後的數據
  const [statusFilter, setStatusFilter] = useState(""); // 訂單狀態篩選條件
  const [minAmount, setMinAmount] = useState(""); // 金額範圍篩選
  const [maxAmount, setMaxAmount] = useState(""); // 金額範圍篩選

  const sampleOrders = [
    {
      id: 1,
      orderNumber: "ORD001",
      date: "2024-10-01",
      status: "Pending",
      totalAmount: 1500,
      totalItems: 3,
      shippingAddress: "台北市中山區南京東路100號",
    },
    {
      id: 2,
      orderNumber: "ORD002",
      date: "2024-10-02",
      status: "Shipped",
      totalAmount: 2500,
      totalItems: 5,
      shippingAddress: "台北市大安區忠孝東路50號",
    },
    {
      id: 3,
      orderNumber: "ORD003",
      date: "2024-09-15",
      status: "Delivered",
      totalAmount: 3500,
      totalItems: 2,
      shippingAddress: "台中市西區民生路123號",
    },
    {
      id: 4,
      orderNumber: "ORD004",
      date: "2024-09-25",
      status: "Canceled",
      totalAmount: 800,
      totalItems: 1,
      shippingAddress: "高雄市新興區中山一路200號",
    },
    {
      id: 5,
      orderNumber: "ORD005",
      date: "2024-10-05",
      status: "Pending",
      totalAmount: 1200,
      totalItems: 4,
      shippingAddress: "台北市大同區延平北路300號",
    },
    {
      id: 6,
      orderNumber: "ORD006",
      date: "2024-09-30",
      status: "Delivered",
      totalAmount: 4200,
      totalItems: 7,
      shippingAddress: "台北市信義區松高路50號",
    },
    {
      id: 7,
      orderNumber: "ORD007",
      date: "2024-10-06",
      status: "Shipped",
      totalAmount: 2750,
      totalItems: 5,
      shippingAddress: "台南市東區中華東路200號",
    },
    {
      id: 8,
      orderNumber: "ORD008",
      date: "2024-10-03",
      status: "Canceled",
      totalAmount: 950,
      totalItems: 2,
      shippingAddress: "桃園市中壢區中正路100號",
    },
    {
      id: 9,
      orderNumber: "ORD009",
      date: "2024-10-04",
      status: "Pending",
      totalAmount: 1650,
      totalItems: 3,
      shippingAddress: "新北市板橋區文化路150號",
    },
    {
      id: 10,
      orderNumber: "ORD010",
      date: "2024-10-02",
      status: "Delivered",
      totalAmount: 2900,
      totalItems: 6,
      shippingAddress: "台北市中正區忠孝東路60號",
    },
  ];

  // 初始化並恢復上次的搜尋與排序狀態
  useEffect(() => {
    const savedSearchTerm = localStorage.getItem("searchTerm") || "";
    const savedSortKey = localStorage.getItem("sortKey") || "orderNumber";
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
      savedSearchTerm,
      savedSortKey,
      savedSortOrder,
      savedStatusFilter,
      savedMinAmount,
      savedMaxAmount
    );
  }, []);

  // 保存搜尋與排序狀態到 LocalStorage
  const saveState = (key, value) => {
    localStorage.setItem(key, value);
  };

  // 篩選與排序訂單
  const filterAndSortOrders = (
    search,
    sortKey,
    sortOrder,
    status,
    minAmt,
    maxAmt
  ) => {
    let filtered = sampleOrders.filter((order) =>
      order.orderNumber.includes(search)
    );

    if (status) {
      filtered = filtered.filter((order) => order.status === status);
    }

    if (minAmt) {
      filtered = filtered.filter(
        (order) => order.totalAmount >= Number(minAmt)
      );
    }

    if (maxAmt) {
      filtered = filtered.filter(
        (order) => order.totalAmount <= Number(maxAmt)
      );
    }

    const sorted = filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortKey] > b[sortKey] ? 1 : -1;
      } else {
        return a[sortKey] < b[sortKey] ? 1 : -1;
      }
    });

    setFilteredData(sorted);
  };

  // 搜尋框輸入處理
  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    saveState("searchTerm", search);
    filterAndSortOrders(
      search,
      sortKey,
      sortOrder,
      statusFilter,
      minAmount,
      maxAmount
    );
  };

  // 切換排序方式
  const handleSort = (key) => {
    const newOrder = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(newOrder);
    saveState("sortKey", key);
    saveState("sortOrder", newOrder);
    filterAndSortOrders(
      searchTerm,
      key,
      newOrder,
      statusFilter,
      minAmount,
      maxAmount
    );
  };

  // 篩選條件處理
  const handleFilter = () => {
    saveState("statusFilter", statusFilter);
    saveState("minAmount", minAmount);
    saveState("maxAmount", maxAmount);
    filterAndSortOrders(
      searchTerm,
      sortKey,
      sortOrder,
      statusFilter,
      minAmount,
      maxAmount
    );
  };

  // 渲染訂單表格
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

          {/* 搜尋與篩選區塊 */}
          <div className="p-6 flex flex-col gap-4">
            <input
              type="text"
              placeholder="搜尋訂單編號"
              value={searchTerm}
              onChange={handleSearch}
              className="input input-bordered"
            />
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="select select-bordered"
              >
                <option value="">全部狀態</option>
                <option value="Pending">尚未出貨</option>
                <option value="Shipped">已出貨</option>
                <option value="Delivered">已送達</option>
                <option value="Canceled">取消訂單</option>
              </select>
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
                className="btn btn-primary  bg-[#003E52]"
              >
                篩選
              </button>
            </div>
          </div>

          {/* 排序方式 */}
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
                  <button onClick={() => handleSort("totalAmount")}>
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

          {/* 表格 */}
          {renderTable()}
        </div>
      </div>
      <Footer />
    </>
  );
}
