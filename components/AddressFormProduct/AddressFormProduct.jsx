import React from "react";

const AddressFormProduct = () => {
  return (
    <div>
      <div>
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
            運送方式
          </h2>
          <div>
            <div className="flex gap-6 mt-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="radio-1"
                  className="radio"
                  defaultChecked
                />
                <span className="ml-2">宅配</span>
              </label>

              <label className="inline-flex items-center">
                <input type="radio" name="radio-1" className="radio" />
                <span className="ml-2">超商取貨</span>
              </label>
            </div>

            <div className="flex gap-6 mt-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio"
                  defaultChecked
                />
                <span className="ml-2">預設地址</span>
              </label>

              <label className="inline-flex items-center">
                <input type="radio" name="radio-2" className="radio" />
                <span className="ml-2">使用自訂地址</span>
              </label>
            </div>
          </div>

          <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white mt-4 ">
            地址資訊
          </h2>
          <form>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 w-full">
              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="address"
                >
                  地址
                </label>
                <input
                  id="address"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  placeholder="請輸入詳細地址"
                />
              </div>

              <div>
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="city"
                >
                  縣市名稱
                </label>
                <input
                  id="city"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  placeholder="請輸入縣市"
                />
              </div>

              <div className="w-full">
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="district"
                >
                  鄉鎮市區名稱
                </label>
                <input
                  id="district"
                  type="text"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                  placeholder="請輸入鄉鎮市區"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                送出
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddressFormProduct;
