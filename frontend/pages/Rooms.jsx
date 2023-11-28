import React, { useState } from 'react';

import Header from '../components/Header'
import RoomMembers from '../components/RoomMembers'
import CreateRoom from '../components/CreateRoom'

const Home = ({ user, logout }) => {
    const [err, setErr] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);

    return(
        <>
        <Header username={user.username} logout={logout} link={'/'} icon={"bi-wechat"} 
        
        />
        </>
    )
}