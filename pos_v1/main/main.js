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

function getCartItem(barcodesCount, itemList) {
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

function getCartItemDetails(cartItems, promotions) {
  var cartItemDetails = [];
  var promoBarcodes = promotions[0].barcodes;

  cartItems.forEach(function(currentCartItem) {
    var subtotal;
    var originalSubtotal;
    var quantityToPay = currentCartItem.count - parseInt(currentCartItem.count/3);

    subtotal = quantityToPay * currentCartItem.item.price;
    originalSubtotal = currentCartItem.item.price * currentCartItem.count;

    cartItemDetails.push({
      cartItem: currentCartItem,
      subtotal: subtotal,
      savedMoney: originalSubtotal - subtotal
    })
  });

  return cartItemDetails;
}

function printDetail(cartItemDetails) {
  var total = 0;
  var totalSavedMoney = 0;
  var text = '';

  text += '***<没钱赚商店>收据***\n';
  cartItemDetails.forEach(function(currentCartItemDetail) {
    var cartItem = currentCartItemDetail.cartItem;
    total += currentCartItemDetail.subtotal;
    totalSavedMoney += currentCartItemDetail.savedMoney;
    text +=
      '名称：' + cartItem.item.name+ '，数量：' + cartItem.count +
      cartItem.item.unit  + '，单价：' + cartItem.item.price.toFixed(2) +
      '(元)，小计：' + currentCartItemDetail.subtotal.toFixed(2)+ '(元)\n';
  });

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
  var cartItems = getCartItem(barcodes, allItems);
  var cartItemsDetail = getCartItemDetails(cartItems, promotions);
  printDetail(cartItemsDetail);
}


