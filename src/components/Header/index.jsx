import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import isEmpty from "lodash/isEmpty";

import { setCustomerDetails } from "@/features/user/userSlice";
import styles from "./Header.module.scss";
import { logoutCustomer } from "@/utils/helper";
import { BASE_URL } from "@/constants";

const Header = ({ toggle }) => {
  const dispatch = useDispatch();
  const [greetingsText, setGreeting] = useState("");
  const { accessToken, customerDetails, isAuth } = useSelector(
    (state) => state.customer
  );

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const handleClick = () => {
    toggle();
  };

  useEffect(() => {
    const token = accessToken?.customerAccessToken?.accessToken || "";
    if (token) getCustomerDetails(token);
  }, [accessToken]);

  useEffect(() => {
    const greetingsText = `Welcome ${customerDetails?.customer?.lastName}`;
    setGreeting(greetingsText);
  }, [customerDetails]);

  const getCustomerDetails = async (token) => {
    const response = await fetch(`${baseUrl}api/getCustomerDetails`, {
      method: "POST",
      body: JSON.stringify({ token }),
    });
    const details = await response.json();
    if (!isEmpty(details)) dispatch(setCustomerDetails(details));
  };

  const logout = () => {
    logoutCustomer().then((res) => {
      if (res) {
        window.location.href = BASE_URL;
      }
    });
  };

  return (
    <header className={styles.headerStyles}>
      <div className={styles.logoContainerStyles}>
        <Link href={"/"}>
          <Image
            src={"/logo.svg"}
            alt="Logo"
            width={70}
            height={24}
            className={styles.logoStyles}
          />
        </Link>
      </div>
      <Link href={"/products/category-1"}>category-1</Link>
      {isAuth ? (
        <>
          <p className={styles.loginContainerStyles}>{greetingsText}</p>
          <p onClick={logout} className={styles.logoutLink}>
            {"Logout"}
          </p>
        </>
      ) : (
        <div className={styles.loginContainerStyles}>
          <button
            className={styles.loginButtonStyles}
            onClick={() => handleClick()}
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
