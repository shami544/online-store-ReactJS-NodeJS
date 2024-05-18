import "./Users.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import { User } from "../context/context"


function UpDateUser() {

    const context = useContext(User)
    const token = context.auth.token

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
    }, [])
    const [dataa, setDataa] = useState([])

    const [Userr, setUserr] = useState(dataa.user)
    const [email, setemail] = useState(dataa.email)
    const [phone, setPhone] = useState(dataa.phone)
    const [selectt, setSelect] = useState(dataa.select)
    const [datee, setDate] = useState(dataa.date)
    const [err, setErr] = useState()
    let params = useParams()
    const nav = useNavigate()

    const PostData = { user: Userr, email: email, phone: phone, select: selectt, date: datee }

    const clickUpDateAc = async () => {
        await axios.patch(`http://localhost:3333/users/PatchUser/${params.id}`, PostData,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                }
            })
            .then(async (doc) => {
                {
                    await Swal.fire({
                        icon: 'success',
                        title: '<h1> Success </h1> <br /> UpDate User',
                        text: 'تم تعديل حسابك',
                        // footer: '<a href="/login">login?</a>',
                        showConfirmButton: false,
                        timer: 1500,
                    })
                } { nav(`/admin/Home3/${dataa._id}`) }
            })
            .catch((err) => {
                if (err.response.data.errors) {
                    setErr(err.response.data.errors)
                }
                // console.log("err : " , err)
            })
    }

    if (err) {
        const errors = err
        var userError = errors.find(error => error.path === "user")
        var emailError = errors.find(error => error.path === "email")

        var phoneError = errors.find(error => error.path === "phone")

        if (userError) {
            document.getElementById("erruser").innerHTML = userError.msg
        }
        if (!userError) {
            document.getElementById("erruser").innerHTML = ""
        }
        if (emailError) {
            document.getElementById("erremail").innerHTML = emailError.msg
        }
        if (!emailError) {
            document.getElementById("erremail").innerHTML = ""
        }

        if (phoneError) {
            document.getElementById("errphone").innerHTML = phoneError.msg
        }
        if (!phoneError) {
            document.getElementById("errphone").innerHTML = ""
        }
    }

    return (
        <div id="allPage">
            <div id="Page">
                <div id="H1Login">
                    <h1>UpDate User</h1>

                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInputUser" onChange={e => setUserr(e.target.value)} defaultValue={dataa.user} placeholder="name@example.com" />
                    <label for="floatingInput" >User</label>
                    <div className="errMsgInbut" id="erruser"></div>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInputEmail" onChange={e => setemail(e.target.value)}
                        placeholder="name@example.com" defaultValue={dataa.email} />
                    <label for="floatingInput">Email address</label>
                    <div className="errMsgInbut" id="erremail"></div>
                </div>
                <div class="form-floating mb-3">
                    <input type="number" class="form-control" id="floatingInputPhone" onChange={(e) => (setPhone(e.target.value))} placeholder="name@example.com" defaultValue={dataa.phone} />
                    <label for="floatingInputPhone">Phone</label>
                    <div className="errMsgInbut" id="errphone"></div>
                </div>
                <select class="form-select form-select-lg mb-3" aria-label="Large select example" style={{ width: "80%" }} onChange={(e) => (setSelect(e.target.value))} defaultValue={dataa.select} >
                    <option value="Palestine" >Palestine</option>
                    <option value="Egypt">Egypt</option>
                    <option value="Jordan">Jordan</option>
                    <option value="syria">syria</option>
                    <option value="Lebanon">Lebanon</option>
                </select>
                <div class="form-floating mb-3">
                    <input type="date" class="form-control" id="floatingInputPhone" onChange={(e) => (setDate(e.target.value))} placeholder="name@example.com" defaultValue={dataa.date} />
                    <label for="floatingInputPhone">Date</label>
                    <div className="errMsgInbut" id="errphone"></div>
                </div>

                <div class="col-12">
                    <button type="submit" class="btn btn-primary" onClick={clickUpDateAc}> Up Date User</button>
                </div>
            </div>
        </div>
    )
}

export default UpDateUser;