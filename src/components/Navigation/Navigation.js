import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon'

const Navigation=({onRouteChange,isSignedIn, toggleModal})=>{
    if (isSignedIn===true){
        return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <ProfileIcon onRouteChange={onRouteChange} toggleModal={toggleModal}/>
            </nav>
        );
    } else {
        return(
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim rgba(0,0,0,.5) underline pa3 pointer'>Sign In</p>
                <p onClick={()=>onRouteChange('register')} className='f3 link dim rgba(0,0,0,.5) underline pa3 pointer'>Register</p>
            </nav>
        );

    }
}

export default Navigation; 