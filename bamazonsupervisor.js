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
    supervisorOptions();
});


function supervisorOptions(){
    inquirer.prompt([
        {
            type:"list",
            name:"dept_actions",
            message:"Select your Action",
            choices:["View Product Sales by Department","Create New Department"]
        }
    ]).then(function(answer){
        switch(answer.dept_actions){
            case "View Product Sales by Department":
                viewSales();
                break;
            case "Create New Department":
                deptDetails();
                break;
            default:
                console.log("wrong action");
        }
    });
};


function viewSales(){
    connection.query("select dept_id,departments.dept_name,over_head_cost,coalesce(sum(product_sales),0) as product_sales,coalesce(sum(product_sales),0)-over_head_cost as profit from products right join departments on departments.dept_name = products.dept_name group by departments.dept_name",function(err,data){
        if(err) throw err;
        console.table([data.keys],data.slice(0));
    });
    connection.end();
};

function deptDetails(){
    console.log("Enter details of new Department");
    // lineDraw();
    inquirer.prompt([
        {
            name:"name",
            type:"input",
            message:"Enter name of Department"
        },
        {
            name:"cost",
            type:"input",
            message:"Enter over head cost"
        }
    ]).then(function(answer){
        console.log(answer);
        createDept(answer);
        
    });
}



function createDept(answer){
    connection.query("insert into departments set ?",
    {
        dept_name:answer.name,
        over_head_cost:answer.cost
    },function(err,data){
        console.log(data.affectedRows + " department inserted!\n");
    });

    connection.end();
}