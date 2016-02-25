function getBarcodeQuantity(inputs) {
  var inputsInOrder = inputs.sort();
  var barcodes = {};

  for(var i=0; i<inputsInOrder.length; i++) {
    var barcode = inputsInOrder[i];
    var number;

    if(barcode.indexOf('-') !== -1) {
      number = parseInt(barcode.split('-')[1]);
      barcode = barcode.split('-')[0];
    }
    else {
      number = 1;
    }

    if(!barcodes[barcode]) {
      barcodes[barcode] = number;
    }
    else {
      barcodes[barcode] += number;
    }
  }
  return barcodes;
}
