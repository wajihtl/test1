import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'
import ReactLoading from "react-loading";
var CryptoJS = require("crypto-js");
var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');




export const BlogPage = () => {

    let decryptedData_username = myFunction();



    function myFunction() {

        let decryptedData = localStorage.getItem('HYZn4A5fpSY68whsRGvZTxNGsbJO7lMUu1Vv1a6yfkadE2T');

        if (decryptedData) {

            //decrypted 
            var bytes = CryptoJS.AES.decrypt(decryptedData, 'my-secret-key@123');
            var decryptedData_username = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            return decryptedData_username;

        }
        else
            return null;

    }








    //const username = localStorage.getItem('HYZn4A5fpSY68whsRGvZTxNGsbJO7lMUu1Vv1a6yfkadE2T');

    // extract id 
    const { id } = useParams();
    const [Loading, setLoading] = useState(false);

    // decrypt id url
    let backAgain = urlCrypt.decryptObj(id);
    var bytes = CryptoJS.AES.decrypt(backAgain, 'my-secret-key@123');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    //


    // decrypt username tokken
    //var bytes_username = CryptoJS.AES.decrypt(username, 'my-secret-key@123');
    //var decryptedData_username = JSON.parse(bytes_username.toString(CryptoJS.enc.Utf8));



    ///
    let base64 = btoa(decryptedData);

    let id_to_delete = atob(base64);

    let isOwner;
    const [BlogContent, setBlogContent] = useState([]);


    const deleted = () => {
        setLoading(false);

        axios.delete(`http://54.38.33.104:8000/api/blogs/${id_to_delete}`) //
            .then(res => {

                alert('deleted!');
                window.location = '/';

            })

    }



    // fetch 
    useEffect(() => {
        axios.get(`http://54.38.33.104:8000/api/oneBlog/${base64}`) //
            .then(res => {
                setBlogContent(res.data[0]);
                setLoading(true);
            })
    }, [])
    BlogContent.owner === decryptedData_username ? isOwner = true : isOwner = false;


    return (

        <>
            {Loading ? <div className="container" style={{ marginTop: "25vh", backgroundColor: "#1b1f26", borderRadius: "10px 20px 10px 20px", padding: "20px 40px 41px 40px", border: "2px solid #9FEF00" }}>
                {isOwner && <button style={{ background: '#9fef00', borderRadius: '25px', }}> <Link style={{ color: "black" }} to={`/Blogs/Edit/${id}`} >Edit</Link> </button>}
                {myFunction() == 'wajihtl' && <div >
                    <button onClick={deleted} className="btn btn-danger btn-md" > delete  </button>
                </div>}
                <br />
                <br />
                <div style={{ wordWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: BlogContent.blogContent }} />
            </div> : <div style={{ display: 'flex', justifyContent: 'center', marginTop: "15vh" }}> <ReactLoading type="bars" color="green" width={'20%'} />
            </div>
            }

        </>
    )
}
export default BlogPage
