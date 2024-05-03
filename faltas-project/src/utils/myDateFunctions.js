export function getLunesCercano(fecha){
    var dia = fecha.getDay();
    var diasParaLunes = dia - 1;

    if(diasParaLunes==0){
        return fecha;
    }
    
    var lunesAnteriorCercano = new Date(fecha);
    console.log("dia para lunes"+diasParaLunes);
    lunesAnteriorCercano.setDate(fecha.getDate() - diasParaLunes);

    return lunesAnteriorCercano;
}

export function convertDateToString(myDate){
    return myDate.toISOString().split("T")[0];
}