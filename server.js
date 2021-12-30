const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')

require('dotenv').config();

const app = express();

const corsOptions = {
  // origin: '*', 
  origin: process.env.FRONTEND_BASE_URL,
  methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
  credentials: true, // required to pass
  allowedHeaders: "Content-Type, Authorization, X-Requested-With, Access-Control-Allow-Origin",
};
// intercept pre-flight check for all routes
app.options("*", cors(corsOptions));	// OR // app.use(cors(corsOptions))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Origin', req.header('origin'));
  next();
});

app.use(
  cors({
    origin: true, //included origin as true
    credentials: true, //included credentials as true
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const User = db.users;
const Op = db.Sequelize.Op;

const validateCredentials = require("./middleware/validateCredentials");
const addUser = require("./Controllers/addUser");
const verifySignUp = require("./middleware/verifySignUp");
const authJWT = require("./middleware/authJWT");
const verifyLogin = require("./middleware/verifyLogin");
const getSingleUser = require("./Controllers/getSingleUser");
const getAllUsers = require("./Controllers/getAllUsers");
const getUsersByRole = require("./Controllers/getUsersByRole");
const deleteUser = require("./Controllers/deleteUser");
const updateUser = require("./Controllers/updateUser");

// In development, if you want to drop existing tables and re-sync database. 
// Just use force: true as following code:
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// This command will create table automatically in DB if it is not present!
db.sequelize.sync();


app.get("/", /* validateCredentials ,*/(req, res) => {
  res.json({ message: "Welcome to YIE user management application." });
});

// returns all users without any authentication -> for devlopemtn use only
app.get("/all", (req, res) => {
  User.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
});

// For signup
app.post('/auth/signup', verifySignUp, addUser);

// For login
app.post('/auth/login', verifyLogin, (req, res) => {
  const user = res.locals.user;
  const token = res.locals.token;
  console.log("token sent succesfully! \nToken : ", token);
  res.status(200).cookie('yie_access_token', token).send(user);
})

// to check user cookie is valid or not!
app.post('/auth', authJWT, (req, res) => {
  console.log(res.locals.info);
  if (res.locals.info.status.toLowerCase() === 'failed') return res.status(400).send(res.locals.info);

  res.status(200).send({ status: "success", user: res.locals.info.user });
})

// Get all users
app.get('/users', getAllUsers);

// Get 1 user by id
app.get('/user/:id', getSingleUser);

// Get 1 user by role
app.get('/user/role/:role', getUsersByRole);

// Delete 1 user by id
app.delete('/user/:id', deleteUser);

// Update 1 user by id
app.patch('/user/:id', updateUser);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});