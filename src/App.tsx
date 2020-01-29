import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useSpring, animated } from 'react-spring';
import { Toggle } from './Toggle';

const App: React.FC = () => {
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  });

  console.log(fade);

  return (
    <animated.div className="App" style={fade}>
      <header className="App-header">
        <img src={logo} className="logo" alt="logo" />
        <button className="menu-button">Menu</button>
      </header>
      <main>
        <Toggle />
      </main>
    </animated.div>
  );
};

export default App;
