import React,{Component, Fragment,useState,useEffect} from 'react';
import UserDashboard from '../../features/users/UsersDashboard';
import IUser from '../modules/user';
import  UsersDashboard from '../../features/users/UsersDashboard';
import {Loader} from  'semantic-ui-react';
import  api from '../../api/api';


const Users = () =>{
 
    const [selectedUser,setSelectedUser] = useState<IUser|null>(null);
    const [users,setUsers] = useState<IUser[]>([]);
    const [loaded,setLoaded] = useState<boolean>(false);
    const [editUser,setEditUser] = useState<boolean>(false);

    useEffect(() => {

        if(loaded == false){
            api.User.list().then((users) =>{
                setUsers(users);
                setLoaded(true);
            });
        }
    });


    const handleEditEvent = (user: IUser |null) =>{

        setEditUser(true);
        setSelectedUser(user);

    };

    const handleCancelEvent = () =>{
        setSelectedUser(null);
        setEditUser(false);
    };


    const handleSaveEvent = (user:IUser)=>{

       
        if(user.id == 0){
            api.User.create(user).then((userResponse) =>{
                users.push(userResponse);
                
                setUsers(users);
                setSelectedUser(null);
                setEditUser(false);
        
            });
        }else{
            api.User.update(user).then((userResponse) =>{
                
                let index = users.findIndex( u => u.id == user.id);
                users[index] = userResponse;

                setUsers(users);
                setSelectedUser(null);
                setEditUser(false);
            });

        }

       
        console.log(user);
    };

    if(loaded == false){
        return(
            <Loader active inline="centered"  />
        )
    }

    return(
        <Fragment>
            <UserDashboard 
                selectedUser = {selectedUser}
                editUser = {editUser}
                editUserEvent = {handleEditEvent}
                saveUserEvent = {handleSaveEvent}
                cancelEvent = {handleCancelEvent}
                users={users} />
        </Fragment>
    );

};

export default Users;

