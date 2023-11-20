function saveLocalStorage(clave, valor, time){
    const ahora = new Date();

    const expiracion = new Date(ahora.getTime() + time * 60 * 1000);
    const datos = {
        valor: valor,
        expiracion: expiracion.getTime(),
    }
    localStorage.setItem(clave, JSON.stringify(datos));
}


function ontenerConExpiracion(clave) {
    const datos = localStorage.getItem(clave);

    if(datos) {
        const parseDatos = JSON.parse(datos);
        const expiracion = parseDatos.expiracion;

        if(expiracion && expiracion > new Date().getTime()) {
            return parseDatos.valor;
        }else {
            localStorage.removeItem(clave)
        }
    }
}