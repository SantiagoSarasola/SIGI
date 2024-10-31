
const validarId = (req, res, next) => {

    const id = Number(req.params.id);

    if(isNaN(id)){
        return res.status(400).send({mensaje : "El id no es un número."});
    }
    if(!Number.isInteger(id)){
        return res.status(400).send({mensaje : "El id no es un entero"});
    }
    if(id <= 0){
        return res.status(400).send({mensaje : "El id debe ser positivo."});
    }

    next();

};

export default validarId;