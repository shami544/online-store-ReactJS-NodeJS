import { useContext, useEffect, useState } from "react";
import "../../cline/market/Articales.css"
import axios from "axios";
import Swal from "sweetalert2";
import { User } from "../../context/context";
import { useNavigate } from "react-router-dom";
import {Loading} from "../../refreshPage/loading";


function CreateArticales() {
    const [dataa, setDataa] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:3333/articales/GetCategoryMarket`, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data"
            }
        })
            .then((doc) => { setDataa(doc.data) })
            .catch((err) => { console.log("err get1 :", err) })
    }, [])
    useEffect(() => {
        setCategory(dataa[0] ? dataa[0].name : '');
    }, [dataa[0]]);
    //tokenContext
    const usernaw = useContext(User)
    const token = usernaw.auth.token
    const nav = useNavigate()
    const [category, setCategory] = useState(dataa[0] ? dataa[0].name :'');
    const [namee, setNamee] = useState('');
    const [titlee, setTitlee] = useState("");
    const [informationn, setInformationn] = useState();
    const [pricee, setPricee] = useState();
    const [numberr, setNumberr] = useState();
    const [emgg, setEmg] = useState(null);
    const [formData, setFormData] = useState(new FormData());


    function handleFileSelect(event) {
        const files = event.target.files;
        const selectedFiles = []

        for (let i = 0; i < files.length; i++) {
            selectedFiles.push(files[i]);
        }
        setEmg(selectedFiles);

        const updatedFormData = new FormData();
        updatedFormData.append("category", category);
        updatedFormData.append("name", namee);
        updatedFormData.append("title", titlee);
        updatedFormData.append("information", informationn);
        updatedFormData.append("price", pricee);
        updatedFormData.append("number", numberr);
        for (let i = 0; i < selectedFiles.length; i++) {
            updatedFormData.append("file", selectedFiles[i]);
        }
        setFormData(updatedFormData);
    }

    async function btnInsert() {
        if (!emgg || emgg.length === 0) {
            console.error("No files selected");
            return;
        }

        await axios.post("http://localhost:3333/articales/CreateArticales", formData, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data"
            }
        })
            .then(async (doc) =>
                await Swal.fire({
                    icon: 'success',
                    title: '<h1> Success </h1> <br /> تم اضافة المنتج ',
                    // text: ' تم اضافة المنتج ' ,
                    // footer: '<a href="/login">login?</a>',
                    showConfirmButton: false,
                    timer: 1500,
                }))
            .then((doc) => { nav("/admin/Home/Home4") })
            .catch((err) => console.log("err Post : ", err))
    }

    return (
        <div id="allPage">
            {dataa ?
                <div id="Page" style={{ width: "80%" }}>

                    <div id="H1Login">
                        <h1>Create Product</h1>
                    </div>
                    category
                    <select class="form-select form-select-lg mb-3" aria-label="Large select example" style={{ width: "80%" }} onChange={(e) => (setCategory(e.target.value))} >
                        {dataa && dataa.map((item, index) => <option>{item.name}</option>)}
                    </select>

                    <div style={{ width: "80%", display: "flex" }}>
                        <div class="mb-3" style={{ width: "50%" }}>
                            <label for="exampleFormControlInput1" class="form-label">Product Name</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" onChange={e => setNamee(e.target.value)} placeholder="Xiaomi Redmi Note 8 Pro" />
                        </div>
                        <div class="mb-3" style={{ width: "50%" }}>
                            <label for="exampleFormControlInput1" class="form-label">Product Title</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" onChange={e => setTitlee(e.target.value)} placeholder="Xiaomi Redmi Note 8 Pro 64GB Green Global version" />
                        </div>
                    </div>
                    <div class="mb-3" style={{ width: "80%" }}>
                        <label for="exampleFormControlTextarea1" class="form-label">Accurate information</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" onChange={e => setInformationn(e.target.value)}></textarea>
                    </div>
                    <div style={{ width: "80%", display: "flex" }}>
                        <div class="form-floating mb-3">
                            <input type="number" class="form-control" id="floatingInputPrice" onChange={(e) => (setPricee(e.target.value))} placeholder="name@example.com" />
                            <label for="floatingInputPrice">Price</label>
                            <div className="errMsgInbut" id="errphone"></div>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="number" class="form-control" id="floatingInputNumber" onChange={(e) => (setNumberr(e.target.value))} placeholder="name@example.com" />
                            <label for="floatingInputNumber">Existing quantity</label>
                            <div className="errMsgInbut" id="errphone"></div>
                        </div>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="file" class="form-control" id="floatingInputNumber" onChange={(e) => handleFileSelect(e)} multiple placeholder="name@example.com" />
                        <label for="floatingInputNumber">emg</label>
                        <div className="errMsgInbut" id="errphone"></div>
                    </div>

                    <div class="col-12">
                        <button type="submit" class="btn btn-success" onClick={btnInsert}> Create Product</button>
                    </div>
                </div>
                : <Loading />}

        </div>
    )
}

export default CreateArticales;