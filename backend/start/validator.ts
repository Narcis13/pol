/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { string } from '@ioc:Adonis/Core/Helpers'
import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('cuivalid', (value, _, options) => {
  if (typeof value !== 'string') {
    return
  }
  var v=value
  if ( v&&v.length>10 ) return ;
  var cifra_control=v.substr(v.length-1, 1);
  var cif=v.substr(0, v.length-1);
  while (cif.length!=9){
      cif='0'+cif;
  }
  var suma=parseInt(cif.charAt(0)) * 7 + parseInt(cif.charAt(1)) * 5 + parseInt(cif.charAt(2)) * 3 + parseInt(cif.charAt(3)) * 2 + parseInt(cif.charAt(4)) * 1 + parseInt(cif.charAt(5)) * 7 + parseInt(cif.charAt(6)) * 5 + parseInt(cif.charAt(7)) * 3 + parseInt(cif.charAt(8)) * 2;

  suma=suma*10;
  var rest=suma%11;
  if ( rest==10 ) rest=0;

  if (rest !== parseInt(cifra_control)) {
    options.errorReporter.report(
      options.pointer,
      'cuivalid',
      'Cifra de control a codului fiscal este gresita',
      options.arrayExpressionPointer
    )
  }
})