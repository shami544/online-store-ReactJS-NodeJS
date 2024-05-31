import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../../context/context';
import {Loading} from '../../refreshPage/loading';

const Invoice = () => {
    const usernaw = useContext(User)
    const token = usernaw.auth.token

    const params = useParams()
    const [dataa, setDataa] = useState()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/clineArticales/GetOrder/${params.id}`,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                }
            }
        )
            .then((doc) => setDataa(doc.data))
            .catch((err) => console.log(err))
    }, [])
    console.log(dataa && dataa.UserDetails)
    return (<>
        <div id="allPage">
            <div id="Page" style={{ width: "60%", marginLeft: "20%" }}>
                {dataa ?
                    <div style={{ marginTop: "30px", border: "10px", width: "90%" }}>
                        <div style={{ display: "flex", justifyContent: "space-around", textAlign: "start", paddingBottom: "2%" }}>
                            <div>
                                <div>Name : {dataa.UserDetails.name}</div>
                                <div>Order Id : {dataa._id}</div>
                            </div>
                            <div>
                                <div>Phone :  {dataa.UserDetails.phone}</div>
                                <div>Date Order : {dataa.DateOrder}</div>
                            </div>
                        </div>
                        <div style={{ borderTop: "1px solid #dbdada ", padding: "2% 0" }}>
                            <table class="table  table-hover table-light " style={{ fontSize: "20px", height: "10px", width: "96%", backgroundColor: "white", marginLeft: "2%", borderRadius: "5px", boxShadow: "2px 2px 5px 0 rgb(219, 218, 218)", }}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>item</th>
                                        <th>quantity</th>
                                        <th>price</th>
                                    </tr>
                                </thead>
                                {dataa && dataa.cart.map((item, index) => (<>
                                    <tbody style={{ padding: "0" }}>
                                        <tr key={index} style={{ padding: "0" }} >
                                            <td >{index + 1}</td>
                                            <td >{item.name}</td>
                                            <td >{item.quantity}</td>
                                            <td >{item.price} $</td>
                                        </tr>
                                    </tbody>
                                </>))}
                            </table >
                        </div>
                        <div style={{ display: 'flex', color: 'red', borderTop: "1px solid #dbdada ", justifyContent: "space-evenly", padding: "2% 0" }}>
                            <div >Total Price :   {dataa.totalPrice} {" $  "}</div>
                            <div >PAYMENT  METHOD : {dataa.payment} {" "}</div>
                        </div>
                        <div style={{ borderTop: "1px solid #dbdada ", padding: " 2% 0 " }}>Receipt : {dataa.receipt} {" "}</div>
                        <div style={{ borderTop: "1px solid #dbdada ", paddingTop: "2%" }}>
                            <div style={{ textAlign: "start", marginLeft: "20%", paddingBottom: "2px" }}>Receipt Address :</div>
                            <div style={{ border: "1px solid ", borderRadius: "5px", width: "60%", margin: "0 20%", textAlign: "right", padding: "2%" }}>
                                <div >
                                    {dataa.receiptAddress.city} {" "},
                                    {dataa.receiptAddress.district} {" "}
                                </div>
                                <div>
                                    .شارع {dataa.receiptAddress.street} {" "},
                                    عمارة {dataa.receiptAddress.architectureName} {" "},
                                    دور {dataa.receiptAddress.floorNumber} {" "},
                                    شقة  {dataa.receiptAddress.apartmentNumber} {" "}
                                </div>
                            </div>
                        </div>

                    </div>
                    : <Loading />
                }
            </div>
        </div>
    </>)
}
export default Invoice;