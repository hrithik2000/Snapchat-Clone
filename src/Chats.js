import React, { useEffect,useState} from 'react';
import { Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import './Chats.css';
import { db ,auth} from './firebase';
import Chat from './Chat';
import { useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import  RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router';
import { resetCameraImage } from './features/cameraSlice';



function Chats(){
    const user =useSelector(selectUser);
 const dispatch = useDispatch();
 const history=useHistory();
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
    db.collection('posts')
    .orderBy('timestamp','desc')
    .onSnapshot(snapshot =>
       setPosts(
           snapshot.docs.map(doc =>({
               id: doc.id,
               data:doc.data(),
          
       }))) );
    },[]);

    const takeSnap=() =>{
        dispatch(resetCameraImage());
        history.push('/')

    }

    return(
        <div className="chats">
            <div className="chats__header">
                <Avatar src={user.profilePic} 
                onClick={() =>auth.signOut()}className="chats__avatar"/>
                <SearchIcon className="chats__searchIcon"/>
                
                <div className="chats__search">
              
                
                    <input type="text" placeholder="Friends"/>
                </div>
                <ChatBubbleIcon className="chats__chatIcon"/>
              </div>

              <div className="chat__posts">
                 {posts.map(({
                     id,
                     data: {profilePic,username,timestamp,imageUrl,read},
                    }) => (
                     <Chat
                     key={id}
                     id={id}
                     username={username}
                     timestamp={timestamp}
                     imageUrl={imageUrl}
                     read={read}
                     profilePic={profilePic}/>
                ) )}
              </div>

              <RadioButtonUncheckedIcon className='chats__takePicIcon'
              onClick={takeSnap}
              fontSize="large"/>


        </div>

    );
}

export default Chats;