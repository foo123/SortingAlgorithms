!function(Sort, undef){
@@USE_STRICT@@

//  Comparison Algorithms

Sort.IntroSort = function( a ) {
    // https://en.wikipedia.org/wiki/Introsort
    return a;
};
Sort.IntroSort.reference = "https://en.wikipedia.org/wiki/Introsort";
Sort.TreeSort.description = "Introsort or introspective sort is a hybrid sorting algorithm that provides both fast average performance and (asymptotically) optimal worst-case performance. It begins with quicksort and switches to heapsort when the recursion depth exceeds a level based on (the logarithm of) the number of elements being sorted. This combines the good parts of both algorithms, with practical performance comparable to quicksort on typical data sets and worst-case O(nlogn) runtime due to the heap sort. Since both algorithms it uses are comparison sorts, it too is a comparison sort.";

}(Sort);