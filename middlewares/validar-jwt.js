const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async ( req = request, res = response, next ) => {

  const token = req.header("x-token");

  if( !token ){
    return res.status(401).json({
      msg: "No hay token en la petición"
    });
  }

  try{

    const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

    //Leer usuario que corresponde a la uid
    const usuario = await Usuario.findById( uid );

    //Verificamos si el usuario que hizo la peticion existe en DB
    if( !usuario ){
      return res.status(401).json({
        msg: "Token no válido - usuario no existente en DB"
      })
    }

    //Verificar si el usuario tiene estado en true
    if( !usuario.estado ){
      return res.status(401).json({
        msg: "Token no válido - usuario con estado en false"
      })
    }

    req.usuario = usuario;
    
    next()

  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido"
    });
  }
  
}

module.exports = {
  validarJWT
}