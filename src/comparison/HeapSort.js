!function(Sort, undef){
@@USE_STRICT@@

//  Comparison Algorithms

// adapted from: https://github.com/mgechev/javascript-algorithms
// auxilliaries
var Floor = Math.floor,

    /**
     * Finds the correct place of given element in given max heap.
     *
     * @private
     * @param {array} array Array
     * @param {number} index Index of the element which palce in the max heap should be found.
     */
    heapify = function(a, index, heapSize) {
        var left = 2 * index + 1,
            right = 2 * index + 2,
            largest = index, temp;
     
        if (left < heapSize && a[left] > a[index])
            largest = left;

        if (right < heapSize && a[right] > a[largest])
            largest = right;
     
        if (largest !== index) 
        {
            temp = a[index];
            a[index] = a[largest];
            a[largest] = temp;
            heapify(a, largest, heapSize);
        }
    },

    /**
     * Builds max heap from given array.
     *
     * @private
     * @param {array} array Array which should be turned into max heap
     * @returns {array} array Array turned into max heap
     */
    buildMaxHeap = function(a) {
        var i, N=a.length;
        for (i=Floor(N / 2); i>=0; i--) 
        {
            heapify(a, i, N);
        }
        return a;
    }
;

Sort.HeapSort = function( a ) {
    // http://en.wikipedia.org/wiki/Heap_sort
    // adapted from: https://github.com/mgechev/javascript-algorithms
    var N = a.length, temp, i;
    if ( 1 >= N ) return a;
    
    buildMaxHeap( a );
    for(i=N-1; i>0; i--) 
    {
        temp = a[0];
        a[0] = a[i];
        a[i] = temp;
        N--;
        heapify(a, 0, N);
    }
    return a;
};
Sort.HeapSort.reference = "http://en.wikipedia.org/wiki/Heap_sort";
Sort.HeapSort.description = "Heapsort is a comparison-based sorting algorithm to create a sorted array (or list), and is part of the selection sort family. Although somewhat slower in practice on most machines than a well-implemented quicksort, it has the advantage of a more favorable worst-case O(nlogn) runtime.";

}(Sort);