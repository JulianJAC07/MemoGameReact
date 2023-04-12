import React, { useState } from 'react'

function MenuStart(props) {
 
   
  
  
  return (
    <div className='MenuStart'>
       <div className='Menu'> 
         <div className='X'>
             <button>X</button>
         </div>
          <div className='bienvenido'>
             <h2>bienvenido!!!</h2>
             <h3>vamos a jugar ?</h3>
          </div>
          <div className='start'>
             <button onClick={()=>props.setStart(1)}>Start</button>
          </div>
        </div>
    </div>
  )
}

export default MenuStart