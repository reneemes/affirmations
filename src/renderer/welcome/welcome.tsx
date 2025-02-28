import './welcome.scss';
import { Link } from 'react-router-dom';

function Welcome() {
  const totoroGif = require("../assets/totoro.gif");


  return (
    <div className="welcome-page">
      <div className="greeting">
        <h1>Welcome!</h1>
        <img className="totoro" src={totoroGif}/>
      </div>
      <Link to={'/affirmations'}>
        <button className="home-button" type="button">Click Me</button>
      </Link>
    </div>
  )
};

export default Welcome;