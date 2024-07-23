/**
*
*   Sort.js
*   @version: @@VERSION@@
*
*   Sorting Algorithms implemented in JavaScript
*   https://github.com/foo123/SortingAlgorithms
*
**/

/**[DOC_MARKDOWN]
    
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
    
[/DOC_MARKDOWN]**/

@@USE_STRICT@@

var Sort = {VERSION: "@@VERSION@@"}, undef = undefined;

var root = this, FP = Function.prototype, OP = Object.prototype, AP = Array.prototype,
    slice = AP.slice, toString = OP.toString, stdMath = Math,
    Min = stdMath.min, Max = stdMath.max, Sqrt = stdMath.sqrt,
    Log = stdMath.log, R = stdMath.random, Round = stdMath.round,
    NODE = 1, PREV = 2, NEXT = 3, LEFT = 4, RIGHT = 5
;

function RI(m, M)
{ 
    return Round((M-m)*R() + m); 
}
function U(m, M)
{ 
    m = null==m ? 0 : +m; 
    M = null==M ? 1 : +M; 
    return (M-m)*R() + m; 
}
function G(mu, sigma)
{
    // https://en.wikipedia.org/wiki/Normal_distribution
    // https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
    // https://en.wikipedia.org/wiki/Marsaglia_polar_method
    mu = null==mu ? 0.0 : +mu;
    sigma = null==sigma ? 1.0 : +sigma;
    var reject = true, u, v, s, multiplier, z0;
    if ( null !== G.spare ) 
    { 
        v = mu + sigma*G.spare;
        G.spare = null;
        return v;
    }
    // generate 2 new pairs
    while ( reject )
    {
        u = U(-1,1); v = U(-1,1); s = u*u + v*v;
        reject = 0.0>=s || s>=1.0;
    }
    multiplier = Sqrt(-2.0*Log(s)/s);  
    G.spare = v*multiplier; 
    z0 = u*multiplier; 
    return mu + sigma*z0;
}
G.spare = null;
function Sgn(x)
{
    return x ? (x < 0 ? -1 : 1) : 0;
}
function asNumbers(a, b)
{
    return a - b;
}

function Constant( N, c )
{ 
    var i, a = new Array(N);
    for(c=c||0,i=0; i<N; i++) a[i] = c;
    return a; 
}
function Duplicates( N, inc, numCuts )
{
    var i, k, c = inc, a = new Array(N);
    for(i=0,k=0; i<N; i++,k++)
    {
        a[i] = c; if ( k>=numCuts ) { k = 0; c += inc; }
    }
    return a;
}
function Range( N, reverse )
{
    var i, a = new Array(N);
    if ( true === reverse )
        for(i=0; i<N; i++) a[i] = N-1-i;
    else
        for(i=0; i<N; i++) a[i] = i;
    return a; 
}
function Equidistant( N, m, M, inc )
{
    var i, a = new Array(N);
    inc = inc || (M-m)/N; a[0] = m;
    for(i=1; i<N; i++) a[i] = a[i-1] + inc;
    return a;
}
function IntegerEquidistributable( N, m, M )
{
    var i, a = new Array(N);
    for(i=0; i<N; i++) a[i] = RI(m, M);
    return a;
}
function NumberEquidistributable( N, m, M )
{
    var i, a = new Array(N);
    for(i=0; i<N; i++) a[i] = U(m, M);
    return a;
}
function IntegerDynamicRange( N, m, M, rangeInc, numCuts )
{
    var i, k, range = 0, a = new Array(N);
    for(i=0,k=0; i<N; i++,k++)
    {
        a[i] = RI(m, M) + range;
        if (k>=numCuts) { k = 0; range += rangeInc; }
    }
    return a;
}
function NumberDynamicRange( N, m, M, rangeInc, numCuts )
{
    var i, k, range = 0, a = new Array(N);
    for(i=0,k=0; i<N; i++,k++)
    {
        a[i] = U(m, M) + range;
        if (k>=numCuts) { k = 0; range += rangeInc; }
    }
    return a;
}
function shuffle( a )
{
    // http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    var N = a.length, perm, swap;
    while( N-- )
    {
        perm = RI( 0, N );
        swap = a[ N ];
        a[ N ] = a[ perm ];
        a[ perm ] = swap;
    }
    // in-place
    return a;
}
function is_array( x )
{
    return (x instanceof Array) || ('[object Array]' === toString.call(x));
}
function is_sorted( a, descending, strict )
{
    var i, a0, N = a.length;
    // already sorted
    if ( 1 >= N ) return true;
    if ( true === descending )
    {
        if ( true === strict ) for(a0=a[0],i=1; i<N; i++) if ( a0 <= a[i] ) return false; else a0 = a[i];
        else for(a0=a[0],i=1; i<N; i++) if ( a0 < a[i] ) return false; else a0 = a[i];
    }
    else
    {
        if ( true === strict ) for(a0=a[0],i=1; i<N; i++) if ( a0 >= a[i] ) return false; else a0 = a[i];
        else for(a0=a[0],i=1; i<N; i++) if ( a0 > a[i] ) return false; else a0 = a[i];
    }
    return true;
}

