import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Radium, { StyleRoot } from 'radium';

class App extends Component {
  state = {
    persons: [
      { id: '535353', name: 'Max', age: 28 },
      { id: '5765852', name: 'Manu', age: 29 },
      { id: '2865', name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false   // default does not show any persons
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // alternative approach:
    // const persons = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);   // remove one element from array
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {  
    const style = {
      backgroundColor: 'green', //inline CSS styles must be camelCase
      textColor: 'white',
      font: 'inherit',  // also string values
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            // map() is a plain JS function (using ES6) that returns content of an array
            return <Person 
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age} 
              key={person.id}  // key is required in React and should be a unique element
              changed={(event) => this.nameChangedHandler(event, person.id)} />
            })}
        </div> 
      );

      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, this is a React App</h1>
          <p className={classes.join(' ')}>Here's a paragraph with text.</p>
          <button
          style={style} 
          onClick={this.togglePersonsHandler}>Toggle</button>

          {persons}  
        </div>
      </StyleRoot>
    );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi!'));
  }
}

export default Radium(App);

