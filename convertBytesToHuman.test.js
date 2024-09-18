/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman('12 гигабайт')).toBe(false)
  expect(convertBytesToHuman('12')).toBe(false)
  expect(convertBytesToHuman(-1024)).toBe(false)
  expect(convertBytesToHuman('-2560')).toBe(false)
  expect(convertBytesToHuman(undefined)).toBe(false)
  expect(convertBytesToHuman(null)).toBe(false)
  expect(convertBytesToHuman(NaN)).toBe(false)
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(1)).toBe('1 B')
  expect(convertBytesToHuman(1024)).toBe('1 KB')
  expect(convertBytesToHuman(1048576)).toBe('1 MB')
  expect(convertBytesToHuman(1073741824)).toBe('1 GB')
  expect(convertBytesToHuman(1099511627776)).toBe('1 TB')
  expect(convertBytesToHuman(1125899906842624)).toBe('1 PB')
  expect(convertBytesToHuman(10256)).toBe('10.02 KB')
  expect(convertBytesToHuman(1050)).toBe('1.03 KB')
  expect(convertBytesToHuman(0)).toBe('0 B')
  expect(convertBytesToHuman(1023)).toBe('1023 B')
  expect(convertBytesToHuman(1025)).toBe('1 KB')
});

