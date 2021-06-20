import { simplifiedNumber } from 'helpers';

it('should transforms number more than 1000 into 1k etc', () => {
  expect(simplifiedNumber(1000)).toEqual('1k');
  expect(simplifiedNumber(1100)).toEqual('1.1k');
});

it('should not transform number if the number less than 1000', () => {
  expect(simplifiedNumber(600)).toEqual('600');
});
