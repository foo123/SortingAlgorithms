!function(Sort, undef){
@@USE_STRICT@@

//
//  Comparison Algorithms
//

// auxilliaries
var splice = Array.prototype.splice,
    Min = Math.min, 
    
    Merge = function(a, left, middle, right, merged) {
        // need at least 2 elements to merge
        if (right > left)
        {
            var mL = right-left+1, m = 0, l = left, r = middle+1;
            
            merged = merged || new Array(mL);
            // merge
            while (l<=middle && r<=right) 
                merged[ m++ ] = ( a[ l ] <= a[ r ] ) ? a[ l++ ] : a[ r++ ];
            while (l<=middle) 
                merged[ m++ ] = a[ l++ ];
            while (r<=right) 
                merged[ m++ ] = a[ r++ ];
            
            // move the merged back to the a array
            //splice.apply(a, [left, mL].concat(merged));
            for(m=0; m<mL; m++) a[left+m] = merged[m];
        }
        return a;
    }
;

// http://en.wikipedia.org/wiki/Merge_sort
var RecursiveMergeSort = Sort.RecursiveMergeSort = function(a, left, right, aux) {
    if (undef===left && undef===right) { left=0; right=a.length-1; aux = new Array(a.length); }
    
    // if list size is 0 (empty) or 1, consider it sorted and return it
    // (using less than or equal prevents infinite recursion for a zero length m)
    if (left < right)
    {
        var middle = ~~(left + 0.5*(right-left+1));  
        // else list size is > 1, so split the list into two sublists
        // 1. DIVIDE Part...
        // recursively call merge_sort() to further split each sublist
        // until sublist size is 1
        RecursiveMergeSort(a, left, middle-1, aux);  
        RecursiveMergeSort(a, middle, right, aux);
        
        // merge the sublists returned from prior calls to merge_sort()
        // and return the resulting merged sublist
        // 2. CONQUER Part...
        Merge(a, left, middle-1, right, aux);
    }
    // in-place
    return a;
};

// http://en.wikipedia.org/wiki/Merge_sort
// http://www.sinbadsoft.com/blog/a-recursive-and-iterative-merge-sort-implementations/
// http://java.dzone.com/articles/recursive-and-iterative-merge
Sort.MergeSort = function(a) {
    var N=a.length;
    
    if (N>1)
    {
        var logN = N,
            j, n, size = 1, size2 = 2,
            aux = new Array(N)
            ;
        
        while (logN)
        {
            n = N-size;
            for (j=0; j<n; j+=size2) 
                Merge(a, j, j+size-1, Min(j+size2-1, N-1), aux);
            
            size <<= 1;
            size2 <<= 1;
            
            logN >>= 1;
        }
    }
    // in-place
    return a;
};
Sort.RecursiveMergeSort.reference = Sort.MergeSort.reference = "http://en.wikipedia.org/wiki/Merge_sort";
Sort.RecursiveMergeSort.description = Sort.MergeSort.description = "Merge sort is an O(nlogn) comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the implementation preserves the input order of equal elements in the sorted output. Mergesort is a divide and conquer algorithm.";


}(Sort);