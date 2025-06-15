const SortLib = (() => {
    function bubbleSort(arr, ascending = true) {
      let array = arr.slice();
      let n = array.length;
      let comparisons = 0;
      let swaps = 0;
      let hasUndefined = false;
  
      for (let i = 0; i < n; i++) {
        if (array[i] === undefined) hasUndefined = true;
      }
  
      if (hasUndefined) {
        console.log("У масиві були виявлені undefined-елементи. Під час сортування вони трактуються як найменші значення.");
      }
  
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          comparisons++;
          let a = array[j];
          let b = array[j + 1];
          let shouldSwap = false;
  
          if (a === undefined && b !== undefined) {
            shouldSwap = !ascending;
          } else if (a !== undefined && b === undefined) {
            shouldSwap = ascending;
          } else if (a !== undefined && b !== undefined) {
            shouldSwap = ascending ? a > b : a < b;
          }
  
          if (shouldSwap) {
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
            swaps++;
          }
        }
      }
  
      console.log(`Bubble sort — Порівнянь: ${comparisons}, Обмінів: ${swaps}`);
      return array;
    }
  
    function selectionSort(arr, ascending = true) {
      let array = arr.slice();
      let n = array.length;
      let comparisons = 0;
      let swaps = 0;
      let hasUndefined = false;
  
      for (let i = 0; i < n; i++) {
        if (array[i] === undefined) hasUndefined = true;
      }
  
      if (hasUndefined) {
        console.log("У масиві були виявлені undefined-елементи. Під час сортування вони трактуються як найменші значення.");
      }
  
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
          comparisons++;
          let a = array[j];
          let b = array[minIdx];
  
          let isLess = false;
          if (a === undefined && b !== undefined) {
            isLess = ascending;
          } else if (a !== undefined && b === undefined) {
            isLess = !ascending;
          } else if (a !== undefined && b !== undefined) {
            isLess = ascending ? a < b : a > b;
          }
  
          if (isLess) {
            minIdx = j;
          }
        }
  
        if (minIdx !== i) {
          [array[i], array[minIdx]] = [array[minIdx], array[i]];
          swaps++;
        }
      }
  
      console.log(`Selection sort — Порівнянь: ${comparisons}, Обмінів: ${swaps}`);
      return array;
    }
  
    function insertionSort(arr, ascending = true) {
      let array = arr.slice();
      let comparisons = 0;
      let swaps = 0;
      let hasUndefined = false;
  
      for (let i = 0; i < array.length; i++) {
        if (array[i] === undefined) hasUndefined = true;
      }
  
      if (hasUndefined) {
        console.log("У масиві були виявлені undefined-елементи. Під час сортування вони трактуються як найменші значення.");
      }
  
      for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
  
        while (j >= 0) {
          comparisons++;
          let a = array[j];
          let shouldMove = false;
  
          if (key === undefined && a !== undefined) {
            shouldMove = !ascending;
          } else if (key !== undefined && a === undefined) {
            shouldMove = ascending;
          } else if (key !== undefined && a !== undefined) {
            shouldMove = ascending ? key < a : key > a;
          }
  
          if (shouldMove) {
            array[j + 1] = array[j];
            swaps++;
            j--;
          } else {
            break;
          }
        }
  
        array[j + 1] = key;
      }
  
      console.log(`Insertion sort — Порівнянь: ${comparisons}, Обмінів: ${swaps}`);
      return array;
    }
    
    function shellSort(arr, ascending = true) {
        let array = arr.slice();
        let comparisons = 0;
        let moves = 0;
        let hasUndefined = false;
    
        for (let i = 0; i < array.length; i++) {
          if (array[i] === undefined) hasUndefined = true;
        }
    
        if (hasUndefined) {
          console.log("У масиві були виявлені undefined-елементи. Під час сортування вони трактуються як найменші значення.");
        }
    
        let n = array.length;
        let gap = Math.floor(n / 2);
    
        while (gap > 0) {
          for (let i = gap; i < n; i++) {
            let temp = array[i];
            let j = i;
    
            while (j >= gap) {
              comparisons++;
              let a = array[j - gap];
              let shouldMove = false;
    
              if (temp === undefined && a !== undefined) {
                shouldMove = !ascending;
              } else if (temp !== undefined && a === undefined) {
                shouldMove = ascending;
              } else if (temp !== undefined && a !== undefined) {
                shouldMove = ascending ? temp < a : temp > a;
              }
    
              if (shouldMove) {
                array[j] = array[j - gap];
                moves++;
                j -= gap;
              } else {
                break;
              }
            }
    
            array[j] = temp;
          }
    
          gap = Math.floor(gap / 2);
        }
    
        console.log(`Shell sort — Порівнянь: ${comparisons}, Переміщень: ${moves}`);
        return array;
    }

    function quickSort(arr, ascending = true) {
        let array = arr.slice();
        let comparisons = 0;
        let swaps = 0;
        let hasUndefined = false;
    
        for (let i = 0; i < array.length; i++) {
          if (array[i] === undefined) hasUndefined = true;
        }
    
        if (hasUndefined) {
          console.log("У масиві були виявлені undefined-елементи. Під час сортування вони трактуються як найменші значення.");
        }
    
        function compare(a, b) {
          comparisons++;
          if (a === undefined && b !== undefined) return ascending ? -1 : 1;
          if (a !== undefined && b === undefined) return ascending ? 1 : -1;
          if (a === undefined && b === undefined) return 0;
          return ascending ? a - b : b - a;
        }
    
        function swap(i, j) {
          let temp = array[i];
          array[i] = array[j];
          array[j] = temp;
          swaps++;
        }
    
        function quick(left, right) {
          if (left >= right) return;
    
          let pivot = array[Math.floor((left + right) / 2)];
          let i = left;
          let j = right;
    
          while (i <= j) {
            while (compare(array[i], pivot) < 0) i++;
            while (compare(array[j], pivot) > 0) j--;
    
            if (i <= j) {
              swap(i, j);
              i++;
              j--;
            }
          }
    
          if (left < j) quick(left, j);
          if (i < right) quick(i, right);
        }
    
        quick(0, array.length - 1);
        console.log(`Quick sort — Порівнянь: ${comparisons}, Обмінів: ${swaps}`);
        return array;
      }

    return {
      bubbleSort,
      selectionSort,
      insertionSort,
      shellSort,
        quickSort
    };
  })();
  