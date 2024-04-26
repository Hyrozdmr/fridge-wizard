// file: fridge-hero/frontend/src/components/itemsList.js
export default function ItemList({ returnedFridgeData }) {
  // Parse the JSON string into a JavaScript object
  // Check if returnedFridgeData is an object and has fridge_data property
  if (
    typeof returnedFridgeData !== 'object' ||
    !returnedFridgeData.fridge_data ||
    typeof returnedFridgeData.fridge_data !== 'object'
  ) {
    console.error("Returned data is not in the expected format:", returnedFridgeData);
    return null; // or display an error message
  }
  console.log("returnedFridgeData:", returnedFridgeData); // Add this line for debugging

  // Access storedItems from fridge_data
  const { storedItems } = returnedFridgeData.fridge_data;
  console.log(storedItems)

  return (
    <div>
      {Object.entries(storedItems).map(([category, items]) => (
        <div key={category}>
          <h2>{category}</h2>
          <ul>
            {Object.entries(items).map(([itemName, value]) => (
              <p key={itemName}>{`${itemName}: ${value}`}</p>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}