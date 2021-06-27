export default function validarReferenciaCatastral(referenciaCatastral) {
  //Valor por el que se debe multiplicar cada posición de cada subcadena
  var pesoPosicion = [13, 15, 12, 5, 4, 17, 9, 21, 3, 7, 1]
  var letraDc = 'MQWERTYUIOPASDFGHJKLBZX'

  //Sólo se comprueban las referencias catastrales con 20 carácteres alfanuméricos,
  //los dos últimos corresponden a los dígitos de control.
  if (referenciaCatastral === null || referenciaCatastral.length !== 20) {
    return false
  }
  referenciaCatastral = referenciaCatastral.toUpperCase()

  //Para calcular cada dígito de control se utilizan siguientes subcadenas
  var cadenaPrimerDC = (
    referenciaCatastral.substring(0, 7) + referenciaCatastral.substring(14, 18)
  ).toUpperCase()
  var cadenaSegundoDC = (
    referenciaCatastral.substring(7, 14) + referenciaCatastral.substring(14, 18)
  ).toUpperCase()

  var cadenasDC = [cadenaPrimerDC, cadenaSegundoDC]
  var dcCalculado = ''

  cadenasDC.forEach(function (cadena) {
    var sumaDigitos = 0

    /*
            Para el cálculo de cada dígito de control, se deben de sumar cada
            uno de los carácteres de cada cadena.
            Si el carácter no es numérico el valor corresponde de la siguiente 
            manera: A = 1, B = 2, ..., Z = 27.
        */
    cadena.split('').forEach(function (caracter, posicion) {
      valorCaracter = caracter

      if (caracter >= 'A' && caracter <= 'N') {
        valorCaracter = caracter.charCodeAt() - 64
      } else if (caracter === 'Ñ') {
        valorCaracter = 15
      } else if (caracter > 'N') {
        valorCaracter = caracter.charCodeAt() - 63
      }

      sumaDigitos = (sumaDigitos + valorCaracter * pesoPosicion[posicion]) % 23
    })

    //Valor del dígito de control calculado
    dcCalculado += letraDc.charAt(sumaDigitos)
  })

  if (dcCalculado !== referenciaCatastral.substring(18, 20)) {
    return false
  }
  return true
}
