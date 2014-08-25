!function(Sort, undef){

    @@USE_STRICT@@
    
    //
    //  Numerical/Counting Algorithms
    //
    
    
    // http://en.wikipedia.org/wiki/Counting_sort
    Sort.CountingSort = function(a) {
        var N=a.length, m, M, count, oldCount, total, i, K, key, aclone;
        
        if (N>1)
        {
            // find min-max values (effective range)
            m = M = a[0];
            for (i=1; i<N; i++) 
            { 
                if (a[i]>M) M = a[i];
                else if (a[i]<m) m = a[i];
            }
            
            // calculate histogram:
            // allocate an array Count[0..k] ; THEN
            K = ~~M + 1; 
            count = new Array(K);
            for (i=0; i<K; i++) 
                count[i] = 0;
            // initialize each array cell to zero ; THEN
            
            for (i=0; i<N; i++)
                count[~~a[i]]++;
             
            // calculate starting index for each key:
            total = 0;
            for (i=0; i<K; i++)
            {
                oldCount = count[i];
                count[i] = total;
                total += oldCount;
            }
            
            // copy inputs into output array in order:
            // allocate an output array Output[0..n-1] ; THEN
            aclone = a.slice();
            for (i=0; i<N; i++)
            {
                key = aclone[i];
                a[count[~~key]] = key;
                count[~~key]++;
            }
        }
        
        // in-place
        return a;
    };
    Sort.CountingSort.reference = "http://en.wikipedia.org/wiki/Counting_sort";
    Sort.CountingSort.description = "Counting sort is an algorithm for sorting a collection of objects according to keys that are small integers, that is, it is an integer sorting algorithm. It operates by counting the number of objects that have each distinct key value, and using arithmetic on those counts to determine the positions of each key value in the output sequence. Its running time is linear in the number of items and the difference between the maximum and minimum key values, so it is only suitable for direct use in situations where the variation in keys is not significantly greater than the number of items. However, it is often used as a subroutine in another sorting algorithm, radix sort, that can handle larger keys more efficiently.";
    
}(Sort);