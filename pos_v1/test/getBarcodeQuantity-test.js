describe('getBarcodeQuantity test', function() {
  var inputs = [
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

  var outputs =
  {
    'ITEM000001': 5,
    'ITEM000003': 2,
    'ITEM000005': 3
  };

  it('counts the quantity of every item ', function() {
    expect(getBarcodeQuantity(inputs)).toEqual(outputs);
  })
});
