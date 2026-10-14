 // Store shopping items in an empty array
let shoppingItems = [];

// Get elements from the HTML
const itemInput = document.getElementById("itemInput");
const priceInput = document.getElementById("priceInput");
const addButton = document.getElementById("addButton");
const shoppingList = document.getElementById("shoppingList");
const totalCost = document.getElementById("totalCost");
const clearButton = document.getElementById("clearButton");


// Step: MAKE ADD ITEM BUTTON

// Listens for a click on the Add Item button

addButton.addEventListener("click", function() {                    

    // Gets the item name entered by the user and removes extra spaces
    const itemName = itemInput.value.trim();

    // Gets the price entered by the user and converts it to a number
    const itemPrice = Number(priceInput.value);

    // Check whether the user entered an item name and a valid price
    if (itemName === "" || priceInput.value === "" ||
        !Number.isFinite(itemPrice) || itemPrice < 0) {

        // Show an error message if the input is invalid
        alert("Please enter an item name and a valid price.");

        // Order to stop running this function
        return;
    }

    // Add the new shopping item to the array as an object
    shoppingItems.push({
        name: itemName,
        price: itemPrice,
        purchased: false
    });

    displayItems(); // Displays the newly added item on the webpage

    // Show the array in the browser console for now
    console.log(shoppingItems);

    // Clear the item name input after adding the item
    itemInput.value = "";

    // Clear the price input after adding the item
    priceInput.value = "";
});

//Step: DISPLAY ITEMS



function displayItems() {
    shoppingList.innerHTML = ""; // Clears the current list

    let total = 0; // Starts the total at zero

    shoppingItems.forEach(function(item, index) {
        const li = document.createElement("li"); // Creates a list item

        li.textContent = item.name + " - KSh " + item.price; // Shows name and price

        if (item.purchased === true) {
            li.classList.add("purchased"); // Marks purchased items
        }

        li.addEventListener("click", function() {
            item.purchased = !item.purchased; // Toggles purchased status
            displayItems(); // Refreshes the list and total
        });

        shoppingList.appendChild(li); // Displays the item

        total = total + item.price; // Adds the price to the total
    });

    totalCost.textContent = total; // Updates the displayed total




 // Find the Clear List button and listen for a click
clearButton.addEventListener("click", function() {

    // Remove every item from the shopping array
    shoppingItems = [];

    // Remove all displayed items from the webpage
    shoppingList.innerHTML = "";

    // Reset the total cost displayed on the webpage
    totalCost.textContent = "0";

}); }
