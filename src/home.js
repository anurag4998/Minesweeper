import React from 'react';
import { Link } from "react-router-dom";


const Home = (props) => {
    let levels = [{rows:10, columns:8, mines:10}, {rows:14, columns:18 , mines:20} , {rows:20, columns:24 , mines:99}];
   
    return(
        <div className = 'container'>
            <h1 className = 'heading'> Minesweeper </h1>
            <h1 className = 'subheading'> Select level </h1>

            <div className = 'levels'>
                <Link to= {{ pathname: "/game",  state: { levels: levels[0] } }} className = 'level-select' >Easy</Link>
                <Link to= {{ pathname: "/game",  state: { levels: levels[1] } }} className = 'level-select' >Medium</Link>
                <Link to= {{ pathname: "/game",  state: { levels: levels[2] } }} className = 'level-select' >Hard</Link>
            </div>
        </div>
    )
}

export default Home
