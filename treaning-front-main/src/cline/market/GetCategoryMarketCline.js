import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {Loading} from "../../refreshPage/loading"
import img1 from "../../file/20200917-1600348395146-original.jpg"
import Form from 'react-bootstrap/Form';
import { IoSearchSharp } from "react-icons/io5";


function GetCategoryMarketCline() {

    const [dataa, setDataa] = useState()
    const [dataOffer, setDataOffer] = useState()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/clineArticales/GetCategoryMarket`)
            .then((doc) => setDataa(doc.data))
            .catch((err) => console.log("err Get :", err))

        axios.get(`${process.env.REACT_APP_API_URL}/clineArticales/GetAnOffer`)
            .then((doc) => setDataOffer(doc.data))
            .catch((err) => console.log("err Get :", err))
    }, [])
    console.log(dataOffer ? dataOffer[0].file : "")

    return (
        <div id="PageGetArticales">
            {dataa ? <>

                {/* <div class="carousel-indicators">
                    {dataOffer ? dataOffer.file && dataOffer.file.map((item, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselExampleCaptions"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : "false"}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    )) : ""}
                </div>
                {dataOffer && dataOffer.map((item, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`} >
                        <img src={`http://localhost:3333/files/${item.file[0]}`} style={{ maxWidth: "200px", maxHeight: "200px" }} />
                        <img src={`http://localhost:3333/files/${item.file[1]}`} style={{ maxWidth: "200px", maxHeight: "200px" }} />
                    </div>
                ))} */}

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
                    <IoSearchSharp style={{ fontSize: "35px", marginTop: "1%" }} />
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2 "
                            aria-label="Search"
                            style={{ backgroundColor: "rgba(255, 255, 255, 0.678)" }}
                        />
                    </Form>
                </div>
                <div style={{ borderTop: "soled 1px black", marginTop: "50px" }}>
                    <div id="PageUlCategory">
                        {dataa && dataa.map((item) =>
                            <div class="card" style={{ width: "200px", margin: "1%", border: "none" }}>
                                <Link to={`http://localhost:3000/cline/Articales/getArticales/${item.name}`}>
                                    <div >
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/files/${item.file[0]}`}
                                            class="card-img-top"
                                            style={{ maxHeight: "200px", borderRadius: "10px" }}
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


export default GetCategoryMarketCline