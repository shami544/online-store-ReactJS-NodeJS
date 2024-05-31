import axios from "axios";
import "./Users.css";
import { useContext, useState } from "react";
import { User } from "../context/context";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import AllCollapseExample from "./CollapsedState";


function LoginPage() {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState()

    const usernaw = useContext(User)
    const nav = useNavigate()
    const dataa = { email: user, password: password, user: user }

    const cookie = new Cookies()

    const btnlog = async () => {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, dataa)
            .then((doc) => {
                const token = doc.data.token
                const refreshToken = doc.data.retoken
                const userDetals = doc.data.data
                const decoded = doc.data.decoded
                usernaw.setAuth({ token, userDetals, decoded })
                cookie.set("bearer", { token: token, refreshToken: refreshToken, userDetals: userDetals, decoded: decoded })
                console.log(doc.data)
                if (userDetals.role === "admin") {
                    nav('/admin/Home/Home2')
                } else { nav('/cline/Home2') }
            })
            .catch((err) => {
                {
                    if (err.response.data.errors) {
                        setErr(err.response.data.errors)
                    } { console.log(err) }
                }
            })
    }

    if (err) {
        const errors = err
        var userError = errors.find(error => error.path === "user")
        var passwordError = errors.find(error => error.path === "password")
        var IncorrectEror = errors.find(error => error.msg === "Incorrect email or password")
        var band = errors.find(error => error.msg === "band")


        if (userError) {
            document.getElementById("erruser").innerHTML = userError.msg
        }
        if (!userError) {
            document.getElementById("erruser").innerHTML = ""
        }
        if (passwordError) {
            document.getElementById("errpassword").innerHTML = passwordError.msg
        }
        if (!passwordError) {
            document.getElementById("errpassword").innerHTML = ""
        }
        if (band) {
            document.getElementById("errincorrect").innerHTML = band.msg
        }
        if (IncorrectEror) {
            document.getElementById("errincorrect").innerHTML = IncorrectEror.msg
        }
        if (!IncorrectEror && !band) {
            document.getElementById("errincorrect").innerHTML = ""
        }
        // if (band) {
        //     document.getElementById("errincorrect").innerHTML = IncorrectEror.msg
        // }
        // if (!band) {
        //     document.getElementById("errincorrect").innerHTML = ""
        // }
    }


    return (<>
        <div>
            <div id="LoginPage">
                <div id="Page">
                    <div id="H1Login">
                        <h1>Login</h1>
                    </div>
                    <div className="Msge"></div>

                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" onChange={e => setUser(e.target.value)} placeholder="name@example.com" />
                        <label for="floatingInput">Email address or User</label>
                        <div id="erruser" className="errMsgInbut"></div>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingPassword" onChange={e => setPassword(e.target.value)} placeholder="Password" />
                        <label for="floatingPassword">Password</label>
                        <div id="errpassword" className="errMsgInbut"></div>
                    </div>

                    <div id="errincorrect" className="errMsgInbut"></div>

                    {/* بعد اكمال الحقول اضغط */}
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary" onClick={btnlog}> Login</button>
                    </div>
                    اذا كنت مستخدم جديد اضغط
                    {/* <div class="col-12">
                    <button type="submit" class="btn btn-primary" onClick={clickCreateAc}> Sign up</button>
                </div> */}
                    <Link to={"/CreateUser"} id="LinkSignup"> Sign up </Link>
                </div>
                <AllCollapseExample />

            </div>
        </div>
    </>)
}

export default LoginPage