function Node( k, v, p, n, l, r, d )
{
    // a unified graph as well as (binary) tree, as well as quadraply-, doubly- and singly- linked list
    var self = this;
    self.key = k; self.val = v;
    self.prev = p || null; self.next = n || null;
    self.left = l || null; self.right = r || null;
    self.data = d || null;
}
function walk( scheme, node, go )
{
    if ( null == node ) return;
    var step, i, l, n, s = 0, sl = scheme.length;
    while ( s < sl )
    {
        step = scheme[s]; s += 1; n = null;
        if ( (NODE === step) )                                n = node;
        else if ( (PREV === step) && (null != node.prev) )    n = node.prev;
        else if ( (LEFT === step) && (null != node.left) )    n = node.left;
        else if ( (RIGHT === step) && (null != node.right) )  n = node.right;
        else if ( (NEXT === step) && (null != node.next) )    n = node.next;
        else /*if ( null == n )*/ continue;
        if ( node === n )  go( n );
        else if ( is_array(n) ) for(i=0,l=n.length; i<l; i++) walk( scheme, n[i], go );
        else  walk( scheme, n, go );
    }
}
Node.NODE = NODE;
Node.PREV = PREV;
Node.NEXT = NEXT;
Node.LEFT = LEFT;
Node.RIGHT = RIGHT;
Node.walk = walk;
Sort.Node = Node;

//
// Typed Arrays Substitute 
Sort.Array = Array;
Sort.Array32F = (typeof Float32Array !== "undefined") ? Float32Array : Array;
Sort.Array64F = (typeof Float64Array !== "undefined") ? Float64Array : Array;
Sort.Array8I = (typeof Int8Array !== "undefined") ? Int8Array : Array;
Sort.Array16I = (typeof Int16Array !== "undefined") ? Int16Array : Array;
Sort.Array32I = (typeof Int32Array !== "undefined") ? Int32Array : Array;
Sort.Array8U = (typeof Uint8Array !== "undefined") ? Uint8Array : Array;
Sort.Array16U = (typeof Uint16Array !== "undefined") ? Uint16Array : Array;
Sort.Array32U = (typeof Uint32Array !== "undefined") ? Uint32Array : Array;

Sort.Shuffle = shuffle;
Sort.isSorted = is_sorted;

// utils
Sort.utils = {
    RandomInteger: RI,
    Uniform: U,
    Normal: G,
    asNumbers: asNumbers,
    Constant: Constant,
    Duplicates: Duplicates,
    Equidistant: Equidistant,
    IntegerEquidistributable: IntegerEquidistributable,
    NumberEquidistributable: NumberEquidistributable,
    IntegerDynamicRange: IntegerDynamicRange,
    NumberDynamicRange: NumberDynamicRange,
    Range: Range
};
    
// simple timer statistics class
var Timer = Sort.utils.Timer = function( t ) {
    
    var 
        startTime = arguments.length ? t : new Date().getTime(),
        endTime = Infinity, msMin = Infinity, msMax = 0,
        self = this
    ;
    
    self.getMs = function() {
        var ms = endTime - startTime;
        msMin = Min( msMin, ms );
        msMax = Max( msMax, ms );
        return ms;
    };
    
    self.start = function () {
        startTime = new Date().getTime();
        return self;
    };
    
    self.end = function () {
        endTime = new Date().getTime();
        return self;
    };

    self.reset = function () {
        startTime = new Date().getTime();
        endTime = Infinity;
        return self;
    };
    
    self.update = function () {
        endTime = new Date().getTime();
        startTime = endTime;
        return self;
    };
};

// time a function process and return the statistic
Sort.Time = function(callback, processToTime/*, useWorker*/) {
    var timer, args, ms, delay1=200, delay2=200, d=delay1+delay2;
    
    if ( processToTime )
    {
        args = slice.call( arguments, 2 );
        //args.shift( ); args.shift( );
        
        timer = new Timer( );
        
        // start the timer
        timer.start( );
        
        // use delays, to avoid timer get stuck
        setTimeout(function( ) {
            // run the process with optional args passed
            processToTime.apply(null, args);
            setTimeout(function( ) {
                // return the timing result
                timer.end( );
                var ms = timer.getMs( )-d;
                if ( callback ) callback.call(timer, ms);
            }, delay2);
        }, delay1);
    }
    return 0;
};

Sort.vTime = function(callback, processToTime, args) {
    args = args || [];
    return Sort.Time.apply(Sort, [callback, processToTime].concat( args ));
};
