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
    moreDetails();
};


function lowInventory(){
    lineDraw();
    console.log("LOW INVENTORY ITEMS");
    lineDraw();
    connection.query("select * from products where stock_quantity < 5",function(err,data){
        if(err) throw err;
        console.table([data.keys],data.slice(0));
    });
    moreDetails();
};

function addInventory(){
    connection.query("select * from products",function(err,data){
        if(err) throw err;
        console.table([data.keys],data.slice(0));
        inquirer.prompt([
            {
                name:"id",
                type:"input",
                message:"Enter Id of item that you want to update?",
                validate:function (value){
                    if(isNaN(value) === false){
                        return true;
                    }
                    else{
                        console.log("\n\nId should be a number!! Try Again");
                    }
                }
            }
        ]).then(function(answer){
            var min=data[0].product_id;
            var max=data.length;
            if(answer.id >=min && answer.id <=max){
                itemQuantity(answer.id);
            }
            else{
                console.log("\nsorry!this Id is not valid");
                moreDetails();
            }
        });
    });
    
};
function itemQuantity(id){
    lineDraw();
    inquirer.prompt([
    {
        name:"quantity",
        type:"input",
        message:"Enter quantity of Item",
        validate:function (value){
            if(isNaN(value) === false){
                return true;
            }
            else{
                console.log("\n\nQuantity should be a number!! Try Again");
            }
        }
    }
    ]).then(function(answer){
        updateItems(answer,id);
        
    });
}

function updateItems(answer,id){
    connection.query("update products set  ? where ?",
    [
        {
            stock_quantity:answer.quantity
        },
        {
            product_id:id
        }
    ],function(err,data){
        console.log(data.affectedRows + " product updated!\n");
    });

   moreDetails();
}

function addNewProduct(){
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
                moreDetails();
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

    moreDetails();
}


function moreDetails(){
    lineDraw();
    inquirer.prompt([
        {
            type:"confirm",
            message:"Do you want to see other details?",
            name:"confirm"
        }
    ]).then(function(answer){
        if(answer.confirm){
            lineDraw();
            managerOptions();
        }
        else{
            lineDraw();
            console.log("Thanks!!! ");
            lineDraw();
            connection.end();
        }
        
    });
};
function lineDraw(){
    console.log("_______________________________________________________");
}