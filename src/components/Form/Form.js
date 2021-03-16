import React, { useState , useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createPost, updatePost} from '../../actions/posts'
import { useSelector } from 'react-redux';


import useStyles from './styles'



const Form = ({ currentId, setCurrentId }) =>{

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null );
 
    const [postData, setPostData] = useState({
        title:'',
        message:'',
        tags:'',
        selectedFile:''

    });
    const classes = useStyles();
    const dispatch = useDispatch();
    
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(post) setPostData(post);
    },[post]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId, { ...postData , name : user?.result?.name }));
        }else{
            dispatch(createPost({ ...postData , name : user?.result?.name }));
        }
        clear();
    }

    const clear = () =>{
         setCurrentId(null);
         setPostData({
            
            title:'',
            message:'',
            tags:'',
            selectedFile:''
        });

    }

    if(!user?.result?.name){
            return(
                <Paper className={classes.paper}>
                    <Typography variant="h6" align="center">
                        Please Sign In to create your Own memories and like other's memories.
                    </Typography>  
                </Paper>
            )
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Title" fullWidth 
                    value={postData.title}
                    onChange={(e) => setPostData({
                        ...postData,
                        title: e.target.value
                    })}></TextField>
                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Message" fullWidth 
                    multiline rows={4} 
                    value={postData.message}
                    onChange={(e) => setPostData({
                        ...postData,
                        message: e.target.value
                    })}></TextField>
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="Tags (coma separated)" fullWidth 
                    value={postData.tags}
                    onChange={(e) => setPostData({
                        ...postData,
                        tags: e.target.value.split(',')
                    })}></TextField>
                <div className={classes.fileInput}>
                    <FileBase type="file" mutiple={false} onDone={({base64}) => setPostData({...postData, selectedFile:base64})}>
                    </FileBase>
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth type="submit">Submit</Button>
                <Button  variant="contained" color="secondary" size="small"  fullWidth onClick={clear}>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form;