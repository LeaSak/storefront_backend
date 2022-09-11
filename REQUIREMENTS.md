# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index GET: api/products 
- Show GET: api/products/:id
- Create [token required] POST: api/products/ (args: JSON body object {name: string, price: float, category: string })
- Update [token required] PUT: api/products/:id (args: JSON body object {name: string, price: float, category: string })
- Delete [token required] DELETE: api/products/:id

#### Users
- Index [token required] GET api/users
- Show [token required] GET api/users/:id
- Create N[token required] POST api/users/ (args: JSON body object {username: string, firstname: string, lastname: string, password: string })
- Update N[token required] PUT api/users/:id (args: JSON body object {username: string, firstname: string, lastname: string, password: string })
- Delete N[token required] DELETE api/users/:id
- Authenticate N[token required] POST api/users/authenticate (args: JSON body object {username: string, firstname: string, lastname: string, password: string } )

#### Orders
- Index [token required] GET api/orders
- Show order by user [token required] GET api/orders/id:
- Create N[token required] POST api/orders/ (args: JSON body object {status: string, user_id: number })
- Update N[token required] PUT api/orders/:id (args: JSON body object {status: string, user_id: number})
- Delete N[token required] DELETE api/orders/:id
- Add products to order [token required] POST api/orders/:id/products (args: JSON body object {product_id: number, quantity: number})

## Data Shapes
#### Product
-  id
- name
- price
- category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

### Database schema
- users (id SERIAL PRIMARY KEY, username VARCHAR(255), firstname VARCHAR(255), lastname VARCHAR(255), password VARCHAR(255))
- products (id SERIAL PRIMARY KEY, name VARCHAR(200), price FLOAT, category VARCHAR(100))
- orders (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id), status VARCHAR(15))
- order_products (id SERIAL PRIMARY KEY, order_id INTEGER REFERENCES orders(id), product_id INTEGER REFERENCES products(id), quantity INTEGER);