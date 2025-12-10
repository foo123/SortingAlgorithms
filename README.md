Sorting Algorithms
===================

![sort.js](/sort.jpg)


__Various sorting algorithms implementations in JavaScript__


[sort.min.js](https://raw.githubusercontent.com/foo123/SortingAlgorithms/master/test/js/sort.min.js)


[![screenshot](/test/screenshot.png)](https://foo123.github.io/examples/sorting-algorithms/)


* [Live Playground Example](https://foo123.github.io/examples/sorting-algorithms/)


Sorting Series, which is also a **kind of discrete optimization problem** (eg the permutation function `perm` of `0..N-1` which **maximizes** `0*a[perm[0]]+1*a[perm[1]]+..+(N-1)*a[perm[N-1]]` is the **permutation which sorts the array `a` in ascending order** that is `a[perm[0]] <= a[perm[1]] <= .. <= a[perm[N-1]]`); lies at the center of Computer Science and Algorithms because of its many uses.

(Ref. [Sorting Algorithm](https://en.wikipedia.org/wiki/Sorting_algorithm))

Furthermore Sorting, in one way or another, is integral part of many other important algorithms and applications (see eg. Knuth *The Art Of Computer Programming*)

For example Sorting is very closely associated to Searching, another topic of immense importance and applications.

Under certain sorting states, searching can be achieved in `O(logN)` time or even in `O(1)` time (constant) for almost every search term.

Sorting has 3 approaches:

(eg. NIST.gov maintains a dictionary of various algorithms at:  http://xlinux.nist.gov/dads// )


### Block vs. Online/Adaptive:

1. In the Block case, the whole array is available at once
for this case many algorithms are known (comparison-based => `O(N^2)`, `O(NlogN)` complexities) and (number/count based => `O(N)` complexity) (see below)

2. In the Adaptive/Online case, the input series is
accesed one at a time (for example an time-input signal). In this case some of the previous algorithms can be transformed to work adaptively

    Apart from that, there are algorithms (like Dynamic Lists, Dynamic Heaps and Balanced Trees, Tries, eg AVL Trees) which keep an input sequence always in a 'sorted' state (with each new input) with relatively low complexity (eg `O(logN)`).


### Comparison-Based vs. Arithmetic/Count-Based:

* Comparison-based sorting algorithms (InsertionSort, MergeSort, QuickSort, etc..) sort a series by comparing elements with each other in some optimum sense

    The best time complexity of these algorithms is `O(NlogN)`.  
    However better than this can be achieved   

* Statistics-based sorting algorithms (CountingSort, BucketSort, RadixSort, etc..), do not use comparisons (of any kind) between elements, but instead use their arithmetic/statistical properties

    This makes possible algorithms which can sort in linear `O(N)` time (the fastest possible).   
    However these algorithms have some limitations (eg only Integers, or special kinds of Numbers). 


> Is `O(N)` sorting possible for arbitrary random numbers??


Computing the value of a certain number `n` (in a fixed type of encoding, eg `decimal-place`) requires approximately `O(logn)` *"primitive digit"* operations. Since, statistically, the **range of values of numbers in a list of given size is increasingly correlated to the size of the list as the size of the list increases** (i.e lists of size `N` containing random numbers with values over the whole range `0..N` have increasingly greater probability, as `N` increases, over all lists of same size `N`, containing random numbers whose values do not cover the whole range `0..N`), one then has an overall complexity of `O(NlogN)` even for arithmetic-based sorting algorithms.  

See for example *"what is the true complexity of radix sort?"*.

> Classical algorithms for integer sorting require **assumptions about the size of the integers** to be sorted, or else have a **running time dependent on the size**.

-- [*Sorting in Linear Time?* Arne Andersson, Torben Hagerupt, Stefan Nilsson, Rajeev Ramam](https://www.cs.unc.edu/~plaisted/comp550/linear%20time%20sorting.pdf)

However the *catch* here is that same holds for comparing arbitrary numbers, computationaly one has to compare `primitive digit` by `primitive digit` in sequence on average, hence an additional `O(logn)` complexity for comparison-based algorithms, over the `O(NlogN)` bound.


> Is `O(NlogN)` complexity a kind of *strict base line* for this computational model??

According to Knuth's theoretical lower bound theorem for general (comparison) sorting algorithms (note `O(logN!) = O(NlogN)`): the `O(NlogN)` bound is asymptoticaly tight (see also [information-theoretic lower bound for comparison sorts](https://www.inf.fh-flensburg.de/lang/algorithmen/sortieren/lowerbounden.htm) is &Omega;(NlogN) ).


A summary of various sorting and searching algorithms can be found in [*SORTING AND SEARCHING ALGORITHMS*, Tom Niemann (pdf)](https://www.epaperpress.com/sortsearch/download/sortsearch.pdf)

Lately, AI has been used to discover faster ways to sort. For new sorting algorithms discovered using AI see:
[Faster sorting algorithms discovered using deep reinforcement learning, Daniel J. Mankowitz et al, 2023](https://www.nature.com/articles/s41586-023-06004-9?fromPaywallRec=false)


**Included Algorithms**

* Builtin (JavaScript's default sorting algorithm)
* [Bubble Sort](http://en.wikipedia.org/wiki/Bubble_sort)
* [Cocktail Sort](http://en.wikipedia.org/wiki/Cocktail_shaker_sort)
* [Cycle Sort](http://en.wikipedia.org/wiki/Cycle_sort)
* [Heap Sort](http://en.wikipedia.org/wiki/Heap_sort)
* [Insertion Sort](http://en.wikipedia.org/wiki/Insertion_sort)
* [Library Sort](http://en.wikipedia.org/wiki/Library_sort)
* [Shell Sort](http://en.wikipedia.org/wiki/Shellsort)
* [Quick Sort](http://en.wikipedia.org/wiki/Quicksort) (**recursive &amp; iterative**)
* [Tree Sort](http://en.wikipedia.org/wiki/Tree_sort)
* [Merge Sort](http://en.wikipedia.org/wiki/Merge_sort) (**recursive, iterative &amp; natural TODO: in-place `O(1)` extra space version**)
* [Counting Sort](http://en.wikipedia.org/wiki/Counting_sort)
* [Bucket Sort](http://en.wikipedia.org/wiki/Bucket_sort)
* [Radix Sort](http://en.wikipedia.org/wiki/Radix_sort) (**not implemented yet**)
* [Intro Sort](https://en.wikipedia.org/wiki/Introsort) (**not implemented yet**)
* [Burst Sort](http://en.wikipedia.org/wiki/Burstsort) (**not implemented yet**)
* [Tim Sort](http://en.wikipedia.org/wiki/Timsort) (**not implemented yet**)
* Permutation Sort (**custom**)
* Index Sort (**custom**)
* Statistical Sort (**custom, in progress**)


------------------------------------------------------

NOTE: The calculation of asymptotic complexity is done usually (using recursive relations)
with the Master Theorem :

Refs.
        http://en.wikipedia.org/wiki/Master_theorem,
        http://en.wikipedia.org/wiki/Introduction_to_Algorithms


T(n) = aT(n/b) + f(n),  a>=1, b>1

eg. for MergeSort => T(n) = 2T(n/2) + O(n) =>  T(n) = O(nlogn)


---------------------------------------------------------

This package implements showcases of various (best known) sorting algorithms
(and a couple of custom ones)
for study, experimentation and use in applications
In a concice library


> __Algorithms as a technology__   Suppose computers were infinitely fast and memory was free. Would you have any reason to study algorithms? The answer is yes, if for no other reason than that you would  still like to demonstrate that your solution method terminates and does so with the correct answer.  ...Of course, computers may be fast but not infinitely fast and memory may be cheap but not completely free. Computing time is therefore a  bounded resource, and so is space in memory. These resources should be used wisely and algorithms that are efficient in terms of time and space will help you do so.  This demostrates that algorithms, like computer hardware, are a __technology__ . Total system performance depends on choosing efficient algorithms as much as choosing fast hardware. Just as rapid advances are being made in other computer technologies, they are being made in algorithms as well. (__Introduction to algorithms, 2nd Ed. Cormen,Leiserson,Rivest,Stein__)



> __Algorithms as a ecological technology__     Additionaly, every operation/instruction a computer performs has an energy consumption cost. Thus an efficient algorithm saves energy!  An efficient algorithm performs a computation by trying to use the resources in the best possible manner, so effectively uses energy in the best possible manner.  Where does energy come from? It comes from burning coal or gas (mainly).  So there you have it; efficient code is ecological!  Better start learning your [complexity]( http://en.wikipedia.org/wiki/Computational_complexity_theory) soon.


**see also:**

* [Abacus](https://github.com/foo123/Abacus) Computer Algebra and Symbolic Computation System for Combinatorics and Algebraic Number Theory for JavaScript and Python
* [SciLite](https://github.com/foo123/SciLite) Scientific Computing Environment similar to Octave/Matlab in pure JavaScript
* [TensorView](https://github.com/foo123/TensorView) view array data as multidimensional tensors of various shapes efficiently
* [FILTER.js](https://github.com/foo123/FILTER.js) video and image processing and computer vision Library in pure JavaScript (browser and nodejs)
* [HAAR.js](https://github.com/foo123/HAAR.js) image feature detection based on Haar Cascades in JavaScript (Viola-Jones-Lienhart et al Algorithm)
* [HAARPHP](https://github.com/foo123/HAARPHP) image feature detection based on Haar Cascades in PHP (Viola-Jones-Lienhart et al Algorithm)
* [Fuzzion](https://github.com/foo123/Fuzzion) a library of fuzzy / approximate string metrics for PHP, JavaScript, Python
* [Matchy](https://github.com/foo123/Matchy) a library of string matching algorithms for PHP, JavaScript, Python
* [Regex Analyzer/Composer](https://github.com/foo123/RegexAnalyzer) Regular Expression Analyzer and Composer for PHP, JavaScript, Python
* [Xpresion](https://github.com/foo123/Xpresion) a simple and flexible eXpression parser engine (with custom functions and variables support), based on [GrammarTemplate](https://github.com/foo123/GrammarTemplate), for PHP, JavaScript, Python
* [GrammarTemplate](https://github.com/foo123/GrammarTemplate) grammar-based templating for PHP, JavaScript, Python
* [codemirror-grammar](https://github.com/foo123/codemirror-grammar) transform a formal grammar in JSON format into a syntax-highlight parser for CodeMirror editor
* [ace-grammar](https://github.com/foo123/ace-grammar) transform a formal grammar in JSON format into a syntax-highlight parser for ACE editor
* [prism-grammar](https://github.com/foo123/prism-grammar) transform a formal grammar in JSON format into a syntax-highlighter for Prism code highlighter
* [highlightjs-grammar](https://github.com/foo123/highlightjs-grammar) transform a formal grammar in JSON format into a syntax-highlight mode for Highlight.js code highlighter
* [syntaxhighlighter-grammar](https://github.com/foo123/syntaxhighlighter-grammar) transform a formal grammar in JSON format to a highlight brush for SyntaxHighlighter code highlighter
* [MOD3](https://github.com/foo123/MOD3) 3D Modifier Library in JavaScript
* [Geometrize](https://github.com/foo123/Geometrize) Computational Geometry and Rendering Library for JavaScript
* [Plot.js](https://github.com/foo123/Plot.js) simple and small library which can plot graphs of functions and various simple charts and can render to Canvas, SVG and plain HTML
* [CanvasLite](https://github.com/foo123/CanvasLite) an html canvas implementation in pure JavaScript
* [Rasterizer](https://github.com/foo123/Rasterizer) stroke and fill lines, rectangles, curves and paths, without canvas
* [Gradient](https://github.com/foo123/Gradient) create linear, radial, conic and elliptic gradients and image patterns without canvas
* [css-color](https://github.com/foo123/css-color) simple class to parse and manipulate colors in various formats
* [PatternMatchingAlgorithms](https://github.com/foo123/PatternMatchingAlgorithms) library of Pattern Matching Algorithms in JavaScript using [Matchy](https://github.com/foo123/Matchy)
* [SortingAlgorithms](https://github.com/foo123/SortingAlgorithms) library of Sorting Algorithms in JavaScript

