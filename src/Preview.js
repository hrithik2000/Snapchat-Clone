import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SendIcon from '@material-ui/icons/Send';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CloseIcon from '@material-ui/icons/Close';
import { selectCameraImage ,resetCameraImage} from './features/cameraSlice';
import './Preview.css';
import {v4 as uuid} from 'uuid';
import {db,storage} from "./firebase";
import firebase from 'firebase';
import { selectUser } from './features/appSlice';



function Preview(){
    const user =useSelector(selectUser);
    const cameraImagee = useSelector(selectCameraImage);
    const history=useHistory();
    const dispatch=useDispatch();
    
    useEffect(()=> {
        if(!cameraImagee) {
            history.replace('/')

        }
    },[cameraImagee,history]);

    const closePreview=()=>{
        dispatch(resetCameraImage());

    };

    const sendPost=() =>{

        const id = uuid();
        const uploadTask=storage
        .ref(`posts/${id}`)
        .putString(cameraImagee,"data_url");

        uploadTask.on('state_changed',null,
        (error) =>{
            console.log(error);
        },
            ()=>{
                //complete function
                storage
                .ref('posts')
                .child(id)
                .getDownloadURL()
                .then((url)=>{
                    db.collection('posts').add({
                        imageUrl:url,
                        username:'Hrithik',
                        read:false,
                        profilePic:user.profilePic,
                        timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                      });
                      history.replace('/chats');
                });

            }
        
        );

    };
    
    return(
        <div className="preview">
            <CloseIcon className="preview__close" onClick={closePreview}/>
            <div className="preview__toolbarRight">
                <TextFieldsIcon/>
                <CreateIcon/>
                <NoteIcon/>
                <MusicNoteIcon/>
                <AttachFileIcon/>
                <CropIcon/>
                <TimerIcon/>
            </div>
            <img src={cameraImagee} alt="kkkkk"/>
            <div onClick={sendPost}className="preview__footer">
                <h2>Send Now</h2>
                <SendIcon fontSize="small" className="preview__sendicon"/>
            </div>

        </div>
    );
}

export default Preview;