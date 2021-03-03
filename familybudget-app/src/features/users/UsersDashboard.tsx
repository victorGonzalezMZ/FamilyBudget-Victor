import React from 'react';
import {Grid} from 'semantic-ui-react';
import IUser from '../../app/modules/user';  

import UserList from './UsersList' ;
import UsersForm from './UsersForm';


interface IProps{
    selectedUser:IUser|null,
    users:IUser[],
    editUser:boolean,
    editUserEvent : (user: IUser|null) => void,
    cancelEvent: ()=>void,
    saveUserEvent : (user:IUser)=>void 
}

const UserDashboard = ({selectedUser,users,editUser,editUserEvent,cancelEvent,saveUserEvent}:IProps) =>{
    return(
        <Grid>
            <Grid.Column width={16}>
                <h1>Familiy</h1>
                {
                    editUser == false && 
                    <UserList 
                    editUserEvent = {editUserEvent}
                    users={users}/>
                }
               
                {
                   editUser &&  <UsersForm 
                                    selectedUser = {selectedUser}
                                    cancelEvent = {cancelEvent}
                                    saveUserEvent = {saveUserEvent}/>
                }
                
            </Grid.Column>
        </Grid>
    );
}

export default UserDashboard;

