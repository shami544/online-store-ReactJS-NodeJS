import { NavLink, Router, useNavigate } from "react-router-dom";
import './heder.css'
import React, { useContext, useEffect, useState } from "react";
import { User } from "../../context/context";
import Cookies from "universal-cookie";
import axios from "axios";
import { isExpired, decodeToken } from "react-jwt";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';



function HederAdmin() {
    const usernaw = useContext(User)
    const UserId = usernaw.auth.userDetals._id
    const UserName = usernaw.auth.userDetals.user

    const cookie = new Cookies()
    const nav = useNavigate()

    useEffect(() => {
        const ContextToken = usernaw.auth.token
        const IsExpiredContextToken = isExpired(ContextToken)
        const getTokenCookie = cookie.get("bearer")
        const token = getTokenCookie && getTokenCookie.token ? getTokenCookie.token : ""
        const RefreshTokenCookie = getTokenCookie && getTokenCookie.refreshToken ? getTokenCookie.refreshToken : ''
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
        const getTokenCookie = cookie.get("bearer")
        const token = getTokenCookie.token
        const RefreshTokenCookie = getTokenCookie.refreshToken
        await axios.get("http://localhost:3333/auth/logout",
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                    token: token,
                    refreshToken: RefreshTokenCookie,
                }
            }
        ).then(async () => {
            await cookie.remove("bearer")
            await cookie.remove("refreshToken")
            await usernaw.setAuth({ userDetals: "", token: "" })
            nav("/GetCategoryMarket")
        })
            .catch((err) => {
                console.log("err : ", err)
            })
    }
    const btnMyAccount = () => {
        nav("/admin/user/GetUserId")
    }
    const btnChangePassword = () => {
        nav(`/admin/user/ChangePassword/${UserId}`)
    }
    return (
        <nav id="MenuBig"  >
            <div class="w3-top form-floating" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", position: "fixed" }} >
                <div style={{ width: "100%", top: "0", zIndex: "2", maxHeight: "35px", padding: "0", backgroundColor: "white", boxShadow: "0 0 8px #898989 ", display: "flex" }}>
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
                    <div className="HederAdmineActive" style={{ display: "flex" }}>
                        {/* <Button variant="outline-success" style={{ padding: " 0.5% 2%" }} onClick={() => openCart()} ><i class="fa fa-user w3-margin-right"  ></i >Account</Button> */}
                        <NavLink to={"/admin/Home/Home2"} className="custom-button" activeClassName="active-link" exact><div>Users</div></NavLink>
                        <NavLink to={"/admin/Home/Home4"} className="custom-button" activeClassName="active-link" ><div>Market</div></NavLink>
                        <NavLink to={"/admin/market/CreateCategory"} className="custom-button" activeClassName="active-link"  ><div>Create Category</div></NavLink>
                        <NavLink to={"/admin/market/CreateArticales"} className="custom-button" activeClassName="active-link" ><div>Create Product</div></NavLink>
                        <NavLink to={"/admin/market/CreateAnOffer"} className="custom-button" activeClassName="active-link"  ><div>Create Offer</div></NavLink>
                    </div>
                </div>
            </div>
            <div id="navDemo" class="w3-bar-block w3-theme-d2 w3-hide w3-hide-large w3-hide-medium w3-large">
                <a href="#" class="w3-bar-item w3-button w3-padding-large">Link 1</a>
                <a href="#" class="w3-bar-item w3-button w3-padding-large">Link 2</a>
                <a href="#" class="w3-bar-item w3-button w3-padding-large">Link 3</a>
                <a href="#" class="w3-bar-item w3-button w3-padding-large">My Profile</a>
            </div>
        </nav>
    )
}

export default HederAdmin;