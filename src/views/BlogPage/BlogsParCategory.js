import axios from 'axios';
import { useState, useEffect } from 'react';
import Blog from '../../components/sections/Blog'
import React from 'react';
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";



const BlogsParCategory = () => {
    // store movies in state
    const [blogs, setBlogs] = useState([]);
    const [Loading, setLoading] = useState(false);

    const { category } = useParams();

    // fetch movies
    useEffect(() => {
        axios.get(`http://54.38.33.104:8000/api/SearchWithCategory/${category}`) //
            .then(res => {
                setBlogs(res.data);
                setLoading(true);
            })
    }, [])

    // rendered movies
    const renderedblogs = blogs.map(m => <Blog {...m} />)

    return (
        <>
            <div className="container" style={{ marginTop: "15vh" }}>
                <div className="row">
                    <h4>{category}:</h4>

                    {Loading ? renderedblogs : <div style={{ display: 'flex', justifyContent: 'center' }}> <ReactLoading type="bars" color="green" width={'35%'} />
                    </div>}
                </div>
            </div>
        </>

    )
}

export default BlogsParCategory