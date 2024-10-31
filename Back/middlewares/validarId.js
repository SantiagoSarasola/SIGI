
const validarId = (req, res, next) => {

    const id = Number(req.params.id);

    if(isNaN(id)){
        res.status(400).send({mensaje : "El id no es un número."});
        return;
    }
    if(!Number.isInteger(id)){
        res.status(400).send({mensaje : "El id no es un entero"});
        return;
    }
    if(id <= 0){
        res.status(400).send({mensaje : "El id debe ser positivo."});
        return;
    }

    next();

};

export default validarId;