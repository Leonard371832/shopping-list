// Load saved shopping items from localStorage, or start with an empty array
let shoppingItems = JSON.parse(localStorage.getItem("shoppingItems")) || [];

// Get the HTML elements we need
const itemInput = document.getElementById("itemInput");
const priceInput = document.getElementById("priceInput");
const addButton = document.getElementById("addButton");
const shoppingList = document.getElementById("shoppingList");
const totalCost = document.getElementById("totalCost");
const clearButton = document.getElementById("clearButton");

// Save the shopping array in localStorage
function saveItems() {
    localStorage.setItem("shoppingItems", JSON.stringify(shoppingItems));
}

// Listen for clicks on the Add Item button
addButton.addEventListener("click", function() {

    // Get the item name and remove extra spaces
    const itemName = itemInput.value.trim();

    // Get the price entered by the user
    const itemPrice = Number(priceInput.value);

    // Check that the item name and price are valid
    if (
        itemName === "" ||
        priceInput.value.trim() === "" ||
        !Number.isFinite(itemPrice) ||
        itemPrice < 0
    ) {
        // Display an error message
        alert("Please enter an item name and a valid price.");
        return;
    }

    // Add the new item to the shopping array
    shoppingItems.push({
        name: itemName,
        price: itemPrice,
        purchased: false
    });

    // Save the updated array
    saveItems();

    // Display the updated shopping list
    displayItems();

    // Clear the item name input
    itemInput.value = "";

    // Clear the price input
    priceInput.value = "";
});

// Display shopping items on the webpage
function displayItems() {

    // Clear the old list before displaying it again
    shoppingList.innerHTML = "";

    // Start the total cost at zero
    let total = 0;

    // Go through every item in the shopping array
    shoppingItems.forEach(function(item, index) {

        // Create a new list item
        const li = document.createElement("li");

        // Display the item's name and price
        li.appendChild(
            document.createTextNode(item.name + " - KSh " + item.price + " ")
        );

        // Create the Edit button
        const editButton = document.createElement("button");

        // Set the button text
        editButton.textContent = "Edit";

        // Listen for clicks on the Edit button
        editButton.addEventListener("click", function(event) {

            // Prevent the click from marking the item as purchased
            event.stopPropagation();

            // Ask for the new item name
            const newName = prompt("Enter the new item name:", item.name);

            // Stop if the user cancels
            if (newName === null) {
                return;
            }

            // Ask for the new item price
            const newPriceText = prompt("Enter the new price:", item.price);

            // Stop if the user cancels
            if (newPriceText === null) {
                return;
            }

            // Remove extra spaces from the new name
            const trimmedName = newName.trim();

            // Convert the new price into a number
            const newPrice = Number(newPriceText);

            // Check that the new name and price are valid
            if (
                trimmedName === "" ||
                newPriceText.trim() === "" ||
                !Number.isFinite(newPrice) ||
                newPrice < 0
            ) {
                // Tell the user to enter valid details
                alert("Please enter a valid item name and price.");
                return;
            }

            // Update the item's name
            item.name = trimmedName;

            // Update the item's price
            item.price = newPrice;

            // Save the edited item
            saveItems();

            // Refresh the list and total
            displayItems();
        });

        // Add the Edit button to the list item
        li.appendChild(editButton);

        // Create the Delete button
        const deleteButton = document.createElement("button");

        // Set the button text
        deleteButton.textContent = "Delete";

        // Listen for clicks on the Delete button
        deleteButton.addEventListener("click", function(event) {

            // Prevent the click from marking the item as purchased
            event.stopPropagation();

            // Remove this item from the array
            shoppingItems.splice(index, 1);

            // Save the updated array
            saveItems();

            // Refresh the list and total
            displayItems();
        });

        // Add the Delete button to the list item
        li.appendChild(deleteButton);

        // Check whether the item has been purchased
        if (item.purchased === true) {

            // Apply the CSS class for purchased items
            li.classList.add("purchased");
        }

        // Listen for clicks on the shopping item
        li.addEventListener("click", function() {

            // Toggle the purchased status
            item.purchased = !item.purchased;

            // Save the updated purchased status
            saveItems();

            // Refresh the list
            displayItems();
        });

        // Add the item to the webpage
        shoppingList.appendChild(li);

        // Add the item's price to the total
        total = total + item.price;
    });

    // Display the total cost
    totalCost.textContent = total;
}

// Listen for clicks on the Clear List button only once
clearButton.addEventListener("click", function() {

    // Remove all items from the shopping array
    shoppingItems = [];

    // Save the empty array
    saveItems();

    // Refresh the list and reset the total
    displayItems();
});

// Display saved items when the webpage opens
displayItems();

