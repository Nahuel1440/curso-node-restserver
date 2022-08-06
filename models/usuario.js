const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    //required puede recibir solo un booleano o un arr donde
    //el primer elemento es un booleano y el segundo es
    //el err que quieramos mandar
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

//quitamos el password y la version de la respuesta
UsuarioSchema.methods.toJSON = function(){
  const {__v, password, _id, ...usuario} = this.toObject();
  usuario.uid = _id;
  return usuario;
}

//model nos pide el nombre de la coleccion, que en este caso sera
//Usuarios, lo ponemos en singular ya que mongoose le agrega una "s"
//al final por defecto. Y nos pide el esquema
module.exports = model("Usuario", UsuarioSchema);

//Idea de como va a ser nuestro modelo usuario
/* {
  nombre: "",
  correo: "",
  password: "oi32joiej2",
  img: "url",
  rol: "rol",
  estado: true|false,
  google: true|false,
} */
