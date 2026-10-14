// Load saved shopping items, or start with an empty array
let shoppingItems = JSON.parse(localStorage.getItem("shoppingItems")) || [];

// Get the HTML elements
const itemInput = document.getElementById("itemInput");
const priceInput = document.getElementById("priceInput");
const addButton = document.getElementById("addButton");
const shoppingList = document.getElementById("shoppingList");
const totalCost = document.getElementById("totalCost");
const clearButton = document.getElementById("clearButton");

// Save shopping items in localStorage
function saveItems() {
    localStorage.setItem("shoppingItems", JSON.stringify(shoppingItems));
}

// Add a new item
addButton.addEventListener("click", function() {
    const itemName = itemInput.value.trim();
    const itemPrice = Number(priceInput.value);

    // Check that the item name and price are valid
    if (
        itemName === "" ||
        priceInput.value.trim() === "" ||
        !Number.isFinite(itemPrice) ||
        itemPrice < 0
    ) {
        alert("Please enter an item name and a valid price.");
        return;
    }

    // Add the item to the array
    shoppingItems.push({
        name: itemName,
        price: itemPrice,
        purchased: false
    });

    // Save and display the updated list
    saveItems();
    displayItems();

    // Clear the input fields
    itemInput.value = "";
    priceInput.value = "";
});

// Display shopping items
function displayItems() {
    shoppingList.innerHTML = "";
    let total = 0;

    shoppingItems.forEach(function(item, index) {
        // Create a list item
        const li = document.createElement("li");

        // Create a checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.purchased;

        // Mark or unmark an item as purchased
        checkbox.addEventListener("change", function() {
            item.purchased = checkbox.checked;
            saveItems();
            displayItems();
        });

        // Add the checkbox to the list item
        li.appendChild(checkbox);

        // Display the item name and price
        const itemText = document.createElement("span");
        itemText.textContent = " " + item.name + " - KSh " + item.price + " ";

        // Cross out purchased items
        if (item.purchased) {
            itemText.classList.add("purchased");
        }

        li.appendChild(itemText);

        // Create the Edit button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", function() {
            // Ask for the new item name
            const newName = prompt("Enter the new item name:", item.name);

            // Stop if Cancel is clicked
            if (newName === null) {
                return;
            }

            // Ask for the new item price
            const newPriceText = prompt("Enter the new price:", item.price);

            // Stop if Cancel is clicked
            if (newPriceText === null) {
                return;
            }

            const trimmedName = newName.trim();
            const newPrice = Number(newPriceText);

            // Validate the new details
            if (
                trimmedName === "" ||
                newPriceText.trim() === "" ||
                !Number.isFinite(newPrice) ||
                newPrice < 0
            ) {
                alert("Please enter a valid item name and price.");
                return;
            }

            // Update the item
            item.name = trimmedName;
            item.price = newPrice;

            // Save and refresh the list
            saveItems();
            displayItems();
        });

        // Add the Edit button
        li.appendChild(editButton);

        // Create the Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            // Remove the item from the array
            shoppingItems.splice(index, 1);

            // Save and refresh the list
            saveItems();
            displayItems();
        });

        // Add the Delete button
        li.appendChild(deleteButton);

        // Add the item to the webpage
        shoppingList.appendChild(li);

        // Add the item's price to the total
        total = total + item.price;
    });

    // Display the total cost
    totalCost.textContent = total;
}

// Clear the entire shopping list
clearButton.addEventListener("click", function() {
    shoppingItems = [];

    // Save the empty list
    saveItems();

    // Refresh the webpage
    displayItems();
});

// Display saved items when the page opens
displayItems();

