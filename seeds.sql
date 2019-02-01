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