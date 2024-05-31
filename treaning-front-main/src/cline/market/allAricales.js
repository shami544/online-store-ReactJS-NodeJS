import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "./Articales.css"
import { Loading } from "../../refreshPage/loading"
import { Accordion, Button, Form, Nav } from "react-bootstrap";
import { IoSearchSharp } from "react-icons/io5";
import { MdPriceChange } from "react-icons/md";
import { MdAddShoppingCart } from "react-icons/md";
import { useShoppingCart } from "../../context/shoppingCartContext"

function AllArticales(id) {
    const [dataa, setDataa] = useState()
    let params = useParams()
    const [hoveredItem, setHoveredItem] = useState(null);

    const [search, setSearch] = useState("")
    const [priceCategory, setPriceCategory] = useState("")
    console.log(priceCategory)
    const [filterData, setFilterData] = useState()
    const dataSaerch = { saerch: search, category: params.category, priceCategory: priceCategory }
    async function getSearchData() {
        await axios.post(`${process.env.REACT_APP_API_URL}/clineArticales/SearchProduct`, dataSaerch)
            .then((doc) => { setFilterData(doc.data.movies) })
    }
    useEffect(() => {
        const debounce = setTimeout(() => {
            getSearchData()
        }, 800)
        return () => clearTimeout(debounce)
    }, [search, priceCategory])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/clineArticales/GetArticalecategory/${params.category}`,
        )
            .then((doc) => setDataa(doc.data))
            .catch((err) => console.log("err Get :", err))
    }, [])

    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart()
    const iitem = dataa && dataa.find((i) => i._id === id)

    return (<>
        <div style={{ minHeight: "500px", marginTop: "35px", display: "flex", backgroundColor: "rgb(235, 235, 235)" }}>
            <Nav style={{ minHeight: "500px", width: "15%", borderRight: "solid 1px rgb(219, 218, 218)", margin: "0", backgroundColor: "white" }}>
                <Accordion style={{ width: "15%", position: "fixed" }} alwaysOpen >
                    {/* <div style={{ width: "99%", fontSize: "25px", height: "40px", borderBottom: "1px solid ", textAlign: "center" }}>Filter</div> */}
                    <Accordion.Item className="asdasd" eventKey="0" style={{ width: "99%" }} >
                        <Accordion.Header style={{ fontSize: "20px", width: "99%", padding: "2px" }}>{<MdPriceChange style={{ marginRight: "5px", fontSize: "18px" }} />}  <span style={{ flexGrow: -2 }}>Price</span>   </Accordion.Header>
                        <Accordion.Body>
                            <form onChange={(e) => setPriceCategory(e.target.value)}>
                                <input type="radio" id="All" name="Role" style={{ width: "30%" }} defaultChecked />
                                <label for={"All"} style={{ width: "60%" }}>All</label>
                                <input type="radio" id="Admin" name="Role" value="0-199" style={{ width: "30%" }} />
                                <label for={"Admin"} style={{ width: "60%" }}>0 - 199</label>
                                <input type="radio" id="Clain" name="Role" value="200-499" style={{ width: "30%" }} />
                                <label for={"Clain"} style={{ width: "60%" }}>200 - 499</label>
                                <input type="radio" id="Clain" name="Role" value="500-999" style={{ width: "30%" }} />
                                <label for={"Clain"} style={{ width: "60%" }}>500 - 999</label>
                                <input type="radio" id="Clain" name="Role" value="1000" style={{ width: "30%" }} />
                                <label for={"Clain"} style={{ width: "60%" }}>أكثر من 1000</label>
                            </form>
                        </Accordion.Body>
                    </Accordion.Item>
                    {/* <Accordion.Item eventKey="1" style={{ width: "99%" }} >
                        <Accordion.Header style={{ fontSize: "20px", width: "99%", padding: "2px" }}> Activity  </Accordion.Header>
                        <Accordion.Body>
                            <form >
                                <input type="radio" id="All" name="Activity" value="" style={{ width: "30%" }} defaultChecked />
                                <label for={"All"} name="Activity" style={{ width: "60%" }}>All</label>
                                <input type="radio" id="Active" name="Activity" value="Active" style={{ width: "30%" }} />
                                <label for={"Active"} name="Activity" style={{ width: "60%" }}>Active</label>
                                <input type="radio" id="UnActive" name="Activity" value="UnActive" style={{ width: "30%" }} />
                                <label for={"UnActive"} style={{ width: "60%" }}>UnActive</label>
                            </form>
                        </Accordion.Body>
                    </Accordion.Item> */}
                </Accordion>
            </Nav>
            <div style={{ width: "85%" }}>
                <div style={{ width: "96%", backgroundColor: "white", margin: "10px 2%", borderRadius: "5px", border: "solid 1px rgb(219, 218, 218)", boxShadow: " 5px 0 5px 0 rgb(219, 218, 218)" }}>
                    <div className="d-flex" style={{ width: "50%", marginLeft: "25%" }}>
                        <IoSearchSharp style={{ fontSize: "30px", marginTop: "2%" }} />
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-1 "
                            aria-label="Search"
                            value={search}
                            style={{ backgroundColor: "rgba(255, 255, 255, 0.678)", height: "35px" }}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div style={{ backgroundColor: "white", width: '96%', marginLeft: "2%", marginBottom: "1px", borderRadius: "5px", border: "solid 1px rgb(219, 218, 218)", boxShadow: " 5px 0 5px 0 rgb(219, 218, 218)", marginBottom: "1%" }}>
                    <div id="PageUlProduct"  >
                        {filterData ? filterData && filterData.map((item, index) =>
                            <div class="card" style={{ width: "170px", margin: "1%", border: "none", backgroundColor: "rgb(248, 248, 248)", borderRadius: "10px", maxHeight: "250px" }} onMouseEnter={() => setHoveredItem(item._id)} onMouseLeave={() => setHoveredItem(null)}>
                                <Link to={`http://localhost:3000/cline/Articales/getArticale/${item._id}`}>
                                    <img src={`http://localhost:3333/files/${item.file[0]}`} class="card-img-top" style={{ maxHeight: "200px" }} />
                                    <div class="card-body" style={{ textAlign: "center", paddingBottom: "0" }}>
                                        <h5 class="card-title" style={{ textAlign: "end" }}>{item.price} $</h5>
                                        <p class="card-text">{item.title}</p>
                                    </div>
                                </Link>
                                {getItemQuantity(item._id) == 0 ?
                                    <div class="col-12" style={{ display: "flex", justifyContent: "center", marginTop: "auto" }}>
                                        <Button variant="outline-success" title="اضافة الى السلة" style={{ padding: "0 15px" }} onClick={() => increaseCartQuantity(item._id)} >{<MdAddShoppingCart style={{ fontSize: "20px" }} />}</Button>
                                    </div>
                                    :
                                    <div className="d-flex align-items-center justify-content-center" style={{ gap: "10px", marginTop: "auto" }} >
                                        {hoveredItem == item._id && <Button variant="outline-success" onClick={() => decreaseCartQuantity(item._id)} style={{ paddingBottom: "0", paddingTop: "0" }}>-</Button>}
                                        <div style={{ fontSize: '13px', color: 'rgb(117 140 153)', display: "flex", gap: "5px", alignItems: "baseline" }}> <div style={{ color: "black", fontSize: '20px', fontWeight: '500' }}>{getItemQuantity(item._id)}</div> in Cart</div>
                                        {hoveredItem == item._id && <Button variant="outline-success" onClick={() => increaseCartQuantity(item._id)} style={{ paddingBottom: "0", paddingTop: "0" }}>+</Button>}
                                    </div>}
                            </div>
                        )
                            : <Loading />}
                    </div>
                </div>
            </div>
        </div>
    </>)


}


export default AllArticales