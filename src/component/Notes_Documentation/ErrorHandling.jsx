import React, { useState } from 'react';

const ErrorHandling = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [throwMessage, setThrowMessage] = useState('');

  // Example 1: try/catch
  const handleTryCatch = () => {
    try {
      // Simulate an error
      throw new Error('Oops! Something went wrong in try/catch.');
    } catch (error) {
      setErrorMessage(error.message); // Catch the error and show the message
    }
  };

  // Example 2: throw
  const handleThrow = () => {
    try {
      throw new Error('This is an explicit error thrown!');
    } catch (error) {
      setThrowMessage(error.message); // Show the error message
    }
  };

  return (
    <div>
      <h1>Error Handling Methods (తెలుగులో)</h1>

      {/* 1. try/catch */}
      <section>
        <h2>1. try/catch</h2>
        <p><strong>ఇది ఏమిటి:</strong> <code>try/catch</code> ఒక block, ఇది ఒక function లేదా operation లో error వస్తే catch చేయడానికి ఉపయోగపడుతుంది.</p>
        <p><strong>ఎందుకు ఉపయోగిస్తాం:</strong> కోడ్ execution లో ఏదైనా error వస్తే దాన్ని handle చేయడానికి.</p>
        <p><strong>ఎప్పుడు ఉపయోగిస్తాం:</strong> కోడ్ execution లో అనుమానాస్పద భాగాలు ఉంటే (లాగా, network request లేదా database query), error occurred అయితే handle చేయాలి అంటే.</p>
        <p><strong>Example:</strong></p>
        <button onClick={handleTryCatch}>Trigger try/catch Error</button>
        <p>{errorMessage}</p>
      </section>

      {/* 2. throw */}
      <section>
        <h2>2. throw</h2>
        <p><strong>ఇది ఏమిటి:</strong> <code>throw</code> statement ని error ని explicitly throw చేయడానికి ఉపయోగిస్తారు.</p>
        <p><strong>ఎందుకు ఉపయోగిస్తాం:</strong> Custom error messages లేదా conditions ప్రకారం errors throw చేయడానికి.</p>
        <p><strong>ఎప్పుడు ఉపయోగిస్తాం:</strong> కోడ్ execution లో error ను intentionally throw చేయాలని అనుకున్నప్పుడు.</p>
        <p><strong>Example:</strong></p>
        <button onClick={handleThrow}>Trigger throw Error</button>
        <p>{throwMessage}</p>
      </section>

    </div>
  );
};

export default ErrorHandling;
