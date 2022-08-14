//page 1
>list of products
>>(Get) http://localhost:9100/products
>Dress on the basis of type
>>(Get) http://localhost:9100/dresstype

//page 2
>Dress on the basis of brand
>>(Get) http://localhost:9100/products?brandid=903
>Filter on the basis of dresstype
>>(Get) http://localhost:9100/filter/1
>Filter brand
>>(Get) http://localhost:9100/filter/905
>Filter on basis of cost
>>(Get) http://localhost:9100/filter/905?lprice=1500&hprice=5500
>Sort on basis of cost
>>(Get) http://localhost:9100/filter/905?lprice=1500&hprice=5500&sort=1

//page3
>Details of the products available
>>(Get) http://localhost:9100/details/3

//page4
>place order
>>(Post) localhost:9100/placeOrder
{
    "name": "mahi",
     "email": "mahi@gmail.com",
    "price": 1500,
    "dresstype":"shirt",
    "mobile": "1113987425"
}

//page5
>List of order placed
>>(Get) http://localhost:9100/order

//delete order
>>(Delete) localhost:9100/deleteOrder/62f8c1bf0d88a30ae03fdc77