import React ,{ useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import * as actions from "../../store/action/index";
import './List.css'
import { useDispatch ,useSelector} from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    margin:20,
    display:'inline-block'
  },
});

export default function Registration () {

    const classes = useStyles();
    const { productData,trash } = useSelector(state => state.app)
    const history = useHistory();
    const dispatch = useDispatch();
    const [list, setlist] = useState([]);
    const [listItem, setListItem] = useState([]);
    const [recovered, setrecovered] = useState([]);
    const [filteredData, setfilteredData] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [inStock, setAvailable] = useState(false);
    const [price500, setprice500] = useState(false);
    const [price1500, setprice1500] = useState(false);
    const [price50000, setprice50000] = useState(false);
   
    const handleSearch = (e) => {
        if(e.target.value) setSearchQuery(e.target.value)
    }

    useEffect(() => {
        if(productData && productData.length > 0){
            setListItem(productData)
        }
    }, [productData])

    const handleMoveToTrash = (item) => {
        let updated_list = [];
        updated_list = list.filter(function( obj ) { return obj.id !== item.id; });
        setlist(updated_list)
        dispatch(actions.moveToTrash(item))
    }

    useEffect(() => {
        let updated_list = [];
        updated_list = productData.filter(o => !trash.find(o2 => o.id === o2.id))
        setrecovered(updated_list)
    }, [trash,productData])

    const handleDetail = (item) => {
        history.push('/detail' , {item})
    }

    const handleFilter = (filter) => {
        if(filter === "500") setprice500(!price500)
        if(filter === "1500") setprice1500(!price1500)
        if(filter === "50000") setprice50000(!price50000)
        if(filter === "stock") setAvailable(!inStock)
    }

    useEffect(() => {
        let search_query_array = []
        let initial_filter = []
        let final_filter =[]
        
        if(searchQuery) {
            search_query_array = listItem.filter(data => data.title.toLowerCase().includes(searchQuery.toLowerCase().trim()));
        }
        else {
            search_query_array = listItem
        }

        search_query_array.forEach(item => {
            if(inStock && item.inStock === inStock){
                initial_filter.push(item)
            }
        })

        let array_to_filter = []
        if(initial_filter && initial_filter.length > 0){
            array_to_filter = initial_filter
        }
        else{
            array_to_filter = search_query_array
        }

        array_to_filter.forEach(item => {
            if(price500 && item.price === 500){
                final_filter.push(item)
            }
            if(price1500 && item.price === 1500){
                final_filter.push(item)
            }
            if(price50000 && item.price === 50000){
                final_filter.push(item)
            }
        })

        if( final_filter && final_filter.length > 0 ) {
            setfilteredData(final_filter)
        }
        else if( initial_filter && initial_filter.length > 0 ){
            setfilteredData(array_to_filter)
        }
        else{
            setfilteredData(listItem)
        }
           
    }, [price500,price1500,price50000,inStock,searchQuery,listItem])

    useEffect(() => {
        if(recovered && recovered.length > 0) {
            setlist(recovered)
        }
        else {
            if(filteredData && filteredData.length > 0){
                setlist(filteredData)
            }
            else {
                setlist(listItem)
            }
        }
    }, [filteredData,listItem,recovered])

    return(
        <div className='list'>
            <div className="search-box">
                <input
                    type="text" 
                    placeholder="Search.." 
                    name="search" 
                    className="search-input"  
                    onChange={(e) => handleSearch(e)}
                    />
            </div>
            <hr/>
            <div className="list-split list-left">
                <h3>Filters</h3>
                <label>Price</label>
                <ul>
                    <span>
                        <input 
                            type="checkbox" 
                            checked={price500} 
                            value="500" 
                            onClick={()=>handleFilter("500")}/>
                        <label>500</label>
                    </span>
                    <br/>
                    <span>
                        <input 
                            type="checkbox" 
                            checked={price1500} 
                            value="1500" 
                            onClick={()=>handleFilter("1500")}/>
                        <label>1500</label>
                    </span>
                    <br/>
                    <span>
                        <input 
                            type="checkbox" 
                            checked={price50000} 
                            value="50000" 
                            onClick={()=>handleFilter("50000")}/>
                        <label>50000</label>
                    </span>
                </ul>
                <label>Availibility</label>
                <ul>
                    <span>
                        <input 
                            type="checkbox" 
                            checked={inStock} 
                            value="stock" 
                            onClick={()=>handleFilter("stock")}/>
                        <label>In Stock</label>
                    </span>
                </ul>
            </div>

            <div className="list-split list-right">
            {
                list.map(item => {
                    return(
                        <Card className={classes.root} key={item.id}>
                            <CardActionArea onClick={() => handleDetail(item)}>
                                <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                height="140"
                                image="https://picsum.photos/200/300"
                                title="Contemplative Reptile"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Price - {item.price}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.inStock ? "Available":"OutOfStock"}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.description}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => handleMoveToTrash(item)}>
                                Move to Trash
                                </Button>
                            </CardActions>
                        </Card>
                    )
                })
            }
            <span className="add-button" onClick={()=> history.push('/add')}>Add Item</span>
            </div>
        </div>
    )
}