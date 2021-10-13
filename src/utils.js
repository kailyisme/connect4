function buildSequentialArray(length) {
  return Array.from({ length }).map((_, index) => index);
}

function reverseArray(array) {
  return array.map((_, index, array) => array[array.length - 1 - index]);
}

function title(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export { buildSeqArray, reverseArray, title };
