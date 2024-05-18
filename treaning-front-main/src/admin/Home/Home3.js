import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { User } from "../../context/context"
import Loading from "../../refreshPage/loading"
import Cookies from "universal-cookie"

function Home3admin() {
    const [dataa, setDataa] = useState([])
    const cookie = new Cookies()
    let params = useParams()
    const context = useContext(User)
    const token = context.auth.token
    const [errDecodedTokein, setErrDecodedTokin] = useState()
    const getRefreshTokenCookie = cookie.get("refreshToken");


    const nev = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3333/users/GetUser/${params.id}`,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                }
            })
            .then((doc) => setDataa(doc.data))
            .catch((err) => console.log("err get id :", err))
    })

    const UpDateUser = () => {
        nev(`/admin/user/UpDateUser/${params.id}`)
    }
    const btndelete = async () => {
        await axios.delete(`http://localhost:3333/users/DeleteUser/${params.id}`,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                }
            })
            .then((doc) =>
                Swal.fire({
                    icon: 'success',
                    title: 'Success Delete User',
                    // text: 'Something went wrong!',
                    // footer: '<a href="/login">login?</a>',
                    showConfirmButton: false,
                    timer: 1500,
                }),
                window.location.replace("/admin/Home/Home2")
            )
            .catch((err) => {
                console.log("err delete : ", err)
                if (err.response.data.errors) {
                    setErrDecodedTokin(err.response.data.errors)
                    console.log("1")
                }
            })
    }


    // useEffect(() => {
    //     if (errDecodedTokein) {
    //         var userError = errDecodedTokein.find(error => error.msg === "انتهت صلاحية التوكن")
    //         if (userError) {
    //             console.log("user error")
    //             axios.post("http://localhost:3333/auth/refreshToken", null, {
    //                 headers: {
    //                     Accept: "application/json",
    //                     Authorization: "Bearer " + getRefreshTokenCookie,
    //                 }
    //             }).then(async (doc) => {
    //                 const token = doc.data.token
    //                 const userDetals = doc.data.data
    //                 cookie.set("bearer", token)
    //                 context.setAuth({ token: token, userDetals: userDetals })
    //                 console.log("2")
    //             }).catch((err) => console.log("err refreshPage : ", err))
    //             console.log(getRefreshTokenCookie)
    //         }
    //     }
    // }, [errDecodedTokein])

    const btnActiveUser = () => {
        if (dataa.active === "true") {
            axios.patch(`http://localhost:3333/users/PatchUser/${params.id}`, { active: "false" }, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                }
            })
                .then((doc) => { nev(`/admin/Home/Home3/${dataa._id}`) })
                .catch((err) => { console.log("err Active : ", err) })
        }
        if (dataa.active === "false") {
            axios.patch(`http://localhost:3333/users/PatchUser/${params.id}`, { active: "true" },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    }
                })
                .then((doc) => { nev(`/admin/Home/Home3/${dataa._id}`) })
                .catch((err) => { console.log("err active : ", err) })
        }
    }

    const btnRoleUser = () => {
        if (dataa.role === "user") {
            axios.patch(`http://localhost:3333/users/PatchUser/${params.id}`, { role: "admin" }, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                }
            })
                .then((doc) => { nev(`/admin/Home/Home3/${dataa._id}`) })
                .catch((err) => { console.log("err role : ", err) })
        }
        if (dataa.role === "admin") {
            axios.patch(`http://localhost:3333/users/PatchUser/${params.id}`, { role: "user" },
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    }
                })
                .then((doc) => { nev(`/admin/Home/Home3/${dataa._id}`) })
                .catch((err) => { console.log("err role : ", err) })
        }
    }

    return (
        <div>
            {dataa ?
                <div id="allPageArticaleId">
                    <ul id="ulUserId">
                     <div id="H1Login">
                        <h1>Account Information</h1>
                    </div>
                        <li id="liUserId"><div>• user : </div>{dataa.user}.</li>
                        <li id="liUserId"><div>• email : </div>{dataa.email}.</li>
                        <li id="liUserId"><div>• phone : </div>{dataa.phone}.</li>
                        <li id="liUserId"><div>• Country : </div>{dataa.select}.</li>
                        <li id="liUserId"><div>• date : </div>{dataa.date}.</li>
                        <div style={{ borderBottom: "1px solid ", textAlign: 'center', fontSize: "30px", width: "90%" }}>Edit Account</div>
                        <div style={{ width: "80%", display: "flex", marginBottom: "2%" , marginTop:"2%" }}>
                            <li style={{ justifyContent: "center" }} id="liUserId"><div> role : </div>{dataa.role}. <button type="submit" style={{marginLeft:"5%"}} class="btn btn-primary" onClick={btnRoleUser}> {dataa.role == "user" ? "admin " : "user"}</button></li>
                            <li id="liUserId"><div> active : </div>{dataa.active}. <button type="submit" style={{marginLeft:"5%"}} class="btn btn-primary" onClick={btnActiveUser}> {dataa.active == "true" ? "false " : "true"}</button></li>
                        </div>

                        <div class="col-12" style={{ display: "flex", justifyContent: "center" }}>
                            <button type="submit" class="btn btn-primary" onClick={UpDateUser}> UpDate User</button>
                            <button type="submit" style={{ marginLeft: "2%" }} class="btn btn-danger" onClick={btndelete}> Delete User</button>
                        </div>
                    </ul>

                </div>
                : <Loading />}
        </div>
    )
}

export default Home3admin