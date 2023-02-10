import { useState, useEffect } from 'react';
import './App.css';
import pccLogo from './images/pcc-resources-og.png';
import ConfettiExplosion from 'react-confetti-explosion';

const confettiProps  = {
  force: 0.8,
  duration: 5000,
  particleCount: 300,
  width: 1600,
  colors: ['#041E43', '#1471BF', '#5BB4DC', '#FC027B', '#66D805'],
};

const startDate = new Date(`2023-03-07`);

const getDateString = (date = new Date()) => {
  return date.toJSON().slice(0, 10);
}

const testDate = () => {
  let today = new Date(getDateString());
  return today >= startDate;
}

const calculateTimeLeft = () => {
  const difference = +startDate - +new Date();

  let timeLeft = null;
  console.log(difference);
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return timeLeft;
};

function App() {
  const [time, setTime] = useState(calculateTimeLeft());
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTime(calculateTimeLeft());
      setConfetti(testDate());
      console.log(getDateString(startDate), getDateString())
    }, 1000);
  });

  const timerComponents = [];

  !!time && Object.keys(time).forEach(period => {
    if (!time[period]) return;

    timerComponents.push(
      <div className='timer-item'>
      <span className='period'>{period}</span>
      <span className='period-value'>{time[period]}</span>
      </div>
    )
  })

  return (
    <div className='container'>
      <img className='pcc-logo' alt='pcc logo' src={pccLogo}/>
      {confetti ? <ConfettiExplosion {...confettiProps} /> : ''}
      <div className='timer'>
        {!confetti ? !!timerComponents.length && timerComponents : <span className='times-up'>Time's up!</span>}
      </div>
    </div>
  );
}

export default App;
