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
    managerOptions();
});

function managerOptions(){
    inquirer.prompt([
        {
          type:"list",
          name:"managerChoice",
          message:"What you want to do?",
          choices:["View product for sale","View low Inventory","Add to Inventory","Add new product"]
        }
    ]).then(function(answer){
        // console.log(answer.managerChoice);
        switch(answer.managerChoice){
            case "View product for sale":
                saleProducts();
                break;
            case "View low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add new product":
                addNewProduct();
                break;
            default:
                console.log("please select the right option");
                managerOptions();
                break;
        }
    });
    
}

function saleProducts(){
    lineDraw();
    console.log("ITEMS AVAILABLE FOR SALE");
    lineDraw();
    connection.query("select product_id,product_name,price,stock_quantity from products",function(err,data){
        if(err) throw err;
        console.table([data.keys],data.slice(0));
    });
};


function lowInventory(){
    lineDraw();
    console.log("LOW INVENTORY ITEMS");
    lineDraw();
    // console.log("ID        NAME        DEPARTMENT       PRICE       QUANTITY      ");
    connection.query("select * from products where stock_quantity < 5",function(err,data){
        if(err) throw err;
        console.table([data.keys],data.slice(0));
    });
    connection.end();
};

function addInventory(){
    connection.query("select dept_name from products group by dept_name",function(err,data){
        if(err) throw err;
        console.table([data.keys],data.slice(0));
        inquirer.prompt([
            {
                name:"dept",
                type:"input",
                message:"In which department you want to add Items?"
            }
        ]).then(function(answer){
            var deptFound=false;
            for(var i=0; i<data.length; i++){
                if(answer.dept === data[i].dept_name){
                    deptFound=true;
                    itemDetails(answer.dept);
                    break;
                }
            }
            if(!deptFound) {
                console.log("Department is not found in the databse");
            }
            
        });
    });
    
};
function itemDetails(dept){
    lineDraw();
    console.log("Enter details of product");
    lineDraw();
    inquirer.prompt([
        {
            name:"name",
            type:"input",
            message:"Enter name of Item"
        },
        {
            name:"price",
            type:"input",
            message:"Enter price of Item"
        },
        {
            name:"quantity",
            type:"input",
            message:"Enter quantity of Item"
        }
    ]).then(function(answer){
        console.log(answer);
        insertItems(answer,dept);
        
    });
}

function insertItems(answer,dept){
    connection.query("insert into products set ?",
    {
        product_name:answer.name,
        price:answer.price,
        stock_quantity:answer.quantity,
        dept_name:dept
    },function(err,data){
        console.log(data.affectedRows + " product inserted!\n");
    });

    connection.end();
}


function addNewProduct(){
    lineDraw();
    console.log("Enter details of new product");
    lineDraw();
    inquirer.prompt([
        {
            name:"name",
            type:"input",
            message:"Enter name of Item"
        },
        {
            name:"price",
            type:"input",
            message:"Enter price of Item"
        },
        {
            name:"dept",
            type:"input",
            message:"Enter department of item"
        },
        {
            name:"quantity",
            type:"input",
            message:"Enter quantity of Item"
        }
    ]).then(function(answer){
        console.log(answer);
        insertNewItems(answer);
        
    });
}

function insertNewItems(answer){
    connection.query("insert into products set ?",
    {
        product_name:answer.name,
        price:answer.price,
        stock_quantity:answer.quantity,
        dept_name:answer.dept
    },function(err,data){
        console.log(data.affectedRows + " product inserted!\n");
    });

    connection.end();
}
function lineDraw(){
    console.log("_______________________________________________________");
}