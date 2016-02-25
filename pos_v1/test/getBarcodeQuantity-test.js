describe('getBarcodeQuantity test', function() {
  inputs = [
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000001',
    'ITEM000003-2',
    'ITEM000005',
    'ITEM000005',
    'ITEM000005'
  ];

  outputs = [
    {
      'barcode':'ITEM000001',
      'count': 5
    },
    {
      'barcode':'ITEM000003',
      'count': 2
    },
    {
      'barcode':'ITEM000005',
      'count': 3
    }
  ];

  it('counts the quantity of every item ', function() {
    expect(gerBarcodeQuantity(inputs)).toBe(outputs);
  })
});
