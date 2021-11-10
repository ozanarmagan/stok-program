//import all models in this folder and export them
const Bill = require('./billModel');
const Card = require('./cardModel');
const Category = require('./categoryModel');
const CompanyCustomer = require('./companyCustomer');
const Company = require('./companyModel');
const Customer = require('./customerModel');
const Debt = require('./debtModel');
const Indenture = require('./indentureModel');
const Order = require('./orderModel');
const Payment = require('./paymentModel');
const Product = require('./productModel');
const Stock = require('./stockHistory');
const User = require('./userModel');

var modelsList = [ Bill, Card, Category, CompanyCustomer, Company, Customer, Debt, Indenture, Order, Payment, Product, Stock, User ];

exports.modelsList = modelsList;