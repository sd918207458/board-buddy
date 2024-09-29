import { useRouter } from "next/router";
import Link from "next/link";

import { CSSTransition, TransitionGroup } from "react-transition-group";



const Breadcrumbs = ({ customCrumbs }) => {
  const router = useRouter();

  // 將路徑分割成陣列
  const pathnames = router.asPath.split("/").filter((x) => x);

  // 如果有自定義 breadcrumbs 項，使用自定義的，否則使用當前路徑
  const breadcrumbs = customCrumbs || pathnames;

  // 可以添加一個字典來映射更友好的名稱
  const nameMapping = {
    "profile-settings": "會員中心",
    "my-favorites": "會員中心",
    "my-orders": "會員中心",
    "personal-info": "個人資料",

    FAQ: "常見問題",
    "payment-methods": "付款方式",
    wishlist: "我的收藏",

    "order-tracking": "訂單追蹤",
    "order-details": "訂單明細",
  };

  return (
    <div className="breadcrumbs text-sm w-full rounded" aria-label="breadcrumb">
      <ul className="flex items-center gap-2">
        {/* 第一個項目 "Home" */}
        <li>

          <Link href="/" legacyBehavior>
            <a className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-4 w-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>
              首頁

            </a>

          </Link>
        </li>

        {/* 使用分隔符號 */}

        <TransitionGroup component={null}>
          {breadcrumbs.map((name, index) => {
            const routeTo = `/${breadcrumbs.slice(0, index + 1).join("/")}`;
            const isLast = index === breadcrumbs.length - 1;

            const displayName =
              nameMapping[name] || name.charAt(0).toUpperCase() + name.slice(1);

            return (
              <CSSTransition key={index} timeout={300} classNames="fade">
                <li key={index} className="flex items-center gap-2">
                  <span className="text-gray-500">/</span>

                  {isLast ? (
                    <span className="inline-flex items-center gap-2 text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="h-4 w-4 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                      {displayName}
                    </span>
                  ) : (
                    <Link href={routeTo} legacyBehavior>
                      <a className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-2">
                        {displayName}
                      </a>
                    </Link>
                  )}
                </li>
              </CSSTransition>
            );
          })}
        </TransitionGroup>

      </ul>
    </div>
  );
};

export default Breadcrumbs;