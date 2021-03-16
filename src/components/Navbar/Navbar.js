import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import decode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import memories from '../../images/memories.png';
import useStyles from './styles';


const Navbar = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    //console.log(user.result);

    useEffect(()=>{
        const token = user?.token;
        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location])

    const logout = () =>{
        dispatch({type: 'LOGOUT'});
        history.push('/');
        setUser(null);
    }

    return (
        <AppBar className={classes.appBar} position = "static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center"> Memories </Typography>
                <img className={classes.image}  src={memories} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}></Avatar>
                            <Typography className={classes.userName} variant="h6" > {user.result.name} </Typography>
                            <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>Logout</Button> 
                        </div>
                    ) : (
                        <div>
                            <Button component={Link} to="/auth"  variant="contained" color="primary">Sign In</Button> 
                        </div>
                    )
                
                }
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
