import React, { useState } from 'react';

const ShoppingCartt = () => {
  // States to hold values for total, discount, and final total
  const [totalPrice, setTotalPrice] = useState(470);
  const [discount, setDiscount] = useState(10);  // Default discount is 10%

  // Function to calculate total price
  const calculateTotal = (...prices) => {
    return prices.reduce((acc, price) => acc + price, 0);
  };

  // Function to apply discount
  const applyDiscount = (total, discount = 0) => {
    return total - (total * (discount / 100));
  };

  // Example item prices
  const itemPrices = [120, 150, 200];

  // Calculate total price and total after discount
  const totalPriceCalculated = calculateTotal(...itemPrices);
  const totalAfterDiscount = applyDiscount(totalPriceCalculated, discount);

  return (
    <div>
      <h1>Shopping Cart</h1>

      {/* Rest Parameters, Spread Operator, Default Parameters, and Fallback Values Explanation */}
      <h2>1. Rest Parameters</h2>
      <p>
        The <code>calculateTotal</code> function uses the rest parameter <code>...prices</code> to collect all item prices and calculate the total price.
      </p>

      <h2>2. Spread Operator</h2>
      <p>
        We use the spread operator <code>...</code> to pass individual items from the array <code>itemPrices</code> to the <code>calculateTotal</code> function.
      </p>

      <h2>3. Default Parameters</h2>
      <p>
        The <code>applyDiscount</code> function has a default parameter <code>discount = 0</code>. If no discount is provided, it defaults to 0.
      </p>

      <h2>4. Fallback Values</h2>
      <p>
        The discount parameter acts as a fallback value. If no value is provided, the discount will default to <code>0</code>, meaning no discount will be applied.
      </p>

      {/* UI Output Section */}
      <div>
        <h2>Output</h2>
        <p><strong>Item Prices:</strong> {itemPrices.join(', ')}</p>
        <p><strong>Total Price (Calculated using Rest and Spread):</strong> ₹{totalPriceCalculated}</p>
        <p><strong>Discount:</strong> {discount}%</p>
        <p><strong>Total After Discount (Calculated using Default Parameter):</strong> ₹{totalAfterDiscount}</p>
      </div>

      {/* Inputs for the user to change discount and see results */}
      <div>
        <h3>Modify Discount</h3>
        <label>Enter Discount (%): </label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          min="0"
          max="100"
        />
      </div>

      <h2>Conclusion:</h2>
      <p>We've dynamically calculated the total price using the rest parameter, applied a discount using default parameters, and displayed the results in the UI. The user can also modify the discount to see how it affects the total price in real-time.</p>
    </div>
  );
};

export default ShoppingCartt;
