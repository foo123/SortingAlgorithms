!function(Sort, undef){
@@USE_STRICT@@

//  Comparison Algorithms

function Merge( aux, a, left, middle, middle2, right, lk, rk )
{
    // need at least 2 elements to merge
    if (left >= right) return a;
    lk = lk||1; rk = rk||1;
    var mL = right-left+1, m = 0,
        l = 0>lk?middle:left, r = 0>rk?right:middle2,
        lmax = 0>lk?left:middle, rmax = 0>rk?middle2:right;
    
    //aux = aux || new Array(mL);
    // merge
    while(0<=lk*(lmax-l) && 0<=rk*(rmax-r))
    {
        if ( a[l] < a[r] ) { aux[m++] = a[l]; l+=lk; }
        else if ( a[l] > a[r] ) { aux[m++] = a[r]; r+=rk; }
        else { aux[m++] = a[l]; aux[m++] = a[r]; l+=lk; r+=rk; }
    }
    while(0<=lk*(lmax-l))
    {
        aux[m++] = a[l]; l+=lk;
    }
    while(0<=rk*(rmax-r))
    {
        aux[m++] = a[r]; r+=rk;
    }
    // move the merged back to the a array
    //splice.apply(a, [left, mL].concat(aux));
    for(m=0; m<mL; m++) a[left+m] = aux[m];
    return a;
}
function SortedRun( a, a0, a1, index )
{
    // findout already sorted chunks either ascending or descending
    var ap, ai, i, i0, i1, d0, i2, i3, d1;
    index[0] = -1; index[1] = -1; index[2] = 0;
    index[3] = -1; index[4] = -1; index[5] = 0;
    d0 = 0; d1 = 0;
    i0 = a0; i1 = -1;
    for(ap=a[i0],i=i0+1; i<=a1; i++)
    {
        ai = a[i];
        if ( ap < ai )
        {
            if ( -1 === d0 ) { i1 = i-1; break; }
            else if ( 0 === d0 ) d0 = 1;
        }
        else if ( ap > ai )
        {
            if ( 1 === d0 ) { i1 = i-1; break; }
            else if ( 0 === d0 ) d0 = -1;
        }
        ap = ai;
    }
    if ( 0 === d0 ) d0 = 1;
    if ( -1 === i1 )
    {
        i1 = a1; index[0] = i0; index[1] = i1; index[2] = d0;
    }
    else
    {
        i2 = i1+1; i3 = -1;
        for(ap=a[i2],i=i2+1; i<=a1; i++)
        {
            ai = a[i];
            if ( ap < ai )
            {
                if ( -1 === d1 ) { i3 = i-1; break; }
                else if ( 0 === d1 ) d1 = 1;
            }
            else if ( ap > ai )
            {
                if ( 1 === d1 ) { i3 = i-1; break; }
                else if ( 0 === d1 ) d1 = -1;
            }
            ap = ai;
        }
        if ( -1 === i3 ) i3 = a1;
        if ( 0 === d1 ) d1 = 1;
        index[0] = i0; index[1] = i1; index[2] = d0;
        index[3] = i2; index[4] = i3; index[5] = d1;
    }
}
function RecursiveMergeSort( a, left, right, aux )
{
    // http://en.wikipedia.org/wiki/Merge_sort
    // if list size is 0 (empty) or 1, consider it sorted and return it
    // (using less than or equal prevents infinite recursion for a zero length m)
    if (left >= right) return a;
    if ( null == aux ) aux = new Array(a.length);
    var middle = left + ((right-left+1)>>>1);
    // else list size is > 1, so split the list into two sublists
    // 1. DIVIDE Part...
    // recursively call merge_sort() to further split each sublist
    // until sublist size is 1
    RecursiveMergeSort(a, left, middle-1, aux);  
    RecursiveMergeSort(a, middle, right, aux);
    // merge the sublists returned from prior calls to merge_sort()
    // and return the resulting merged sublist
    // 2. CONQUER Part...
    Merge(aux, a, left, middle-1, middle, right);
    return a;
}
function IterativeMergeSort( a )
{
    // http://en.wikipedia.org/wiki/Merge_sort
    // http://www.sinbadsoft.com/blog/a-recursive-and-iterative-merge-sort-implementations/
    // http://java.dzone.com/articles/recursive-and-iterative-merge
    var N = a.length; if ( 1 >= N ) return a;
    var logN = N, j, n, size = 1, size2 = 2, Min = Math.min, aux = new Array(N);
    while(logN)
    {
        n = N-size;
        for(j=0; j<n; j+=size2) Merge(aux, a, j, j+size-1, j+size, Min(j+size2-1, N-1));
        size <<= 1; size2 <<= 1; logN >>= 1;
    }
    return a;
}
function NaturalMergeSort( a )
{
    // http://en.wikipedia.org/wiki/Merge_sort
    var N = a.length; if ( 1 >= N ) return a;
    var aux = new Array(N), index = [-1, -1, 0, -1, -1, 0],
        a0 = 0, a1 = N-1, i0, i1, i0p = a0, i1p = -1, t;
    // O(N) average, O(NlgN) worst case
    do{
        // find already sorted chunks
        // O(n)
        SortedRun(a, a0, a1, index);
        if ( -1 === index[3] )
        {
            // already sorted, reflect if sorted reversely
            // O(n)
            if ( -1 === index[2] && a0 < a1 ) for(i0=a0,i1=a1; i0<i1; i0++,i1--){t=a[i0]; a[i0]=a[i1]; a[i1]=t;}
            i0 = a0; i1 = a1;
        }
        else
        {
            // merge partialy sorted chunks appropriately into one run
            // O(n)
            Merge(aux, a, index[0], index[1], index[3], index[4], 0>index[2]?-1:1, 0>index[5]?-1:1);
            i0 = index[0]; i1 = index[4];
        }
        // merge with the previous run
        // O(n)
        if ( -1 !== i1p ) Merge(aux, a, i0p, i1p, i0, i1);
        // update starting point for next chunk
        i1p = i1; a0 = i1+1;
    }while( a0 <= a1 );
    return a;
}

Sort.RecursiveMergeSort = function( a ) {
    // http://en.wikipedia.org/wiki/Merge_sort
    return RecursiveMergeSort( a, 0, a.length-1 );
};
Sort.MergeSort = function( a ) {
    // http://en.wikipedia.org/wiki/Merge_sort
    return IterativeMergeSort( a );
};
Sort.NaturalMergeSort = function( a ) {
    // http://en.wikipedia.org/wiki/Merge_sort
    return NaturalMergeSort( a );
};
Sort.MergeSort.Merge = Merge;
Sort.NaturalMergeSort.Run = SortedRun;
Sort.RecursiveMergeSort.reference = Sort.NaturalMergeSort.reference = Sort.MergeSort.reference = "http://en.wikipedia.org/wiki/Merge_sort";
Sort.RecursiveMergeSort.description = Sort.NaturalMergeSort.description = Sort.MergeSort.description = "Merge sort is an O(nlogn) comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the implementation preserves the input order of equal elements in the sorted output. Mergesort is a divide and conquer algorithm. A natural merge sort is similar to a bottom up (iterative) merge sort except that any naturally occurring runs (sorted sequences) in the input are exploited. In the typical case, the natural merge sort may not need as many passes because there are fewer runs to merge. In the best case, the input is already sorted (i.e., is one run), so the natural merge sort need only make one pass through the data. In many practical cases, long natural runs are present. Natural merge sort has linear O(n) performance on average and O(nlogn) in worst case (similar to merge sort).";

}(Sort);