const Role = require("../models/role");
const Usuario = require("../models/usuario");

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

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId
};
