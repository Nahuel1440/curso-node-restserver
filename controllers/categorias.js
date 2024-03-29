const { response } = require("express");
const { Categoria, Usuario } = require("../models");

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async ( req, res = response ) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  
  const [ total, categorias ] = await Promise.all([
     Categoria.countDocuments(query),
     Categoria.find(query)
     .skip(Number(desde))
     .limit(Number(limite))
     .populate("usuario", "nombre")
    ]);

  res.json({ total, categorias });
}

// obtenerCategoria - populate {}
const obtenerCategoria = async ( req, res = response ) => {
  const { id } = req.params;
  
  const categoria = await Categoria.findOne({id}).populate("usuario", "nombre");
  
  res.json(categoria);
}

const crearCategoria = async ( req, res = response ) => {

  const nombre = req.body.nombre.toUpperCase();
  const categoriaDB = await Categoria.findOne({ nombre });

  if( categoriaDB ){
    res.status(400).json({
      msg: `El nombre de la categoria ${categoriaDB.nombre} ya existe.`
    });
  }

  //Generar la data a guardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  }

  const categoria = new Categoria(data);

  //Guardar DB
  await categoria.save();

  res.status(201).json(categoria);

}

// actualizar categoria, recibir el nombre
const actualizarCategoria = async ( req, res = response ) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;
  // el new en true sirve para obtener en categoria la ya actualizada
  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
  res.json( categoria )
}


// borrar categoria - estado: false recibe id
const borrarCategoria = async ( req, res = response ) => {
  const { id } = req.params;
  
  const categoria = await Categoria.findByIdAndUpdate( id, { estado:false }, { new: true } );
  res.json( categoria )
}

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria
}