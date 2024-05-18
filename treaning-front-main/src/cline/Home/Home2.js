import axios from "axios"
import { useContext, useEffect, useState } from "react"
import "./Home.css"
import { Link } from "react-router-dom";
import { User } from "../../context/context";

function Home2() {
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
            })
            .then((doc) => setDataa(doc.data))
            .catch((err) => console.log("err get : ", err))
    })
    return (
        <div>
            <div id="aaa"></div>
            <div id="PageUlUser">
                <div id="ulUser1">
                </div>
                <table >
                    <thead>
                        <tr>
                            <th>user:</th>
                            <th>email:</th>
                        </tr>
                    </thead>
                    {dataa && dataa.map((item, index) =>
                        <tbody>
                            <tr  >
                                <td>{item.user}</td>
                                <td>{item.email}</td>
                                <td id="tdbtn">
                                    <button id="btnTable"><Link id="LinkTable" to={`http://localhost:3000/cline/Home3/${item._id}`} > تفاصيل الحساب</Link></button>
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div >
    )
}

export default Home2