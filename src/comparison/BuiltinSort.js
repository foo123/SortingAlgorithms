!function(Sort, undef){
@@USE_STRICT@@

//  Comparison Algorithms
var asNumbers = Sort.utils.asNumbers;

Sort.BuiltinSort = function( a ) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    a.sort(asNumbers);
    return a;
};
Sort.BuiltinSort.reference = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort";
Sort.BuiltinSort.description = "This is JavaScript's builtin algorithm, usually a variation of quicksort.";

}(Sort);