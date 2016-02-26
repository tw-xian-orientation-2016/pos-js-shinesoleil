function getBarcodeQuantity(tags) {
  var orderedTags = tags.sort();
  var barcodesCount = {};

  orderedTags.forEach(function(currentTag) {
    var count;
    var barcodePartInTag = currentTag.split('-')[0];
    var numberPartInTag = parseFloat(currentTag.split('-')[1]);

    count = numberPartInTag || 1;
    if(!barcodesCount[barcodePartInTag]) {
      barcodesCount[barcodePartInTag] = count;
    }
    else {
      barcodesCount[barcodePartInTag] += count;
    }
  });

  return barcodesCount;
}

function getCartDetail(barcodesCount, itemList) {
  var cartItems = [];

  for(var barcode in barcodesCount) {
    var count = barcodesCount[barcode];
    itemList.forEach(function(item) {
      if(item.barcode === barcode) {
        cartItems.push({
          'item': item,
          'count': count
        });
      }
    });
  }

  return cartItems;
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

function printDetail(cartItemDetails) {
  var total = 0;
  var totalSavedMoney = 0;
  var text = '';

  text += '***<没钱赚商店>收据***\n';
  for(var i=0; i<cartItemDetails.length; i++) {
    var cartItemDetail = cartItemDetails[i];
    var cartItem = cartItemDetail.cartItem;

    total += cartItemDetail.subtotal;
    totalSavedMoney += cartItemDetail.savedMoney;
    text +=
      '名称：' + cartItem.item.name+ '，数量：' + cartItem.count +
      cartItem.item.unit  + '，单价：' + cartItem.item.price.toFixed(2) +
      '(元)，小计：' + cartItemDetail.subtotal.toFixed(2)+ '(元)\n';
  }
  text +=
    '----------------------\n' +
    '总计：'+ total.toFixed(2) +'(元)\n' +
    '节省：'+ totalSavedMoney.toFixed(2) +'(元)\n' +
    '**********************';
  console.log(text);
}

function printReceipt(inputs) {
  var allItems = loadAllItems();
  var promotions = loadPromotions();

  var barcodes =  getBarcodeQuantity(inputs);
  var cartItems = getCartDetail(barcodes, allItems);
  var cartItemsDetail = getSubtotal(cartItems, promotions);
  printDetail(cartItemsDetail);
}


