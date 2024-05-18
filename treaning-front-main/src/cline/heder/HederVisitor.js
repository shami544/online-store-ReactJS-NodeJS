import { NavLink, useNavigate } from "react-router-dom";
import "../../admin/heder/heder.css";
import Cookies from "universal-cookie";
import axios from "axios";
import { User } from "../../context/context";
import { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Badge from 'react-bootstrap/Badge';
import { isExpired, decodeToken } from "react-jwt";
import { useShoppingCart } from "../../context/shoppingCartContext";



function HederVisitor() {

    const usernaw = useContext(User)
    const cookie = new Cookies()
    const token = usernaw.auth.token
    const nav = useNavigate()

    const { openCart, cartQuantity, removeAllCart } = useShoppingCart()

    useEffect(() => {
        const ContextToken = usernaw.auth.token
        const IsExpiredContextToken = isExpired(ContextToken)
        const getTokenCookie = cookie.get("bearer")
        const token = getTokenCookie.token
        const RefreshTokenCookie = getTokenCookie.refreshToken
        if (IsExpiredContextToken) {
            axios.post("http://localhost:3333/auth/refreshToken", null, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + RefreshTokenCookie,
                }
            }).then(async (doc) => {
                const newtoken = doc.data.token
                const newuserDetals = doc.data.data
                const newdecoded = doc.data.decoded
                await cookie.remove("bearer")
                await cookie.set("bearer", { token: token, refreshToken: RefreshTokenCookie, userDetals: newuserDetals, decoded: newdecoded })
                await usernaw.setAuth({ token: newtoken, userDetals: newuserDetals, decoded: newdecoded })
                console.log("ok refresh")
            }).catch((err) => console.log("err refreshPage : ", err))
        }
    });

    const btnLogout = async () => {
        await axios.get("http://localhost:3333/auth/logout",
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                    // token: token,
                }
            }
        ).then(async () => {
            await cookie.remove("bearer")
            await localStorage.removeItem("shopping-cart")
            removeAllCart()
            await usernaw.setAuth({ userDetals: "", token: "" })
            nav("/Login")
        })

            .catch((err) => console.log("err : ", err))
    }
    return (
        <nav id="MenuBig" class="navbar fixed-bottom navbar-light bg-light" sticky="top">
            <div class="w3-top form-floating" style={{ display: "flex", flexDirection: "column" }} >
                <div class="w3-bar w3-theme-d2 w3-left-align w3-large" style={{ position: "fixed", width: "100%", top: "0", zIndex: "2", maxHeight: "35px", padding: "0", display: "flex", alignItems: "center" }}>
                    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" >
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Account</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body" >
                            <div class="w3-bar-item w3-hide-small w3-right ">
                                <button type="submit" class="btn btn-primary" id="btnLogout" onClick={btnLogout}> Logout</button>
                            </div>
                        </div>
                    </div>
                    <a class="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-theme-d2" href="javascript:void(0);" onclick="openNav()"><i class="fa fa-bars"></i></a>
                    <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" class="w3-bar-item w3-button  w3-theme-d4" style={{ padding: " 0.5% 2%" }} ><i class="fa fa-user w3-margin-right"  ></i >Account</a>
                    <NavLink to={"/cline/Articales/GetCategoryMarketCline"} className="unitMenu " style={{ fontSize: "15px" }} exact><div class="w3-bar-item w3-button w3-hide-small  w3-hover-white" > <FaShoppingCart style={{ paddingRight: "2px", paddingBottom: "3px" }} />Market</div></NavLink>
                    <div style={{ marginLeft: "auto", marginRight: "7%" }}>
                        <button class="btn btn-primary" id="btnLogout" style={{ margin: "0", padding: "2px 2%", width: "300%" }} onClick={() => openCart()} >
                            <Badge bg="danger" style={{ marginRight: "5px", position: "absolute", top: "0", right: "7%" }}>{cartQuantity}</Badge>  <FaShoppingCart style={{ paddingBottom: "3px", fontSize: "20px" }} />
                            <span className="visually-hidden" >unread messages</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav >
    )
}


export default HederVisitor;