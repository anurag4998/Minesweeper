import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './home'
import Structure from './structure'
function App() { 
  
  return (

    <BrowserRouter>
      <Switch>
        <Route exact path = "/home" component = {Home} />
        <Route path = "/game" component = {Structure} />

      </Switch>
    </BrowserRouter>       
  );
}

export default App;
