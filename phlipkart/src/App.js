import React, { useEffect } from "react";


function App() {

  useEffect(() => {
    console.log('i am called');
    fetch('https://fakestoreapi.com/users')
      .then(response => response.json())
      .then(data => console.log(data));
  }, [])

  return (
    <header>
      <h1>Phlipkart</h1>
    </header>
  )
}

export default App;