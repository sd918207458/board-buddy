import { useState, useRef, useEffect } from "react";
import {
  popupCenter,
  subscribe,
  unsubscribe,
  publish,
} from "@/utils/popup-window";
import { useRouter } from "next/router";
import useInterval from "@/hooks/use-interval";
import useLocalStorage from "./use-localstorage";

export function useShip711StoreOpener(
  serverCallbackUrl = "", //必要。伺服器7-11運送商店用Callback路由網址
  {
    title = "7-11運送店家選擇視窗", //跳出視窗標題
    h = 680, //跳出視窗高度
    w = 950, //跳出視窗寬度
    autoCloseMins = 5, //自動關閉
    enableLocalStorage = true, //是否didMount時要讀取localStorage中資料
    keyLocalStorage = "store711", // localStorage中的key
  } = {}
) {
  const [storedValue, setValue] = useLocalStorage(keyLocalStorage, {
    storeid: "",
    storename: "",
    storeaddress: "",
    outside: "",
    ship: "",
    TempVar: "",
  });

  // 跳出子女視窗用
  const newWindow = useRef(null);

  // 記錄店家狀態用
  const [store711, setStore711] = useState({
    storeid: "",
    storename: "",
    storeaddress: "",
    outside: "",
    ship: "",
    TempVar: "",
  });

  const [startCountDown, setStartCountDown] = useState(false);

  // 預設5 min 倒數時間，自動關閉
  const [countDown, setContDown] = useState(60 * autoCloseMins);

  // 如果使用localStorage，才會使用localStroage的值作為預設值
  useEffect(() => {
    if (storedValue && storedValue.storeid && enableLocalStorage) {
      setStore711(storedValue);
    }
  }, [storedValue, enableLocalStorage]);

  useEffect(() => {
    subscribe("stop-countdown", (e) => setStartCountDown(false));

    subscribe("set-store", (e) => {
      setStore711(e.detail);
    });

    subscribe("cancel", (e) => {
      setStartCountDown(false);
      setContDown(60 * autoCloseMins);
      console.warn("錯誤:001-因為跳出視窗關閉無法取值");
    });

    return () => {
      unsubscribe("set-store");
      unsubscribe("stop-countdown");
    };
  }, [autoCloseMins]);

  useInterval(
    () => {
      if (newWindow.current.closed) {
        setStartCountDown(false);
        setContDown(60 * autoCloseMins);

        publish("stop-countdown");
        publish("cancel");

        console.warn("錯誤:002-因為跳出視窗關閉無法取值");
      }

      if (countDown === 0) {
        setStartCountDown(false);
        setContDown(60 * autoCloseMins);

        publish("cancel");
        console.warn("錯誤:003-因為倒數時間已到無法取值");
        newWindow.current.close();
        return;
      }

      setContDown(countDown - 1);
    },
    startCountDown ? 1000 : null
  );

  const openWindow = () => {
    if (!serverCallbackUrl) {
      console.error("錯誤:001-必要。伺服器7-11運送商店用Callback路由網址");
      return;
    }

    newWindow.current = popupCenter(
      "https://emap.presco.com.tw/c2cemap.ashx?eshopid=870&&servicetype=1&url=" +
        serverCallbackUrl,
      title,
      w,
      h
    );

    setStartCountDown(true);
  };

  const closeWindow = () => {
    newWindow.current.close();
    setStartCountDown(false);
  };

  return {
    store711,
    openWindow,
    closeWindow,
  };
}

export function useShip711StoreCallback(keyLocalStorage = "store711") {
  const [storedValue, setValue] = useLocalStorage(keyLocalStorage, {
    storeid: "",
    storename: "",
    storeaddress: "",
    outside: "",
    ship: "",
    TempVar: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      // 確保父視窗存在且未關閉
      if (window.opener && !window.opener.closed) {
        // 通知母視窗關閉倒數計時
        window.opener.document.dispatchEvent(new CustomEvent("stop-countdown"));

        // 通知母視窗已完成，回送值
        window.opener.document.dispatchEvent(
          new CustomEvent("set-store", {
            detail: router.query,
          })
        );

        // 設定到localStorage
        setValue(router.query);

        // 關閉自己視窗
        window.close();
      } else {
        console.warn("無法訪問父視窗，可能已關閉或不存在");
      }
    }
    // eslint-disable-next-line
  }, [router.isReady, setValue, router.query]);
}
