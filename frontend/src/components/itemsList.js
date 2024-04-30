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
            {Object.entries(items).map(([itemName, value]) => {
              // Parse the date string into a Date object
              const date = new Date(value);
              // Get day, month, and year components to create string from
              const day = date.getDate();
              const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
              const year = date.getFullYear();
              // Ensure leading zeros for day and month if needed
              const formattedDay = day < 10 ? `0${day}` : day;
              const formattedMonth = month < 10 ? `0${month}` : month;
              // Construct the formatted date string
              const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
              // Check if the date is before today
              const isBeforeToday = date < new Date(); // New Date() creates a Date object for today
              // Use a conditional rendering based on whether the date is before today
              return (
                <div
                className='item'
                key={itemName}
                style={{ color: isBeforeToday ? 'red' : 'black', display: 'flex', alignItems: 'center', flexDirection: 'row' }} >
                    <div className='item-name' style={{ flex: 1 }}>
                      {isBeforeToday && <span style={{ marginRight: '0.5em' }}>⚠️ Expired </span>}
                      {itemName}</div>
                    <div style={{ flex: 1 }}>{formattedDate}</div>
                </div>
              )
          })}
          </ul>
        </div>
      ))}
    </div>
  );
}