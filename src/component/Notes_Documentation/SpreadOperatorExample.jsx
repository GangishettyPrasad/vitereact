import React, { useState } from 'react';

const SpreadOperatorExample = () => {
  // Example data
  const originalArray = [1, 2, 3];
  const originalObject = { name: 'John', age: 30 };
  const array1 = [1, 2, 3];
  const array2 = [4, 5, 6];
  const object1 = { name: 'John' };
  const object2 = { age: 30 };
  
  // Cloning arrays and objects
  const clonedArray = [...originalArray];
  const clonedObject = { ...originalObject };
  
  // Merging arrays and objects
  const mergedArray = [...array1, ...array2];
  const mergedObject = { ...object1, ...object2 };

  // Function that accepts dynamic parameters using spread
  const sum = (a, b, c) => a + b + c;

  // Passing array using spread operator
  const sumResult = sum(...[1, 2, 3]);

  return (
    <div>
      <h1>Spread Operator in React</h1>

      <div>
        <h2>Clone Arrays and Objects:</h2>
        <p><strong>Original Array:</strong> {JSON.stringify(originalArray)}</p>
        <p><strong>Cloned Array:</strong> {JSON.stringify(clonedArray)}</p>
        <p><strong>Original Object:</strong> {JSON.stringify(originalObject)}</p>
        <p><strong>Cloned Object:</strong> {JSON.stringify(clonedObject)}</p>
      </div>

      <div>
        <h2>Merge Arrays and Objects:</h2>
        <p><strong>Array 1 + Array 2:</strong> {JSON.stringify(mergedArray)}</p>
        <p><strong>Object 1 + Object 2:</strong> {JSON.stringify(mergedObject)}</p>
      </div>

      <div>
        <h2>Function Parameters with Spread:</h2>
        <p><strong>Sum of [1, 2, 3]:</strong> {sumResult}</p>
      </div>
    </div>
  );
};

export default SpreadOperatorExample;
