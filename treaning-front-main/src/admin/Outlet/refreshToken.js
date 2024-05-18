import axios from "axios";
import Cookies from "universal-cookie"
import { User } from "../../context/context";
import { useContext } from "react";

function RefreshToken (){
    
    const cookie = new Cookies();
    const usernaw = useContext(User)
    const getRefreshTokenCookie = cookie.get("refreshToken");
    console.log("asd")

    return axios.post("http://localhost:3333/auth/token", null, {
        headers: {
            Accept: "application/json",
            refreshToken: "bearer" + getRefreshTokenCookie
        }

    }).then(async (doc) => {
        const token = doc.data.token
        const userDetals = doc.data.data
        console.log(userDetals)
        cookie.set("bearer", token)
        usernaw.setAuth({ token: token, userDetals: userDetals })
    }).catch((err) => console.log("err refreshPage : ", err))
}

export default RefreshToken;