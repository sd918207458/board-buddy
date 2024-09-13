import { useRouter } from "next/router";
import Link from "next/link";

const Breadcrumbs = ({ customCrumbs }) => {
  const router = useRouter();

  // 將路徑分割成陣列
  const pathnames = router.asPath.split("/").filter((x) => x);

  // 如果有自定義 breadcrumbs 項，使用自定義的，否則使用當前路徑
  const breadcrumbs = customCrumbs || pathnames;

  return (
    <div className="breadcrumbs text-sm w-full rounded">
      <ul className="flex">
        {/* 第一個項目 "Home" */}
        <li>
          <Link href="/">
            <div className="inline-flex items-center gap-2">
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
            </div>
          </Link>
        </li>

        {/* 動態生成 breadcrumbs 項目 */}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            // 如果是最後一個 breadcrumb 項，顯示 span (非鏈接)
            <li key={index}>
              <span className="inline-flex items-center gap-2">
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
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </span>
            </li>
          ) : (
            // 中間項顯示鏈接
            <li key={index}>
              <Link href={routeTo}>
                <div>{name.charAt(0).toUpperCase() + name.slice(1)}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
