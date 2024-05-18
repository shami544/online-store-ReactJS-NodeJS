import "./Users.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";


function CreateUser() {
    const [User, setUser] = useState("")
    const [email, setemail] = useState("")
    const [passwordd, setPassword] = useState('')
    const [passwordd2, setPassword2] = useState('')
    const [phone, setPhone] = useState('')
    const [selectt, setSelect] = useState('Palestine')
    const [datee, setDate] = useState('')
    const [err, setErr] = useState()
    const nav = useNavigate()

    const PostData = { user: User, email: email, password: passwordd, password2: passwordd2, phone: phone, select: selectt, date: datee }
    const clickCreateAc = async () => {
        if (passwordd === passwordd2) {
            await axios.post("http://localhost:3333/auth/register", PostData)
                .then(async (doc) => {
                    {
                        await Swal.fire({
                            icon: 'success',
                            title: '<h1> Success </h1> <br /> Create User',
                            text: 'تم تسجيل حسابك',
                            // footer: '<a href="/login">login?</a>',
                            showConfirmButton: false,
                            timer: 1500,
                        })
                    } { nav("/GetCategoryMarket") }
                })
                .catch((err) => {
                    if (err.response.data.errors) {
                        setErr(err.response.data.errors)
                    }
                })
        }
        else { document.getElementById("errpassword").innerHTML = "كلمتا المرور غير متطابقات" }
    }

    if (err) {
        const errors = err
        var userError = errors.find(error => error.path === "user")
        var emailError = errors.find(error => error.path === "email")
        var passwordError = errors.find(error => error.path === "password")
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
        if (passwordError) {
            document.getElementById("errpassword").innerHTML = passwordError.msg
        }
        if (passwordd !== passwordd2) {
            document.getElementById("errpassword").innerHTML = "كلمتا المرور غير متطابقات"
        }
        if (!passwordError) {
            document.getElementById("errpassword").innerHTML = ""
        }
        if (phoneError) {
            document.getElementById("errphone").innerHTML = phoneError.msg
        }
        if (!phoneError) {
            document.getElementById("errphone").innerHTML = ""
        }
    }
    // const btngooglelogin = () => {
    //     window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`,
    //         "_self"
    //     )
    // }

    return (
        <div id="allPage">
            <div id="Page" style={{ width: "60%", marginLeft: "20%" }}>
                <div id="H1Login">
                    <h1>Sign up</h1>

                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInputUser" onChange={e => setUser(e.target.value)} placeholder="name@example.com" />
                    <label for="floatingInput" >User</label>
                    <div className="errMsgInbut" id="erruser"></div>
                </div>
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="floatingInputEmail" onChange={e => setemail(e.target.value)}
                        placeholder="name@example.com" />
                    <label for="floatingInput">Email address</label>
                    <div className="errMsgInbut" id="erremail"></div>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" onChange={e => setPassword(e.target.value)} placeholder="Password" />
                    <label for="floatingInput"> Password</label>
                    <div className="errMsgInbut" id="errpassword"></div>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingConfirmePassword" onChange={(e) => (setPassword2(e.target.value))} placeholder="Password" />
                    <label for="floatingInput">Confirme Password</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="number" class="form-control" id="floatingInputPhone" onChange={(e) => (setPhone(e.target.value))} placeholder="name@example.com" />
                    <label for="floatingInputPhone">Phone</label>
                    <div className="errMsgInbut" id="errphone"></div>
                </div>
                <select class="form-select form-select-lg mb-3" aria-label="Large select example" style={{ width: "80%" }} onChange={(e) => (setSelect(e.target.value))} >
                    <option value="Palestine" >Palestine</option>
                    <option value="Egypt">Egypt</option>
                    <option value="Jordan">Jordan</option>
                    <option value="syria">syria</option>
                    <option value="Lebanon">Lebanon</option>
                </select>
                <div class="form-floating mb-3">
                    <input type="date" class="form-control" id="floatingInputPhone" onChange={(e) => (setDate(e.target.value))} placeholder="name@example.com" />
                    <label for="floatingInputPhone">Date</label>
                    <div className="errMsgInbut" id="errphone"></div>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary" onClick={clickCreateAc}> Sign up</button>
                </div>
                {/* <div class="col-12">
                    <button class="btn btn-primary" onClick={btngooglelogin}>  google</button>
                </div> */}
            </div>
        </div>
    )
}

export default CreateUser;