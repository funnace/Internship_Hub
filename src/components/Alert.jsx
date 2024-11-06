import React from 'react';

function Alert(props) {
    return (
<div style={{ 
  position: 'fixed', 
  top: '15%', 
  left: '50%', 
  transform: 'translateX(-50%)', 
  zIndex: '1000',
  whiteSpace: 'nowrap' 
}}>

            {props.alert &&  
                <div className={`alert alert-${props.alert.type} d-flex align-items-center justify-content-center`} role="alert" style={{ width: 'fit-content' }}> 
                    {props.alert.msg}!!!
                </div>
            }
        </div>
    );
}

export default Alert;
