// YourComponent.jsx
import React from 'react';

const ExampleComponent = () => {
  // Example 1: Object Property Shorthand (basic)
  const name = 'Alice';
  const age = 25;
  const person = { name, age }; // Shorthand for { name: name, age: age }
  
  // Example 2: Method Shorthand (Enhanced Object Literals)
  const user = {
    greet() {
      return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    },
    name: 'John',
    age: 30
  };

  // Example 3: Dynamic Keys in Objects
  const dynamicKey = 'email';
  const personWithDynamicKey = {
    name: 'Bob',
    [dynamicKey]: 'bob@example.com' // dynamic key using computed property name
  };

  // Example 4: Shorthand for Method with dynamic keys and computed properties
  const profile = {
    name: 'Sarah',
    age: 29,
    [dynamicKey]: 'sarah@example.com',
    greet() {
      return `Hello, I am ${this.name} and I live at ${this[dynamicKey]}.`;
    }
  };

  // Example 5: Using Spread Operator for Object Merging with Shorthand and Dynamic Keys
  const extraDetails = {
    location: 'USA',
    profession: 'Developer',
  };
  const mergedProfile = {
    ...profile,
    ...extraDetails,
    greet() {
      return `Hello, I am ${this.name}, and I work as a ${this.profession}.`;
    }
  };

  return (
    <div>
      <h1>Object Property Shorthand & Enhanced Literals in React</h1>

      <h3>Example 1: Object Property Shorthand</h3>
      <p>Person: {JSON.stringify(person)}</p>

      <h3>Example 2: Method Shorthand</h3>
      <p>{user.greet()}</p>

      <h3>Example 3: Dynamic Keys</h3>
      <p>{JSON.stringify(personWithDynamicKey)}</p>

      <h3>Example 4: Profile with Dynamic Key & Method Shorthand</h3>
      <p>{profile.greet()}</p>

      <h3>Example 5: Merged Profile with Spread Operator & Shorthand</h3>
      <p>{mergedProfile.greet()}</p>
    </div>
  );
};

export default ExampleComponent;
