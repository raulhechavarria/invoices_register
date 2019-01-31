Ext.example = function(){
    var msgCt;

    function createBox(t, s){
       // return ['<div class="msg">',
       //         '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
       //         '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc"><h3>', t, '</h3>', s, '</div></div></div>',
       //         '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
       //         '</div>'].join('');
       return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
    }
    return {
        msg : function(title, format){
            if(!msgCt){
                msgCt = Ext.core.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
            var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.core.DomHelper.append(msgCt, createBox(title, s), true);
            m.hide();
            m.slideIn('t').ghost("t", { delay: 1000, remove: true});
        },

        init : function(){
//            var t = Ext.get('exttheme');
//            if(!t){ // run locally?
//                return;
//            }
//            var theme = Cookies.get('exttheme') || 'aero';
//            if(theme){
//                t.dom.value = theme;
//                Ext.getBody().addClass('x-'+theme);
//            }
//            t.on('change', function(){
//                Cookies.set('exttheme', t.getValue());
//                setTimeout(function(){
//                    window.location.reload();
//                }, 250);
//            });
//
//            var lb = Ext.get('lib-bar');
//            if(lb){
//                lb.show();
//            }
        }
    };
}();

Ext.example.shortBogusMarkup = '<b>El siguiente software es de c&oacute;digo abierto, pero no es gratuito. </b>'+
    '<ul><li>Efectuar estudios y evaluaci&oacute;n de ejecuciones de inversiones o proyectos para la Industria, Turismo, Inversi&oacute;n Extranjera y Proyectos de desarrollo local.'+
    '<li>Realizar estudios y evaluaci&oacute;n posteriores o post de inversiones o proyectos.'+
    '<li>Elaborar y comparar proyectos mutuamente excluyentes.</ul>';

Ext.example.shortBogusMarkup2 = '<b>Herramientas Utilizadas: </b>'+
    '<ul><li><img src="'+BASE_PATH+'/assets/images/codeigniter.png"/> <img src="'+BASE_PATH+'/assets/images/php2sv8.png"/> <img src="'+BASE_PATH+'/assets/images/logo-mysql.jpg"/>'+
    '<li>Framework de desarrollo: CodeIgniter(v 2.1).'+
    '<li>Lenguaje de programaci&oacute;n: PHP.'+
    '<li>Gestor de bases de datos: MySQL.</ul>';

Ext.example.bogusMarkup = '<img src="'+BASE_PATH+'/assets/images/pr_increase_sales.jpg"/><p> El presente software constituye '+
    'una herramienta eficaz para la elaboraci&oacute;n de Estudios de Factibilidad de las inversiones industriales, turismo e '+
    'inversi&oacute;n extranjera para su posterior evaluaci&oacute;n y aprobaci&oacute;n al Ministerio de Econom&iacute;a y Planificaci&oacute;n.</p>'+
    '<b>Principales funcionalidades del software: </b>'+
    '<ul><li>Efectuar estudios y evaluaci&oacute;n de ejecuciones de inversiones o proyectos para la Industria, Turismo, Inversi&oacute;n Extranjera y Proyectos de desarrollo local.'+
    '<li>Realizar estudios y evaluaci&oacute;n posteriores o post de inversiones o proyectos.'+
    '<li>Elaborar y comparar proyectos mutuamente excluyentes.</ul>';

//Ext.onReady(Ext.example.init, Ext.example);


// old school cookie functions
var Cookies = {};
Cookies.set = function(name, value){
     var argv = arguments;
     var argc = arguments.length;
     var expires = (argc > 2) ? argv[2] : null;
     var path = (argc > 3) ? argv[3] : '/';
     var domain = (argc > 4) ? argv[4] : null;
     var secure = (argc > 5) ? argv[5] : false;
     document.cookie = name + "=" + escape (value) +
       ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
       ((path == null) ? "" : ("; path=" + path)) +
       ((domain == null) ? "" : ("; domain=" + domain)) +
       ((secure == true) ? "; secure" : "");
};

Cookies.get = function(name){
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	var j = 0;
	while(i < clen){
		j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return Cookies.getCookieVal(j);
		i = document.cookie.indexOf(" ", i) + 1;
		if(i == 0)
			break;
	}
	return null;
};

Cookies.clear = function(name) {
  if(Cookies.get(name)){
    document.cookie = name + "=" +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
};

Cookies.getCookieVal = function(offset){
   var endstr = document.cookie.indexOf(";", offset);
   if(endstr == -1){
       endstr = document.cookie.length;
   }
   return unescape(document.cookie.substring(offset, endstr));
};