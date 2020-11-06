const sequence = 'abcdefghijklmnopqrstuvwxyz'.split('')
sequence.unshift('')
const odd = sequence.filter((seq, index) => index % 2)
const even = sequence.filter((seq, index) => index % 2 === 0)
const consonant = '2,3,4,6,7,8,10,11,12,13,14,16,17,18,19,20,22,23,24,25,26'.split(',').map(index => sequence[index])
const vowel = '1,5,9,15,21'.split(',').map(index => sequence[index])
const square = '1,4,9,16,25'.split(',').map(index => sequence[index])
const prime = '2,3,5,7,11,13,17,19,23'.split(',').map(index => sequence[index])
const composite = '4,6,8,9,10,12,14,15,16,18,20,21,22,24,25,26'.split(',').map(index => sequence[index])
const centrosymmetric = '8,9,14,15,19,24,26'.split(',').map(index => sequence[index])
const element = '2,3,6,8,9,11,14,15,16,19,21,22,23,25'.split(',').map(index => sequence[index])
const circle = 'ABDOPQR'.split('').map(char => char.toLowerCase())
const arc = 'ABDOPQR'.split('').map(char => char.toLowerCase())
const axisymmetric = 'ABCDEHIKMOTUVWXY'.split('').map(char => char.toLowerCase())
const stroke1 = 'BCDIJLMNOPRSUVWZ'.split('').map(char => char.toLowerCase())

module.exports = {
  sequence,
  odd,
  even,
  consonant,
  vowel,
  square,
  prime,
  composite,
  centrosymmetric,
  element,
  includeShape: {
    circle,
    arc
  },
  axisymmetric,
  '1stroke': stroke1
}
