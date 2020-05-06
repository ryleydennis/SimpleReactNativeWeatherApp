import { GetData, GetIcon } from '../api/APIHelperFunctions';

const pi = 3.14159265359;

const parent = {
  child: pi,
};

test('GetData retrieves child from parent', () => {
  expect(GetData(parent, 'child')).toBe(pi);
});

test('GetData retrieves child with suffix', () => {
  expect(GetData(parent, 'child', '', '!')).toBe(`${pi}!`);
});

test('GetData uses placeHolder with missing child', () => {
  expect(GetData(parent, 'notAChild')).toBe('');
});

test('GetData uses custom placeHolder with missing child', () => {
  expect(GetData(parent, 'notAChild', '*')).toBe('*');
});

test('GetData retrieves child with decimal places', () => {
  expect(GetData(parent, 'child', '', '', 2)).toBe('3.14');
});

test('GetData retrieves child with decimal places and suffix', () => {
  expect(GetData(parent, 'child', '', '!', 2)).toBe('3.14!');
});

test('GetData uses placeholder and suffix with missing child', () => {
  expect(GetData(parent, 'notAChild', '*', '!')).toBe('*!');
});

test('GetData uses placeholder and suffix with missing child ignoring decimal place', () => {
  expect(GetData(parent, 'notAChild', '*', '!', 10)).toBe('*!');
});


const correctUrl = 'https://openweathermap.org/img/wn/01d@2x.png';
const icon = '01d';
test('GetIcon returns correct url for icon', () => {
  expect(GetIcon(icon)).toBe(correctUrl);
});

test('GetIcon returns empty url for empty icon', () => {
  expect(GetIcon('')).toBe('');
});
