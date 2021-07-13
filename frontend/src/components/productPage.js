import React, { useState } from 'react'

function ProductPage(props) {
    return (
        <div className="row" style={{ paddingTop: "25px" }}>
            <div className="col">
                <input type="text" className="form-control" id="inputPassword2" placeholder="Password" />
            </div>
            <div className="col">
                <button type="submit" className="btn btn-primary mb-2">Confirm identity</button>
            </div>
            
        </div>
    )
}

export default ProductPage
