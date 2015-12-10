var boolGeneral=true;

jQuery(window).load(function () {
    console.log("loaded");
});


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

$('#tabla-puertos').Tabledit({
    columns: {
        identifier: [0, 'id'],
        editable: [ [3, 'FCL 20'], [4, 'FCL 40'], [5, 'Tiempo de tránsito'], [6, 'Gastos FOB'], [7, 'Gastos naviera'], [8, 'Manejo'], [9, 'Collect Fee']]
    },
    buttons: {
        save: {
            html: 'Guardar'
        },
        confirm: {
            html: 'Confirmar'
        }
    }
});

$('#tabla-puertos').stickyTableHeaders({
    fixedOffset: $('.navbar-inverse')
});
