import React,{Fragment,useState,useEffect} from 'react';
import {Grid,Segment,Form,Button} from 'semantic-ui-react';
import IUser from '../../app/modules/user';


interface IProps{
    selectedUser:IUser|null,
    cancelEvent: ()=>void,
    saveUserEvent : (user:IUser)=>void 
}

const UsersForm = ({selectedUser,cancelEvent,saveUserEvent}:IProps)=> {

    let defaultUser = {
        id :0, 
        firstName : '',
        lastName : '',
        userName : '', 
        password : '',
    }    

    let userValue:IUser  = (selectedUser !=null)? selectedUser : defaultUser;

    const [user,setUser] = useState<IUser>(userValue);

    
    const handleInputChanges = (event:any) =>{
        const {name,value} = event.target;
        setUser({...user,[name]:value});
    };


    return(
        <Fragment>
            <Segment clearing> 
                <Form>
                    <Form.Input
                        name="firstName" onChange={handleInputChanges}
                        placeholder= "First Name" value={user.firstName} />

                    <Form.Input
                        name="lastName"  onChange={handleInputChanges}
                        placeholder= "Last Name" value={user.lastName} />

                    <Form.Input
                        name="userName"  onChange={handleInputChanges}
                        placeholder= "User Name" value={user.userName} />

                    <Button floated='right' onClick={() => saveUserEvent(user) } positive type="submit" content="Save"></Button>
                    <Button floated='right' onClick = {() => cancelEvent() } type="submit" content="Cancel"></Button>
                </Form>

            </Segment>
        </Fragment>
    )

};


export default UsersForm;

