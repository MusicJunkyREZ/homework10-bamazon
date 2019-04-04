var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log(`Connected as id: ${connection.threadId}`)
    displayInventory();
})

var displayInventory = function () {
    console.log("Welcome! Take a gander at our products!")
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`\nItemID: ${res[i].item_id}\n\nItem: ${res[i].product_name}\nDepartment: ${res[i].department_name}\nPrice: ${res[i].price}\nQuantity: ${res[i].stock}`)
        }
        start();
    })
}

var start = function () {
    inquirer.prompt([
        {
            name: "desiredItem",
            type: "input",
            message: "\nWhat is the ID of the item you would like to purchase?",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    console.log("\nEnter a number that corresponds to an Item ID above!")
                    return;
                } 
            },
        }
    ]).then(function (answer) {
        connection.query("SELECT * FROM products WHERE ?", { item_id: answer.desiredItem }, function (err, res) {
            if (err) throw err;
            
            console.log(`\nItemID: ${res[0].item_id}\nItem: ${res[0].product_name}\nDepartment: ${res[0].department_name}\nPrice: ${res[0].price}\nQuantity: ${res[0].stock}\n`);
    
            var currentQuantity = res[0].stock;
            var completeResponse = res[0];
            var itemPrice = res[0].price;
            
            quantityToPurchase(currentQuantity, completeResponse, itemPrice)
        })
    })
}

var quantityToPurchase = function (currentQuantity, completeResponse, itemPrice) {
   
    var finalCompleteResponse = completeResponse.item_id;
    inquirer.prompt([
        {
            name: "desiredQuantity",
            type: "input",
            message: "How many would you like to purchase?",
            validate: function (value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    console.log("\nPlease enter a number.")
                    quantityToPurchase();
                }
            }
        }
    ]).then(function (answer) {
        // console.log(newQuantity + answer.desiredQuantity + currentQuantity);
        var answerDesiredQuantity = parseInt(answer.desiredQuantity); //change from being a string
        var parsedItemPrice = parseFloat(itemPrice).toFixed(2)

        var newQuantity = currentQuantity - answerDesiredQuantity;
        var totalPrice = parsedItemPrice * answerDesiredQuantity;

        if(newQuantity < 0){
            console.log("Sorry! That quantity exceeds the current stock.  Please choose another item to purchase or the same item with another quantity.")
            
            return start();
        }
    
        connection.query("UPDATE products SET stock = ? WHERE item_id = ?", [newQuantity, finalCompleteResponse],
            function (err, res) {
                console.log("Purchase made successfully.")
                console.log(`Your total comes out to: $${parseFloat(totalPrice).toFixed(2)} USD`) // Shows total cost of purchase and ensures 2 decimal place monetary amount
                console.log("You will now be brought back to the beginning.")
                start();
            }
        )
    })
}

