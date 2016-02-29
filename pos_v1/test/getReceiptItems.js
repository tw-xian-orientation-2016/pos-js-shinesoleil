describe('getReceiptItems test', function() {
  var inputs1 = [
    {
      item:{
        barcode: 'ITEM000001',
        name: '雪碧',
        unit: '瓶',
        price: 3.00
      },
      count: 5
    },
    {
      item:{
        barcode: 'ITEM000003',
        name: '荔枝',
        unit: '斤',
        price: 15.00
      },
      count: 2
    },
    {
      item:{
        barcode: 'ITEM000005',
        name: '方便面',
        unit: '袋',
        price: 4.50
      },
      count: 3
    }
  ];

  var inputs2 = loadPromotions();

  var outputs = [
    {
      cartItem: {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 5
      },
      subtotal: 12,
      savedMoney: 3
    },
    {
      cartItem: {
        item: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2
      },
      subtotal: 30,
      savedMoney: 0
    },
    {
      cartItem: {
        item:{
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.50
        },
        count: 3
      },
      subtotal: 9,
      savedMoney: 4.5
    }
  ];

  it("add subtotal property", function() {
    expect(getReceiptItems(inputs1, inputs2)).toEqual(outputs);
  });
});
