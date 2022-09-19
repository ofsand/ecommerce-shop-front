# MEAN Stack ecommerce website!
### Content
- ##### How to use this project ?
- ##### Overview
- ##### Features
- ##### Architecture
- ##### Frontend
- ##### Backend
- ##### Styling
- ##### API's testing

### How to use this project ?
- make sure you clone the project from the stable-main branch, then install node modules with npm:

```sh
npm install
```
- due to the use of monorepo, the shop and admin app are devided, you can run each of them with the following commands:

```sh
nx serve eshop
```
```sh
nx serve admin
```
- Don't hesitate to fork the project and add more functionnalities and send a pull request on the project

### Overview
First of all my motivations that let me go for this project, and commit every single functionnality, is having a clear idea about how the MEAN stack works and how a Monorepo can affect the organization of my project.
The project is an ecommerce platform, with all functionnalities but payment, you can see it as a Cash on Delivery Platform.

### Features
In this project you can find, the following:

- ##### JWT Authentication and Authorization
    -  Admin user: Super admin Role
    -  Guest user: Can be used to buy without ccreating personal account
    -  Normal users: Personal accounts users's create 
- ##### Models: Products, Categories, Users, Reviews, Orders
- ##### Rest API's by Role
    - Get, Add, update, delete
    - Admin can:
        - Get (Products, users, categories, orders),
        - Add (Products, users, categories),
        - Update (Products, users, categories),
        - Delete (Products, users, categories, reviews, orders)
    - Guest can:
        - Get (Products, categories),
        - Add (order),
        - Update (),
        - Delete ()
    - Normal User can:
        - Get (Products, categories, orders, user(Only himself) ),
        - Add (order),
        - Update ( user(Only himself) ),
        - Delete ()
    - Visitors with no account:
        - Get (Products, categories),
        - Add (),
        - Update (),
        - Delete ()

TO BE NOTED:  the admin can not have access to the shop and buy products as an admin, it is denied from this functionnality, ans vice versa !
### Architecture
The Project's architecture is based on the MonoRepo NX Architecture:
<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></p>
One of the best things about NX is the ability to generate modules, services Libraries etc.. without CLI command.
##### Quick Start & Documentation Of NX
[Nx Documentation](https://nx.dev/angular)
[10-minute video showing all Nx features](https://nx.dev/getting-started/intro)
[Interactive Tutorial](https://nx.dev/react-tutorial/01-create-application)

The important things I did about the architecture of the project is avoiding the traditional way of Angular where every TS file is followed by its own CSS or SCSS file, instead i've created a global folder called Styles and placed all SCSS files inside with the same hierarchy, also i avoided generating Test file because i was focusing just on Developement without testing.
 Here is a clear idea about the architecture of the project:
 
<img src="https://ibb.co/51YYjrW">
<img src="https://ibb.co/p05Jk30">
<img src="https://ibb.co/NyKFM9y">

### Frontend
In the front end part I've used
- ANGULAR 14.5.7,
- typescript 4.7.2,
- Node v16.15.1,
- Npm 8.13.2,
- Nx 14.5.7,
### Backend
In the back end part I've used
- Node v16.15.1,
- Express JS 4.18.1, 
- Npm 8.13.2, 
- Nodemon 2.0.19
### Styling
For tyling I've used something very new for me,NG PRIME by PRIME FACES which i didn't know it even exist xD,
It is so good, and can replace MATERIAL UI and TAILWIND, You can check it out here: 
https://www.primefaces.org/
http://primefaces.org/primeng/setup

### API’s testing
For API Testing, Ive user the most famous Postman, and I've organized my api's requests as follows:
<img src="https://ibb.co/nRSrwvM">
<img src="https://ibb.co/GW5GrZC">


[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

##### Take Care, and one last thing, STAY IN YOUR Magic! ✨
