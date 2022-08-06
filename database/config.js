const mongoose = require("mongoose");

//Se hace la coneccion a nuestra base de datos en mongoDB
//Usamos try catch por si hay un error en conectarse
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
