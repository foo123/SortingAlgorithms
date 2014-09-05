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
    
Sorting Series (a kind of discrete optimization problem)
lies at the center of Computer Science and Algorithms
because of its many uses

(Ref. http://en.wikipedia.org/wiki/Sorting_algorithm)

Also Sorting, in one way or another, is integral part
of many other important algorithms and applications (see eg. Knuth TAOCP)

For example Sorting is very closely associated to Searching, 
another topic of immense importance and applications

Under certain sorting states, searching can be achieved in O(logN) time
or even in O(1) time (constant) for almost every search term

Sorting has 3 approaches:

(eg. NIST.gov maintains a dictionary of various algorithms at:  http://xlinux.nist.gov/dads// )

###Block vs. Online/Adaptive:

* In the Block case, the whole array is available at once
for this case many algorithms are known
(comparison-based=> O(N^2), O(NlogN) complexities)
and
(number/count based=> O(N) complexity) (see below)

* In the Adaptive/Online case, the input series is
accesed one at a time (for example an time-input signal)
In this case some of the previous algorithms can be transformed to work adaptively

Apart from that, there are algorithms 
(like Dynamic Lists, Dynamic Heaps and Balanced Trees, Tries, eg AVL Trees)
which keep an input sequence always in a 'sorted' state (with each new input)
With relatively low complexity (eg O(logN))

###Comparison-Based vs. Arithmetic/Count-Based:

* Comparison-based sorting algorithms (InsertionSort, MergeSort, QuickSort, etc..) sort
a series by comparing elements with each other in some optimum sense

The best time complexity of these algorithms is (at present) O(NlogN)

However better than this can be achieved

* Arithmetic/Count-based sorting algorithms (CountingSort, BucketSort, RadixSort, etc..), 
do not use comparisons (of any kind) between elements, 
but instead use their arithmetic/counting/statistical properties

This makes possible algorithms which can sort in linear O(N) time (the fastest possible)
However these algorithms have some limitations (eg only Integers, or special kinds of Numbers)

Is O(N) sorting possible for arbitrary random numbers??

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


> __Algorithms as a technology__   Suppose computers were infinitely fast and memory was free. Would you have any reason to study algorithms? The answer is yes, if for no other reason than that you would  still like to demonstrate that your solution method terminates and does so with the correct answer. 
...Of course, computers may be fast but not infinitely fast and memory may be cheap but not completely free. Computing time is therefore a  bounded resource, and so is space in memory. These resources should be used wisely and algorithms that are efficient in terms of time and space will help you do so.  
This demostrates that algorithms, like computer hardware, are a __technology__ . Total system performance depends on choosing efficient algorithms as much as choosing fast hardware. Just as rapid advances are being made in other computer technologies, they are being made in algorithms as well. (__Introduction to algorithms, 2nd Ed. Cormen,Leiserson,Rivest,Stein__)



Additionaly, every operation/instruction a computer performs has an energy consumption cost. So an efficient algorithm saves energy! 
An efficient algorithm performs a computation by trying to use the resources in the best possible manner, so effectively uses energy in the best possible manner. 
Where does energy come from? It comes from burning coal (mainly). 
So there you have it, efficient code is ecological! 
Better start learning your [complexity](http://en.wikipedia.org/wiki/Computational_complexity_theory) soon.
    
[/DOC_MARKDOWN]**/

    @@USE_STRICT@@
    
    var Sort = exports.Sort = { VERSION: "@@VERSION@@" }, undef = undefined;
    
    var root = this, FP = Function.prototype, OP = Object.prototype, AP = Array.prototype
        ,slice = FP.call.bind( AP.slice ), toString = FP.call.bind( OP.toString )
    ;
    
    //
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
    
    // utils
    Sort.utils = { };
    
    //
    // math methods
    //
    var
        Min = Math.min, Max = Math.max,
        Sqrt = Math.sqrt, Log = Math.log,
        R = Math.random, 
        
        RI = Sort.utils.RandomInteger = function(m, M) { 
            return ~~((M-m)*R() + m); 
        },
        
        U = Sort.utils.Uniform = function(m, M) { 
            m = (undef===m) ? 0 : m; 
            M = (undef===M) ? 1 : M; 
            return ((M-m)*R() + m); 
        },
        
        // https://en.wikipedia.org/wiki/Normal_distribution
        // https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform
        // https://en.wikipedia.org/wiki/Marsaglia_polar_method
        _spare, isSpareReady=false,
        G = Sort.utils.Gauss = function(mu, sigma) {
            
            mu = (undef===mu) ? 0.0 : mu;
            sigma = (undef===sigma) ? 1.0 : sigma;
            
            if (isSpareReady) 
            { 
                isSpareReady = false;  
                return mu + sigma*_spare;  
            }
            
            // generate 2 new pairs
            var reject = true, u, v, s, multiplier, z0;
            while (reject)
            {
                u = U(-1,1);  
                v = U(-1,1);
                s = u*u + v*v; 
                reject = (0.0>=s || s>=1.0);
            }
            multiplier = Sqrt(-2.0*Log(s)/s);  
            _spare = v*multiplier; 
            isSpareReady = true;  
            
            z0 = u*multiplier; 
            return mu + sigma*z0;
        },
        
        Sgn = Sort.utils.Sign = function(x) {
            return x ? (x < 0 ? -1 : 1) : 0;
        },
        
        asNumbers = Sort.utils.asNumbers = function(a, b) { return a - b; }
    ;
        
    //
    // auxilliary methods
    //
    
    // this is a shuffling algorithm
    // http://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    Sort.Shuffle = /*Sort.utils.FisherYatesKnuthShuffle =*/ function( a ) {
        var N = a.length, perm, swap;
        while( N-- ){ perm=RI(0, N); swap=a[N]; a[N]=a[perm]; a[perm]=swap; }   
        // in-place
        return a;
    };
    
    // check whether an array of numbers is sorted
    // used to check algorithm validity under different cases
    Sort.isSorted = function( a, strict ) {
        var N = a.length, i, x, s, fs, tie;
        
        // already sorted
        if (N<=1) return true;
        
        strict = strict || false;
        
        x = a[1]-a[0];
        fs = x ? (x < 0 ? -1 : 1) : 0;
        // only ascending sorting checked
        if (strict && fs < 0) return false;
        
        tie = (fs) ? false : true;
        
        for (i=1; i<N; i++)
        {
            x = a[i]-a[i-1];
            s = x ? (x < 0 ? -1 : 1) : 0;
            if (tie && s) { fs = s; tie = false; }
            if (strict && s < 0)  return false;
            else if (s&&(s-fs))  return false;
        }
        return true;
    };
    
    Sort.utils.Constant = function( N, c ) { 
        var a = new Array(N); 
        c = c||0;
        while(N--) a[N] = c;  
        return a; 
    };
    
    Sort.utils.Duplicates = function( N, inc, numCuts ) { 
        var a = new Array(N), i, k, c=inc;
        k = 0;
        for (i=0; i<N; i++)
        {
            a[i] = c;
            if (k>=numCuts)
            {
                k = 0;
                c += inc;
            }
            k++;
        }
        return a;
    };
    
    Sort.utils.Range = function( N ) { 
        var a = new Array(N); 
        while(N--) a[N] = N;  
        return a; 
    };
    
    Sort.utils.ReverseRange = function( N ) { 
        var a = new Array(N), i = N; 
        while(i--) a[i] = N-1-i;  
        return a; 
    };
    
    Sort.utils.Equidistant = function( N, m, M, inc ) {
        var a = new Array(N), i, v=m;
        for (i=0; i<N; i++)
        {
            a[i] = v;
            v += inc;
        }
        return a;
    };
    
    Sort.utils.IntegerEquidistributable = function( N, m, M ) {
        var a = new Array(N), i;
        for (i=0; i<N; i++)
        {
            a[i] = RI(m, M);
        }
        //a.sort(asNumbers);
        return a;
    };
    
    Sort.utils.NumberEquidistributable = function( N, m, M ) {
        var a = new Array(N), i;
        for (i=0; i<N; i++)
        {
            a[i] = U(m, M);
        }
        //a.sort(asNumbers);
        return a;
    };
    
    Sort.utils.IntegerDynamicRange = function( N, m, M, rangeInc, numCuts ) {
        var a = new Array(N), i, k, range=0;
        k = 0;
        for (i=0; i<N; i++)
        {
            a[i] = RI(m, M) + range;
            if (k>=numCuts)
            {
                k = 0;
                range += rangeInc;
            }
            k++;
        }
        //a.sort(asNumbers);
        return a;
    };
    
    Sort.utils.NumberDynamicRange = function( N, m, M, rangeInc, numCuts ) {
        var a = new Array(N), i, k, range=0;
        k = 0;
        for (i=0; i<N; i++)
        {
            a[i] = U(m, M) + range;
            if (k>=numCuts)
            {
                k = 0;
                range += rangeInc;
            }
            k++;
        }
        //a.sort(asNumbers);
        return a;
    };
    
    // simple timer statistics class
    var Timer = Sort.utils.Timer = function( t ) {
        
        var 
            startTime = arguments.length ? t : new Date().getTime(),
            endTime = Infinity,
            msMin = Infinity, 
            msMax = 0
        ;
        
        this.getMs = function() {
            var ms = endTime - startTime;
            msMin = Min( msMin, ms );
            msMax = Max( msMax, ms );
            return ms;
        };
        
        this.start = function () {
            startTime = new Date().getTime();
            return this;
        };
        
        this.end = function () {
            endTime = new Date().getTime();
            return this;
        };

        this.reset = function () {
            startTime = new Date().getTime();
            endTime = Infinity;
            return this;
        };
        
        this.update = function () {
            endTime = new Date().getTime();
            startTime = endTime;
            return this;
        };
    };
    
    // time a function process and return the statistic
    Sort.Time = function(callback, processToTime, useWorker) {
        var timer, args, ms, delay1=300, delay2=300, d=delay1+delay2;
        
        if ( processToTime )
        {
            args = slice( arguments );
            args.shift( );
            args.shift( );
            
            timer = new Timer( );
            
            // start the timer
            timer.start( );
            
            // use delays, to avoid timer get stuck
            setTimeout(function( ) {
                
                // run the process with optional args passed
                processToTime.apply({}, args);
                
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
    