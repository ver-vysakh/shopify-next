import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import isEmpty from "lodash/isEmpty";

import { setCustomerDetails } from "@/features/user/userSlice";
import styles from "./Header.module.scss";
import { logoutCustomer } from "@/utils/helper";
import { BASE_URL } from "@/constants";

// New header
import AppBar from "@mui/material/AppBar";
import {
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Logo from "../../../public/assets/alo-logo.svg";
import MadewellLogo from "../../../public/assets/madewell_logo.svg";
import BackIcon from "../../../public/assets/back-icon.svg";
import SearchIcon from "../../../public/assets/search-icon.svg";
import AvatarImage from "../../../public/assets/avatar-icon.svg";
import Router from "next/router";
// import StoreInfo from "./StoreInfo";
import BarcodeImg from "../../../public/assets/barcode_scanner.svg";
import SearchImg from "../../../public/assets/search-icon.svg";
import SearchCustImg from "../../../public/assets/search-cust-icon.svg";

import Location from "../../../public/assets/location-black.svg";
const Header = ({ toggle }) => {
  const dispatch = useDispatch();
  const [greetingsText, setGreeting] = useState("");
  const [searchText, setSearchText] = useState("");
  const [avatarText, setAvatarText] = useState("");
  const [anchorElUser, setAnchorElUser] = useState(null);

  const searchRef = useRef();

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

  const onSearchSubmit = () => {};
  const onSearchChange = () => {};

  // return (
  //   <div className={styles.headerWrapper}>
  //     <AppBar className="cstmAppBar">
  //       <Toolbar classes={{ root: "cstmToolBar" }}>
  //         <div className="sides">
  //           <IconButton
  //             style={{ backgroundColor: "transparent", paddingLeft: "0px" }}
  //             sx={{ display: { xs: "none", sm: "flex" } }}
  //             size="large"
  //             aria-label="icon"
  //             onClick={() => Router.push("/")}
  //           >
  //             <Image
  //               src={Logo}
  //               alt="Picture of the author"
  //               width="70px"
  //               height="40px"
  //               className="logo-image"
  //             />
  //           </IconButton>
  //           <div className="searchBox">
  //             <form onSubmit={onSearchSubmit}>
  //               <div className="searchBoxWrapper">
  //                 <Image
  //                   src={SearchIcon}
  //                   alt="Search icon"
  //                   width="24px"
  //                   height="24px"
  //                 />
  //               </div>
  //               <InputBase
  //                 classes={{
  //                   root: "cstmInputBase",
  //                   input: "cstmInputBaseInput",
  //                 }}
  //                 placeholder="Search"
  //                 inputProps={{ "aria-label": "search" }}
  //                 value={searchText}
  //                 onChange={onSearchChange}
  //                 inputRef={searchRef}
  //               />
  //               <div className="barcode-icon">
  //                 <IconButton
  //                   size="large"
  //                   aria-label="icon"
  //                   onClick={() => Router.push("/scan")}
  //                 >
  //                   <Image src={BarcodeImg} alt="barcode scanner icon" />
  //                 </IconButton>
  //               </div>
  //             </form>
  //           </div>
  //         </div>
  //         <div className="sides">
  //           <Box
  //             sx={{ display: { xs: "none", sm: "flex" } }}
  //             className="storeContainer"
  //           >
  //             <Link href="/store">
  //               <div className="storeInfo">
  //                 <div className="icon">
  //                   <Image src={Location} alt="Selected Store" />
  //                 </div>
  //                 <div className="content">
  //                   <Typography variant="h5" className="title">
  //                     {"3rd Avenue"}
  //                   </Typography>
  //                   <Typography variant="body2">
  //                     {"1130 3rd Avenue, New York, NY 10065"}
  //                   </Typography>
  //                 </div>
  //               </div>
  //             </Link>
  //             <div className="storeInfo">
  //             {
  //               isAuth ? (
  //                 <>
  //                   <p className={styles.loginContainerStyles}>{greetingsText}</p>
  //                   <p onClick={logout} className={styles.logoutLink}>
  //                     {"Logout"}
  //                   </p>
  //                 </>
  //               ) : <></>
  //             }
  //               {/* <div className="icon">
  //                 <Image src={Location} alt="Selected Store" />
  //               </div>
  //               <div className="content">
  //                 <Typography variant="h5" className="title">
  //                   {"3rd Avenue"}
  //                 </Typography>
  //                 <Typography variant="body2">
  //                   {"1130 3rd Avenue, New York, NY 10065"}
  //                 </Typography>
  //               </div> */}
  //             </div>
  //           </Box>
  //           <IconButton
  //             size="small"
  //             // onClick={handleOpenUserMenu}
  //             aria-label="account of current user"
  //             color="inherit"
  //           >
  //             {avatarText ? (
  //               <Box className="avatarText">{avatarText}</Box>
  //             ) : (
  //               <Image
  //                 src={AvatarImage}
  //                 alt="Avatar icon"
  //                 width="30px"
  //                 height="30px"
  //                 onClick={() => handleClick()}
  //               />
  //             )}
  //           </IconButton>
  //           <Menu
  //             sx={{ mt: "45px" }}
  //             id="menu-appbar"
  //             anchorEl={anchorElUser}
  //             anchorOrigin={{
  //               vertical: "top",
  //               horizontal: "right",
  //             }}
  //             keepMounted
  //             transformOrigin={{
  //               vertical: "top",
  //               horizontal: "right",
  //             }}
  //             open={Boolean(anchorElUser)}
  //             // onClose={handleCloseUserMenu}
  //             classes={{
  //               paper: "userMenu",
  //             }}
  //           >
  //             {avatarText ? (
  //               <MenuItem
  //                 classes={{ root: "listItem" }}
  //                 // onClick={handleCloseUserMenu}
  //               >
  //                 <Typography
  //                   className="item"
  //                   onClick={signOut}
  //                   textAlign="center"
  //                 >
  //                   SignOut
  //                 </Typography>
  //               </MenuItem>
  //             ) : (
  //               <MenuItem
  //                 classes={{ root: "listItem" }}
  //                 // onClick={handleCloseUserMenu}
  //               >
  //                 <Link href="/login">
  //                   <Typography className="item" textAlign="center">
  //                     Associate Login
  //                   </Typography>
  //                 </Link>
  //               </MenuItem>
  //             )}
  //           </Menu>
  //         </div>
  //       </Toolbar>
  //     </AppBar>
  //   </div>
  // );
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
        <Link
          className={styles.collection}
          href={"/collections/featured-collection"}
        >
          ACCESSORIES
        </Link>
      </div>
      {isAuth ? (
        <div style={{ display: "flex" }}>
          <Image
            src={SearchImg}
            width={"20"}
            height={"20"}
            alt={"serch icon"}
          />
          <Image
            src={SearchCustImg}
            width={"20"}
            height={"20"}
            alt={"serch icon"}
            style={{marginLeft:"20px"}}
          />
          <p className={styles.loginContainerStyles}>
            {greetingsText.toUpperCase()}
          </p>
          <p onClick={logout} className={styles.logoutLink}>
            {"Logout"}
          </p>
        </div>
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
