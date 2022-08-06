const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { esRoleValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");

const router = Router();

//endpoints
router.get("/", usuariosGet);
router.put("/:id",[
  check("id", "No es un ID valido").isMongoId(),
  check("id").custom(existeUsuarioPorId),
  check("rol").custom(esRoleValido),
  validarCampos
], usuariosPut);

router.post(
  "/",
  [
    //.not().isEmpty() significa que no tiene que ser un campo vacio
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe tener mas de 6 letras").isLength({
      min: 6,
    }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(emailExiste),
    //Es mejor validarlo contra la base de datos por si a futuro se agregan roles
    // check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(esRoleValido),
    // esRolevalido se ejecutara con el primer argumento que le mande custom. Es lo mismo que hacer (rol) => esRoleValido(rol) =>
    validarCampos,
  ],
  usuariosPost
);
router.patch("/", usuariosPatch);

router.delete("/:id",[
  check("id", "No es un ID valido").isMongoId(),
  check("id").custom(existeUsuarioPorId),
  validarCampos
],usuariosDelete);

module.exports = router;
