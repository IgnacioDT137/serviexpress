function imprimir(numero) {
  const doc = new jsPDF()

  const id_bol = "folio" + numero
  var boleta = document.getElementById(id_bol).innerHTML

  const id_fecha = "fecha" + numero
  var fecha = document.getElementById(id_fecha).innerHTML

  const id_valor = "valor" + numero
  var valor = document.getElementById(id_valor).innerHTML

  const id_sol = "soli" + numero
  var solicitud = document.getElementById(id_sol).innerHTML
  
  doc.text(boleta, 10, 10) 
  doc.text(fecha, 10, 20) 
  doc.text(valor, 10, 30)
  doc.text(solicitud, 10, 40)

  doc.save("boleta.pdf")
}