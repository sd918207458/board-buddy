
import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CSSTransition, TransitionGroup } from "react-transition-group"; // 引入 React Transition Group

export default function OrderDetails() {
  const [isMounted, setIsMounted] = useState(false);

  // 使用 useEffect 確保動畫只在客戶端掛載後觸發
  useEffect(() => {
    setIsMounted(true); // 客戶端掛載後將 isMounted 設為 true
  }, []);


  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003E52] dark:bg-gray-900">

        <TransitionGroup>
          {/* 確保動畫僅在客戶端渲染後運行 */}
          <CSSTransition
            in={isMounted}
            timeout={500}
            classNames="fade"
            unmountOnExit
          >
            <div className="w-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
              {/* BreadCrumbs */}
              <div className="p-4">
                <Breadcrumbs />
              </div>

              {/* 訂單明細標題 */}
              <section className="p-6 bg-white dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                  訂單明細
                </h2>

                {/* 訂單進度追蹤 */}
                <ul className="steps steps-vertical lg:steps-horizontal justify-center w-full">
                  <li className="step step-primary">訂單建立</li>
                  <li className="step step-primary">處理中</li>
                  <li className="step">已出貨</li>
                  <li className="step">完成訂單</li>
                </ul>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                {/* 收貨人訊息 */}
                <CSSTransition
                  in={isMounted}
                  timeout={300}
                  classNames="slide"
                  unmountOnExit
                >
                  <div className="overflow-x-auto px-4 py-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                      收貨人訊息
                    </h3>
                    <table className="table w-full table-zebra">
                      <thead>
                        <tr>
                          <th>收貨人名稱</th>
                          <th>收貨地址</th>
                          <th>手機號碼</th>
                          <th>配送方式</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>王大明</td>
                          <td>801高雄市前金區中正四路211號8號樓之1</td>
                          <td>0912345678</td>
                          <td>7-11門市</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CSSTransition>

                {/* 付款訊息 */}
                <CSSTransition
                  in={isMounted}
                  timeout={400}
                  classNames="slide"
                  unmountOnExit
                >
                  <div className="overflow-x-auto px-4 py-6">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                      付款訊息
                    </h3>
                    <table className="table w-full table-zebra">
                      <thead>
                        <tr>
                          <th>付款方式</th>
                          <th>商品總額</th>
                          <th>折扣優惠</th>
                          <th>運費</th>
                          <th>合計</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>貨到付款</td>
                          <td>$999</td>
                          <td>$-100</td>
                          <td>$45</td>
                          <td>$929</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CSSTransition>
              </div>

              {/* 訂單商品表單 */}
              <CSSTransition
                in={isMounted}
                timeout={500}
                classNames="slide-up"
                unmountOnExit
              >
                <div className="overflow-x-auto px-4 py-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                    商品列表
                  </h3>
                  <table className="table w-full table-zebra">
                    <thead>
                      <tr>
                        <th>商品名稱</th>
                        <th>商品編號</th>
                        <th>商品價格</th>
                        <th>商品數量</th>
                        <th>操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                  alt="商品圖片"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">Hart Hagerty</div>
                              <div className="text-sm opacity-50">
                                United States
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          0240503525
                          <br />
                          <span className="badge badge-ghost badge-sm">
                            產品編號
                          </span>
                        </td>
                        <td>$999</td>
                        <td>1</td>
                        <td>
                          <button className="btn btn-neutral btn-xs">
                            再次購買
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CSSTransition>
            </div>
          </CSSTransition>
        </TransitionGroup>

      </div>
      <Footer />
    </>
  );
}
