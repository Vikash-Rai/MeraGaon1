import React, { useState, useEffect } from 'react';
// import "./AddEdit.css";
import axios from 'axios'
import {useParams,useHistory } from 'react-router-dom';
// import { toast } from 'react-toastify'

const SendOtp = () => {
    let history = useHistory();
    const {id} = useParams();
    const [data, setData] = useState([]);
    const [minVal, setMinVal] = useState(100000);
    const [maxVal, setMaxVal] = useState(999999);
    const [randomNum, setRandomNum] = useState(0);

    const generateRandom = () => {
        console.log("HI")
        setRandomNum(Math.floor(Math.random() * (maxVal - minVal + 1) + minVal));
    }

    useEffect(() => {
        generateRandom()
    }, [])

    const loadData = async () => {
        const response = await axios.get(`http://localhost:5000/api/get/${id}`);
        setData(response.data[0].phone);
        console.log(response.data[0].phone)
    }
    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/put/${data}`, {
            randomNum
            })
        setTimeout(() => {
            history.push(`/message`);
        }, 500);

    }
    return (
        <div style={{ marginTop: "100px" }}>
            <form style={{
                margin: 'auto',
                padding: '15px',
                maxWidth: '400px',
                alignContent: 'center'
            }} onSubmit={handleSubmit}>
                <h5>OTP</h5>
                <input className="form-control form-control-lg" type="text" id="otp" name="randomNum" value={`Hi! Your OTP is: ${randomNum}`} />
                <hr/>
                <input className="btn btn-warning btn-block" type="submit" value="Send OTP" />
            </form>
        </div>
    )
}

export default SendOtp