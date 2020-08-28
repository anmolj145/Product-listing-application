import React from 'react';
import { useDispatch ,useSelector} from "react-redux";
import * as actions from "../../store/action/index";

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
  
export default function Trash () {

    const classes = useStyles();
    const { trash } = useSelector(state => state.app)
    const dispatch = useDispatch();

    const handleRestore = (item) => {
        dispatch(actions.restoreItem(item))
    }

    return(
        <>
            {
                trash.map(item => {
                    return(
                        <Card className={classes.root} key={item.id}>
                            <CardActionArea >
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
                                <Button size="small" color="primary" onClick={() => handleRestore(item)}>
                                Restore
                                </Button>
                            </CardActions>
                        </Card>
                    )
                })
            }
        </>
    )
}