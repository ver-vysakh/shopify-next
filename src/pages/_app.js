import { useEffect, useState } from "react";
import { Provider } from "react-redux";

import store from "@/store/store";
import Header from "@/components/Header";
import LoginModal from "@/components/LoginForm";

import "@/styles/globals.scss";
import { initApp } from "@/utils/helper";


export default function App({ Component, pageProps }) {
  const [isShowLogin, setIsShowLogin] = useState(false);

  useEffect(()=>{
    initApp()
  }, [])
  const handleLoginClick = () => {
    setIsShowLogin(!isShowLogin)
  };

  const toggle = () => {
    setIsShowLogin((isShowLogin) => !isShowLogin);
  };

  return (
    <Provider store={store}>
      <div>
        <Header toggle={toggle} />
        <Component {...pageProps} />
        {isShowLogin ? (
          <LoginModal onLogin={handleLoginClick} toggle={toggle} />
        ) : (
          <></>
        )}
      </div>
    </Provider>
  );
}
