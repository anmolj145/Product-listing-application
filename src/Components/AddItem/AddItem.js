import React ,{ useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import * as actions from "../../store/action/index";
import './AddItem.css'
import { useDispatch ,useSelector } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
        margin: theme.spacing(1),
        width: '100ch',
    },
  },
  additem: {
    '& > *': {
        width: '20ch',
    },
  }
}));

export default function Registration () {

    const classes = useStyles();

    const { productData } = useSelector(state => state.app)
    const history = useHistory();
    const dispatch = useDispatch();

    const handleAddItem =() => {

        if( title && title.length > 0 && description && description.length > 0 && category && category.length > 0 && price > 0){
            let data = {
                id:productData.length +1,
                title:title,
                price:price,
                category:category,
                inStock:true,
                description:description
            }
            dispatch(actions.addNewData(data))
            history.push('/')
        }
        else{
            alert('Enter valid data .')
        }
    }

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handlePriceChange = (e) => {
        setPrice(e.target.value)
    }

    return(
        <div className='add-item-div'>
            <span className="add-item-title">Add Item</span>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField label="Title" variant="outlined" value={title} onChange={(e) => handleTitleChange(e)}/>
                <TextField label="Category" variant="outlined" value={category} onChange={(e) => handleCategoryChange(e)}/>
                <TextField label="Description" variant="outlined" value={description} onChange={(e) => handleDescriptionChange(e)}/>
                <TextField label="Price" variant="outlined" value={price} onChange={(e) => handlePriceChange(e)}/>
            </form>
            <Button variant="contained" className={classes.additem} onClick={()=>handleAddItem()}>Add Item</Button>
        </div>
    )
}