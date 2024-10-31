
const validarAtributosProducto = (req, res, next) => {

    //validar nombre del producto
    const nombreProducto = req.body.nombreProducto;
    if(nombreProducto == undefined){
        res.status(400).send({mensaje : "El nombre del producto es requerido."});
        return;
    }
    if(nombreProducto === ''){
        res.status(400).send({mensaje : "El nombre del producto no debe estar vacío."});
        return;
    }
    if(typeof nombreProducto !== 'string'){
        res.status(400).send({mensaje : "El nombre del producto debe ser un texto."});
        return;
    }
    if(nombreProducto.length < 1 || nombreProducto.length > 100){
        res.status(400).send({mensaje : "El nombre del producto debe tener entre 1 y 100 caracteres"});
        return;
    }

    //validar stock actual
    const stockActual = req.body.stockActual;
    if(stockActual == undefined){
        res.status(400).send({mensaje : "El stock actual es requerido."});
        return;
    }
    if(stockActual === ''){
        res.status(400).send({mensaje : "El stock actual no debe estar vacío."});
        return;
    }
    if(isNaN(stockActual)){
        res.status(400).send({mensaje : "El stock actual no es un número."});
        return;
    }
    if(!Number.isInteger(stockActual)){
        res.status(400).send({mensaje : "El stock actual no es un entero"});
        return;
    }
    if(stockActual <= 0){
        res.status(400).send({mensaje : "El stock actual debe ser positivo."});
        return;
    }

    //validar precio de lista
    const precioLista = req.body.precioLista;
    if(precioLista == undefined){
        res.status(400).send({mensaje : "El precio de lista es requerido."});
        return;
    }
    if(precioLista === ''){
        res.status(400).send({mensaje : "El precio de lista no debe estar vacío."});
        return;
    }
    if(isNaN(precioLista)){
        res.status(400).send({mensaje : "El precio de lista no es un número."});
        return;
    }
    if(precioLista <= 0){
        res.status(400).send({mensaje : "El precio de lista debe ser positivo."});
        return;
    }

    //validar primer descuento
    const descuentoUno = req.body.descuentoUno;
    if(descuentoUno == undefined){
        res.status(400).send({mensaje : "El primer descuento es requerido."});
        return;
    }
    if(descuentoUno === ''){
        res.status(400).send({mensaje : "El primer descuento no debe estar vacío."});
        return;
    }
    if(isNaN(descuentoUno)){
        res.status(400).send({mensaje : "El primer descuento no es un número."});
        return;
    }
    if(descuentoUno <= 0){
        res.status(400).send({mensaje : "El primer descuento debe ser positivo."});
        return;
    }

    //validar costo intermedio
    const costoIntermedio = req.body.costoIntermedio;
    if(costoIntermedio == undefined){
        res.status(400).send({mensaje : "El costo intermedio es requerido."});
        return;
    }
    if(costoIntermedio === ''){
        res.status(400).send({mensaje : "El costo intermedio no debe estar vacío."});
        return;
    }
    if(isNaN(costoIntermedio)){
        res.status(400).send({mensaje : "El costo intermedio no es un número."});
        return;
    }
    if(costoIntermedio <= 0){
        res.status(400).send({mensaje : "El costo intermedio debe ser positivo."});
        return;
    }

    //validar segundo descuento
    const descuentoDos = req.body.descuentoDos;
    if(descuentoDos == undefined){
        res.status(400).send({mensaje : "El segundo descuento es requerido."});
        return;
    }
    if(descuentoDos === ''){
        res.status(400).send({mensaje : "El segundo descuento no debe estar vacío."});
        return;
    }
    if(isNaN(descuentoDos)){
        res.status(400).send({mensaje : "El segundo descuento no es un número."});
        return;
    }
    if(descuentoDos <= 0){
        res.status(400).send({mensaje : "El segundo descuento debe ser positivo."});
        return;
    }

    //validar costo final
    const costoFinal = req.body.costoFinal;
    if(costoFinal == undefined){
        res.status(400).send({mensaje : "El costo final es requerido."});
        return;
    }
    if(costoFinal === ''){
        res.status(400).send({mensaje : "El costo final no debe estar vacío."});
        return;
    }
    if(isNaN(costoFinal)){
        res.status(400).send({mensaje : "El costo final no es un número."});
        return;
    }
    if(costoFinal <= 0){
        res.status(400).send({mensaje : "El costo final debe ser positivo."});
        return;
    }

    //validar incremento
    const incremento = req.body.incremento;
    if(incremento == undefined){
        res.status(400).send({mensaje : "El incremento es requerido."});
        return;
    }
    if(incremento === ''){
        res.status(400).send({mensaje : "El incremento no debe estar vacío."});
        return;
    }
    if(isNaN(incremento)){
        res.status(400).send({mensaje : "El incremento no es un número."});
        return;
    }
    if(incremento <= 0){
        res.status(400).send({mensaje : "El incremento debe ser positivo."});
        return;
    }

    //validar precio sugerido
    const precioSugerido = req.body.precioSugerido;
    if(precioSugerido == undefined){
        res.status(400).send({mensaje : "El precio sugerido es requerido."});
        return;
    }
    if(precioSugerido === ''){
        res.status(400).send({mensaje : "El precio sugerido no debe estar vacío."});
        return;
    }
    if(isNaN(precioSugerido)){
        res.status(400).send({mensaje : "El precio sugerido no es un número."});
        return;
    }
    if(precioSugerido <= 0){
        res.status(400).send({mensaje : "El precio sugerido debe ser positivo."});
        return;
    }

    //validar precio final
    const precioFinal = req.body.precioFinal;
    if(precioFinal == undefined){
        res.status(400).send({mensaje : "El precio final es requerido."});
        return;
    }
    if(precioFinal === ''){
        res.status(400).send({mensaje : "El precio final no debe estar vacío."});
        return;
    }
    if(isNaN(precioFinal)){
        res.status(400).send({mensaje : "El precio final no es un número."});
        return;
    }
    if(precioFinal <= 0){
        res.status(400).send({mensaje : "El precio final debe ser positivo."});
        return;
    }

    //validar ganancia
    const ganancia = req.body.ganancia;
    if(ganancia == undefined){
        res.status(400).send({mensaje : "La ganancia es requerida."});
        return;
    }
    if(ganancia === ''){
        res.status(400).send({mensaje : "La ganancia no debe estar vacía."});
        return;
    }
    if(isNaN(ganancia)){
        res.status(400).send({mensaje : "La ganancia no es un número."});
        return;
    }
    if(ganancia <= 0){
        res.status(400).send({mensaje : "La ganancia debe ser positiva."});
        return;
    }

    //validar id de la categoria
    const idCategoria = req.body.idCategoria;
    if(idCategoria == undefined){
        res.status(400).send({mensaje : "El id de la categoria es requerido."});
        return;
    }
    if(idCategoria === ''){
        res.status(400).send({mensaje : "El id de la categoria no debe estar vacío."});
        return;
    }
    if(isNaN(idCategoria)){
        res.status(400).send({mensaje : "El id de la categoria no es un número."});
        return;
    }
    if(!Number.isInteger(idCategoria)){
        res.status(400).send({mensaje : "El id de la categoria no es un entero"});
        return;
    }
    if(idCategoria <= 0){
        res.status(400).send({mensaje : "El id de la categoria debe ser positivo."});
        return;
    }

    //validar id de la fabrica
    const idFabrica = req.body.idFabrica;
    if(idFabrica == undefined){
        res.status(400).send({mensaje : "El id de la fabrica es requerido."});
        return;
    }
    if(idFabrica === ''){
        res.status(400).send({mensaje : "El id de la fabrica no debe estar vacío."});
        return;
    }
    if(isNaN(idFabrica)){
        res.status(400).send({mensaje : "El id de la fabrica no es un número."});
        return;
    }
    if(!Number.isInteger(idFabrica)){
        res.status(400).send({mensaje : "El id de la fabrica no es un entero"});
        return;
    }
    if(idFabrica <= 0){
        res.status(400).send({mensaje : "El id de la fabrica debe ser positivo."});
        return;
    }

    next();
}

export default validarAtributosProducto;