const generateId = require('../../src/utils/generateId');

describe('Genrate Unique Id', () => {
  it('should generate an unique id', () => {
    const id = generateId();

    expect(id).toHaveLength(8);
  });
});
