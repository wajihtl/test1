import React, { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import styled from "styled-components";
import ReactLoading from "react-loading";
var CryptoJS = require("crypto-js");



function Add() {
    let date = new Date()
    const id_token = localStorage.getItem('tYEuDFZNSysbgeh82mkxeXTZAJNb0Hpb8KssSNTH');
    let history = useHistory();
    var bytes_username = CryptoJS.AES.decrypt(id_token, 'my-secret-key@123');
    var token = JSON.parse(bytes_username.toString(CryptoJS.enc.Utf8));
    const [Loading, setLoading] = useState(false);

    const [userInfo, setuserInfo] = useState({
        title: '',
        blogContent: '',
        category: '',
        description: '',
        username: "/api/users/" + token,
        DateCreatedAt: date,
        flag: '',
    });
    const ontitle = (e) => {
        setuserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }
    const oncategory = (e) => {
        setuserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }
    const ondescription = (e) => {
        setuserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }
    const onflag = (e) => {
        setuserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }
    const oncontent = (value) => {
        setuserInfo({
            ...userInfo,
            blogContent: value
        });
    }

    const [isError, setError] = useState(null);


    const addDetails = async (event) => {
        setLoading(true);
        try {

            event.preventDefault();
            event.persist();
            if (userInfo.blogContent.length < 50) {
                setError('Required, Add content minimum length 50 characters');
                setLoading(false);
                return;
            }


            axios.post(`http://54.38.33.104:8000/api/blogs`, { // 
                title: userInfo.title,
                blogContent: userInfo.blogContent,
                category: userInfo.category,
                description: userInfo.description,
                flag: userInfo.flag,
                username: userInfo.username,
                DateCreatedAt: userInfo.DateCreatedAt,
            })

                .then(res => {
                    if (res.data.success === true) {
                        alert('Write-up added!');
                        history.push('/');
                    }
                })
        } catch (error) { throw error; }
    }
    return (
        <>
            <App >
                <div className="container">
                    <div className="row">
                        <Form onSubmit={addDetails} >
                            <h3 className="myaccount-content"> Write-Up </h3>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label className="font-weight-bold" > Title <Span >*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </Span>   </label>
                                    <input maxLength={25} type="text" name="title" value={userInfo.title} onChange={ontitle} className="form-control" placeholder="Challenge name" required style={{ backgroundColor: "whitesmoke", borderRadius: "5px" }} />
                                </div>
                                <div className="form-group col-md-12">
                                    <label className="font-weight-bold" >Category<Span > * &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Span>   </label>
                                    <select required name="category" onChange={oncategory} style={{ backgroundColor: 'whitesmoke', borderRadius: "5px", paddingRight: "18%" }} >

                                        <option disabled selected  >Choose the category</option>
                                        <option value="Forensics">Forensics</option>
                                        <option value="Cryptography" >Cryptography</option>
                                        <option value="Web Exploitation">Web Exploitation</option>
                                        <option value="Binary Exploitation">Binary Exploitation</option>
                                        <option value="Reverse Engineering">Reverse Engineering</option>
                                        <option value="Misc">Misc</option>

                                    </select>
                                </div>

                                <div className="form-group col-md-12">
                                    <label className="font-weight-bold">Description<Span >*</Span> </label>
                                    <input maxLength={70} type="text" name="description" value={userInfo.description} onChange={ondescription} className="form-control" placeholder="Short Description" required style={{ backgroundColor: "whitesmoke" }} />
                                </div>
                                <div className="form-group col-md-12">
                                    <label className="font-weight-bold" >Flag<Span >*&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Span> </label>
                                    <input maxLength={30} type="text" name="flag" value={userInfo.flag} onChange={onflag} className="form-control" placeholder="Flag" required style={{ backgroundColor: "whitesmoke" }} />
                                </div>


                                <Clearfix ></Clearfix>
                                <div >
                                    <label className="font-weight-bold"> Content <Span > * </Span> </label>
                                    <Editor >
                                        <EditorToolbar toolbarId={'t1'} />

                                        <ReactQuill
                                            theme="snow"
                                            value={userInfo.blogContent}
                                            onChange={oncontent}
                                            placeholder={"Write something awesome..."}
                                            modules={modules('t1')}
                                            formats={formats}

                                        />

                                    </Editor>

                                </div>
                                <br />
                                <br />
                                {isError !== null && <div className="errors"> {isError} </div>}


                            </div>
                            <div >
                                <button type="submit" className="btn btn-success btn-sm" > Submit  </button>
                            </div>
                            {Loading ? <div style={{ display: 'flex', justifyContent: 'center' }}> <ReactLoading type="bars" color="green" width={'10%'} height={'20%'} />
                            </div> : null}
                        </Form>
                    </div>
                </div>
            </App>
        </>
    )
}


const App = styled.div`
position: relative;
  float: left;
  width: 100%;
  display: block;
  padding: 70px 0;
  margin: 70px 0;
`;

const Editor = styled.div`
background-color: whitesmoke;
color:black;
width: 55vw;
`;


const Form = styled.form`


padding: 37px;

`;

const Span = styled.span`
color: #f44336;
`;


const Clearfix = styled.div`
clear:both;

`;



export default Add