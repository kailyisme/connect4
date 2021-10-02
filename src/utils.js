function buildSeqArray(length) {
  return Array.from({ length }).map((_, index) => index);
}

function reverseArray(array) {
  return array.map((_, index, array) => array[array.length - 1 - index]);
}

export { buildSeqArray, reverseArray };
