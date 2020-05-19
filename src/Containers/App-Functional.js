import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person'

const App = props => {

  const [personsState, setPersonsState] = useState({
    persons: [
      { name: "Santosh", age: 30 },
      { name: "Ajay", age: 27 },
    ]
  });

  const [otherState, setOtherState] = useState('Other State');

  console.log(personsState, otherState);

  const switchNameHandler = () => {
    console.log("clicked");
    setPersonsState( {
      persons: [
        { name: "exexzian", age: 30 },
        { name: "Ajay", age: 22 },
      ]
    })
  }

  return (
    <div className="App">
      <h1>Hello world</h1>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
      <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>My Hobbies: Test </Person>
    </div>
  );
}

export default App;
