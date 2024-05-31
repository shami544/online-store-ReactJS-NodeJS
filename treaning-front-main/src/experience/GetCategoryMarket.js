import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {Loading} from "../refreshPage/loading"
import img1 from "../file/20200917-1600348395146-original.jpg"
import Form from 'react-bootstrap/Form';
import { IoSearchSharp } from "react-icons/io5";

function GetCategoryMarket() {
    const [dataa, setDataa] = useState()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/clineArticales/GetCategoryMarket`,
        )
            .then((doc) => setDataa(doc.data))
            .catch((err) => console.log("err Get :", err))
    }, [])

    return (
        <div id="PageGetArticales">
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
            {dataa ? <>
                <div style={{ borderTop: "soled 1px black", margin: "40px 0" }}>
                    <div id="PageUlCategory">
                        {dataa && dataa.map((item) =>
                            <div class="card" style={{ width: "200px", margin: "1%", border: "none" }}>
                                <Link to={`http://localhost:3000/GetCategoryMarket/${item.name}`}>
                                    <div >
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/files/${item.file[0]}`}
                                            class="card-img-top"
                                            style={{ maxHeight: "300px" }}
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

export default GetCategoryMarket