import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./HomeAdmin.css"
import { User } from "../../context/context"
import Loading from "../../refreshPage/loading"
import CloseButton from 'react-bootstrap/CloseButton';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import img1 from "../../file/20200917-1600348395146-original.jpg"
import Form from 'react-bootstrap/Form';
import Cookies from "universal-cookie"


function Home4admin() {
    const [dataa, setDataa] = useState()
    // const nev = useNavigate()
    // const cookie = new Cookies()
    // const [errDecodedTokein, setErrDecodedTokin] = useState()
    // const getRefreshTokenCookie = cookie.get("refreshToken");

    const context = useContext(User)
    const token = context.auth.token

    const [hoveredItem, setHoveredItem] = useState(null);
    const [show, setShow] = useState(false);
    const [itemId, setItemId] = useState();

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true)
        setItemId(id)
    };

    useEffect(() => {
        axios.get("http://localhost:3333/articales/GetCategoryMarket",
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                }
            })
            .then((doc) => setDataa(doc.data))
            .catch((err) => {
                console.log("err Get :", err)
                // if (err.response.data.errors) {
                //     setErrDecodedTokin(err.response.data.errors)
                //     console.log("1")
                // }
            })
    }, [token])

    // useEffect(() => {
    //     if (errDecodedTokein) {
    //         var userError = errDecodedTokein.find(error => error.msg === "انتهت صلاحية التوكن")
    //         if (userError) {
    //             console.log("user error")
    //             axios.post("http://localhost:3333/auth/refreshToken", null, {
    //                 headers: {
    //                     Accept: "application/json",
    //                     Authorization: "Bearer " + getRefreshTokenCookie,
    //                 }
    //             }).then(async (doc) => {
    //                 const token = doc.data.token
    //                 const userDetals = doc.data.data
    //                 cookie.set("bearer", token)
    //                 context.setAuth({ token: token, userDetals: userDetals })
    //                 console.log("2")
    //             }).catch((err) => console.log("err refreshPage : ", err))
    //             console.log(getRefreshTokenCookie)
    //         }
    //     }
    // }, [errDecodedTokein])

    const shwfile = (id) => {
        axios.delete(`http://localhost:3333/articales/DeleteCategoryMarket/${id}`, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            }
        })
            .then(() => { setShow(false) })
            .then(() => { window.location.replace(`/admin/Home/Home4`) })
            .catch((err) => {
                console.log("err delet id : ", err)
                // if (err.response.data.errors) {
                //     setErrDecodedTokin(err.response.data.errors)
                //     console.log("1")
                // }
            })
    }

    return (
        <div id="PageGetArticales">

            {dataa ? <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>رسالة تأكيد</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>هل حقا تريد حذف هذه الفئة؟</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            اغلاق
                        </Button>
                        <Button variant="primary" onClick={() => shwfile(itemId)}>
                            نعم ,متأكد
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div style={{ borderTop: "soled 1px black", marginTop: "50px" }}>
                    <div
                        style={{
                            backgroundImage: `url(${img1})`,
                            backgroundSize: "100%",
                            width: "90%",
                            margin: "0 5%",
                            minHeight: "500px",
                            maxHeight: "600px",
                            display: "flex",
                            alignItems: "center",
                            backgroundPosition: "center"
                        }} >
                        <Form className="d-flex" style={{ width: "50%", marginLeft: "5%" }}>
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2 "
                                aria-label="Search"
                                style={{ backgroundColor: "rgba(255, 255, 255, 0.678)" }}
                            />
                            <button type="submit" class="btn btn-primary" >Search</button>
                        </Form>
                    </div>
                    <div id="PageUlProduct" style={{marginTop:"40px"}}>
                        {dataa && dataa.map((item, index) =>
                            <div
                                class="card"
                                style={{ width: "220px", margin: "1%", border: "none" }}
                                onMouseEnter={() => setHoveredItem(item)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                {hoveredItem === item && <CloseButton style={{ position: "absolute", top: 0, left: 0 }} onClick={() => handleShow(item._id)} />}
                                <Link to={`http://localhost:3000/admin/Home/Home4/${item.name}`}>
                                    <div >
                                        <img
                                            src={`http://localhost:3333/files/${item.file[0]}`}
                                            class="card-img-top"
                                            style={{ maxHeight: "300px" , borderRadius:"10px"}}
                                            alt="item image"
                                        />
                                        <div class="card-body">
                                            <h5 class="card-title" style={{ textAlign: "center" }}>
                                                {item.name}
                                            </h5>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}

                    </div>
                </div>
            </> : <Loading />}

        </div >
    )
}

export default Home4admin