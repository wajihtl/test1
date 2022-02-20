import React from "react";
import axios from 'axios';
import { useState } from 'react';
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';
import ReactLoading from "react-loading";





const Blog = ({ owner, description, title, Category, id }) => {

    var CryptoJS = require("crypto-js");
    var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');


    function Check_Admin() {
        let decryptedData_username = localStorage.getItem('HYZn4A5fpSY68whsRGvZTxNGsbJO7lMUu1Vv1a6yfkadE2T');

        if (decryptedData_username && flag == 'admin') {

            //decrypted 
            var bytes = CryptoJS.AES.decrypt(decryptedData_username, 'my-secret-key@123');
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return decryptedData;

        }
        else
            return null

    }


    let base64 = btoa(id);

    const [flag, setFlag] = useState('');
    const [verif, setVerif] = useState(true);
    const [Loading, setLoading] = useState(false);


    var data = id;

    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'my-secret-key@123').toString();


    let base642 = urlCrypt.cryptObj(ciphertext);


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            check();

        }

    }




    const check = () => {

        setLoading(true);
        setVerif(true);


        axios.get(`http://54.38.33.104:8000/api/Flag/${base64}/${flag}`) //
            .then(res => {
                if (res.data.state === "success" || Check_Admin() == 'wajihtl')
                    window.location.href = `/Blogs/${base642}`;

                else {
                    setVerif(false);
                    setLoading(false);
                }

            })

    }

    return (


        <div className="tiles-item " data-reveal-delay="200">

            <div className="tiles-item-inner" >{owner}
                <div className="testimonial-item-content" >
                    <p style={{ width: "200px", color: "whitesmoke", wordWrap: "break-word" }}>
                        {description}
                    </p>


                </div>
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                    <span className="testimonial-item-name text-color-high">{title}</span>
                    <span className="testimonial-item-link"><Link to={`/Blogs/Category/${Category}`} className="text-color-low">/ {Category}</Link>
                    </span>
                    <br />


                    <Popup trigger={<div className="btne from-top" >Click me to see more!</div>}>

                        <input onKeyDown={handleKeyDown} onChange={event => setFlag(event.target.value)} type="text" name="flag" className="form-control" placeholder="you need to enter the flag first" required style={{ backgroundColor: "whitesmoke", borderRadius: "5px" }} />

                        <Link onClick={check} style={{ color: verif ? '#4a6e1f' : "red" }}>{verif ? "check" : "wrong flag \u274C "}
                        </Link>
                        {Loading ? <div style={{ display: 'flex', justifyContent: 'center' }}> <ReactLoading type="bars" color="green" />
                        </div> : null}
                    </Popup>


                </div>

            </div>


        </div >




    )
}





export default Blog;