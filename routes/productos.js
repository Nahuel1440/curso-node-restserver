const { Router } = require("express");
const { check } = require("express-validator");
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, eliminarProducto } = require("../controllers/productos");
const { existeCategoria, existeProducto } = require("../helpers/db-validators");
const { validarJWT, esAdminRol, validarCampos } = require("../middlewares");

const router = Router();

//Obtener los productos
router.get("/", obtenerProductos)

//Obtener producto por id
router.get("/:id", [
  check("id", "La id no es una id válida").isMongoId(),
  check("id").custom( existeProducto ),
  validarCampos
], obtenerProducto)

//Crear producto
router.post("/", [
  validarJWT,
  check("nombre", "El nombre del producto es requerido").not().isEmpty(),
  check("categoria", "La id no es una id válida").isMongoId(),
  check("categoria").custom( existeCategoria ),
  validarCampos
], crearProducto);

//Actualizar producto
router.put("/:id", [
  validarJWT,
  check("id", "La id no es una id válida").isMongoId(),
  check("id").custom( existeProducto ),
  validarCampos
], actualizarProducto);

//Eliminar producto
router.delete("/:id", [
  validarJWT,
  esAdminRol,
  check("id", "La id no es una id válida").isMongoId(),
  check("id").custom( existeProducto ),
  validarCampos
], eliminarProducto);

module.exports = router;