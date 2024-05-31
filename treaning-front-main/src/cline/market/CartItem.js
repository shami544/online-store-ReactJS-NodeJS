import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../../context/shoppingCartContext";


const CartItem = ({ id, quantity }) => {

    const [dataa, setDataa] = useState()
    const { removeFromCart, decreaseCartQuantity, increaseCartQuantity } = useShoppingCart()
    const [hoveredItem, setHoveredItem] = useState(null);

    useEffect(() => {
        belal()
    }, [decreaseCartQuantity, increaseCartQuantity, removeFromCart])
    const belal = (async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}/clineArticales/GetArticales`)
            .then((doc) => setDataa(doc.data))
            .catch((err) => console.log("err Get : ", err))
    })

    const item = dataa && dataa.find((i) => i._id === id)

    if (item == null) return null
    return (<>
        <Stack direction="horizontal" className="d-flex align-items-center" style={{ padding: "3px 0", borderBottom: "1px solid rgb(228, 228, 228)" }} onMouseEnter={() => setHoveredItem(item)} onMouseLeave={() => setHoveredItem(null)}>
            <img src={`${process.env.REACT_APP_API_URL}/files/${item.file[0]}`} alt="cart-img" style={{ width: "125px", height: "75px", objectFit: "cover", border: "solid 1px rgb(228, 228, 228)", borderRadius: "10px" }} />
            <div className="me-auto" style={{ width: '20%' }}>
                <div style={{ fontSize: "15px", fontWeight: "500", marginLeft: "10px" }}>
                    {item.name} {" "}
                    {/* {quantity > 1 && <span className="text-muted" style={{ fontSize: "0.65rem" }}> x{quantity} </span>} */}
                </div>
                <div className="text-muted" style={{ fontSize: "0.75rem", marginLeft: "10px" }}>{item.price} $</div>
            </div>
            <div className="d-flex align-items-center flex-column" style={{ width: "20%" }} >
                <div style={{ display: 'flex', flexDirection: "column", width: "100%", alignItems: "center" }} >
                    {hoveredItem === item && <Button variant="outline-success" style={{ padding: "0 10px" }} onClick={() => increaseCartQuantity(item._id)}>+</Button>}
                    <span style={{ width: "50px", textAlign: "center" }}> x{quantity}</span>
                    {hoveredItem === item && <Button variant="outline-danger" style={{ padding: "0 13px" }} onClick={() => decreaseCartQuantity(item._id)}>-</Button>}
                </div>
            </div>
            <div style={{ fontSize: "17px", fontWeight: "500", width: "50px", textAlign: "center", display: "flex" }} >
                {item.price * quantity} <div style={{ textAlign: "end" }}>$</div>
            </div>
            <div style={{ width: "20px" }}>
                {hoveredItem === item && <Button variant="outline-danger" style={{ margin: "2px", padding: "2px 8px" }} size="l" onClick={() => removeFromCart(id)}>
                    &times;
                </Button>}
            </div>
        </Stack>
    </>)
}


export default CartItem;