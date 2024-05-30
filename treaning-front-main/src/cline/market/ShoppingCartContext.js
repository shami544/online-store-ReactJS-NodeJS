import { Button, Offcanvas, Stack } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useShoppingCart } from "../../context/shoppingCartContext";
import CartItem from "./CartItem";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ShoppingCart = ({ isOpen }) => {
    const { cartItems, closeCart ,cartQuantity } = useShoppingCart()
    const [dataa, setDataa] = useState()
    const nav = useNavigate()
    useEffect(() => {
        belal()
    }, [])
    const belal = (() => {
        axios.get("http://localhost:3333/clineArticales/GetArticales")
            .then((doc) => setDataa(doc.data))
            .catch((err) => console.log("err Get : ", err))
    })
    const btnFinishMarket=()=>{
        nav("/cline/Articales/FinishMarket")
        closeCart()
    }
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
                    <div className="ms-auto fw-bold fs-5" style={{  bottom: "50px" }}>
                        Total{" "}
                        {cartItems.reduce((total, cartitem) => {
                            const item = dataa && dataa.find((i) => i._id === cartitem.id)
                            return total + (item?.price || 0) * cartitem.quantity;
                        }, 0)} $
                    </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack >
                    {cartItems.map((item) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                </Stack>
            </Offcanvas.Body>
                    <div style={{width:"90%", marginLeft:"5%"}}>
                        <Button variant="outline-success" style={{ width: "100%", bottom: "0" }} disabled={!cartQuantity} onClick={btnFinishMarket}>الدفع</Button>
                    </div>
        </Offcanvas>
    )
}

export default ShoppingCart