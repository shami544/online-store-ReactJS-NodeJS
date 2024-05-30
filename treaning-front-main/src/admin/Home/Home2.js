import axios from "axios"
import { useContext, useEffect, useState } from "react"
import "./HomeAdmin.css"
import { Link } from "react-router-dom";
import { User } from "../../context/context";
import { Loading } from "../../refreshPage/loading";
import Cookies from "universal-cookie"
import { TbListDetails } from "react-icons/tb";
import { Accordion, Form, Nav } from "react-bootstrap";
import { IoSearchSharp } from "react-icons/io5";


function Home2admin() {
    const [dataa, setDataa] = useState()
    const context = useContext(User)
    const token = context.auth.token

    useEffect(() => {
        axios.get("http://localhost:3333/users/GetUser",
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                }
            }
        )
            .then((doc) => setDataa(doc.data))
            .catch((err) => { console.log("err get : ", err) })
    }, [token])

    const [search, setSearch] = useState("")
    const [searchRole, setSearchRole] = useState("")
    const [searchactivity, setSearchActivity] = useState("")
    const [filterData, setFilterData] = useState()
    const dataSaerch = { search: search, searchRole: searchRole, searchactivity: searchactivity }

    async function getSearchData() {
        await axios.post('http://localhost:3333/users/SearchUser', dataSaerch,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                }
            }
        )
            .then((doc) => { setFilterData(doc.data.movies) })
            .catch((err) => console.log("err 1 : ", err))
    }

    useEffect(() => {
        const debounce = setTimeout(() => {
            getSearchData()
        }, 800)
        return () => clearTimeout(debounce)
    }, [token, search, searchactivity, searchRole])

    return (
        <div style={{ marginTop: "35px", minHeight: "500px", display: "flex", backgroundColor: "rgb(235, 235, 235)" }}>
            <Nav style={{ minHeight: "500px", width: "15%", borderRight: "solid 1px rgb(219, 218, 218)", margin: "0", backgroundColor: "white" }}>
                <Accordion style={{ width: "15%", position: "fixed" }} alwaysOpen >
                    <Accordion.Item eventKey="0" style={{ width: "100%" }} >
                        <Accordion.Header style={{ fontSize: "20px", width: "99%", padding: "2px" }}> Role  </Accordion.Header>
                        <Accordion.Body>
                            <form onChange={(e) => { setSearchRole(e.target.value) }}>
                                <input type="radio" id="All" name="Role" value="" style={{ width: "30%" }} defaultChecked />
                                <label for={"All"} style={{ width: "60%" }}>All</label>
                                <input type="radio" id="Admin" name="Role" value="admin" style={{ width: "30%" }} />
                                <label for={"Admin"} style={{ width: "60%" }}>Admin</label>
                                <input type="radio" id="Clain" name="Role" value="user" style={{ width: "30%" }} />
                                <label for={"Clain"} style={{ width: "60%" }}>Clain</label>
                            </form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" style={{ width: "100%" }} >
                        <Accordion.Header style={{ fontSize: "20px", width: "99%", padding: "2px" }}> Activity  </Accordion.Header>
                        <Accordion.Body>
                            <form onChange={(e) => setSearchActivity(e.target.value)}>
                                <input type="radio" id="All" name="Activity" value="" style={{ width: "30%" }} defaultChecked />
                                <label for={"All"} name="Activity" style={{ width: "60%" }}>All</label>
                                <input type="radio" id="Active" name="Activity" value="true" style={{ width: "30%" }} />
                                <label for={"Active"} name="Activity" style={{ width: "60%" }}>Active</label>
                                <input type="radio" id="UnActive" name="Activity" value="false" style={{ width: "30%" }} />
                                <label for={"UnActive"} style={{ width: "60%" }}>UnActive</label>
                            </form>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Nav>
            <div style={{ width: "85%", padding: "5px" }}>
                <div style={{ width: "96%", backgroundColor: "white", marginLeft: "2%", borderRadius: "5px", marginBottom: "10px", boxShadow: "5px 0 5px 0 rgb(219, 218, 218)", border: "solid 1px rgb(219, 218, 218)" }}>
                    <div className="d-flex" style={{ width: "50%", marginLeft: "25%", marginTop: "0" }}>
                        <IoSearchSharp style={{ fontSize: "30px", marginTop: "2%" }} />
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-1"
                            aria-label="Search"
                            style={{ backgroundColor: "rgba(255, 255, 255, 0.678)", height: "35px" }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div >
                    {dataa ?
                        <table class="table  table-hover table-light " style={{ fontSize: "20px", height: "10px", width: "96%", backgroundColor: "white", marginLeft: "2%", borderRadius: "5px", boxShadow: "5px 5px 5px 0 rgb(219, 218, 218)" }}>
                            <thead>
                                <tr>
                                    <th>#:</th>
                                    <th>user:</th>
                                    <th>email:</th>
                                    <th>active:</th>
                                    <th >{<TbListDetails />}</th>
                                </tr>
                            </thead>
                            {filterData ? filterData && filterData.map((item, index) =>
                                <tbody style={{ padding: "0" }}>
                                    <tr key={index} style={{ padding: "0" }} >
                                        <td >{index + 1}</td>
                                        <td >{item.user}</td>
                                        <td >{item.email}</td>
                                        <td >{item.active}</td>
                                        <td style={{ padding: "0", alignContent: "center", color: "white" }} >
                                            <div class="col-12" style={{ padding: "0" }}>
                                                <button type="submit" class="btn btn-success"  > <Link to={`http://localhost:3000/admin/Home/Home3/${item._id}`} style={{ padding: "0", color: "white" }} > تفاصيل الحساب</Link></button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            ) : <div style={{ minHeight: "100px", width: "100%", marginLeft: "150%", marginTop: "14%" }}>Loading...</div>}
                        </table>
                        : <Loading />}
                </div>
            </div>
        </div >
    )
}

export default Home2admin