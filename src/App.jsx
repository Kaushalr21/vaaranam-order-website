import React from 'react';
import OrderForm from './OderForm';
import ele from './ele.jpg';

function App() {
  return (
    <div className="output">
       <center> 
        <img src={ele} style={{ width: "100%", height: "150px", marginTop: "0" }}/> 
        <h3 style={{ color: "white", margin:"0"}}>Products madeup of 100% Coconut Oil</h3>
        </center>
       <OrderForm/>
    </div>
  );
}

export default App;
