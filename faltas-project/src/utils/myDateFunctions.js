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
    const{year,month,day}=convertDateToObjYearMonthDay(myDate)
    return `${year}-${month}-${day}`;
}
export function convertDateToStringESP(myDate){
    const{year,month,day}=convertDateToObjYearMonthDay(myDate)
    return `${day}-${month}-${year}`;
}

export function convertDateToObjYearMonthDay(myDate){
    const year = myDate.getFullYear();
    const month = String(myDate.getMonth() + 1).padStart(2, '0');
    const day = String(myDate.getDate()).padStart(2, '0');
    return {year,month,day};
}

export function getActualDate(){
    return new Date()
}


