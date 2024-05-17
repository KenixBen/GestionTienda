# GestionTienda

Proyecto App Tienda

Base de datos – InventoryDB
Usuario : tiendamanager
Password : tiendasecreta
Host (IP ADDRESS) 172.16.5.84 (linux-vm2)

Tabla Product
UPC (Primary Key)
name_Product
price_Product
quantity_Product

Tabla Detail_Product
UPC (Foreign key)
category_Product
brand
expiration_Date
Batch



Tabla Provider
id_Provider (Primary Key)
name_Provider
contact

CREATE TABLE Product ( 
UPC VARCHAR (255) PRIMARY KEY, 
name_Product VARCHAR (255),
 price_Product DOUBLE, 
quantity_Product INT 
);
CREATE TABLE Detail_Product ( 
UPC VARCHAR (255), 
category_Product ENUM('Produce', 'Grocery', 'Frozen', 'Dairy'), 
brand VARCHAR (255), 
expiration_Date DATE, 
batch VARCHAT (255,
FOREIGN KEY (UPC) REFERENCES Product(UPC) 
);
CREATE TABLE Provider ( 
id_Provider INT PRIMARY KEY AUTO_INCREMENT, 
name_Provider VARCHAR(255), 
contact VARCHAR (255) 
);
INSERT INTO Product ( UPC, name_Product, price_Product, quantity_Product ) 
VALUES ( '00044770007505', 'Hotdogs Oscar Mayer Beef', '6.59', '18' ),
( '0005031315135', 'Salchicha Carmela', '.59', '50' )
;
INSERT INTO Detail_Product ( UPC, category_Product, brand, expiration_Date ) 
VALUES ( '00044770007505', 'Dairy', 'Oscar Mayer', '2025-12-30', ‘1’), 
('0005031315135', 'Grocery', 'Carmela', '2025-10-08', ‘1’)
;
INSERT INTO Provider ( name_Provider, contact ) 
VALUES ('Kraft', '1-855-598-5493'), 
('B.Suarez', '787-792-1212')
;
