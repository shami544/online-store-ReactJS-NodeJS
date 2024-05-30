import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { User } from "../../context/context"

function Home3() {
    const [dataa, setDataa] = useState([])
    let params = useParams()
    const context = useContext(User)
    const token = context.auth.token

    useEffect(() => {
        axios.get(`http://localhost:3333/users/GetUser/${params.id}`,
        {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token ,
            }
        })
            .then((doc) => setDataa(doc.data))
            .catch((err) => console.log("err get id :", err))
    })
    const btndelete = async () => {
        await axios.delete(`http://localhost:3333/users/DeleteUser/${params.id}`)
            .then((doc) =>
                // Swal.fire({
                //     icon: 'success',
                //     title: 'Success Delete User',
                //     // text: 'Something went wrong!',
                //     // footer: '<a href="/login">login?</a>',
                //     showConfirmButton: false,
                //     timer: 1500,
                // }),
                window.location.replace("/cline/Home2")
            )
            .catch((err) => console.log("err delete : ", err))
    }
    return (
        <div>
            <div id="ulUser1">
                
                <ul id="ulUserId">
                    <div id="PhotosId">
                        <div id="PhotoId">Photo</div>
                        <div id="PhotoId">Photo</div>
                        <div id="PhotoId">Photo</div>
                    </div>
                    <li id="liUserId"><samp>- id:</samp> {dataa._id}.</li>
                    <li id="liUserId"><samp>- user:</samp>{dataa.user}.</li>
                    <li id="liUserId"><samp>- password:</samp>{dataa.password}.</li>
                    <li id="liUserId"><samp>- email:</samp>{dataa.email}.</li>
                    <li id="liUserId"><samp>- Country:</samp>{dataa.select}.</li>
                    <li id="liUserId"><samp>- date: </samp>{dataa.date}.</li>
                    <button onClick={btndelete}> Delete User</button>
                </ul>
            </div>
        </div>
    )
}

export default Home3