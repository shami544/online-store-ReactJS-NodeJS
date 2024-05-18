import axios from "axios"
import React, { useContext, useState } from "react"
import "./Users.css";
import { User } from "../context/context";




function ChangePassword() {
    const usernaw = useContext(User)
    const token = usernaw.auth.token
    const id = usernaw.auth.userDetals
    console.log(id)


    const [oldPassword, setOldPassword] = useState()
    const [newPassword, setNewPassword] = useState('')
    const [conNewPassword, setConNewPassword] = useState('')
    const [err, setErr] = useState()



    const data = { oldPassword: oldPassword, newPassword: newPassword, conNewPassword: conNewPassword }

    const btnChangePassword = async () => {
        await axios.patch(`http://localhost:3333/users/PatchPassword/${id._id}`, data, {
            headers: {
                Authorization: "Bearer " + token,
            }
        })
            .then((doc) => console.log("doc : ", doc))
            .catch((err) => {
                {
                    if (err.response.data) {
                        setErr(err.response.data)
                    } { console.log(err) }
                }
            })
    }
    console.log(err)
    if (err) {
        try {
            document.getElementById("errMsg").innerHTML = err.errors.map(error => error.msg).join("<br>");
        } catch {
            document.getElementById("errMsg").innerHTML = err.msg
        }
    }

    return (
        <>
            <div id="LoginPage">
                <div id="Page">
                    <div id="H1Login">
                        <h1>Change Password</h1>
                    </div>
                    <div id="errMsg"></div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingoldPassword" onChange={e => setOldPassword(e.target.value)} placeholder="Password" />
                        <label for="floatingPassword">Old Password</label>
                        <div id="errpassword" className="errMsgInbut"></div>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingnewPassword" onChange={e => setNewPassword(e.target.value)} placeholder="Password" />
                        <label for="floatingPassword">New Password</label>
                        <div id="errpassword" className="errMsgInbut"></div>
                    </div>
                    <div class="form-floating">
                        <input type="password" class="form-control" id="floatingConNewPassword" onChange={e => setConNewPassword(e.target.value)} placeholder="Password" />
                        <label for="floatingPassword">Confirm New Password</label>
                        <div id="errpassword" className="errMsgInbut"></div>
                    </div>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary" onClick={btnChangePassword}> Change Password</button>
                </div>
            </div>
        </>
    )

}

export default ChangePassword