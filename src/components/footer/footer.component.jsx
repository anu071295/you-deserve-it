import React from 'react';

import './footer.styles.scss';

class Footer extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className = 'pageFooter'>
        
            Footer stuff<br/>
            About Us<br/>
            Contact Us<br/>
            <br/><br/><br/>
            <br/>
            copy Right Stuff
                
            </div>
        )
    }
}


export default Footer; 