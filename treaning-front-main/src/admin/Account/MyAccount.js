import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { User } from "../../context/context";
import { Loading, LoadingBtn } from "../../refreshPage/loading";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { MsgModal } from "../../components/MsgComponent";


const MyAccount = () => {
    const usercontext = useContext(User)
    const IdUser = usercontext.auth.userDetals._id
    const token = usercontext.auth.token
    const [dataa, setDataa] = useState()
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState("نعم ,متأكد")
    const nav = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3333/users/GetUser/${IdUser}`, {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            }
        })
            .then((doc) => { setDataa(doc.data) })
            .catch((err) => console.log("err get user : ", err))
    }, [])

    const UpDateUser = () => {
        nav(`/cline/user/UpDateUser/${IdUser}`)
    }

    const btnVerifyEmail = async () => {
        setStatus(<LoadingBtn />)
        await axios.patch(`${process.env.REACT_APP_API_URL}/auth/verifyEmail`, { email: usercontext.auth.userDetals.email })
            .then(() => setStatus("نعم ,متأكد"))
            .then(() => setShow(false))
            .catch((err) => console.log(err))
    }

    return (<>
        <div>
            <div id="allPageArticaleId">
                <ul id="ulUserId">
                    {dataa ?
                        <div style={{ width: "100%", paddingLeft: "5%" }}>
                            <div id="H1Login">
                                <h1>Account Information</h1>
                            </div>
                            <li id="liUserId"><div>• user : </div>{dataa.user}.</li>
                            <li id="liUserId" style={{ display: 'flex', justifyContent: '' }}><div>
                                • email : </div><div>{dataa.email}.</div>
                                <div style={{ marginLeft: "auto", marginRight: "15%" }}>
                                    {dataa.verifyEmail == "true" ? " verify yes"
                                        : <> verify : no <Button variant="outline-success" onClick={() => setShow(true)}>verify Email</Button></>}
                                </div>
                            </li>
                            <li id="liUserId"><div>• phone : </div>{dataa.phone}.</li>
                            <li id="liUserId"><div>• Country : </div>{dataa.select}.</li>
                            <li id="liUserId"><div>• date : </div>{dataa.date}.</li>
                            {dataa.address.length > 0 ?
                                <div id="liUserId"><div>• address : {dataa && dataa.address.map((item, index) =>
                                    <div key={index}>
                                        <div>{index + 1}</div>
                                        <div> city :{item.city}</div>
                                        <div> district :{item.district}</div>
                                        <div> street :{item.street}</div>
                                        <div> architecture Name :{item.architectureName}</div>
                                        <div> apartmentNumber :{item.apartmentNumber}</div>
                                        <div> floorNumber :{item.floorNumber}</div>
                                        <div> additionalDetailsr :{item.additionalDetailsr}</div>
                                    </div>
                                )}</div>
                                </div>
                                : ""}

                            <div class="col-12" style={{ display: "flex", justifyContent: "center", paddingTop: "2%", borderTop: "1px solid #c5c2c2", width: "90%" }}>
                                <button type="submit" class="btn btn-success" onClick={UpDateUser}> UpDate User</button>
                            </div>
                        </div>
                        : <Loading />}
                </ul>
            </div>
            <MsgModal show={show} handleClose={() => setShow(false)} title={"تأكيد الايميل"} body={'سيتم ارسال رسالة تأكيد للايميل'} opj={btnVerifyEmail} status={status} />
        </div>
    </>)
}
export default MyAccount;