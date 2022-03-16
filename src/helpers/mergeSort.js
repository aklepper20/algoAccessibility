const handleMergeSort = (arr) => {
  if (arr.length <= 1) {
    return arr;
  }
  let mid = Math.floor(arr.length / 2);
  let left = handleMergeSort(arr.slice(0, mid));
  let right = handleMergeSort(arr.slice(mid));
  return merge(left, right);
};

function merge(left, right) {
  let sorted = [];
  while (left.length && right.length) {
    if (left[0].percent > right[0].percent) {
      sorted.push(right.shift());
    } else {
      sorted.push(left.shift());
    }
  }
  return sorted.concat(left.concat(right));
}

export default handleMergeSort;
