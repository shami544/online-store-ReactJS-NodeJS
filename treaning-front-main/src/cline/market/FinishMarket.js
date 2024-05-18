import React, { useContext, useEffect, useState } from "react";
import { useShoppingCart } from "../../context/shoppingCartContext";
import axios from "axios";
import './Articales.css';
import { Button, Nav, NavLink, Stack, Tab, Tabs } from "react-bootstrap";
import CartItem from "./CartItem";
import { User } from "../../context/context";
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';

const FinishMarket = () => {
    const { cartItems } = useShoppingCart()
    const usernaw = useContext(User)
    const userId = usernaw.auth.userDetals._id
    const token = usernaw.auth.token


    const [dataaUser, setDataaUser] = useState()
    const [dataaArticales, setDataaArticales] = useState()
    const [city, setCity] = useState()
    const [district, setDistrict] = useState()
    const [street, setStreet] = useState()
    const [architectureName, setArchitectureName] = useState()
    const [apartmentNumber, setApartmentNumber] = useState()
    const [floorNumber, setFloorNumber] = useState()
    const [additionalDetailsr, setAdditionalDetailsr] = useState()
    const [show, setShow] = useState(false);

    const [selectedItemId, setSelectedItemId] = useState(""); // حالة لتخزين قيمة العنصر المحدد

    // دالة لتحديث قيمة العنصر المحدد عندما يتغير الإدخال
    const handleInputChange = (e) => {
      setSelectedItemId(e.target.value);
    };
    console.log(selectedItemId)
    useEffect(() => {
        axios.get(`http://localhost:3333/users/GetUser/${userId}`,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                }
            })
            .then((doc) => setDataaUser(doc.data))
            .catch((err) => { console.log("err get user : ", err) })
        belal()
    }, [show])

    const belal = (async () => {
        await axios.get("http://localhost:3333/clineArticales/GetArticales")
            .then((doc) => setDataaArticales(doc.data))
            .catch((err) => console.log("err Get : ", err))
    })

    const dataAddressPost = {
        city: city,
        district: district,
        street: street,
        architectureName: architectureName,
        apartmentNumber: apartmentNumber,
        floorNumber: floorNumber,
        additionalDetailsr: additionalDetailsr
    }

    const btnAddAddress = async () => {
        await axios.post(`http://localhost:3333/users/addaddress/${userId}/address`, dataAddressPost,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                }
            }
        )
            .then(() => { setShow(true) })
            .catch((err) => { console.log("err post address : ", err) })
    }

    const btnDeleteAddress = async (addressId) => {
        await axios.post(`http://localhost:3333/users/removeaddress/${userId}/address/${addressId}`, dataAddressPost,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                }
            }
        )
            .then(() => {setShow(true) })
            .catch((err) => { console.log("err delete address : ", err) })
    }

    return (<>
        <div style={{ marginTop: "35px", minHeight: "500px", backgroundColor: "rgb(235, 235, 235)", padding: "2%" }}>

            <div style={{ backgroundColor: "white", width: "100%", borderRadius: "10px", boxShadow: " 5px 5px 5px 0 rgb(219, 218, 218)", display: "flex", padding: "1%", minHeight: "500px" }}>
                <div style={{ width: "50%" }}>
                    <div className="ms-auto fw-bold fs-5" style={{ textAlign: "center", marginBottom: "4px" }}>
                        Total{" "}
                        {cartItems.reduce((total, cartitem) => {
                            const item = dataaArticales && dataaArticales.find((i) => i._id === cartitem.id)
                            return total + (item?.price || 0) * cartitem.quantity;
                        }, 0)} $
                    </div>
                    <Stack style={{ width: "100%", padding: "1%" }}>
                        {cartItems.map((item) => (
                            <CartItem key={item.id} {...item} />
                        ))}
                    </Stack>
                </div>
                <div style={{ width: "50%" }}>
                    <Tabs
                        defaultActiveKey="address"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                        style={{ justifyContent: "space-evenly" }}
                    >
                        <Tab eventKey="address" title="حدد عنوانك" style={{ color: "black" }} >
                            <div>
                                {dataaUser && dataaUser.address.map((item, index) => (
                                    <div style={{ borderBottom: "solid 1px rgb(219, 218, 218)", display: "flex" }}>
                                        <div style={{ width: "40%" }}>
                                            <div>
                                                city : {item.city}
                                            </div>
                                            <div>
                                                district : {item.district}
                                            </div>
                                            <div>
                                                street : {item.street}
                                            </div>
                                            <div>
                                                floorNumber : {item.floorNumber}
                                            </div>
                                        </div>
                                        {/* <div>
                                        </div> */}
                                        <div style={{ width: "40%" }}>
                                            <div>
                                                Architecture  : {item.architectureName}
                                            </div>
                                            <div>
                                                apartmentNumber : {item.apartmentNumber}
                                            </div>
                                            <div>
                                                additionalDetailsr : {item.additionalDetailsr}
                                                {/* {console.log(item._id)} */}
                                            </div>
                                        </div>

                                        <div style={{ width: "10%", alignContent: "center" }}>
                                            <div onChange={handleInputChange}>
                                                <input  type="radio" id="All" name="selectAddress" value={`ييي`} style={{ width: "30%" }} defaultChecked />
                                                <label for={"All"} name="Activity" style={{ width: "60%" }}></label>
                                            </div>
                                        </div>
                                        <div style={{ width: "10%" }}>
                                            <div>
                                                <Button variant="outline-danger" style={{ fontSize: "15px", padding: "0 6px" }} onClick={() => btnDeleteAddress(item._id)}> &times;</Button>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </Tab>
                        <Tab eventKey="addaddress" title="اضافة عنوان" style={{ color: "black" }} >
                            <div>
                                <div style={{ display: "flex" }}>
                                    <div style={{ width: "50%" }}>
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="floatingInput" onChange={(e) => { setCity(e.target.value) }} placeholder="name@example.com" />
                                            <label for="floatingInput">المدينة</label>
                                            <div id="erruser" className="errMsgInbut"></div>
                                        </div>
                                    </div>
                                    <div style={{ width: "50%" }}>
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="floatingInput" onChange={(e) => { setDistrict(e.target.value) }} placeholder="name@example.com" />
                                            <label for="floatingInput">الحي</label>
                                            <div id="erruser" className="errMsgInbut"></div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <div style={{ width: "50%" }}>
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="floatingInput" onChange={(e) => { setStreet(e.target.value) }} placeholder="name@example.com" />
                                            <label for="floatingInput">الشارع</label>
                                            <div id="erruser" className="errMsgInbut"></div>
                                        </div>
                                    </div>
                                    <div style={{ width: "50%" }}>
                                        <div class="form-floating mb-3">
                                            <input type="text" class="form-control" id="floatingInput" onChange={(e) => { setArchitectureName(e.target.value) }} placeholder="name@example.com" />
                                            <label for="floatingInput">  إسم \رقم العمارة</label>
                                            <div id="erruser" className="errMsgInbut"></div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <div style={{ width: "50%" }}>
                                        <div class="form-floating mb-3">
                                            <input type="number" class="form-control" id="floatingInput" onChange={(e) => { setApartmentNumber(e.target.value) }} placeholder="name@example.com" />
                                            <label for="floatingInput">رقم الشقة</label>
                                            <div id="erruser" className="errMsgInbut"></div>
                                        </div>
                                    </div>
                                    <div style={{ width: "50%" }}>
                                        <div class="form-floating mb-3">
                                            <input type="number" class="form-control" id="floatingInput" onChange={(e) => { setFloorNumber(e.target.value) }} placeholder="name@example.com" />
                                            <label for="floatingInput">رقم الطابق</label>
                                            <div id="erruser" className="errMsgInbut"></div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div class="form-floating mb-3" style={{ width: "90%" }}>
                                        <input type="text" class="form-control" id="floatingInput" onChange={(e) => { setAdditionalDetailsr(e.target.value) }} placeholder="name@example.com" />
                                        <label for="floatingInput"> تفاصيل اضافية</label>
                                        <div id="erruser" className="errMsgInbut"></div>
                                    </div>
                                </div>
                                <div style={{ textAlign: "center" }} >
                                    <Button variant="primary" onClick={btnAddAddress}> إضافة العنوان</Button>
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                    <div>
                    </div>
                </div>
            </div>
            <Col xs={6} style={{ position: "fixed", bottom: "30px", left: "10px" }}>
                <Toast bg={"Success".toLowerCase()} onClose={() => setShow(false)} show={show} delay={4000} autohide>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">تم إضافة العنوان</strong>
                        <small></small>
                    </Toast.Header>
                    <Toast.Body style={{ color: "white" }}>تم إضافة العنوان ,اختر عنوانك الآن</Toast.Body>
                </Toast>
            </Col>
        </div>

    </>)
}

export default FinishMarket;