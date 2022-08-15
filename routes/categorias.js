const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria, 
        obtenerCategorias, 
        obtenerCategoria, 
        actualizarCategoria, 
        borrarCategoria } = require("../controllers/categorias");
const { existeCategoria } = require("../helpers/db-validators");
const { validarJWT, validarCampos, esAdminRol } = require("../middlewares")

const router = Router();

//Obtener todas las categorias - publico
router.get("/", obtenerCategorias);

//Obtener una categoria por id - publico
router.get("/:id", [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom( existeCategoria ),
    validarCampos,
  ], obtenerCategoria);

//Crear categoria - privado - cualquier persona con un token válido
router.post("/", [
  validarJWT,
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  validarCampos
], crearCategoria);

//Actualizar categoria - privado - cualquier persona con un token válido
router.put("/:id",[
  validarJWT, 
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  validarCampos
], actualizarCategoria);

//Borrar categoria - privado - solo un administrador
router.delete("/:id", [
  validarJWT,
  esAdminRol,
  check("id", "No es un id de Mongo válido").isMongoId(),
  check("id").custom( existeCategoria ),
  validarCampos
], borrarCategoria);


//Hacer middleware para validar ids
module.exports = router;