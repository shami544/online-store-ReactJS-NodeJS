import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../../../refreshPage/loading';
import { TbListDetails } from 'react-icons/tb';
import { MdOutlineRestartAlt } from "react-icons/md";
import { Button } from 'react-bootstrap';
import { useShoppingCart } from '../../../context/shoppingCartContext';


const MyOrders = () => {
    const { reorderCartQuantity } = useShoppingCart()
    let params = useParams()
    const nav = useNavigate()

    const [dataa, setDataa] = useState()
    console.log(dataa)
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/clineArticales/GetOrders/${params.UserId}`)
            .then((doc) => setDataa(doc.data))
            .catch((err) => console.log(err))
    }, [])

    const BtnDetalisOrder = (OrderId) => {
        nav(`/cline/Articales/MyOrders/DetalisOrder/${OrderId}`)
    }

    const BtnReOrder = async (index) => {
        await dataa[index].cart.map((item) => reorderCartQuantity({ id: item._id, NumQuantity: item.quantity }))
        nav("/cline/Articales/FinishMarket")
    }

    return (<>
        <div id="allPage">
            <div id="Page" style={{ display: "block", textAlign: "left" }}>
                {dataa ?
                    <div style={{ padding: "2% 0", margin: "3% 3% 0 3%" }}>
                        <table class="table  table-hover table-light " style={{ fontSize: "15px", backgroundColor: "white", borderRadius: "5px", boxShadow: "2px 2px 5px 0 rgb(219, 218, 218)", }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>items</th>
                                    <th>Total price</th>
                                    <th>Date Order</th>
                                    <th >{<TbListDetails />}</th>
                                </tr>
                            </thead>
                            {dataa.map((item, index) => (<>
                                <tbody style={{ padding: "0", width: "100%" }} className="table table-hover table-light">
                                    <tr key={index} style={{ padding: "0", width: "100%" }}>
                                        <td  >{index + 1}</td>
                                        <td >{item.cart.map((i) => (<>{i.name} ,</>))}</td>
                                        <td >{item.totalPrice} $</td>
                                        <td >{item.DateOrder}</td>
                                        <td style={{ display: "table-cell", height: "100%" }} >
                                            <div style={{ display: "flex", alignItems: "end" }}>
                                                <div className="btnMyOrders" style={{ paddingLeft: "0", padding: "0", width: "20%" }}>
                                                    <Button
                                                        onClick={() => BtnReOrder(index)}
                                                        title='إعادة الطلب'
                                                        style={{ border: "none", paddingLeft: "0", padding: "0", transition: "none", backgroundColor: "initial", color: "red", fontSize: "30px" }}
                                                    >
                                                        <MdOutlineRestartAlt />
                                                    </Button>
                                                </div>
                                                <div style={{ width: "80%" }}>
                                                    <Button
                                                        variant='success'
                                                        onClick={() => BtnDetalisOrder(item._id)}
                                                        style={{ width: "100%" }}
                                                    >
                                                        تفاصيل الطلب
                                                    </Button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </>))
                            }
                        </table >
                    </div>
                    : <Loading />}
            </div>
        </div>
    </>)
}

export default MyOrders;