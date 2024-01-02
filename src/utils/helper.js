import isEmpty from "lodash/isEmpty";

import { removeCustomer, setCustomerDetails } from "@/features/user/userSlice";
import store from "@/store/store";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const initApp = () => {
  if (typeof localStorage != undefined) {
    const accessToken = localStorage.getItem("accessToken")
      ? btoa(localStorage.getItem("accessToken"))
      : "";
    if (accessToken) getCustomerDetails(accessToken);
  }
};

const getCustomerDetails = async (token) => {
  const response = await fetch(`${baseUrl}api/getCustomerDetails`, {
    method: "POST",
    body: JSON.stringify({ token }),
  });
  const details = await response.json();
  if (!isEmpty(details)) store.dispatch(setCustomerDetails(details));
};

export const logoutCustomer = () => {
  return new Promise((resolve, reject) => {
    try {
      if (localStorage && sessionStorage) {
        localStorage.clear();
        sessionStorage.clear();
      }
      store.dispatch(removeCustomer());
      resolve(true);
    } catch (error) {
      reject(false)
    }
  });
};
