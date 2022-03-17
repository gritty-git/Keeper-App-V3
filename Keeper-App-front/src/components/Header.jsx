import React from "react";
import NoteAddIcon from '@material-ui/icons/NoteAdd';

function Header(props){
    return props.username==='-!'?
    <div>
        <header>
            <h1>
                <span><NoteAddIcon/> Keeper</span>
                <br></br>
                <span id="tagline">Keeps your thoughts!!</span>
            </h1> 
            <main>
                <div className="userpage-text">
                    <span>Hi, to-be user! Sign In or Register now to get a 2nd companion to your memory!</span>
                </div>
            </main>
        </header>
        
    </div>
    :
    <div>
        <header>
            <h1>
                <span><NoteAddIcon/> Keeper</span>
                <br></br>
                <span id="tagline">Keeps your thoughts!!</span>
            </h1> 
            <main>
                <div>
                    Hi, {props.username}
                    <br></br>
                    <button type="button" className="btn btn-outline-danger mt-3" onClick={() => {props.logout();}}>Sign Out</button>
                </div>
            </main>
        </header>
        
    </div>
}


export default Header;