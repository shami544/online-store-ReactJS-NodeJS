import { NavLink, useNavigate } from "react-router-dom";
import "../../admin/heder/heder.css";
import Cookies from "universal-cookie";
import axios from "axios";
import { User } from "../../context/context";
import React, { useContext, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Badge from 'react-bootstrap/Badge';
import { isExpired, decodeToken } from "react-jwt";
import { useShoppingCart } from "../../context/shoppingCartContext";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button } from "react-bootstrap";



function HederVisitor() {

    const usernaw = useContext(User)
    const cookie = new Cookies()
    const token = usernaw.auth.token
    const UserId = usernaw.auth.userDetals._id
    const UserName = usernaw.auth.userDetals.user
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
            nav("/GetCategoryMarket")
        })

            .catch((err) => console.log("err : ", err))
    }
    const btnMyAccount = () => {
        nav("/cline/user/GetUserId")
    }
    const btnChangePassword = () => {
        nav(`/cline/user/ChangePassword/${UserId}`)
    }
    return (
        <nav id="MenuBig">
            {/* <div class="w3-top form-floating" style={{ display: "flex", flexDirection: "column" }} >
                <div class="w3-bar w3-theme-d2 w3-left-align w3-large" style={{ position: "fixed", width: "100%", top: "0", zIndex: "2", maxHeight: "35px", padding: "0", display: "flex", alignItems: "center" }}>
                    <div className="unitMenu " style={{ width: "110px", backgroundColor: "black" }}>
                        <DropdownButton
                            as={ButtonGroup}
                            size="sm"
                            variant="secondary"
                            title={
                                <span style={{ marginRight: "1px" }}>
                                    <i className="fa fa-user"></i> Account
                                </span>
                            }
                            style={{ position: "fixed", left: "8px", top: "3px", marginLeft: "3px" }}
                        >
                            <Dropdown.Item onClick={btnMyAccount} eventKey="1">my Account</Dropdown.Item>
                            <Dropdown.Item onClick={btnChangePassword} eventKey="2">Change Password</Dropdown.Item>
                            <Dropdown.Item eventKey="3">bbbbbbbb</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={btnLogout} style={{ color: 'red' }} eventKey="4">Logout</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div className="unitMenu ">
                    <NavLink to={"/cline/Articales/GetCategoryMarketCline"}  style={{ fontSize: "15px" }} exact><div class="w3-bar-item w3-button w3-hide-small  w3-hover-white" > <FaShoppingCart style={{ paddingRight: "2px", paddingBottom: "3px" }} />Market</div></NavLink>
                    </div>
                    <div style={{ marginLeft: "auto", marginRight: "7%" }}>
                        <button class="btn btn-primary" id="btnLogout" style={{ margin: "0", padding: "2px 2%", width: "300%" }} onClick={() => openCart()} >
                            <Badge bg="danger" style={{ marginRight: "5px", position: "absolute", top: "0", right: "7%" }}>{cartQuantity}</Badge>  <FaShoppingCart style={{ paddingBottom: "3px", fontSize: "20px" }} />
                            <span className="visually-hidden" >unread messages</span>
                        </button>
                    </div>
                </div>
            </div> */}


            <div style={{ position: "fixed", width: "100%", top: "0", zIndex: "3", maxHeight: "35px", padding: "0", backgroundColor: "white", boxShadow: "0 0 8px #898989 " }}>
                <div className="HederExperienceActive" style={{ display: "flex" }}>
                    {/* <div style={{ padding: " 2px 2%", backgroundColor: "rgb(25 135 84)", color: "white", height: '35px', fontSize: "21px", fontWeight: "500" }} >Menu</div> */}
                    <div className="unitMenu " style={{ width: "110px", maxHeight: "35px", backgroundColor: "rgb(25 135 84)" }}>
                        <DropdownButton
                            as={ButtonGroup}
                            size="sm"
                            variant="success"
                            title={
                                <span style={{ marginRight: "1px" }}>
                                    <i className="fa fa-user"></i> {UserName}
                                </span>
                            }
                            style={{ position: "fixed", left: "8px", top: "3px", marginLeft: "3px", color: "rgb(25 135 84)", minWidth: "88px" }}
                        >
                            <Dropdown.Item onClick={btnMyAccount} eventKey="1">my Account</Dropdown.Item>
                            <Dropdown.Item onClick={btnChangePassword} eventKey="2">Change Password</Dropdown.Item>
                            <Dropdown.Item eventKey="3">bbbbbbbb</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={btnLogout} style={{ color: 'red' }} eventKey="4">Logout</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <NavLink to={"/cline/Articales/GetCategoryMarketCline"} className="custom-button" ><div>Market</div></NavLink>
                    <NavLink to={`/cline/Articales/MyOrders/${UserId}`} className="custom-button" ><div>My Orders</div></NavLink>
                    <div style={{ margin: "3px 7% 0 auto" }}>
                        <Button variant="success" id="btnLogout" style={{ margin: "0", padding: "2px 0", width: "250%" }} onClick={() => openCart()} >
                            <Badge bg="#ff2222" style={{ marginRight: "10px", position: "absolute", top: "0", right: "7%" , backgroundColor:'red' }}>{cartQuantity}</Badge>  <FaShoppingCart style={{ paddingBottom: "3px", fontSize: "20px" }} />
                            <span className="visually-hidden" >unread messages</span>
                        </Button>
                    </div>
                </div>
            </div>
        </nav >
    )
}


export default HederVisitor;