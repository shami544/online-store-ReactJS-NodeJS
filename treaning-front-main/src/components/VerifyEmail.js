import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const BtnVerifyEmail = () => {
    let params = useParams()
    const nav = useNavigate()
    useEffect(() => {
        axios.patch(`http://localhost:3333/auth/verifyEmail/${params.token}`)
            .then(() => nav("/cline/user/GetUserId"))
            .catch((err) => console.log(err))
    })
    return (<>

    </>)
}

export default BtnVerifyEmail;