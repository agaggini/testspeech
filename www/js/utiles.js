window.formatFecha = function(fecha) {
	var d = new Date(fecha);

	return ("0" + d.getDate()).slice(-2)) + "-" + (d.getMonth()+1)).slice(-2)) + "-" + (d.getFullYear());
}