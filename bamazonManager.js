// 4-3-2019 Not completed
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
    managerSelect();
})

var managerSelect = function(){
    inquirer.prompt([
        {
            name: "selection",
            type: "rawlist",
            message: "Welcome! What would you like to do?",
            choices: 
                ["View Products For Sale", 
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"]
        }
    ]).then(function(answer){
        console.log("thened")
        if (answer === "View Products For Sale"){
            console.log("clicked")
            viewProducts()
        }
         else if (answer === "View Low Inventory"){
            viewLowInventory()
        } 
        else if (answer === "Add to Inventory"){
        //     // addInventory();
        // } else (answer === "Add New Product")
        //     // addProduct();
    }
})

var viewProducts = function(){
    console.log("im here")
    connection.query("SELECT * FROM products WHERE ?", function(err, res){
        if (err) throw err;

        console.log("hi")
        console.log(`\nItemID: ${res.item_id}\nItem: ${res[0].product_name}\nDepartment: ${res[0].department_name}\nPrice: ${res[0].price}\nQuantity: ${res[0].stock}`);
    })
}

var viewLowInventory = function(){
    var lowInventory = [];
    connection.query()
}
//for low inventory loop through all products to check if inventory < 5
//then throw it into an array and display array