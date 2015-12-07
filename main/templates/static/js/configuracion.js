var boolGeneral=true;
function editarConfGeneral()
{
    if(boolGeneral){
        $(".escondidoGeneral").css("display","block");
        $(".infoGeneral").css("display","none");
    }
    else{
        $(".escondidoGeneral").css("display","none");
        $(".infoGeneral").css("display","block");
    }
    boolGeneral=!boolGeneral;
}

var boolFCL=true;
function editarFCL()
{
    if(boolFCL){
        $(".escondidoFCL").css("display","block");
        $(".infoFCL").css("display","none");
    }
    else{
        $(".escondidoFCL").css("display","none");
        $(".infoFCL").css("display","block");
    }
    boolFCL=!boolFCL;
}

var boolLCL=true;
function editarLCL()
{
    if(boolLCL){
        $(".escondidoLCL").css("display","block");
        $(".infoLCL").css("display","none");
    }
    else{
        $(".escondidoLCL").css("display","none");
        $(".infoLCL").css("display","block");
    }
    boolLCL=!boolLCL;
}

var boolAereo=true;
function editarAereo()
{
    if(boolAereo){
        $(".escondidoAereo").css("display","block");
        $(".infoAereo").css("display","none");
    }
    else{
        $(".escondidoAereo").css("display","none");
        $(".infoAereo").css("display","block");
    }
    boolAereo=!boolAereo;
}