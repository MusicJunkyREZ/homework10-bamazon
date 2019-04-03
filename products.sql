DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL PRIMARY KEY,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(5, 2) NULL,
  stock INT
  );
  
INSERT INTO products(item_id, product_name, department_name, price, stock)  
VALUES 
	(1, "Guitar", "Musical Instruments", 150.00, 5),
	(2, "GTAV", "Videogames", 60.00, 8),
	(3, "Sports Hat", "Clothing", 45.99, 4),
	(4, "Drone", "Electronics", 499.99, 3),
	(5, "Pens", "OfficeSupplies", 15.00, 10),
	(6, "Water Bottle", "Outdoors", 6.99, 23),
	(7, "Watch", "Accessories", 99.99, 33),
	(8, "Mini Grill", "Outdoors", 299.99, 17),
	(9, "Headphones", "Electronics", 69.99, 14),
	(10, "Blanket", "Bedding", 35.00, 13);
	

SELECT * FROM products;

UPDATE products SET stock=3 WHERE item_id=4; 



