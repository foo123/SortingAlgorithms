!function(Sort, undef){

    @@USE_STRICT@@
    
    //
    //  Comparison Algorithms
    //
    
    // auxilliaries
    var 
        binary_search_iter = function(a, element, start, end) {
            var mid, m;
            while(true)
            {
                mid = start + ~~(0.5*(end-start)/* + 0.5*/);
                
                if (start == end)
                {
                    if ( null!==a[mid] && a[mid] <= element) return (mid + 1);
                    else return mid;
                }
                else
                {
                    m = mid;
                    
                    while (m<end && null===a[m]) m++;
                    
                    if (m == end)
                    {
                        if (null!==a[m] && a[m] <= element) return (m + 1);
                        else { end = mid; continue; }
                    }
                    else if (m == start)
                    {
                        if (a[m] > element) return m;
                        else { start = m+1; continue; }
                    }
                    else
                    {
                        if (a[m] == element) return (m + 1);
                        else if (a[m] > element) {end = m-1; continue; }
                        else { start = m+1; continue; }
                    }
                }
            }
        },
        
        insert = function(a, element, index, last_insert_index) {
            var t;
            // nonlocal last_insert_index
            if ( null===a[index] )
            {
                a[index] = element;
            }
            else
            {
                while ( null!==a[index] )
                {
                    t=a[index]; a[index]=element; element=t;
                    index++;
                }
                a[index] = element;  
                index++;
            }
            
            if (index > last_insert_index[0])  last_insert_index[0] = index;
        },
        
        balance =  function(a, num_spaces, total_inserted, last_insert_index) {
            var queue, N=a.length, inserted, index, top, bottom, spaces;
            
            //nonlocal last_insert_index
            queue = new Array(N);
            inserted = index = 1;
            top = bottom = 0;
     
            while (inserted < total_inserted)
            {
                spaces = 0;
                while (spaces < num_spaces)
                {
                    if ( null!==a[index] )
                    {
                        queue[bottom] = a[index];
                        bottom++;
                    }
                    a[index] = null;
                    index++; spaces++;
                }    
                if ( null!==a[index] )
                {
                    queue[bottom] = a[index];
                    bottom++;
                }
                a[index] = queue[top];
                index++; top++; inserted++;
            }
            last_insert_index[0] = index - 1;
        }
    ;
    
    // http://en.wikipedia.org/wiki/Library_sort
    Sort.LibrarySort = function(a, eps) {
        var N=a.length, copy, copy_len, num_spaces, last_insert_index, 
            inserted, index, round_inserts, insertion_index, i, ai;
        
        eps = eps || 0;
        num_spaces = ~~(eps*N+0.5);
        
        copy_len = N + num_spaces; 
        copy = new Array(copy_len);
        for (i=0; i<copy_len; i++)  copy[i] = null;
        copy[0] = a[0];
        
        last_insert_index = [0];  
        inserted = index = 1;
     
        while (inserted < N)
        {
            round_inserts = inserted;
     
            while (inserted < N && round_inserts > 0)
            {
                insertion_index = binary_search_iter(copy, a[index], 0, last_insert_index[0]);
                
                insert(copy, a[index], insertion_index, last_insert_index);
                
                round_inserts--; inserted++; index++;
            }
            balance(copy, num_spaces, inserted, last_insert_index);
        }
        
        ai=0;
        for (i=0; i<copy_len; i++) 
        { 
            if ( null!==copy[i] ) 
                a[ ai++ ] = copy[ i ]; 
        }
        // in-place
        return a;
    };
    Sort.LibrarySort.reference = "http://en.wikipedia.org/wiki/Library_sort";
    Sort.LibrarySort.description = "Library sort, or gapped insertion sort is a sorting algorithm that uses an insertion sort, but with gaps in the array to accelerate subsequent insertions. Like the insertion sort it is based on, library sort is a stable comparison sort and can be run as an online algorithm; however, it was shown to have a high probability of running in O(nlogn) time (comparable to quicksort), rather than an insertion sort's O(n<sup>2</sup>).";
    
    
}(Sort);