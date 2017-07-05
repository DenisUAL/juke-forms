import React from 'react';

function Greeter(props) {
  return (
    <h1>Hello {props.toGreet}</h1>
  )
}

export default function ManyGreets() {
  const greetings = ['1706', 'world', 'Corey', 'Cassio'];
  return (
  <div>
    {
      greetings.map(greeting => {
        return (
          <Greeter key={greeting} toGreet={greeting} />
        )
      })
    }
  </div>

  )
}
