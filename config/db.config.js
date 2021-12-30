// const { Client } = require('pg');

// const client = new Client({
//     host: "localhost",
//     port: 5432,
//     user: "postgres",
//     password: "parshu0612",
//     database: "postgres",
//     dialect: "postgres",
// })

// client.on('connect',()=>{
//     console.log("connected to postgres");
// })

// client.on('end',()=>{
//     console.log("end connection to postgres");
// })

// module.exports = client;

// -------------------

module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "parshu0612",
    DB: "postgres",
    dialect: "postgres",
    // pool: {
    //   max: 5,
    //   min: 0,
    //   acquire: 30000,
    //   idle: 10000
    // }
  };