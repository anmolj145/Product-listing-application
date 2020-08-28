import React from 'react';
import { useHistory } from "react-router-dom";
import './Description.css'

export default function Login () {

    const history = useHistory()
    let product = []

    if ( history && history.location && history.location.state && history.location.state.item){
        product = history.location.state.item
    }
        
    return(
        <div className="description-div">
            <button type="button" onClick={() => history.push('/')}>Back</button>
            <br/>
            {( Object.keys(product).length !== 0  ) ? 
                (
                    <>
                        <img scr="https://picsum.photos/200/300" alt="product" className="description-image"/>
                        <div className='title-div'> 
                            <span className="title">{product.title}</span><br/>
                            <span >Description : {product.description}</span><br/>
                            <span >Availibility : {product.inStock ? "Available": "Out Of Stock"}</span><br/>
                            <span >Price : Rs {product.price}</span><br/>
                        </div>
                    </>
                ) : 
                <label className="no-data">Select an Item to see the details .</label> 
            }
        </div>
    )
}