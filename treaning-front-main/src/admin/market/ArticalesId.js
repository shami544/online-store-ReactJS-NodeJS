import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../context/context";
import "./Articales.css"
import {Loading} from "../../refreshPage/loading";


function ArticalesIdAdmin() {
    const [dataa, setDataa] = useState()
    let params = useParams()
    const context = useContext(User)
    const token = context.auth.token
    const nev = useNavigate()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/articales/GetArticale/${params.id}`, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            }
        })
            .then((doc) => { setDataa(doc.data) })
            .catch((err) => { console.log("err get : ", err) });
    }, []);



    const btndelete = async function deletee() {
        await axios.delete(`${process.env.REACT_APP_API_URL}/articales/DeleteArticale/${params.id}`, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            }
        })
            .then((doc) => {
                nev("/admin/Home/Home4")
            })
            .catch((err) => console.log("err delete : ", err))
    }

    const btnUpDateArticale = () => {
        nev(`/admin/market/UpDateArticale/${dataa._id}`)
    }

    return (
        <div id="allPageArticaleId">
            <ul id="ulUserId">
                {dataa ?
                    <div >
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
                                            {/* <h5>صورة {index +1}</h5> */}
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
                        <div style={{minWidth:"500px"}}>
                            <li id="liUserId" ><div>• name : </div>  {dataa.name}</li>
                            <li id="liUserId"><div>• title : </div>  {dataa.title}</li>
                            <li id="liUserId"><div>• information : </div> {dataa.information}</li>
                            <li id="liUserId"><div>• price : </div> {dataa.price} <div> $ </div></li>
                            <li id="liUserId"><div>• Existing quantity : </div> {dataa.number}</li>
                            <li id="liUserId"><div>• emg : </div> {dataa.file}</li>
                        </div>
                        <div class="col-12" style={{ display: "flex", justifyContent: "center" }}>
                            <button type="submit" style={{marginRight:"2%"}} class="btn btn-success" onClick={btnUpDateArticale}> Up Date Product</button>
                            <button type="submit" style={{marginLeft:"2%"}} class="btn btn-danger" onClick={btndelete}> Delete Product</button>
                        </div>
                    </div>
                    : <Loading />
                }
            </ul>
        </div>
    )
}

export default ArticalesIdAdmin;