import React from 'react';

export default function Clock(props) {
  return (
  <div>
   <h1>Clock</h1>
   <p>Hours: {props.hours}</p>
   <p>Minutes: {props.minutes}</p>
   <p>Seconds: {props.seconds}</p>
  </div>
  )
}

// setInterval(() => {
//   const current = new Date();
//   ReactDom.render(<ClockApp
//     hours={current.getHours()}
//     minutes={current.getMinutes()}
//     seconds={current.getSeconds()}
//     />, document.getElementById('app'));
// }, 1000);

