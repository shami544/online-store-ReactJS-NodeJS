import React, { useContext, useEffect, useState } from "react";
import { useShoppingCart } from "../../context/shoppingCartContext";
import axios from "axios";
import './Articales.css';
import { Accordion, Button, Stack, Tab, Tabs, Nav } from "react-bootstrap";
import CartItem from "./CartItem";
import { User } from "../../context/context";
import { useNavigate } from "react-router-dom";
import { MsgModal, MsgToast } from "../../components/MsgComponent";


const FinishMarket = () => {
    const { cartItems, removeAllCart } = useShoppingCart()
    const usernaw = useContext(User)
    const userId = usernaw.auth.userDetals._id
    const token = usernaw.auth.token
    const nav = useNavigate()
    console.log(cartItems)
    const [dataaUser, setDataaUser] = useState()
    const [dataaArticales, setDataaArticales] = useState()
    const [city, setCity] = useState()
    const [district, setDistrict] = useState()
    const [street, setStreet] = useState()
    const [architectureName, setArchitectureName] = useState()
    const [apartmentNumber, setApartmentNumber] = useState()
    const [floorNumber, setFloorNumber] = useState()
    const [additionalDetails, setAdditionalDetails] = useState()
    const [disabledBtnPay, setDisabledBtnPay] = useState(false)
    const [payment, setPayment] = useState("Cash")
    const [receipt, setReceipt] = useState("delivery")
    const [msgDeleteAddress, setMsgDeleteAddress] = useState(false)
    const [idAddress, setIdAddress] = useState()

    const [show, setShow] = useState(false);

    const [selectedItemId, setSelectedItemId] = useState();

    const handleChange = (selectedId) => {
        setSelectedItemId(selectedId);
    }

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
    }, [show, msgDeleteAddress])

    useEffect(() => {
        GetProduct()
        HandleDisabledBtnPay()
    }, [show, cartItems, selectedItemId])

    const GetProduct = (async () => {
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
        additionalDetails: additionalDetails
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

    const btnDeleteAddress = async ({ idAddress }) => {
        await axios.post(`http://localhost:3333/users/removeaddress/${userId}/address/${idAddress}`, dataAddressPost,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                }
            }
        )
            .then(() => { setMsgDeleteAddress(false) })
            .catch((err) => { console.log("err delete address : ", err) })
    }
    console.log(selectedItemId)
    console.log(disabledBtnPay)
    const HandleDisabledBtnPay = () => {
        if (!cartItems.length) { setDisabledBtnPay(true) }
        else if (!selectedItemId) { setDisabledBtnPay(true) }
        else if (selectedItemId) { setDisabledBtnPay(false) }
    }
    const totalPrice = cartItems.reduce((total, cartitem) => {
        const item = dataaArticales && dataaArticales.find((i) => i._id === cartitem.id)
        return total + (item?.price || 0) * cartitem.quantity;
    }, 0)
    const DataCreateOrder = { payment, receipt, receiptAddress: selectedItemId, cartItems, userId, totalPrice }

    const btnPay = async () => {
        if (payment == "Card") {
            nav('/cline/Articales/FinishMarket/PayCard', { state: DataCreateOrder })
        } else if (payment == "Cash" || payment == "Card in Delivery") {
            await axios.post("http://localhost:3333/clineArticales/CreateOrder", DataCreateOrder)
                .then((doc) => nav(`/cline/Articales/FinishMarket/Invoice/${doc.data._id}`))
                .then(() => removeAllCart())
                .catch((err) => console.log("err", err))
        }
    }

    return (<>
        <div style={{ display: "flex", marginTop: "35px", minHeight: "500px", backgroundColor: "rgb(235, 235, 235)", overflow: "hidden" }}>
            <div style={{ width: "85%" }}>
                <div style={{ backgroundColor: "white", width: "96%", borderRadius: "10px", boxShadow: " 5px 5px 5px 0 rgb(219, 218, 218)", display: "flex", padding: "1%", margin: "2%" }}>
                    <div style={{ width: "50%" }}>
                        <div className="ms-auto fw-bold fs-5" style={{ textAlign: "center", marginBottom: "4px", borderBottom: "1px solid rgb(228, 228, 228)", paddingBottom: "2%" }}>
                            Total{" "}
                            {cartItems.reduce((total, cartitem) => {
                                const item = dataaArticales && dataaArticales.find((i) => i._id === cartitem.id)
                                return total + (item?.price || 0) * cartitem.quantity;
                            }, 0)} $
                        </div>
                        <Stack style={{ width: "100%", padding: "3%" }}>
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
                            <Tab eventKey="address" title="حدد عنوانك" style={{ color: "black", padding: " 0 3% 3% 3%" }} >
                                <form >
                                    {dataaUser && dataaUser.address.map((item, index) => (
                                        <div
                                            key={item._id}
                                            style={{
                                                border: "1px solid rgb(219, 218, 218)",
                                                borderRadius: "10px",
                                                padding: '20px 20px 20px 10px',
                                                display: "flex",
                                                margin: "2% 0",
                                                boxShadow: "2px 2px 5px rgb(219, 218, 218)",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => handleChange(item._id)}
                                            onMouseEnter={() => { setIdAddress(item._id) }}
                                        >

                                            <div style={{ width: "10%" }}>
                                                <div>
                                                    <Button variant="outline-danger" style={{ fontSize: "15px", padding: "0 6px" }} onClick={() => setMsgDeleteAddress(true)}> &times;</Button>
                                                </div>
                                            </div>
                                            <div style={{ width: "10%" }}>
                                                <div>
                                                    <input
                                                        type="radio"
                                                        id={`selectA${index}`}
                                                        name="selectA"
                                                        value={item._id}
                                                        style={{ width: "30%", cursor: "pointer" }}
                                                        checked={selectedItemId === item._id}
                                                        readOnly
                                                    />
                                                    <label htmlFor={`selectA${index}`} style={{ width: "60%" }}></label>
                                                </div>
                                            </div>
                                            <div style={{ width: "80%" }}>
                                                <div style={{ display: "flex", flexDirection: 'row-reverse' }}>
                                                    <div>
                                                        {item.city}
                                                    </div>
                                                    <div>
                                                        {item.district} ,
                                                    </div>
                                                </div>
                                                <div style={{ color: "rgb(116 116 116)", display: "flex", flexWrap: "wrap", flexDirection: 'row-reverse' }}>
                                                    <div>
                                                        شارع  {item.street}
                                                    </div>
                                                    <div>
                                                        عمارة {item.architectureName} ,
                                                    </div>
                                                    <div>
                                                        الطابق {item.floorNumber} ,
                                                    </div>
                                                    <div>
                                                        .   شقة  {item.apartmentNumber} ,
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </form>
                            </Tab>
                            <Tab eventKey="addaddress" title="اضافة عنوان" style={{ color: "black", padding: "3%" }} >
                                <div style={{ width: "96%", margin: "0 2%" }}>
                                    <div style={{ display: "flex", width: "100%" }}>
                                        <div style={{ width: "50%" }}>
                                            <div class="form-floating mb-3" style={{ width: '95%' }} >
                                                <input type="text" class="form-control" id="floatingInput" onChange={(e) => { setCity(e.target.value) }} placeholder="name@example.com" />
                                                <label for="floatingInput">المدينة</label>

                                            </div>
                                        </div>
                                        <div style={{ width: "50%" }}>
                                            <div class="form-floating mb-3" style={{ width: '95%' }}>
                                                <input type="text" class="form-control" id="floatingInput" onChange={(e) => { setDistrict(e.target.value) }} placeholder="name@example.com" />
                                                <label for="floatingInput">الحي</label>

                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ width: "50%" }}>
                                            <div class="form-floating mb-3" style={{ width: '95%' }}>
                                                <input type="text" class="form-control" id="floatingInput" onChange={(e) => { setStreet(e.target.value) }} placeholder="name@example.com" />
                                                <label for="floatingInput">الشارع</label>

                                            </div>
                                        </div>
                                        <div style={{ width: "50%" }}>
                                            <div class="form-floating mb-3" style={{ width: '95%' }}>
                                                <input type="text" class="form-control" id="floatingInput" onChange={(e) => { setArchitectureName(e.target.value) }} placeholder="name@example.com" />
                                                <label for="floatingInput">  إسم \رقم العمارة</label>

                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex" }}>
                                        <div style={{ width: "50%" }}>
                                            <div class="form-floating mb-3" style={{ width: '95%' }}>
                                                <input type="number" class="form-control" id="floatingInput" onChange={(e) => { setApartmentNumber(e.target.value) }} placeholder="name@example.com" />
                                                <label for="floatingInput">رقم الشقة</label>

                                            </div>
                                        </div>
                                        <div style={{ width: "50%" }}>
                                            <div class="form-floating mb-3" style={{ width: '95%' }}>
                                                <input type="number" class="form-control" id="floatingInput" onChange={(e) => { setFloorNumber(e.target.value) }} placeholder="name@example.com" />
                                                <label for="floatingInput">رقم الطابق</label>

                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="form-floating mb-3" style={{ width: '100%' }}>
                                            <input type="text" class="form-control" style={{ width: '97%' }} id="floatingInput" onChange={(e) => { setAdditionalDetails(e.target.value) }} placeholder="name@example.com" />
                                            <label for="floatingInput"> تفاصيل اضافية</label>

                                        </div>
                                    </div>
                                    <div style={{ textAlign: "center" }} >
                                        <Button variant="primary" onClick={btnAddAddress}> إضافة العنوان</Button>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
            <Nav style={{ minHeight: "500px", width: "15%", borderRight: "solid 1px rgb(219, 218, 218)", margin: "0", backgroundColor: "white" }}>
                <Accordion style={{ width: "15%", position: "fixed" }} alwaysOpen defaultActiveKey={['0', '1']}>
                    {/* <div style={{ width: "99%", fontSize: "25px", height: "40px", borderBottom: "1px solid ", textAlign: "center" }}>Filter</div> */}
                    <Accordion.Item className="FinishMarketAccordion" eventKey="0" style={{ width: "99%" }} >
                        <Accordion.Header style={{ fontSize: "20px", width: "99%", padding: "2px" }}> <span style={{ flexGrow: 1 }}>payment</span>  </Accordion.Header>
                        <Accordion.Body style={{ padding: "15px 0" }}>
                            <form onChange={(e) => { setPayment(e.target.value) }}>
                                <input type="radio" id="Cash" name="paymentMethod" value={"Cash"} style={{ width: "30%", cursor: "pointer" }} defaultChecked />
                                <label for={"Cash"} style={{ width: "60%", cursor: "pointer" }}>Cash</label>
                                <input type="radio" id="Card" name="paymentMethod" value={"Card"} style={{ width: "30%", cursor: "pointer" }} />
                                <label for={"Card"} style={{ width: "60%", cursor: "pointer" }}>Card</label>
                                <input type="radio" id="CardinDelivery" name="paymentMethod" value={"Card in Delivery"} style={{ width: "30%", cursor: "pointer" }} />
                                <label for={"CardinDelivery"} style={{ width: "60%", cursor: "pointer" }}>Card in Delivery</label>
                            </form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className="FinishMarketAccordion" eventKey="1" style={{ width: "99%" }} >
                        <Accordion.Header style={{ fontSize: "20px", width: "99%", padding: "2px" }}> <span style={{ flexGrow: 1 }}>The receipt</span> </Accordion.Header>
                        <Accordion.Body style={{ padding: "15px 0" }}>
                            <form onChange={(e) => { setReceipt(e.target.value) }}>
                                <input type="radio" id="delivery" name="receipt" value="delivery" style={{ width: "30%", cursor: "pointer" }} defaultChecked />
                                <label for={"delivery"} name="receipt" style={{ width: "60%", cursor: "pointer" }}>Delivery</label>
                                <input type="radio" id="FromThePlace" name="receipt" value="FromThePlace" className="custom-radio" style={{ width: "30%", cursor: "pointer" }} />
                                <label for={"FromThePlace"} name="receipt" style={{ width: "60%", cursor: "pointer" }}>From the place</label>
                            </form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <div style={{ width: "90%", margin: "5% 5% 5% 5%" }}>
                        <Button variant="outline-success" style={{ width: "100%" }} onClick={btnPay} disabled={disabledBtnPay} >الدفع</Button>
                    </div>
                </Accordion>
            </Nav>
            <MsgToast type={"success"} show={show} setShow={setShow} title={"تم إضافة العنوان "} body={"تم إضافة العنوان ,اختر عنوانك الآن "} />
            <MsgModal show={msgDeleteAddress} handleClose={() => setMsgDeleteAddress(false)} opj={() => btnDeleteAddress({ idAddress })} title={"رسالة تأكيد"} body={"هل تريد حقا حذف العنوان؟"} />
        </div >
    </>)
}

export default FinishMarket;