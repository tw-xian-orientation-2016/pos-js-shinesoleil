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
    var subtotal;
    var originalSubtotal;
    if(promoBarcodes.indexOf(cartItem.item.barcode) !== -1) {
      var quantityToPay = cartItem.count - parseInt(cartItem.count/3);
      subtotal = quantityToPay * cartItem.item.price;
      originalSubtotal = cartItem.count* cartItem.item.price;

      res.push({
        cartItem:cartItem,
        subtotal: subtotal,
        savedMoney: originalSubtotal - subtotal
      })
    }
    else{
      subtotal = cartItem.count * cartItem.item.price;
      res.push({
        cartItem: cartItem,
        subtotal: subtotal,
        savedMoney: 0
      })
    }
  }
  return res;
}

function printReceipt(cartItemDetails) {
  var total = 0;
  var totalSavedMoney = 0;

  console.log('***<没钱赚商店>收据***\n');
  for(var i=0; i<cartItemDetails.length; i++) {
    var cartItemDetail = cartItemDetails[i];
    var cartItem = cartItemDetail.cartItem;

    total += cartItemDetail.subtotal;
    totalSavedMoney += cartItemDetail.savedMoney;
    console.log(
      '名称：' + cartItem.item.name+ '，数量：' + cartItem.count +
      '(' + cartItem.item.unit + ')' + '，单价：' + cartItem.item.price +
      '(元)，小计：' + cartItemDetail.subtotal+ '(元)\n'
    );
  }

  console.log(
    '----------------------\n' +
    '总计：'+ total +'(元)\n' +
    '节省：'+ totalSavedMoney +'(元)\n' +
    '**********************'
  );
}

