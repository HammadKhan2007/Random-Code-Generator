import React from 'react';
import RandomCodeGenerator from './RandomCodeGenerator'; // Apna component import karen
import './App.css'; // App.css ko bhi import rehne dein

function App() {
  return (
    <div className="App">
      {/* Yahan humne naya component istemal kiya hai */}
      <RandomCodeGenerator />
    </div>
  );
}

export default App;