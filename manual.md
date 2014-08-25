
    
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
Better start learning your [complexity]( http://en.wikipedia.org/wiki/Computational_complexity_theory) soon.
    
