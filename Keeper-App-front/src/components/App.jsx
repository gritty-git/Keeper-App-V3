import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import UserPage from "./UserPage";



function App(){
    var [notes,addToNotes] = useState([]);
    
    if(notes.length === 0){
        axios.get('/app/getNotes')
        .then(res => {
            
            addToNotes(res.data);
        })
    }
    
    function buttonAdd(item){
        axios.post('/app/addNote', item)
        
        addToNotes(prevValue => {
            return([...prevValue, item])
        })
    }
    function deleteNote(id){
        
        axios.post('/app/deleteNotes', notes[id])
        
        addToNotes(prevValue => {
            return( prevValue.filter((noteItem, index) => {
                return index !== id;
            } ))
        })
    }
    var [loggedIn,logIn] = useState(false);
    var [wrongLoggedin,wrongLogIn] = useState(false);
    var [repeatedUser,repeatUser] = useState(false);
    var [loginUser,updateLoginUser] = useState({
        username:"",
        password:""
    })


    var [user,updateUser] = useState({
        username:"",
        password:""
    })
    function userChange(event){
        var {value, name} = event.target;
        updateUser(prevValue => {
            return(
                {
                    ...prevValue,
                    [name] : value
                }
            )
        })

    }
    function loginUserChange(event){
        var {value, name} = event.target;
        updateLoginUser(prevValue => {
            return(
                {
                    ...prevValue,
                    [name] : value
                }
            )
        })

    }
    async function validateUser(event){
        
        let response = await axios.post('/app/signup', user).catch((error) => {
            repeatUser(()=>{
                return true;
            })
          });
          
        return response;
    }
    function formSubmit(event){
        
        event.preventDefault(); //Form's default nature is to refresh page after submit...to prevent default event this line is used. 

        validateUser(event).then((data) => {
            
            if(data.data){
                
                logIn(() => {
                    return true;
                })
                updateLoginUser({
                    username:"",
                    password:""
                });
                
            }else{
                
                repeatUser(()=>{
                    
                    return true;
                })
                updateUser({
                    username:"",
                    password:""
                });
            }
        });
    }
    async function validateCred(event){
        
        let response = await axios.post('/app/login', loginUser).catch((error) => {
            //alert('Wrong Login Credentials!! Try Logging in again OR Signup as a new user!',error.response)
            wrongLogIn(()=>{
                return true;
            })
          });
          
        return response;
    }
    function loginClick(event){
        event.preventDefault();
        validateCred(event).then((data) => {
            
            if(data){
                logIn(() => {
                    return true;
                })
                updateUser({
                    username:"",
                    password:""
                });
                
            }else{
                wrongLogIn(()=>{
                    
                    return true;
                })
                updateLoginUser({
                    username:"",
                    password:""
                });
            }
        });
        
    }
    function logOut(event){
        updateUser({
            username:"",
            password:""
        });
        updateLoginUser({
            username:"",
            password:""
        });
        logIn(() => {
            return false;
        })
        wrongLogIn(()=>{
                    
            return false;
        })
        repeatUser(()=>{
            return false;
        } )
    }

    return loggedIn ? <div>
        <Header username={loginUser.username+user.username} logout={logOut}/>
        <CreateArea buttonClick={buttonAdd} username={loginUser.username+user.username} />
        
        {notes.length===0 ? "No notes" : notes.filter((item,index) =>
        {return item.username===loginUser.username+user.username;}
        ).map( (item,index) => 
            <Note key={index} id={index} title={item.title} content={item.content} deleteButton={deleteNote} />
        )}
        
        <Footer/>
    </div> :
    <UserPage logout={logOut} loginclick={loginClick} loginuser={loginUser} loginuserchange={loginUserChange} wrongloggedin={wrongLoggedin} formsubmit={formSubmit} user={user} userchange={userChange} repeatuser = {repeatUser} repeateduser = {repeatedUser} />

}


export default App;