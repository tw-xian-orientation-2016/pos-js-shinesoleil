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

function getCartDetail(barcodes, itemList) {
  var res = [];

  for(var barcode in barcodes) {
    var count = barcodes[barcode];
    for(var i=0; i<itemList.length; i++) {
      if(itemList[i].barcode === barcode) {
        res.push({
          'item': itemList[i],
          'count': count
        });
      }
    }
  }
  return res;
}

function getSubtotal(cartItems, promotions) {
  var res = [];
  var promoBarcodes = promotions[0].barcodes;

  for(var i=0; i<cartItems.length; i++) {
    var cartItem = cartItems[i];
    if(promoBarcodes.indexOf(cartItem.item.barcode) !== -1) {
      var quantityToPay = cartItem.count - parseInt(cartItem.count/3);
      var subtotal = quantityToPay * cartItem.item.price;
      console.log(quantityToPay);

      res.push({
        cartItem:cartItem,
        subtotal: subtotal
      })
    }
    else{
      var subtotal = cartItem.count * cartItem.item.price;
      res.push({
        cartItem: cartItem,
        subtotal: subtotal
      })
    }
  }
  return res;
}
