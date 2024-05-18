import { NavLink, useNavigate } from "react-router-dom";
import "./hederExperience.css";
import { useContext, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { User } from "../context/context";
import { IoLogInOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";


function HederExperience() {
    const [user, setUser] = useState()
    const [password, setPassword] = useState()
    const [errMsg, setErrMsg] = useState()

    const usernaw = useContext(User)
    // useEffect(() => {
    //     cookie.remove("bearer")
    //     cookie.remove("refreshToken")
    //     cookie.remove("userDetals")
    // },[])

    const data = { user: user, password: password }

    const cookie = new Cookies()
    const nav = useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const btnSignup = () => {
        nav("/CreateUser")
    }

    const btnlog = async () => {
        await axios.post("http://localhost:3333/auth/login", data)
            .then(async (doc) => {
                const token = doc.data.token
                const refreshToken = doc.data.retoken
                const userDetals = doc.data.data
                const decoded = doc.data.decoded
                await usernaw.setAuth({ token: token, userDetals: userDetals, decoded: decoded, refreshToken: refreshToken })
                await cookie.set("bearer", { token: token, refreshToken: refreshToken, userDetals: userDetals, decoded: decoded })
                if (userDetals.role === "admin") {
                    nav('/admin/Home/Home2')
                } else {
                    nav('/cline/Articales/GetCategoryMarketCline')
                }
            })
            .catch((err) => {
                {
                    if (err.response.data.errors) {
                        setErrMsg(err.response.data.errors)
                    } { console.log(err) }
                }
            })
    }


    if (errMsg) {
        const errors = errMsg
        var userError = errors.find(error => error.path === "user")
        var passwordError = errors.find(error => error.path === "password")
        var IncorrectEror = errors.find(error => error.msg === "Incorrect email or password")
        var band = errors.find(error => error.msg === "band")

        if (userError) {
            document.getElementById("erruser").innerHTML = userError.msg
        } else if (!userError) {
            document.getElementById("erruser").innerHTML = null
        } if (passwordError) {
            document.getElementById("errpassword").innerHTML = passwordError.msg
        } else if (!passwordError) {
            document.getElementById("errpassword").innerHTML = null
        } if (IncorrectEror) {
            document.getElementById("errincorrect").innerHTML = IncorrectEror.msg
        } else if (!IncorrectEror) {
            document.getElementById("errincorrect").innerHTML = null
        } if (band) {
            document.getElementById("errincorrect").innerHTML = band.msg
        }
    }
    return (<>
        <nav id="MenuBig" class="navbar fixed-bottom navbar-light bg-light" >
            <div class="w3-top form-floating" style={{ display: "flex", flexDirection: "column" }} >
                <div class="w3-bar w3-theme-d2 w3-left-align w3-large" style={{ position: "fixed", width: "100%", top: "0", zIndex: "2", maxHeight: "35px", padding: "0", display: "flex", alignItems: "center" }}>
                    <a role="button" class="  w3-theme-d4" style={{ padding: " 0.5% 2%" }} >Menu</a>
                    <NavLink to={"/GetCategoryMarket"} className="unitMenu " style={{ fontSize: "15px" }} exact><div class="w3-bar-item w3-button w3-hide-small  w3-hover-white" > <FaShoppingCart style={{ paddingRight: "2px", paddingBottom: "3px" }} />Market</div></NavLink>
                    <div style={{ marginLeft: "auto", marginRight: "5%", display: "flex" }}>
                        <Button variant="primary" onClick={handleShow} style={{ margin: "0", marginRight: "3%", padding: "2px 2%", width: "80px" }}>
                            <IoLogInOutline style={{ fontSize: "20px" }} /> login
                        </Button>
                        <Button variant="primary" onClick={btnSignup} style={{ margin: "0", padding: "2px 2%", width: "80px" }}>
                            signup
                        </Button>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login Page </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" autoFocus onChange={e => setUser(e.target.value)} />
                            <div id="erruser" style={{ color: "red" }}></div>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> Password </Form.Label>
                            <Form.Control type="password" placeholder="Password" autoFocus onChange={e => setPassword(e.target.value)} />
                            <div id="errpassword" style={{ color: "red" }}></div>
                            <div id="errincorrect" style={{ color: "red" }}></div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}> Close </Button>
                    <Button variant="primary" onClick={btnlog}>  <IoLogInOutline style={{ fontSize: "21px" }} /> login </Button>
                </Modal.Footer>
            </Modal>
            <div>
            </div>
        </nav >
    </>)
}

export default HederExperience;