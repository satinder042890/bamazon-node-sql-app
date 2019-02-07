# bamazon-node-sql-app
Amazon-like storefront using MySQL and Node.js. It is comprised of three apps - one for customer orders , one for manager actions and one for manager spervisor. Uses basic functions of persistant storage.

### BamazonCustomer:
* Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
* The app should then prompt users with two messages.
     * The first should ask them the ID of the product they would like to buy.
     * The second message should ask how many units of the product they would like to buy.        
* Once the customer has placed the order, the application check if your store has enough of the product to meet the customer's request.
* if store does have enough of the product, the app fulfill the customer's order.
     * This means updating the SQL database to reflect the remaining quantity.
     * Once the update goes through, show the customer the total cost of their purchase.
     
 ![alt text](https://github.com/satinder042890/bamazon-node-sql-app/blob/master/images/customer_itemlist.png)
   
* If the store does not have sufficient quantity, the app log a phrase like Insufficient quantity!, and then prevent the order from going through.

![alt text](https://github.com/satinder042890/bamazon-node-sql-app/blob/master/images/insufficient-quantity.png)

* if the user enter invalid Id or quantity the app will display the message to the user.

![alt text](https://github.com/satinder042890/bamazon-node-sql-app/blob/master/images/customer-validation.png)


### BamazonManager:
It allows a manager to:
![alt text](https://github.com/satinder042890/bamazon-node-sql-app/blob/master/images/manager-options.png)
* View Products for Sale
   If a manager selects View Products for Sale, the app list every available item: the item IDs, names, prices, and quantities.
   
![alt text](https://github.com/satinder042890/bamazon-node-sql-app/blob/master/images/mpr-for-sale.png)
   
* View Low Inventory
    If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
    
![alt text](https://github.com/satinder042890/bamazon-node-sql-app/blob/master/images/low-inventory.png)
   
* Add to Inventory
   * If a manager selects Add to Inventory, the app display a prompt that will let the manager "add more" of any item currently in the       store.
    
![alt text](https://github.com/satinder042890/bamazon-node-sql-app/blob/master/images/update-quantity.png)
   
   * when the manager enter the qunatity of any item, It will be updated in the databse
![alt text](https://github.com/satinder042890/bamazon-node-sql-app/blob/master/images/updated-quantity.png)  
   
* Add New Product
    * If a manager selects Add New Product, it will display the list of departments available in the store, the manager selects the department and it should allow the manager to add a completely new product to the store.
    
![alt text](https://github.com/satinder042890/bamazon-node-sql-app/blob/master/images/add-item.png) 

   * If the manger enter the department that is not available in the store, it will display the message to the manager
   
![alt text](https://github.com/satinder042890/bamazon-node-sql-app/blob/master/images/invalid-department.png)

### BamazonSupervisor:
