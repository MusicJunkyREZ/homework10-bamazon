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

// var validateInput = function(answer)

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
                    start();
                } 
                // if (item_id = undefined){
                //     console.log("Please submit a product ID that is listed.")
                //     return start();
                // }
            },
        }
    ]).then(function (answer) {
        connection.query("SELECT * FROM products WHERE ?", { item_id: answer.desiredItem }, function (err, res) {
            if (err) throw err;

            console.log(`\nItemID: ${res[0].item_id}\nItem: ${res[0].product_name}\nDepartment: ${res[0].department_name}\nPrice: ${res[0].price}\nQuantity: ${res[0].stock}`);
            // if (answer < 1 || answer > 10){
            //     console.log("Please submit a product ID that is listed.")
            //     return start();
            // }
            // for (var i = 0; i < res.length; i++) {
            // if (answer.desiredItem === res[i].item_id && res[i].stock === 0) {
            //     console.log("Insufficient quantity! Try another product!")
            //     start();
            //     } else if (answer.desiredItem < 1 || answer.desiredItem > 10) {
            //         console.log("Please input a Number ID that is listed")

            //     } else (answer.desiredItem === res[i].item_id)
            //     //move to quantity q then update quantity
            //     console.log("test")
            var currentQuantity = res[0].stock;
            // console.log(currentQuantity)
            quantityToPurchase(currentQuantity)
            // }
        })
    })
}

var quantityToPurchase = function (currentQuantity) {
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
        var newQuantity = function () {
            currentQuantity - answer;
            console.log(newQuantity);
        }
        connection.query("UPDATE products SET ? WHERE ?", {stock: newQuantity, item_id: answer.desiredItem},
            function (err, res) {
                console.log("Purchase made successfully.")
                start();
            }
        )

    })
}

