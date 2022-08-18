
const validarCampos = require("../middlewares/validar-campos");
const validaRoles = require("../middlewares/validar-roles");
const validarJWT = require("../middlewares/validar-jwt");
const validarArchivo = require("../middlewares/validar-archivo");

module.exports = {
  ...validarCampos,
  ...validaRoles,
  ...validarJWT,
  ...validarArchivo
}