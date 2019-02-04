drop database if exists bamazon;
create database bamazon;
use bamazon;
create table products(
    product_id integer auto_increment,
    product_name varchar(40) not null,
    dept_name varchar(40),
    price decimal(12,8) not null,
    stock_quantity integer(10),
    primary key(product_id)
);


insert into products(product_name,dept_name,price,stock_quantity) values("Basics of mysql","books",14.49,10);
insert into products(product_name,dept_name,price,stock_quantity) values("Basics of node","books",24.49,7);
insert into products(product_name,dept_name,price,stock_quantity) values("Basics of javascript","books",12.99,5);
insert into products(product_name,dept_name,price,stock_quantity) values("Refrigerators","Appliances",222.49,4);
insert into products(product_name,dept_name,price,stock_quantity) values("Dishwasher","Appliances",388.49,12);
insert into products(product_name,dept_name,price,stock_quantity) values("Microwave","Appliances",425.99,4);
insert into products(product_name,dept_name,price,stock_quantity) values("Skechers women's D'Lites","shoes",33.99,10);
insert into products(product_name,dept_name,price,stock_quantity) values("Sperry women's rain boot","shoes",14.49,15);
insert into products(product_name,dept_name,price,stock_quantity) values("Birkenstock Arizona soft leather sandal","shoes",24.99,20);
insert into products(product_name,dept_name,price,stock_quantity) values("Disney toys","kids",10.49,10);
insert into products(product_name,dept_name,price,stock_quantity) values("Superhero dress","kids",12.49,5);
insert into products(product_name,dept_name,price,stock_quantity) values("Toy horse","kids",30.49,22);


create table departments(
    dept_id integer auto_increment,
    dept_name varchar(40) not null,
    over_head_cost decimal(12,8) not null,
    primary key(dept_id)
);


insert into departments(dept_name,over_head_cost) values("books",30.99);
insert into departments(dept_name,over_head_cost) values("Appliances",200.99);
insert into departments(dept_name,over_head_cost) values("shoes",20.99);
insert into departments(dept_name,over_head_cost) values("kids",40.99);
insert into departments(dept_name,over_head_cost) values("furniture",150.99);

alter table products add product_sales integer(10);
alter table products modify column product_sales decimal(12,8);


select * from products;




select dept_id,departments.dept_name,over_head_cost,coalesce(sum(product_sales),0) as product_sales,
coalesce(sum(product_sales),0)-over_head_cost as profit
from products right join departments on departments.dept_name = products.dept_name
group by departments.dept_name;