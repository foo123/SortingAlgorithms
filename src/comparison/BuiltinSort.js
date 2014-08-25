!function(Sort, undef){

    @@USE_STRICT@@
    
    //
    //  Comparison Algorithms
    //
    
    var asNumbers = Sort.utils.asNumbers;
    
    // default built-in sort algorithm
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    Sort.BuiltinSort = function(a) {
        a.sort(asNumbers);
        // in-place
        return a;
    };
    Sort.BuiltinSort.reference = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort";
    Sort.BuiltinSort.description = "This is JavaScript's builtin algorithm, usually a variation of quicksort.";
    
}(Sort);