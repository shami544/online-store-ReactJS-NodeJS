import { NavLink, useNavigate } from "react-router-dom";
import "./heder.css";
import { useContext, useEffect, useState } from "react";
import { User } from "../../context/context";
import Cookies from "universal-cookie";
import axios from "axios";
import { isExpired, decodeToken } from "react-jwt";

function HederAdmin() {

    const usernaw = useContext(User)
    const cookie = new Cookies()
    const nav = useNavigate()

    // useEffect(()=>{
    //     const belal = ()=>{
    //         const aaa = 0
    //         return aaa
    //     }
    //     return belal
    // })

    // useEffect(() => {
    //     const minute = 1000 * 60
    //     const intervalId = setInterval(() => {
    //         const ContextToken = usernaw.auth.token
    //         const decodedContextToken = decodeToken(ContextToken)
    //         const IsExpiredContextToken = isExpired(ContextToken)
    //         const getTokenCookie = cookie.get("bearer")
    //         const token = getTokenCookie.token
    //         const decoded = getTokenCookie.decoded
    //         const RefreshTokenCookie = getTokenCookie.refreshToken
    //         if (decoded && decoded.exp && Date.now() >= ((decoded.exp * 1000) - minute * 6) ) {
    //             axios.post("http://localhost:3333/auth/refreshToken", null, {
    //                 headers: {
    //                     Accept: "application/json",
    //                     Authorization: "Bearer " + RefreshTokenCookie,
    //                 }
    //             }).then(async (doc) => {
    //                 const newtoken = doc.data.token
    //                 const newuserDetals = doc.data.data
    //                 const newdecoded = doc.data.decoded
    //                 await cookie.remove("bearer")
    //                 await cookie.set("bearer", { token: token, refreshToken: RefreshTokenCookie, userDetals: newuserDetals, decoded: newdecoded })
    //                 await usernaw.setAuth({ token: newtoken, userDetals: newuserDetals, decoded: newdecoded })
    //             }).catch((err) => console.log("err refreshPage : ", err))
    //         }
    //     }, minute * 5);
    //     return () => clearInterval(intervalId);
    // }, []);
    // let ContextToken

    useEffect(() => {
        const ContextToken = usernaw.auth.token
        const IsExpiredContextToken = isExpired(ContextToken)
        const getTokenCookie = cookie.get("bearer")
        const token = getTokenCookie && getTokenCookie.token ? getTokenCookie.token :""
        const RefreshTokenCookie =getTokenCookie && getTokenCookie.refreshToken?getTokenCookie.refreshToken:''
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

    return (
        <nav id="MenuBig" class="navbar fixed-bottom navbar-light bg-light" >
            <div class="w3-top form-floating" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }} >
                <div class="w3-bar w3-theme-d2 w3-left-align w3-large" style={{ position: "fixed", width: "100%", top: "0", zIndex: "2", maxHeight: "35px", padding: "0" }}>
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
                    <NavLink to={"/admin/Home/Home2"} className="unitMenu " style={{ fontSize: "15px", padding: "1%" }} exact><div class="w3-bar-item w3-button w3-hide-small  w3-hover-white " >Users</div></NavLink>
                    <NavLink to={"/admin/Home/Home4"} className="unitMenu " style={{ fontSize: "15px", padding: "1%" }} exact><div class="w3-bar-item w3-button w3-hide-small  w3-hover-white" >Market</div></NavLink>
                    <NavLink to={"/admin/market/CreateArticales"} className="unitMenu " style={{ fontSize: "15px", padding: "1%" }} ><div class="w3-bar-item w3-button w3-hide-small  w3-hover-white" >Create Product</div></NavLink>
                    <NavLink to={"/admin/market/CreateCategory"} className="unitMenu " style={{ fontSize: "15px", padding: "1%" }} ><div class="w3-bar-item w3-button w3-hide-small  w3-hover-white" >Create Category</div></NavLink>
                    <NavLink to={"/admin/market/CreateAnOffer"} className="unitMenu " style={{ fontSize: "15px", padding: "1%" }} ><div class="w3-bar-item w3-button w3-hide-small  w3-hover-white" >Create Offer</div></NavLink>
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