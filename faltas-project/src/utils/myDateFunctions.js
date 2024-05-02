export function getLunesCercano(fecha){
    var dia = fecha.getDay();
    var diasParaLunes = dia - 1;

    if(diasParaLunes==0){
        return fecha;
    }
    
    var lunesAnteriorCercano = new Date(fecha);
    lunesAnteriorCercano.setDate(fecha.getDate() - diasParaLunes);

    return lunesAnteriorCercano;
}