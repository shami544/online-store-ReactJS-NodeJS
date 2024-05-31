import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Loading} from "../../refreshPage/loading";
import { MdAddShoppingCart } from "react-icons/md";
import Cookies from "universal-cookie";
import { useShoppingCart } from "../../context/shoppingCartContext";


function ArticaleId() {
    const cookie = new Cookies()
    const [dataa, setDataa] = useState()
    const id = dataa? dataa._id: undefined
    console.log(dataa)
    const params = useParams()
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/clineArticales/GetArticale/${params.id}`)
            .then((doc) => { setDataa(doc.data) })
            .catch((err) => { console.log("err get : ", err) });
    }, []);

    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
    console.log(dataa ? dataa.name : "")
    const quantity =  getItemQuantity(id)
    return (
        <body style={{ margin: "1%", marginTop: "50px" }}>
            <div style={{ maxWidth: "750px", margin: "2%", border: "solid 1px  rgb(139, 158, 152)", padding: "1%", borderRadius: "5px" }}>
                {dataa ?
                    <div>
                        <div id="carouselExampleCaptions" class="carousel slide">
                            <div class="carousel-indicators">
                                {dataa.file && dataa.file.map((item, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        data-bs-target="#carouselExampleCaptions"
                                        data-bs-slide-to={index}
                                        className={index === 0 ? "active" : ""}
                                        aria-current={index === 0 ? "true" : "false"}
                                        aria-label={`Slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                            <div class="carousel-inner">
                                {dataa.file && dataa.file.map((item, index) => (
                                    <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                        <img src={`${process.env.REACT_APP_API_URL}/files/${item}`} className="d-block w-100" alt={`Slide ${index + 1}`} />
                                        <div className="carousel-caption d-none d-md-block">
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                        <div>
                            <li id="liUserId" ><div>• name : </div>  {dataa.name}</li>
                            <li id="liUserId"><div>• title : </div>  {dataa.title}</li>
                            <li id="liUserId"><div>• information : </div> {dataa.information}</li>
                            <li id="liUserId"><div>• price : </div> {dataa.price} <div> $ </div></li>
                            <li id="liUserId"><div>• Existing quantity : </div> {dataa.number}</li>
                        </div>
                        <div class="col-12" style={{ display: "flex", justifyContent: "center" }}>
                            {quantity === 0 ? (
                                <button class="btn btn-primary" onClick={() => increaseCartQuantity(dataa ? dataa._id : "")} >{<MdAddShoppingCart style={{ fontSize: "20px" }} />} اضافة للعربة</button>)
                                :
                                (<div className="d-flex align-items-center flex-column" >
                                    <div className="d-flex align-items-center justify-content-center" style={{ gap: "10px" }}>
                                        <button class="btn btn-primary" onClick={() => decreaseCartQuantity(dataa ? id : "")}>-</button>
                                        <span className="fs-3" style={{ width: "130px" }}> {quantity} in cart</span>
                                        <button class="btn btn-primary" onClick={() => increaseCartQuantity(dataa ? id : "")}>+</button>
                                    </div>
                                    <button class="btn btn-danger" onClick={() => removeFromCart(dataa ? id : "")}>Remove</button>
                                </div>)}
                        </div>
                    </div>
                    : <Loading />
                }
            </div>
        </body>
    )
}

export default ArticaleId;