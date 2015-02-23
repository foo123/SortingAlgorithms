!function(Sort, undef){
    @@USE_STRICT@@
    
    //
    //  Numerical/Counting Algorithms
    //
    
    /**
    *
    * the main idea is this :
    * there is a 'trivial' and very fast O(n) (under all cases) algorithm
    * that sorts N 'homogeneous-equidistant' numbers in [m, M]  (IndexSort, re-indexing the series)
    * for general N random numbers with an arbitrary dynamic range (or CDF)
    * if an algorithm or function can map these numbers 'uniquely' to 
    * 'homogeneous-equidistant' numbers N in O(n) time
    * then general (number series) sorting can be done in O(n) time (under all cases)
    *
    * equidistant numbers have this (more or less general) form:
    * a[i]=Min + Perm(i)*Const, where Perm(i) is a permutation of the i's in [0, N-1] set (with possible duplicates)
    * these can be sorted (very fast) in O(n) time (IndexSort)
    *
    *
    *
    * this 'general' algorithm depends on dynamic range (multimodality) of the input number series
    * possible solutions:
    * a.  try to uniformize the dynamic range (using CDF??, possible numeric fluctuations)  => O(n)
    * b.  use a non-linear transform to uniformize the dynamic range (which transform??, maybe CDF to uniform??) => O(n)
    * c.  separate series in sub-series of similar dynamic range and use 'recursion' (how??) => O(n)
    *
    * ** the "non-linearity" is "already in the numbers series"  (physical O(n) computation)
    *
    * ** lexical sorting can be done with same algorithm provided any '1-1' map between strings and numbers
    * which preserves lexical/string ordering
    *
    * NOTE: there are algorithms based on similar ideas, eg. 'histogram_sort' :
    *
    * http://stackoverflow.com/questions/6166546/sorting-algorithms-for-data-of-known-statistical-distribution
    * http://xlinux.nist.gov/dads//HTML/histogramSort.html
    *
    **/
    
    //var log = console.log;
    var Array64F = Sort.Array64F, Array32U = Sort.Array32U,
        splice = Array.prototype.splice, 
        Floor = Math.floor, Round = Math.round, Ceil = Math.ceil
    ;
    
    // custom O(n) algorithm for arbitrary random numbers (IN PROGRESS)
    var StatisticalSort = Sort.StatisticalSort = function(a) {
        var N = a.length, isOdd,
            sgn, fsgn, tie, isSorted, x,
            m, M, norm, norm2, invMm,
            i, ai
        ;
        
        // trivial case
        if (N>1)
        {
            isOdd = N%2;
            
            // calculate some order statistics (effective range)
            m = M = a[0]; 
            x = a[1]-a[0];
            fsgn = x ? (x < 0 ? -1 : 1) : 0;
            tie = (fsgn) ? false : true;
            isSorted = true; // assume already sorted
            for (i=1; i<N; i++) 
            { 
                // after finding out it is not sorted, avoid any extra calculations
                if (isSorted) 
                { 
                    x = a[i]-a[i-1];
                    sgn = x ? (x < 0 ? -1 : 1) : 0;
                    if (tie && sgn) { fsgn = sgn; tie = false; }
                    if (sgn&&(sgn-fsgn))  isSorted = false;
                }
                // compute min-max range
                if ( a[i] > M ) M = a[i]; 
                else if ( a[i] < m ) m = a[i];
            }
            
            // this covers sorted, reverse-sorted and also all duplicates cases
            if (isSorted)
            {
                if (0>sgn) a.reverse(); // sorted in reverse order
                return a;
            }
            
            invMm = 1.0/(M-m);
            
            // compute PDF, CDF in O(n) steps
            // CDF(x)=P(X<=x)  =x (for uniform variable)
            var indexes = new Array32U(N), CDF = new Array64F(N+1), sum = 0, off;
            CDF[0] = 0;
            norm = invMm; 
            norm2 = (N)*norm;
            off = -m+1;
            // one-level partial loop unrolling
            for (i=0; i<N; i+=2)
            {
                // !! normalizations helps deal with possible numeric overflow / numeric instabilities..
                // !! possible issues if N is very-very large??
                // handle the data as if it is a PDF sequence
                CDF[i+1] = norm*(a[i]+off) + CDF[i];
                CDF[i+2] = norm*(a[i+1]+off) + CDF[i+1];
                
                indexes[i] = Round( norm2*(a[i]+off) );
                indexes[i+1] = Round( norm2*(a[i+1]+off) );
            }
            if (isOdd)
            {
                // loop remainder, if any
                CDF[N] = norm*(a[N-1]+off) + CDF[N-1];
                
                indexes[N-1] = Round( norm2*(a[N-1]+off) );
            }
            sum = CDF[N];
            
            // find dynamic ranges in O(n) steps
            norm = (N-1)/sum;
            var range = new Array(N), Mmr = new Array(N);
            for (i=0; i<N; i++)  range[i] = null;
            for (i=0; i<N; i++)
            {
                //
                // CDF inverse mapping, groups elements of similar dynamic range together 
                // (produces equidistributable/homogeneous ranges of numbers)
                // this is a non-linear mapping, computed from the data itself
                // it can also be used in a recursive-style (a-la bucketsort), 
                // using another sub-sort method (eg indexsort, countingsort, quicksort, etc..)
                //
                ai = Round( norm * CDF[ indexes[ i ] ] );
                x = a[i];
                
                if ( !range[ai] )
                {
                    range[ai] = [ x ];
                    Mmr[ai] = new Array64F( [x, x] );
                }
                else
                {
                    range[ai].push( x );
                    // get min-max range
                    if ( x > Mmr[ai][1] ) Mmr[ai][1] = x;
                    else if ( x < Mmr[ai][0] ) Mmr[ai][0] = x;
                }
            }
            // delete them now
            indexes = CDF = null;
            
            var offset = 0, Ar, Nr, mr, Mr, j;
            // this step can be parallelized easily, eg. one for each non-null range
            for (i=0; i<N; i++)
            {
                if ( null!==range[i] )
                {
                    Ar = range[i];
                    Nr = Ar.length;
                    mr = Mmr[i][0];
                    Mr = Mmr[i][1];
                    
                    // add them to the original array in-place, sorted
                    
                    if (mr==Mr)
                    {
                        // all duplicates or a single element, add them in place
                        splice.apply(a, [offset, Nr].concat( Ar ) );
                    }
                    else
                    {
                        // find the correct places dynamically
                        // this is supposed to work
                        // because each range has equidistributable values
                        // (created by reverse CDF mapping in previous steps)
                        // so can compute the position indexes relatively easily
                        // what about partial duplicates?? ( taken care in previous if ?? NO )
                        norm = (Nr-1)/(M-m);
                        for (j=0; j<Nr; j++)
                        {
                            ai = Round( norm * (Ar[j]-mr) );
                            a[ offset + ai ] = Ar[ j ];
                        }
                    }
                    offset += Nr;
                    // delete them now
                    range[i] = Mmr[i] = null;
                }
            }
        }
        // in-place
        return a;
    };
    Sort.StatisticalSort.reference = "#A Custom Algorithm";
    Sort.StatisticalSort.description = "(in progress)";
    
}(Sort);