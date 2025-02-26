import './welcome.scss';
import { Link } from 'react-router-dom';

function Welcome() {

  return (
    <div className="welcome-page">
      <h1>Welcome!</h1>
      {/* <p>This is a daily affirmations app</p> */}
      <img className="totoro" src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmd1cGs1cDE5MWw3OTBvZG4xa2pwdzVrbTBpZWc2OTQ1d2ZxMXB0NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Y2yKpTl455KVzYlBn6/giphy.gif"/>
      <Link to={'/affirmations'}>
        <button className="home-button" type="button">Click Me</button>
      </Link>
    </div>
  )
};

export default Welcome;