# assgbackend
Endpoints :

POST
Create category
http://localhost:4000/api/category/new
Bodyraw (json)
json
{
  "name": "Beauty"
}

GET
Get all categories
http://localhost:4000/api/category/getAll


POST
Create new product
http://localhost:4000/api/product/new
Bodyraw (json)
json
{
  "title": "Laptop",
  "description": "Good one",
  "availability": "available",
  "price": 32000,
  "category": "Electronics"
}


GET
Get All Products
http://localhost:4000/api/product/getAll

GET
Get Product by id
http://localhost:4000/api/product/getone/64de548dfc628f2be375b6ca

DEL
Delete Products
http://localhost:4000/api/product/delete/64de548dfc628f2be375b6ca

PUT
Update product
http://localhost:4000/api/product/update/64de5a574f548f1c1077a159
Bodyraw (json)
json
{
  "price": 35000
}

POST
Register User
http://localhost:4000/api/user/register
Bodyraw (json)
json
{
  "name": "dison",
  "email": "dison@gmail.com",
  "password": "dison@123",
  "phone": "4565786899",
  "address": "Elena apartments"
}

POST
Login User
http://localhost:4000/api/user/login
Bodyraw (json)
json
{
  "email": "snupa@gmail.com",
  "password": "snupa@123"
}

GET
Logout User
http://localhost:4000/api/user/logout

POST
Create cart item
http://localhost:4000/api/cart/new
Bodyraw (json)
json
{
  "userId": "64dedf833da59a232b318ded",
  "productId": "64de54b6fc628f2be375b6cc",
  "quantity": 2
}

GET
Get Users Cart
http://localhost:4000/api/cart/user/64dedf833da59a232b318ded

PUT
Update Quantity of product
http://localhost:4000/api/cart/64dedf833da59a232b318ded/64de54b6fc628f2be375b6cc
Bodyraw (json)
json
{
  "newQuantity": 4
}

DEL
Remove item from cart
http://localhost:4000/api/cart/64dedf833da59a232b318ded/64de54b6fc628f2be375b6cc

POST
Create order
http://localhost:4000/api/order/64dedf833da59a232b318ded/newOrder

GET
Order of Loggedin User
http://localhost:4000/api/order/me

GET
Get single order
http://localhost:4000/api/order/64dfa0db8de1c6acc6782bfc


