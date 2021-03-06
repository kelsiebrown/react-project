import React, { Component } from 'react';
import styles from './App.module.css';
import Person from './Person/Person';

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
    let persons = null;
    let buttonClass = '';

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

      buttonClass = styles.Red;
    }

    let assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push( styles.red );
    }
    if (this.state.persons.length <= 1) {
      assignedClasses.push( styles.bold );
    }

    return (
        <div className={styles.App}>
          <h1>Hi, this is a React App</h1>
          <p className={assignedClasses.join(' ')}>Here's a paragraph with text.</p>
          <button 
          className={buttonClass} 
          onClick={this.togglePersonsHandler}>Toggle</button>

          {persons}  
        </div>
    );
    //return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi!'));
  }
}

export default App;

