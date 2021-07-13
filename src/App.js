import './App.css';
import { BrowserRouter, Route, Switch , Redirect} from "react-router-dom";
import Home from './home'
import Structure from './structure'
function App() { 
  
  return (

    <BrowserRouter>
      <Switch>
      <Route exact path = "/">
          {1 ? <Redirect to="/home" /> : undefined }
      </Route>
        <Route exact path = "/home" component = {Home} />
        <Route exact path = "/game" component = {Structure} />

      </Switch>
    </BrowserRouter>       
  );
}

export default App;
