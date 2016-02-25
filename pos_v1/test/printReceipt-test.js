describe('printReceipt test', function() {
  var inputs = [
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

  var outputs =
    '***<没钱赚商店>收据***\n' +
    '名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)\n' +
    '名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)\n' +
    '名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)\n' +
    '----------------------\n' +
    '总计：51.00(元)\n' +
    '节省：7.50(元)\n' +
    '**********************';

  it('prints a receipt', function() {
    expect(printReceipt(inputs)).toEqual(outputs);
  })
});
