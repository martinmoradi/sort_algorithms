const fs = require("fs");
const { type } = require("os");
const { parse } = require("path");

const data = process.argv[2];
fs.readFile(data, "utf8", (error, data) => {
  if (error) {
    console.error(error.message);
    return;
  }
  arr_numbers = data.split(" ").map((num) => parseInt(num, 10));

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

  // Tri rapide (tri pivot) / Quicksort
  const quickSort = (numbers) => {
    let counter = 0;

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

    numbers = sort(numbers)
    return `Tri rapide/QuickSort: ${counter} comparaisons [${numbers}]`;
  };

  console.log(bubbleSort(arr_numbers));
  console.log(insersionSort(arr_numbers));
  console.log(selectionSort(arr_numbers));
  console.log(quickSort(arr_numbers));
});

/* Je me suis beaucoup trop emmerdé : 
let count = 0 
  const partition = (numbers, leftIndex, rightIndex) => {
    const pivot = numbers[rightIndex];
    let i = leftIndex;
    for (let j = leftIndex; j < rightIndex; j++) {
      count++;
      if (numbers[j] < pivot) {
        [numbers[j], numbers[i]] = [numbers[i], numbers[j]];
        i++;
      }
    }
    [numbers[i], numbers[rightIndex]] = [numbers[rightIndex], numbers[i]];
    return i;
  };

  const quickSort = (numbers, leftIndex, rightIndex, comparaisonsCounter) => {

    if (!comparaisonsCounter) {
     comparaisonsCounter = 1
    } else {
      comparaisonsCounter++;
    }
    if (!leftIndex) {
      leftIndex = 0;
    }
    if (!rightIndex) {
      rightIndex = numbers.length - 1;
    }

    if (leftIndex >= rightIndex) return
    let index = partition(numbers, leftIndex, rightIndex)
    // Recursion vers la gauche puis vers la droite
    quickSort(numbers, leftIndex, index - 1, comparaisonsCounter);
    quickSort(numbers, index + 1, rightIndex, comparaisonsCounter);
    return `Tri rapide / Quicksort : ${comparaisonsCounter} ${count} comparaisons - [${numbers}]`;
  }; */
