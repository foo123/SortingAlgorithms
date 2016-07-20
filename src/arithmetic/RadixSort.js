!function(Sort, undef){
@@USE_STRICT@@

//
//  Numerical/Counting Algorithms
//


// http://en.wikipedia.org/wiki/Radix_sort
Sort.RadixSort = function(a) {
    // TODO
    return a;
};
Sort.RadixSort.reference = "http://en.wikipedia.org/wiki/Radix_sort";
Sort.RadixSort.description = "<strong>NOT IMPLEMENTED YET</strong> In computer science, radix sort is a non-comparative integer sorting algorithm that sorts data with integer keys by grouping keys by the individual digits which share the same significant position and value. A positional notation is required, but because integers can represent strings of characters (e.g., names or dates) and specially formatted floating point numbers, radix sort is not limited to integers. Radix sort efficiency is O(d n) for n keys which have d or fewer digits. Sometimes d is presented as a constant, which would make radix sort better (for sufficiently large n) than the best comparison-based sorting algorithms, which are all O(n log(n)) number of comparisons needed. However, in general d cannot be considered a constant.";

}(Sort);