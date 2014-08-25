!function(Sort, undef){

    @@USE_STRICT@@
    
    //
    //  Comparison Algorithms
    //
    
    // http://corte.si/posts/code/cyclesort/index.html
    // http://en.wikipedia.org/wiki/Cycle_sort
    
    // Sort an array in place //and return the number of writes.
    Sort.CycleSort = function(a) {
        var N=a.length, //writes=0, 
            cycleStart, item, pos, i, tmp
        ;
        
        // trivial case
        if (N>1)
        {
            // Loop through the array to find cycles to rotate.
            for (cycleStart=0;  cycleStart<N; cycleStart++)
            {
                item = a[cycleStart];

                // Find where to put the item.
                pos = cycleStart;
                for (i=cycleStart + 1; i<N; i++)
                {
                    if (a[i] < item)   pos++;
                }

                // If the item is already there, this is not a cycle.
                if (pos == cycleStart) continue;

                // Otherwise, put the item there or right after any duplicates.
                while (item == a[pos])
                    pos++;
                
                tmp = a[pos]; a[pos] = item; item = tmp;
                //writes++;

                // Rotate the rest of the cycle.
                while (pos != cycleStart)
                {
                    // Find where to put the item.
                    pos = cycleStart;
                    for (i=cycleStart + 1; i<N; i++)
                    {
                        if (a[i] < item)  pos++;
                    }

                    // Put the item there or right after any duplicates.
                    while (item == a[pos])
                        pos++;
                        
                    tmp = a[pos]; a[pos] = item; item = tmp;
                    //writes++;
                }
            }
        }
        // in-place
        return a;
    };
    Sort.CycleSort.reference = "http://en.wikipedia.org/wiki/Cycle_sort";
    Sort.CycleSort.description = "Cycle sort is an in-place, unstable sorting algorithm, a comparison sort that is theoretically optimal in terms of the total number of writes to the original array, unlike any other in-place sorting algorithm. It is based on the idea that the permutation to be sorted can be factored into cycles, which can individually be rotated to give a sorted result.";
    
}(Sort);