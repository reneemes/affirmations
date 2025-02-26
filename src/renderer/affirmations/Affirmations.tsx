import './Affirmations.scss'
import { affirmationsData } from '../data/affirmation-data.js'
import { useEffect, useState } from 'react';
// import Footer from '../footer/Footer'

interface Affirmation {
  id: number,
  affirmation: string
}

function Affirmations() {
  const [currentA, setCurrentA] = useState<Affirmation | null>(null);
  const [shuffledAffirmations, setShuffledAffirmations] = useState<Affirmation[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect( () => {
    shuffle(affirmationsData);
    setShuffledAffirmations(affirmationsData);
    console.log(affirmationsData[0], "HERE")
    setCurrentA(affirmationsData[0]);
  }, [])

  function shuffle(array: Affirmation[]) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }
  
  function displayAffirmation() {
    if (!currentA) return null;

    return (
      <div className="affirmation" id={`affirmation-${currentA.id}`}>
        <p>{currentA.affirmation}</p>
      </div>
    )
  }
  
  function handleNextAffirmation() {
    if (currentIndex < shuffledAffirmations.length - 1) {
      console.log(currentIndex, "current index before being increased")
      setCurrentIndex(currentIndex + 1);
      console.log(currentIndex, "current index after being increased")
      setCurrentA(shuffledAffirmations[currentIndex + 1]);
    } else {
      setCurrentIndex(0);
      setCurrentA(shuffledAffirmations[0]);
    }
  }

  return (
    <div className="affirmation-box">
      {displayAffirmation()}
      <button className="next-button" type="button" onClick={handleNextAffirmation}>Next</button>
      {/* <Footer /> */}
    </div>
  )
};

export default Affirmations;