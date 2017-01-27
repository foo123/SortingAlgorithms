!function(Sort, undef){
@@USE_STRICT@@

//  Comparison Algorithms

function Partition( a, left, right )
{
    /*
    In very early versions of quicksort, the leftmost element of the partition would often be chosen as the pivot element. Unfortunately, this causes worst-case behavior on already sorted arrays, which is a rather common use-case. The problem was easily solved by choosing either a random index for the pivot, choosing the middle index of the partition or (especially for longer partitions) choosing the median of the first, middle and last element of the partition for the pivot (as recommended by Sedgewick).[4][5]

    Selecting a pivot element is also complicated by the existence of integer overflow. If the boundary indices of the subarray being sorted are sufficiently large, the naïve expression for the middle index, (left + right)/2, will cause overflow and provide an invalid pivot index. This can be overcome by using, for example, left + (right-left)/2 to index the middle element, at the cost of more complex arithmetic. Similar issues arise in some other methods of selecting the pivot element.
    */
    // left is the index of the leftmost element of the subarray
    // right is the index of the rightmost element of the subarray (inclusive)
    // number of elements in subarray = right-left+1
    var pivotIndex, pivotValue, t, storeIndex, i;
    
    // See "#Choice of pivot" section below for possible choices
    //choose any pivotIndex such that left ≤ pivotIndex ≤ right
    pivotIndex = ~~(left + 0.5*(right-left/*+1*/));  pivotValue=a[pivotIndex];
    t=a[pivotIndex]; a[pivotIndex]=a[right]; a[right]=t;
    storeIndex=left;
    
    for(i=left; i<right; i++)  // left ≤ i < right
    {
        if (a[i] <= pivotValue)
        {
            t=a[i]; a[i]=a[storeIndex]; a[storeIndex]=t;
            storeIndex++;
        }
    }
    t=a[storeIndex]; a[storeIndex]=a[right]; a[right]=t;  // Move pivot to its final place
    return storeIndex;
}
function RecursiveQuickSort( a, left, right )
{
    // http://en.wikipedia.org/wiki/Quicksort
    if (left >= right) return a;
    // If the list has 2 or more items
    var pivotNewIndex;
    // Get lists of bigger and smaller items and final position of pivot
    pivotNewIndex = Partition(a, left, right);
    // Recursively sort elements smaller than the pivot
    RecursiveQuickSort(a, left, pivotNewIndex - 1);
    // Recursively sort elements at least as big as the pivot
    RecursiveQuickSort(a, pivotNewIndex + 1, right);
    return a;
}
function IterativeQuickSort( a, left, right )
{
    // http://en.wikipedia.org/wiki/Quicksort
    // http://www.geeksforgeeks.org/iterative-quick-sort/
    if (left >= right) return a;
    
    // If the list has 2 or more items
    var stack, top, N, p;
    N = right - left + 1;
    // Create an auxiliary stack
    stack = new Array(N);
    // initialize top of stack
    top = -1;
    // push initial values of left and right to stack
    stack[ ++top ] = left; stack[ ++top ] = right;
    // Keep popping from stack while is not empty
    while ( top >= 0 )
    {
        // Pop right and left
        right = stack[ top-- ]; left = stack[ top-- ];
        // Set pivot element at its correct position in sorted array
        p = Partition( a, left, right );
        // If there are elements on left side of pivot, then push left
        // side to stack
        if ( p-1 > left )
        {
            stack[ ++top ] = left;
            stack[ ++top ] = p - 1;
        }
        // If there are elements on right side of pivot, then push right
        // side to stack
        if ( p+1 < right )
        {
            stack[ ++top ] = p + 1;
            stack[ ++top ] = right;
        }
    }
    return a;
}

Sort.RecursiveQuickSort = function( a ) {
    // http://en.wikipedia.org/wiki/Quicksort
    return RecursiveQuickSort( a, 0, a.length-1 );
};
Sort.QuickSort = function( a ) {
    // http://en.wikipedia.org/wiki/Quicksort
    return IterativeQuickSort( a, 0, a.length-1 );
};
Sort.QuickSort.Partition = Partition;
Sort.RecursiveQuickSort.reference = Sort.QuickSort.reference = "http://en.wikipedia.org/wiki/Quicksort";
Sort.RecursiveQuickSort.description = Sort.QuickSort.description = "Quicksort is a sorting algorithm that, on average, makes O(nlogn) comparisons to sort n items. In the worst case, it makes O(n<sup>2</sup>) comparisons, though this behavior is rare. Quicksort is often faster in practice than other O(nlogn) algorithms. Additionally, quicksort's sequential and localized memory references work well with a cache. Quicksort is a comparison sort and, in efficient implementations, is not a stable sort.";

}(Sort);