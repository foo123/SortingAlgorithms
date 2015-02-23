!function(Sort, undef){
    @@USE_STRICT@@
    
    //
    //  Numerical/Counting Algorithms
    //
    
    // adapted from: https://github.com/mgechev/javascript-algorithms
    var 
        Floor = Math.floor,
        
        /**
         * Insertionsort.
         *
         * @private
         * @param {array} array Input array
         * @returns {array} array Sorted input array
         */
        insertionSort = function(a) {
            var current, j, i, N=a.length;
            
            for (i=1; i<N; i++) 
            {
                current = a[i];
                j = i - 1;
                while (j>=0 && current<a[j]) 
                {
                    a[j + 1] = a[j];
                    j--;
                }
                a[j + 1] = current;
            }
            return a;
        },

        /**
         * Creates buckets for given array
         *
         * @private
         * @param {array} array Input array
         * @returns {array} buckets Array whith array for each bucket. 
         *  Each bucket contains an array with all elements from the input which are with suitable size.
         */
        createBuckets = function(a) {
            var buckets = [], N=a.length,
                currentBucket,
                current, i,
                sectorSize = 1 / N;
            for (i=0; i<N; i++) 
            {
                current = a[i];
                currentBucket = Floor(current / sectorSize);
                
                if (!buckets[currentBucket]) 
                    buckets[currentBucket] = [];
                
                buckets[currentBucket].push(current);
            }
            return buckets;
        },

        /**
         * Sorts the arrays from each bucket.
         *
         * @private
         * @param {array} buckets Given buckets
         * @returns {array} buckets Buckets with sorted arrays for each bucket
         */
        sortBuckets = function(buckets, subsort) {
            var i, bL = buckets.length;
            
            for (i=0; i<bL; i++) 
            {
                if (buckets[i])
                    buckets[i] = subsort(buckets[i]);
            }
            return buckets;
        },

        /**
         * Unions all buckets' arrays
         *
         * @private
         * @param {array} buckets Input buckets
         * @returns {array} result Sorted array which contains all elements form each bucket
         */
        unionBuckets = function(buckets) {
            var i, j, 
                result = [],  
                currentBucket, 
                bL=buckets.length, cbL;
                
            for (i=0; i<bL; i++) 
            {
                currentBucket = buckets[i];
                if (currentBucket) 
                {
                    result = result.concat(currentBucket);
                    /*cbL = currentBucket.length;
                    for (j=0; j<cbL; j++) 
                        result.push(currentBucket[j]);*/
                }
            }
            return result;
        },
        
        subSort = insertionSort //Sort.InsertionSort
    ;
    
    // for reference
    // http://en.wikipedia.org/wiki/Bucket_sort
    
    // Sorts given array with bucketsort
    // adapted from: https://github.com/mgechev/javascript-algorithms
    Sort.BucketSort = function(a, subsort) {
        var sorted, buckets, i, N=a.length, isOdd;
        
        // allow to choose sub-sorting algorithm
        subSort = subsort || subSort;
        
        if (N>1)
        {
            buckets = createBuckets(a);
            sortBuckets(buckets, subSort);
            sorted = unionBuckets(buckets);
            
            isOdd = N%2;
            for (i=0; i<N; i+=2)
            {
                // one-level unrolling
                a[i] = sorted[i];
                a[i+1] = sorted[i+1];
            }
            if (isOdd)
            {
                a[N-1] = sorted[N-1];
            }
        }
        
        // in-place
        return a;
    };
    Sort.BucketSort.reference = "http://en.wikipedia.org/wiki/Bucket_sort";
    Sort.BucketSort.description = "Bucket sort is a sorting algorithm that works by partitioning an array into a number of buckets. Each bucket is then sorted individually, either using a different sorting algorithm, or by recursively applying the bucket sorting algorithm. It is a distribution sort, and is a cousin of radix sort in the most to least significant digit flavour. Bucket sort is a generalization of pigeonhole sort. Since bucket sort is not a comparison sort, the &Omega;(nlogn) lower bound is inapplicable. The computational complexity estimates involve the number of buckets.";
    
    
}(Sort);