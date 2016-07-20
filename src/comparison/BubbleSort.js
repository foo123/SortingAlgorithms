!function(Sort, undef){
@@USE_STRICT@@

//
//  Comparison Algorithms
//

// for reference
// http://en.wikipedia.org/wiki/Bubble_sort

Sort.BubbleSort = function(a) {
    var N = a.length, i, newN, t;

    if (N>1)
    {
        do{
            newN = 0;
            for (i = 1; i<=N-1; i++)
            {
                if (a[i-1] > a[i])
                {
                    //swap(A[i-1], A[i])
                    t=a[i-1]; a[i-1]=a[i]; a[i]=t;
                    newN = i;
                }
            }
            N = newN;
        }while (N > 0);
    }
    // in-place
    return a;
};
Sort.BubbleSort.reference = "http://en.wikipedia.org/wiki/Bubble_sort";
Sort.BubbleSort.description = "Bubble sort is a simple sorting algorithm that works by repeatedly stepping through the list to be sorted, comparing each pair of adjacent items and swapping them if they are in the wrong order. The pass through the list is repeated until no swaps are needed, which indicates that the list is sorted.";

}(Sort);