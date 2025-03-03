import './welcome.scss';
import { Link } from 'react-router-dom';

function Welcome() {
  const catGif = require("../assets/cat.gif");


  return (
    <div className="welcome-page">
      <div className="greeting">
        <h1>Welcome!</h1>
      </div>
      <Link to={'/affirmations'}>
        <button className="home-button" type="button">Click Me</button>
      </Link>
        <img className="cat" src={catGif}/>
    </div>
  )
};

export default Welcome;