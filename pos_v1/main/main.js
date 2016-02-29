function getBarcodeQuantity(tags) {
  var barcodesCount = {};

  tags.forEach(function(currentTag) {
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

function getCartItem(barcodesCount) {
  var itemList = loadAllItems();
  var cartItems = [];

  for(var barcode in barcodesCount) {
    var count = barcodesCount[barcode];
    itemList.forEach(function(item) {
      if(item.barcode === barcode) {
        cartItems.push({
          item: item,
          count: count
        });
      }
    });
  }

  return cartItems;
}


var promoTypes = [
  'BUY_TWO_GET_ONE_FREE',
  'OTHER_PROMOTION'
];

var getSubtotalByPromoType = [
  function(cartItem) {
    var price = cartItem.item.price;
    var count = cartItem.count;

    var quantityToPay = count - parseInt(count/3);
    return subtotal = quantityToPay * price;

  },
  //other promotions to be defined
  function() {

  }
];

function getPromoType(cartItem) {
  var promos = loadPromotions();
  var barcode = cartItem.item.barcode;

  for(var i=0; i<promos.length; i++) {
    if(promos[i].barcodes.indexOf(barcode) !== -1) {
      return promos[i].type;
    }
  }
}

function getReceiptItems(cartItems) {
  var receiptItems = [];

  cartItems.forEach(function(currentCartItem) {
    var subtotal;
    var originalSubtotal = currentCartItem.item.price * currentCartItem.count;
    var promoType = getPromoType(currentCartItem);
    if(promoTypes.indexOf(promoType) !== -1) {
      subtotal = getSubtotalByPromoType[promoTypes.indexOf(promoType)](currentCartItem);
    }
    else {
      subtotal = originalSubtotal;
    }
    receiptItems.push({
      cartItem: currentCartItem,
      subtotal: subtotal,
      savedMoney: originalSubtotal - subtotal
    })
  });

  return receiptItems;
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
  var barcodes =  getBarcodeQuantity(inputs);
  var cartItems = getCartItem(barcodes);
  var cartItemsDetail = getReceiptItems(cartItems);

  printDetail(cartItemsDetail);
}


