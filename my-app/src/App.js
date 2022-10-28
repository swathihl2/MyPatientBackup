
import './App.css';
import { useState } from "react";
import ReactDOM from 'react-dom';


function App() {
  const [name, setName] = useState("");
if(name===""){

    var val = React.findDOMNode(this.refs.cpDev1).value;
    this.someOtherFunction(val);

  document.getElementById("error").value="please enter the field";
  console.log("empty");
}


 console.log(name);
  return (
    <div>
    <p id='error'></p>
    <form>
      <label>Enter your name:
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          onClick={this.writeData} ref = "error"
        />
      </label>
    </form>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

// function App() {
  
//   const shoot = () => {
//    var mail=this.input.value();
//   alert(mail);
//   }
 
//   return (
//     <div className="App">
//       <header className="App-header">
        
 
 
//       <form>
//         <input type="text" onclick={shoot} requierd />
//         <input type="submit" />
//         <div id='fillmail'>Please fill the mail</div>
//       </form>
    
      
//       </header>
//     </div>
    
//   );
// }

export default App;
