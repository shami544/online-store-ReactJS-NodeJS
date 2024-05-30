import { Link, NavLink, useNavigate } from "react-router-dom";
import "./hederExperience.css";
import React,{ useContext, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { User } from "../context/context";
import { IoLogInOutline } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { RiMailSendLine } from "react-icons/ri";
import { LoadingBtn } from "../refreshPage/loading";

function HederExperience() {
    useEffect(() => {

    })

    const [user, setUser] = useState()
    const [password, setPassword] = useState()
    const [errMsg, setErrMsg] = useState()
    const [errMsgForgot, setErrMsgForgot] = useState()
    const [emailForgot, setEmailForgot] = useState()
    const [dataaForgot, setDataaForgot] = useState()
    const [statuslogin, setStatusLogin] = useState(<><IoLogInOutline style={{ fontSize: "25px", padding:"0 0px 3px 0" }} /> login</>)
    const [statusSendEmail, setStatusSendEmail] = useState(<><RiMailSendLine style={{ fontSize: "20px", paddingBottom: "4px" }} />  Send Email</>)

    const cookie = new Cookies()
    const usernaw = useContext(User)
    const nav = useNavigate()

    const [showLogin, setShowLogin] = useState(false);
    const handleShowLogin = () => (
        setShowLogin(true),
        handleCloseForgot()
    );
    const handleCloseLogin = () => (
        setShowLogin(false),
        setErrMsg(null)
    );

    const [showForgot, setShowForgot] = useState(false);
    const handleShowForgot = () => (
        setShowForgot(true),
        handleCloseLogin()
    );
    const handleCloseForgot = () => (
        setShowForgot(false),
        setErrMsgForgot(null),
        setDataaForgot(null)
    );

    const btnSignup = () => {
        nav("/CreateUser")
    }
    const data = { user: user, password: password }
    const btnlog = async () => {
        setStatusLogin(<LoadingBtn />)
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
                setStatusLogin(<><IoLogInOutline style={{ fontSize: '21px' }} /> Login</>)
                {
                    if (err.response.data.errors) {
                        setErrMsg(err.response.data)
                    } { console.log(err) }
                }
            })
    }

    const dataForgot = { email: emailForgot }
    const btnForgot = async () => {
        setStatusSendEmail("Laoding...")
        await axios.patch("http://localhost:3333/auth/forgotpassword", dataForgot)
            .then((doc) => {
                setDataaForgot(doc.data)
                setStatusSendEmail(<><RiMailSendLine style={{ fontSize: "20px", paddingBottom: "4px" }} />  Send Email</>)
            })
            .catch((err) => {
                setStatusSendEmail(<><RiMailSendLine style={{ fontSize: "20px", paddingBottom: "4px" }} />  Send Email</>)
                {
                    if (err.response.data.errors) {
                        setErrMsgForgot(err.response.data)
                    } { console.log(err) }
                }
            })
    }
    useEffect(() => {
        cookie.remove("bearer")
        setErrMsgForgot(null)
    }, [dataaForgot])

    return (<>
        <nav id="MenuBig" style={{ backgroundColor: "white" }}>
            <div style={{ position: "fixed", width: "100%", top: "0", zIndex: "3", maxHeight: "35px", padding: "0", backgroundColor: "white", boxShadow: "0 0 8px #898989 " }}>
                <div className="HederExperienceActive" style={{ display: "flex" }}>
                    <div style={{ padding: " 2px 2%" ,backgroundColor:"rgb(25 135 84)" ,color:"white" , height:'35px', fontSize:"21px" , fontWeight:"500"}} >Menu</div>
                    <NavLink to={"/GetCategoryMarket"} className="custom-button" activeClassName="active-link" ><div>Market</div></NavLink>
                    <div style={{ marginLeft: "auto", marginRight: "4%", display: "flex",marginTop:"3px" }}>
                        <Button variant="outline-success" onClick={handleShowLogin} style={{ width: "80px" , padding:'3px 7px 0 0',height:'30px',marginRight:"10px"}}>
                            <IoLogInOutline style={{ fontSize: "25px", padding:"0 0px 3px 0" }} /> login
                        </Button>
                        <Button variant="outline-success" onClick={btnSignup} style={{ width: "80px", padding:'0',height:'30px' }}>
                            signup
                        </Button>
                    </div>
                </div>
            </div>
            <Modal show={showLogin} onHide={handleCloseLogin}>
                <Modal.Header closeButton>
                    <Modal.Title>Login Page </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" autoFocus onChange={e => setUser(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label> Password </Form.Label>
                            <Form.Control type="password" placeholder="Password" autoFocus onChange={e => setPassword(e.target.value)} />
                            <div id="errMsg" style={{ color: "red" }} dangerouslySetInnerHTML={{
                                __html: errMsg ? errMsg.errors.map(error => error.msg).join("<br>") : ''
                            }}></div>
                            <div id="errpassword" style={{ color: "red" }}></div>
                            <div id="errincorrect" style={{ color: "red" }}></div>
                        </Form.Group>
                    </Form>
                    <div style={{ fontSize: "13px" }}>هل نسيت كلمة المرور؟ اضغط <Link onClick={handleShowForgot} style={{ color: "#0d6efd" }}>نسيت كلمة المرور</Link></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" style={{ width: "80px" , padding:'0px 0 0 0',height:'35px'}} onClick={handleCloseLogin}> Close </Button>
                    <Button variant="success" style={{ width: "80px" , padding:'3px 7px 0 0',height:'35px',marginRight:"10px"}} onClick={btnlog}>  {statuslogin} </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showForgot} onHide={handleCloseForgot}>
                <Modal.Header closeButton>
                    <Modal.Title>Password Recovery </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" autoFocus onChange={e => setEmailForgot(e.target.value)} />
                            <div><div id="err" style={{ color: "red", backgroundColor: '#ffdddd', padding: "0 5px" }}>{errMsgForgot ? errMsgForgot.errors.map(error => error.msg).join("<br>") : ''}</div></div>
                            <div><div id="success" style={{ color: "green", backgroundColor: '#bff5bf', padding: "0 5px" }}>{dataaForgot ? dataaForgot.message : ''}</div></div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseForgot}> Close </Button>
                    <Button variant="success" style={{ width: "120px" , padding:'3px 7px 0 0',height:'35px',marginRight:"10px"}} onClick={btnForgot}>{statusSendEmail}</Button>
                </Modal.Footer>
            </Modal>
        </nav >
    </>)
}

export default HederExperience;