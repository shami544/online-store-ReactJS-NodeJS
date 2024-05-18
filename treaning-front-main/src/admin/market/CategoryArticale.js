import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { User } from "../../context/context"
import { Link, useParams } from "react-router-dom"
import Loading from "../../refreshPage/loading"
import { MdOutlinePriceChange } from "react-icons/md";
import { MdPriceChange } from "react-icons/md";
import { Accordion, Form, Nav } from "react-bootstrap";
import { IoSearchSharp } from "react-icons/io5";



function CategoryArticale() {
    // const [dataa, setDataa] = useState()
    let params = useParams()

    const context = useContext(User)
    const token = context.auth.token

    const [search, setSearch] = useState("")
    const [priceCategory, setPriceCategory] = useState("")

    const [filterData, setFilterData] = useState()
    const dataSaerch = { saerch: search, category: params.category, priceCategory: priceCategory }
    async function getSearchData() {
        await axios.post('http://localhost:3333/clineArticales/SearchProduct', dataSaerch)
            .then((doc) => { setFilterData(doc.data.movies) })
    }
    useEffect(() => {
        const debounce = setTimeout(() => {
            getSearchData()
        }, 800)
        return () => clearTimeout(debounce)
    }, [search, priceCategory])
    // useEffect(() => {
    //     axios.get(`http://localhost:3333/articales/GetArticalecategory/${params.category}`,
    //         {
    //             headers: {
    //                 Accept: "application/json",
    //                 Authorization: "Bearer " + token,
    //             }
    //         })
    //         .then((doc) => setDataa(doc.data))
    //         .catch((err) => console.log("err Get :", err))
    // }, [])


    return (<>
        <div style={{ borderTop: "soled 1px black", marginTop: "35px", display: "flex", backgroundColor: "rgb(235, 235, 235)" }}>
            <Nav style={{ minHeight: "500px", width: "15%", borderRight: "solid 1px rgb(219, 218, 218)", margin: "0", backgroundColor: "white" }}>
                <Accordion style={{ width: "15%", position: "fixed" }} alwaysOpen >
                    {/* <div style={{ width: "99%", fontSize: "25px", height: "40px", borderBottom: "1px solid ", textAlign: "center" }}>Filter</div> */}
                    <Accordion.Item eventKey="0" style={{ width: "99%" }} >
                        <Accordion.Header style={{ fontSize: "20px", width: "99%", padding: "2px" }}>{<MdPriceChange style={{ marginRight: "5px", fontSize: "18px" }} />}  Price  </Accordion.Header>
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
                    <Accordion.Item eventKey="1" style={{ width: "99%" }} >
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
                    </Accordion.Item>
                </Accordion>
            </Nav>
            <div style={{ width: "85%" }}>
            <div style={{ width: "96%", backgroundColor: "white", margin: "10px 2%", borderRadius: "5px", border: "solid 1px rgb(219, 218, 218)", boxShadow: "5px 0 5px 0 rgb(219, 218, 218)" }}>
                    <div className="d-flex" style={{ width: "50%", marginLeft: "25%" }}>
                        <IoSearchSharp style={{fontSize:"30px", marginTop:"2% "}}/>
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
                <div style={{ backgroundColor: "white", width: '96%', marginLeft: "2%", marginBottom: "1px", borderRadius: "5px", border: "solid 1px rgb(219, 218, 218)", boxShadow: " 5px 0 5px 0 rgb(219, 218, 218)" }}>
                    <div id="PageUlProduct" >
                        {filterData ? filterData && filterData.map((item, index) =>
                            <Link to={`http://localhost:3000/admin/market/getArticales/${item._id}`} style={{margin:"1%"}}>
                                <div class="card" style={{ width: "170px", margin: "1%", border: "none", borderRadius: "10px" , backgroundColor:"rgb(248, 248, 248)"}}>
                                    <img src={`http://localhost:3333/files/${item.file[0]}`} class="card-img-top" style={{ maxHeight: "300px" }} />
                                    <div class="card-body" style={{ textAlign: "center" }}>
                                        <h5 class="card-title" style={{textAlign:"end"}}>{item.price} $</h5>
                                        <p class="card-text">{item.title}</p>
                                    </div>
                                </div>
                            </Link>
                        ) : <Loading />}
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default CategoryArticale