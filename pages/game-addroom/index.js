import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Addroom() {
  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">揪團標題</h2>
            <p className="mt-4 text-gray-500">
            揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介揪團簡介</p>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">遊玩遊戲</dt>
                <dd className="mt-2 text-sm text-gray-500">阿瓦隆 . 風聲 .狼人殺</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">遊玩時間</dt>
                <dd className="mt-2 text-sm text-gray-500">2024/10/18</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">遊玩人數</dt>
                <dd className="mt-2 text-sm text-gray-500">6-10人</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">揪團地址</dt>
                <dd className="mt-2 text-sm text-gray-500">高雄市前金區中正四路211號8樓-1</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">揪團規則</dt>
                <dd className="mt-2 text-sm text-gray-500">開心就好不要生氣罵髒話</dd>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">網站規則</dt>
                <dd className="mt-2 text-sm text-gray-500">不能放鳥</dd>
              </div>
            </dl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg" alt="Walnut card tray with white powder coated steel divider and 3 punchout holes." className="rounded-lg bg-gray-100" />
            <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg" alt="Top down view of walnut card tray with embedded magnets and card groove." className="rounded-lg bg-gray-100" />
            <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg" alt="Side of walnut card tray with card groove and recessed card area." className="rounded-lg bg-gray-100" />
            <img src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg" alt="Walnut card tray filled with cards and card angled in dedicated groove." className="rounded-lg bg-gray-100" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
