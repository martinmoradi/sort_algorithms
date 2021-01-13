const fs = require("fs");
const { type } = require("os");
const { parse } = require("path");
const { cpuUsage } = require("process");

const data = process.argv[2];
fs.readFile(data, "utf8", (error, data) => {
  if (error) {
    console.error(error.message);
    return;
  }
  arr_numbers = data.split(" ").map((num) => parseInt(num, 10));

  /* ------------------------------------------------------------------------------ */
  // Tri à bulle / Bubble sort

  const bubbleSort = (arr_numbers) => {
    let numbers = [...arr_numbers];
    let comparaisonsCounter = 0;
    for (let i = 0; i < numbers.length; i++) {
      for (let j = 1; j < numbers.length - i; j++) {
        comparaisonsCounter++;
        if (numbers[j - 1] > numbers[j]) {
          [numbers[j - 1], numbers[j]] = [numbers[j], numbers[j - 1]];
        }
      }
    }
    return `Tri à bulle/Bubble Sort: ${comparaisonsCounter} comparaisons - [${numbers}]`;
  };

  /* ------------------------------------------------------------------------------ */
  // Tri par insertion / Insertion sort

  const insersionSort = (arr_numbers) => {
    let numbers = [...arr_numbers];
    let comparaisonsCounter = 0;

    for (let i = 1; i < numbers.length; i++) {
      x = numbers[i];
      j = i;
      while (j > 0 && numbers[j - 1] > x) {
        comparaisonsCounter++;
        numbers[j] = numbers[j - 1];
        j -= 1;
      }
      numbers[j] = x;
    }
    return `Tri par insertion/Insertion sort: ${comparaisonsCounter} comparaisons - [${numbers}]`;
  };

  /* ------------------------------------------------------------------------------ */
  // Tri par selection / Selection sort

  const selectionSort = (arr_numbers) => {
    let numbers = [...arr_numbers];
    let comparaisonsCounter = 0;

    for (let i = 0; i < numbers.length - 1; i++) {
      min = i;
      for (let j = i + 1; j < numbers.length; j++) {
        comparaisonsCounter++;
        if (numbers[j] < numbers[min]) min = j;
      }
      if (min !== i) {
        let temp = numbers[i];
        numbers[i] = numbers[min];
        numbers[min] = temp;
      }
    }
    return `Tri par sélection/Selection sort: ${comparaisonsCounter} comparaisons - [${numbers}]`;
  };

  /* ------------------------------------------------------------------------------ */
  // Tri rapide (tri pivot) / Quicksort

  const quickSort = (arr_numbers) => {
    let counter = 0;
    let numbers = [...arr_numbers];

    const sort = (numbers) => {
      if (numbers.length <= 1) return numbers;
      const pivot = numbers[0];
      let right = [];
      let left = [];

      for (let i = 1; i < numbers.length; i++) {
        counter++;
        numbers[i] < pivot ? left.push(numbers[i]) : right.push(numbers[i]);
      }
      return sort(left, counter).concat(pivot, sort(right, counter));
    };

    numbers = sort(numbers);
    return `Tri rapide/QuickSort: ${counter} comparaisons [${numbers}]`;
  };

  /* ------------------------------------------------------------------------------ */
  // Tri fusion (merge sort)

  const mergeSort = (arr_numbers) => {
    let counter = 0;
    let numbers = [...arr_numbers];
    let half;

    const merger = (left, right) => {
      let arr = [];
      while (left.length && right.length) {
        if (left[0] < right[0]) {
          arr.push(left.shift()); // remove from the left part and push into the sorted array
        } else {
          arr.push(right.shift()); // remove from the right part and push into the sorted array
        }
      }
      return [...arr, ...left, ...right];
    };

    const mergeSortSplit = (numbers, half = numbers.length / 2) => {
      counter++;
      if (numbers.length < 2) return numbers;
      let left = numbers.splice(0, half); //left part of numbers
      return merger(mergeSortSplit(left), mergeSortSplit(numbers));
    };

    numbers = mergeSortSplit(arr_numbers, half);
    return `Tri fusion/Merge Sort: ${counter} comparaisons [${numbers}]`;
  };

  /* ------------------------------------------------------------------------------ */
  // Tri par tas / HeapSort

  const heapSort = (arr_numbers) => {
    let numbers = [...arr_numbers];
    let counter = 0;

    const heapSortMain = (numbers) => {
      buildMaxHeap(numbers); // Build max heap
      lastElement = numbers.length - 1; // Get the index of the last element
      while (lastElement > 0) {
        // Continue heap sorting until we have one element left
        swap(numbers, 0, lastElement);
        heapify(numbers, 0, lastElement);
        lastElement -= 1;
      }
      return numbers; // Return sorted array
    };

    const swap = (numbers, firstItemIndex, lastItemIndex) => {
      const temp = numbers[firstItemIndex];
      // Swap first and last items in the array
      numbers[firstItemIndex] = numbers[lastItemIndex];
      numbers[lastItemIndex] = temp;
    };

    const heapify = (heap, i, max) => {
      let index;
      let leftChild;
      let rightChild;
      while (i < max) {
        counter++;
        index = i;
        // Get the left child index using known formula
        leftChild = 2 * i + 1;
        // Get the right child index
        rightChild = leftChild + 1;
        if (leftChild < max && heap[leftChild] > heap[index]) {
          index = leftChild;
        }
        if (rightChild < max && heap[rightChild] > heap[index]) {
          index = rightChild;
        }
        if (index === i) {
          return;
        }
        swap(heap, i, index);
        i = index;
      }
    };

    const buildMaxHeap = (numbers) => {
      // Get index of the middle element
      let i = Math.floor(numbers.length / 2 - 1);
      while (i >= 0) {
        heapify(numbers, i, numbers.length);
        i -= 1;
      }
    };
    sorted = heapSortMain(numbers);
    return `Tri par tas/HeapSort: ${counter} comparaisons [${sorted}]`;
  };

  const oddEvenSort = (arr_numbers) => {
    let counter = 0;
    let numbers = [...arr_numbers];

    const swap = (numbers, firstItemIndex, lastItemIndex) => {
      const temp = numbers[firstItemIndex];
      // Swap first and last items in the array
      numbers[firstItemIndex] = numbers[lastItemIndex];
      numbers[lastItemIndex] = temp;
    };

    let sorted = false;
    while (!sorted) {
      sorted = true;
      for (let i = 0; i < numbers.length - 1; i += 2) {
        counter++;
        if (numbers[i] > numbers[i + 1]) {
          swap(numbers, i, i + 1);
          sorted = false;
        }
      }
      for (let i = 1; i < numbers.length - 1; i += 2) {
        counter++;
        if (numbers[i] > numbers[i + 1]) {
          swap(numbers, i, i + 1);
          sorted = false;
        }
      }
    }
    return `Tri pair/impair/ Odd-Even Sort: ${counter} comparaisons [${numbers}]`;
  };

  console.log(bubbleSort(arr_numbers));
  arr_numbers = data.split(" ").map((num) => parseInt(num, 10));
  console.log(insersionSort(arr_numbers));
  arr_numbers = data.split(" ").map((num) => parseInt(num, 10));
  console.log(selectionSort(arr_numbers));
  arr_numbers = data.split(" ").map((num) => parseInt(num, 10));
  console.log(quickSort(arr_numbers));
  arr_numbers = data.split(" ").map((num) => parseInt(num, 10));
  console.log(mergeSort(arr_numbers));
  arr_numbers = data.split(" ").map((num) => parseInt(num, 10));
  console.log(heapSort(arr_numbers));
  arr_numbers = data.split(" ").map((num) => parseInt(num, 10));
  console.log(oddEvenSort(arr_numbers));
});
