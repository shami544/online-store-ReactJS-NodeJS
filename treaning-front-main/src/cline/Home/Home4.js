import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./Home.css"
import AAA from "../market/Rate"
import { User } from "../../context/context"

function Home4() {
    const [dataa, setDataa] = useState()
    const context = useContext(User)
    const token = context.auth.token

    useEffect(() => {
        axios.get("http://localhost:3333/articales/GetArticales",
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                }
            })
            .then((doc) => setDataa(doc.data))
            .catch((err) => console.log("err Get :", err))
    })

    return (
        <div>
            <div id="ulUser1"></div>
            <div id="PageUlArticale">
                <div id="ulArticale1">
                    {dataa && dataa.map((item, index) =>
                        <ul key={index} id="ulArticale">
                            <Link to={`http://localhost:3000/cline/getArticales/${item._id}`}>
                                <div id="Photo"> Photo</div>
                                <li> <samp>name:</samp>   {item.name}</li>
                                <li> <samp>  title:</samp>  {item.title}</li>
                                <li> <samp> price: </samp> {item.price} <samp>$</samp> </li>
                            </Link>
                            <li><AAA /></li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home4