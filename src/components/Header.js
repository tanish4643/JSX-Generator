import React, {useState} from 'react';
import '../App.css';
import {history} from '../history'

function Header(props){
	const [loading, setLoading] = useState(false);

	return(
		<div className="header" onClick={() => history.push("/")}>          
            <span>
              <img src={require('../assets/support.png')} className="header-image" />
              PRDXN
            </span>
            {
            	props.loggedIn && 
            	(
            		loading
	            	?
	            	<img src={require('../assets/loading.gif')} style={{height: 20, width: 20}} />
	            	:
	            	<button className="logout-button"
		            		onClick={() => {
		            			setLoading(true);
		            			window.sessionStorage.removeItem('user');
		            			setTimeout(() => {
		            				setLoading(false);
		            				history.push("/login");
		            			},2000)
		            		}}>Logout</button>
            	)
            }
        </div>
	);
}

export default Header;