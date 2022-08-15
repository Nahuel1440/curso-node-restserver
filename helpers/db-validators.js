const { Categoria, Role, Usuario, Producto } = require("../models");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    //Este error no me congela la aplicación, custom lo maneja
    throw new Error(`El rol ${rol} no está registrado en la base de datos`);
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error("El correo ya está registrado");
  }
};

const existeUsuarioPorId = async (id = "") => {
  const usuario = await Usuario.findById(id);
  if (!usuario) {
    throw new Error(`El id ${id} no existe en la bd`);
  }
}

/**Validaroes de categoria **/

const existeCategoria = async (id = "") =>{
  const categoria = await Categoria.findById(id);
  if(!categoria){
    throw new Error(`El id ${id} no existe en la bd`);
  }
}

/** Validadores de productos **/
const existeProducto = async (id = "") =>{
  const producto = await Producto.findById(id);
  if(!producto){
    throw new Error(`El id ${id} no existe en la bd`);
  }
}

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoria,
  existeProducto
};
