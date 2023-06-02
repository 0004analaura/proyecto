function aplicarEstilo(numero){
    var nombre = document.getElementById('nombre');
    var stile = document.getElementById('stile');
    var body = document.body;
                                              
    nombre.classList = "estilo" + numero;
    stile.classList = "estilo" + numero;
    body.classList = "estilo" + numero;
}