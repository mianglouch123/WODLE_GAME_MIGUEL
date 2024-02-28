import React from "react";
function KeyBoard({getLetter}) {
    let letters = 'ABCDFGHIJKLMNÑOPQRSTUVWXYZ';
    let l = letters.split('').length
    let firstLeterPart = letters.split('').slice(0 , l / 2)
    let secondLetterPart = letters.split('').slice( l / 2)
    return (

        <>
        <div style={{display : 'flex' , flexDirection : 'column' , gap : '15px'}}>
       
       
        <div style={{display : 'flex' , gap : '5px' }}>
        {firstLeterPart.map((k , i) => (
            <div onClick={() => getLetter(k)} style={{ display : 'flex'  , backgroundColor :'white', color:'gray' , fontWeight:'600' ,  height : '50px' , textAlign : 'center' , justifyContent : 'center' , alignItems : 'center' , width : '40px', border: '2px solid #dee1e9' ,  borderRadius: '5px' }} key={k}> <p>{k}</p> </div>
        ))} 
        </div>

       
        <div style={{display : 'flex' ,  gap : '5px'}}>
        {secondLetterPart.map((k , i) => (
            <div onClick={() => getLetter(k)} style={{ display : 'flex' ,backgroundColor :'white', color:'gray' , fontWeight:'600' ,  height : '50px' , textAlign : 'center' , justifyContent : 'center' , alignItems : 'center' , width : '40px', border: '2px solid #dee1e9' , borderRadius: '5px'}} key={k}> <p>{k}</p> </div>
        ))} 
        </div>

 
        </div>


        


      
        
        </>
      
    
        
    )
}

export default KeyBoard