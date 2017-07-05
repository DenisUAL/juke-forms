import React from 'react';

export default function Menu(props) {
  const {toggle, visible} = props;
  return (
  <div className="container">
    <h1 onClick={ toggle } className="header">Bacon Milkshake</h1>

    { visible && ( <div className="body">
      <img src="http://timenewsfeed.files.wordpress.com/2013/11/bacon-milkshake.png?w=300" />
    </div> ) }


  </div>
  )
}
