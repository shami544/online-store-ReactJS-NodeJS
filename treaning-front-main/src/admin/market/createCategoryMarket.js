import { useContext, useState } from "react";
import "../../cline/market/Articales.css"
import axios from "axios";
import Swal from "sweetalert2";
import { User } from "../../context/context";
import { useNavigate } from "react-router-dom";


function CreateCategoryMarket() {
    //tokenContext
    const usernaw = useContext(User)
    const token = usernaw.auth.token
    const nav = useNavigate()

    const [category, setCategory] = useState("");
    const [namee, setNamee] = useState("");
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

        await axios.post(`${process.env.REACT_APP_API_URL}/articales/CreateCategoryMarket`, formData, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "multipart/form-data"
            }
        })
            .then(async () =>
                await Swal.fire({
                    icon: 'success',
                    title: '<h1> Success </h1> <br /> تم اضافة المنتج ',
                    // text: ' تم اضافة المنتج ' ,
                    // footer: '<a href="/login">login?</a>',
                    showConfirmButton: false,
                    timer: 1500,
                }))
            .then(() => { nav("/admin/Home/Home4") })
            .catch((err) => console.log("err Post : ", err))
    }

    return (
        <div id="allPage">
            <div id="Page" style={{ width: "80%" }}>
                <div id="H1Login">
                    <h1>Create Category Market</h1>
                </div>

                <div style={{ width: "80%", display: "flex" }}>
                    <div class="mb-3" style={{ width: "100%" }}>
                        <label for="exampleFormControlInput1" class="form-label">Category Market Name</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" onChange={e => setNamee(e.target.value)} placeholder="لحوم ومجمدات , منظفات ,خضروات" />
                    </div>
                </div>
                <div class="form-floating mb-3">
                    <input type="file" class="form-control" id="floatingInputNumber" onChange={(e) => handleFileSelect(e)} placeholder="name@example.com" />
                    <label for="floatingInputNumber">emg</label>
                    <div className="errMsgInbut" id="errphone"></div>
                </div>

                <div class="col-12">
                    <button type="submit" class="btn btn-success" onClick={btnInsert}> Create Articale</button>
                </div>
            </div>
        </div>
    )
}

export default CreateCategoryMarket;