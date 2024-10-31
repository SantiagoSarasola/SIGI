
const validarAtributosProducto = (req, res, next) => {

    //validar nombre del producto
    const nombreProducto = req.body.nombreProducto;
    if(nombreProducto == undefined){
        return res.status(400).send({mensaje : "El nombre del producto es requerido."});
    }
    if(nombreProducto === ''){
        return res.status(400).send({mensaje : "El nombre del producto no debe estar vacío."});
    }
    if(typeof nombreProducto !== 'string'){
        return res.status(400).send({mensaje : "El nombre del producto debe ser un texto."});
    }
    if(nombreProducto.length < 1 || nombreProducto.length > 100){
        return res.status(400).send({mensaje : "El nombre del producto debe tener entre 1 y 100 caracteres"});
    }

    //validar stock actual
    const stockActual = req.body.stockActual;
    if(stockActual == undefined){
        return res.status(400).send({mensaje : "El stock actual es requerido."});
    }
    if(stockActual === ''){
        return res.status(400).send({mensaje : "El stock actual no debe estar vacío."});
        
    }
    if(isNaN(stockActual)){
        return res.status(400).send({mensaje : "El stock actual no es un número."});
    }
    if(!Number.isInteger(stockActual)){
        return res.status(400).send({mensaje : "El stock actual no es un entero"});
    }
    if(stockActual <= 0){
        return res.status(400).send({mensaje : "El stock actual debe ser positivo."});
    }

    //validar precio de lista
    const precioLista = req.body.precioLista;
    if(precioLista == undefined){
        return res.status(400).send({mensaje : "El precio de lista es requerido."});
    }
    if(precioLista === ''){
        return res.status(400).send({mensaje : "El precio de lista no debe estar vacío."});
    }
    if(isNaN(precioLista)){
        return res.status(400).send({mensaje : "El precio de lista no es un número."});
    }
    if(precioLista <= 0){
        return res.status(400).send({mensaje : "El precio de lista debe ser positivo."});
    }

    //validar primer descuento
    const descuentoUno = req.body.descuentoUno;
    if(descuentoUno == undefined){
        return res.status(400).send({mensaje : "El primer descuento es requerido."});
    }
    if(descuentoUno === ''){
        return res.status(400).send({mensaje : "El primer descuento no debe estar vacío."});
    }
    if(isNaN(descuentoUno)){
        return res.status(400).send({mensaje : "El primer descuento no es un número."});
    }
    if(descuentoUno <= 0){
        return res.status(400).send({mensaje : "El primer descuento debe ser positivo."});
    }

    //validar costo intermedio
    const costoIntermedio = req.body.costoIntermedio;
    if(costoIntermedio == undefined){
        return res.status(400).send({mensaje : "El costo intermedio es requerido."});
    }
    if(costoIntermedio === ''){
        return res.status(400).send({mensaje : "El costo intermedio no debe estar vacío."});
    }
    if(isNaN(costoIntermedio)){
        return res.status(400).send({mensaje : "El costo intermedio no es un número."});
    }
    if(costoIntermedio <= 0){
        return res.status(400).send({mensaje : "El costo intermedio debe ser positivo."});
    }

    //validar segundo descuento
    const descuentoDos = req.body.descuentoDos;
    if(descuentoDos == undefined){
        return res.status(400).send({mensaje : "El segundo descuento es requerido."});
    }
    if(descuentoDos === ''){
        return res.status(400).send({mensaje : "El segundo descuento no debe estar vacío."});
    }
    if(isNaN(descuentoDos)){
        return res.status(400).send({mensaje : "El segundo descuento no es un número."});
    }
    if(descuentoDos <= 0){
        return res.status(400).send({mensaje : "El segundo descuento debe ser positivo."});
    }

    //validar costo final
    const costoFinal = req.body.costoFinal;
    if(costoFinal == undefined){
        return res.status(400).send({mensaje : "El costo final es requerido."});
    }
    if(costoFinal === ''){
        return res.status(400).send({mensaje : "El costo final no debe estar vacío."});
    }
    if(isNaN(costoFinal)){
        return res.status(400).send({mensaje : "El costo final no es un número."});
    }
    if(costoFinal <= 0){
        return res.status(400).send({mensaje : "El costo final debe ser positivo."});
    }

    //validar incremento
    const incremento = req.body.incremento;
    if(incremento == undefined){
        return res.status(400).send({mensaje : "El incremento es requerido."});
    }
    if(incremento === ''){
        return res.status(400).send({mensaje : "El incremento no debe estar vacío."});
    }
    if(isNaN(incremento)){
        return res.status(400).send({mensaje : "El incremento no es un número."});
    }
    if(incremento <= 0){
        return res.status(400).send({mensaje : "El incremento debe ser positivo."});
    }

    //validar precio sugerido
    const precioSugerido = req.body.precioSugerido;
    if(precioSugerido == undefined){
        return res.status(400).send({mensaje : "El precio sugerido es requerido."});
    }
    if(precioSugerido === ''){
        return res.status(400).send({mensaje : "El precio sugerido no debe estar vacío."});
    }
    if(isNaN(precioSugerido)){
        return res.status(400).send({mensaje : "El precio sugerido no es un número."});
    }
    if(precioSugerido <= 0){
        return res.status(400).send({mensaje : "El precio sugerido debe ser positivo."});
    }

    //validar precio final
    const precioFinal = req.body.precioFinal;
    if(precioFinal == undefined){
        return res.status(400).send({mensaje : "El precio final es requerido."});
    }
    if(precioFinal === ''){
        return res.status(400).send({mensaje : "El precio final no debe estar vacío."});
    }
    if(isNaN(precioFinal)){
        return res.status(400).send({mensaje : "El precio final no es un número."});
    }
    if(precioFinal <= 0){
        return res.status(400).send({mensaje : "El precio final debe ser positivo."});
    }

    //validar ganancia
    const ganancia = req.body.ganancia;
    if(ganancia == undefined){
        return res.status(400).send({mensaje : "La ganancia es requerida."});
    }
    if(ganancia === ''){
        return res.status(400).send({mensaje : "La ganancia no debe estar vacía."});
    }
    if(isNaN(ganancia)){
        return res.status(400).send({mensaje : "La ganancia no es un número."});
    }
    if(ganancia <= 0){
        return res.status(400).send({mensaje : "La ganancia debe ser positiva."});
    }

    //validar id de la categoria
    const idCategoria = req.body.idCategoria;
    if(idCategoria == undefined){
        return res.status(400).send({mensaje : "El id de la categoria es requerido."});
    }
    if(idCategoria === ''){
        return res.status(400).send({mensaje : "El id de la categoria no debe estar vacío."});
    }
    if(isNaN(idCategoria)){
        return res.status(400).send({mensaje : "El id de la categoria no es un número."});
    }
    if(!Number.isInteger(idCategoria)){
        return res.status(400).send({mensaje : "El id de la categoria no es un entero"});
    }
    if(idCategoria <= 0){
        return res.status(400).send({mensaje : "El id de la categoria debe ser positivo."});
    }

    //validar id de la fabrica
    const idFabrica = req.body.idFabrica;
    if(idFabrica == undefined){
        return res.status(400).send({mensaje : "El id de la fabrica es requerido."});
    }
    if(idFabrica === ''){
        return res.status(400).send({mensaje : "El id de la fabrica no debe estar vacío."});
    }
    if(isNaN(idFabrica)){
        return res.status(400).send({mensaje : "El id de la fabrica no es un número."});
    }
    if(!Number.isInteger(idFabrica)){
        return res.status(400).send({mensaje : "El id de la fabrica no es un entero"});
    }
    if(idFabrica <= 0){
        return res.status(400).send({mensaje : "El id de la fabrica debe ser positivo."});
    }

    next();
}

export default validarAtributosProducto;