describe('getCartDetail test', function() {
  var inputs1 =
  {
    'ITEM000001': 5,
    'ITEM000003': 2,
    'ITEM000005': 3
  };

  var inputs2 = loadAllItems();

  var outputs =
  [
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

  it('convert barcodes to item details ', function() {
    expect(getCartDetail(inputs1, inputs2)).toEqual(outputs);
  })
});
