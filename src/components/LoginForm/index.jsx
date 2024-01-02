import React, { useState } from "react";
import { useDispatch } from 'react-redux';

import { setAccessToken } from "@/features/user/userSlice";
import styles from "./LoginForm.module.scss";

const LoginForm = ({ onLogin, toggle }) => {
  const [username, setUserName] = useState("johnsmith@shopify.com");
  const [password, setPassword] = useState("5hopify");
  const dispatch = useDispatch();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const login = () => {
    getAccessToken({username, password});
  };

  const getAccessToken = async (data) => {
    const response = await fetch(`${baseUrl}api/getAccessToken`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const token = await response.json();
    dispatch(setAccessToken(token?.data?.customerAccessTokenCreate ||{}))
    onLogin()
  };

  return (
    <div className={styles.modal}>
      <div className={`${styles.show}`}>
        <div className={styles.loginForm}>
          <div className={`${styles.formBox} ${styles.solid}`}>
            <h1 className={styles.loginText}>Sign In</h1>
            <input
              type="text"
              name="username"
              placeholder="User Name"
              className={styles.formBox}
              value={username}
              onChange={(event)=>{setUserName(event.target.value)}}
            />
            <input
              type="password"
              name="password"
              className={styles.formBox}
              placeholder="password"
              value={password}
              onChange={(event)=>{setPassword(event.target.value)}}

            />
            <br></br>
            <div className={styles.footer}>
              <button onClick={()=>login()} type="button" className={styles.loginBtn}>
                Login
              </button>
              <button
                onClick={toggle}
                type="button"
                className={`${styles.loginBtn} ${styles.cancelBtn}`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
