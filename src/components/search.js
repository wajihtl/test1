import React from "react";
import { MDBCol, MDBContainer } from "mdbreact";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export default class SearchBar extends React.Component {


  oncontent = (e) => {
    let category = e.target.value;
    console.log(category);
    window.location = `/Blogs/Category/${category}`;
  }

  render() {
    return (

      <MDBCol md="3">
        <MDBContainer>

          <div className="form-group col-md-12">
            <select onChangeCapture={this.oncontent} name="category" style={{ borderRadius: "5px", padding: "5px 100px 5px 0px", marginTop: "25px", color: "black" }} >
              <option selected disabled  >Search by Category</option>
              <option value="Forensics">Forensics</option>
              <option value="Cryptography" >Cryptography</option>
              <option value="Web Exploitation">Web Exploitation</option>
              <option value="Binary Exploitation">Binary Exploitation</option>
              <option value="Reverse Engineering">Reverse Engineering</option>
              <option value="Misc">Misc</option>

            </select>
          </div>

        </MDBContainer>

      </MDBCol>

    );

  }
}
