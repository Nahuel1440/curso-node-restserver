const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares")
const { login, googleSignIn } = require("../controllers/auth");

const router = Router();

//endpoints
router.post("/login", [
  check("correo", "El correo es obligatorio").isEmail(),
  check("password", "La contraseña es obligatoria").not().isEmpty(),
  validarCampos
], login );

router.post("/google", [
  check("id_token", "El id_token es necesario").not().isEmpty(),
  validarCampos
], googleSignIn );

module.exports = router;