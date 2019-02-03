var mysql=require("mysql");
var inquirer=require("inquirer");
var Table=require('console.table');
var connection=mysql.createConnection({
    host:"127.0.0.1",
    port:3306,
    user:"root",
    password:"Admin@1234",
    database:"bamazon"
});

connection.connect(function(err){
    if(err) throw err;
    displayItems();
});

function displayItems(){
    lineDraw();
    console.log("ITEMS AVAILABLE FOR SALE");
    lineDraw();
    connection.query("select product_id,product_name,price from products where stock_quantity > 0", function(err,data){
        if(err) throw err;
        console.table([data.keys],data.slice(0));
    });

    askUser();
    
}

function askUser(){
    inquirer.prompt([
        {
            type:"input",
            name:"id",
            message:"Enter id of product that you want to buy"
        },
        {
            type:"input",
            name:"quantity",
            message:"How many units you want to buy? "
        }
    ]).then(function(answer){
        console.log(answer.id+"  "+answer.quantity);
        checkQuantity(answer);
    });  
}

function checkQuantity(answer){
    connection.query("select * from products where product_id = ?",[answer.id], function(err,data){
        if(err) throw err;
        if(data[0].stock_quantity >= answer.quantity){
            placeOrder(data,answer.quantity);
        }
        else{
            console.log("sorry!this item is out of stock");
            connection.end();
        }
    });    
}

function placeOrder(data,quantity){
   var total=0;
   total=data[0].price * quantity;
   lineDraw();
   console.log("You have purchased "+quantity+" items( "+data[0].product_name+" )");
   lineDraw();
   console.log("Total Amount ="+total);
   updateStock(data,quantity);
}

function updateStock(data,quantity){
    var qt=data[0].stock_quantity - quantity;
    connection.query("update products set ? where ?",
    [
       {
          stock_quantity:qt
       },
       {
          product_id:data[0].product_id
       }
    ], function(err,data){
          if(err) throw err;
          console.log(data.affectedRows + " products updated");
    }
    );
    connection.end();
}
function lineDraw(){
    console.log("_______________________________________________________");
}