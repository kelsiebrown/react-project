import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false   // default does not show any persons
  };

  switchNameHandler = (newName) => {
    // console.log('Was clicked');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximillian';
    this.setState({
      persons: [
        { name: newName, age: 27 },
        { name: 'Manu', age: 27 },
        { name: 'Stephanie', age: 27}
      ]
    });
  };

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 29 },
        { name: 'Stephanie', age: 26}
      ]
    });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {  
    const style = {
      backgroundColor: 'white', //inline CSS styles must be camelCase
      font: 'inherit',  // also string values
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    return (
      <div className="App">
        <h1>Hi, this is a React App</h1>
        <p>This works!</p>
        <button
         style={style} 
         onClick={this.togglePersonsHandler}>Toggle</button>
        { 
          this.state.showPersons === true ?   // if showPersons is true, show div
            <div>
              <Person 
                name={this.state.persons[0].name} 
                age={this.state.persons[0].age} />
              <Person 
                name={this.state.persons[1].name} 
                age={this.state.persons[1].age} 
                click={this.switchNameHandler.bind(this, 'Max!')} 
                changed={this.nameChangedHandler} > 
                  My Hobbies: Racing</Person>
              <Person 
                name={this.state.persons[2].name}
                age={this.state.persons[2].age} />
            </div> : null    // if showPersons is false, show nothing
        } 
      </div>
    );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi!'));
  }
}

export default App;

