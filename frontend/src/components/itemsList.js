import React from 'react';

export default function ItemList({ returnedFridgeData, removeItem }) {
  if (
      typeof returnedFridgeData !== 'object' ||
      !returnedFridgeData.fridge_data ||
      typeof returnedFridgeData.fridge_data !== 'object'
  ) {
    console.error("Returned data is not in the expected format:", returnedFridgeData);
    return null;
  }

  const { storedItems } = returnedFridgeData.fridge_data;

  return (
      <div>
        {Object.entries(storedItems).map(([category, items]) => (
            <div key={category}>
              <h2>{category}</h2>
              <ul>
                {Object.entries(items).map(([itemName, expiryDate]) => (
                    <li key={itemName} className="item">
                      {`${itemName}: ${expiryDate}`}
                      <button onClick={() => removeItem(category, itemName)} style={{ marginLeft: '10px' }}>Remove</button>
                    </li>
                ))}
              </ul>
            </div>
        ))}
      </div>
  );
}
