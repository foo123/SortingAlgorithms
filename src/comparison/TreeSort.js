!function(Sort, undef){
@@USE_STRICT@@

//
//  Comparison Algorithms
//

// http://en.wikipedia.org/wiki/Tree_sort
var Node = Sort.Node;
Sort.TreeSort = function(a) {
    var N=a.length;
    
    if (N>1)
    {
        var s, e, btree, k, v;
        if ( 2 <= N )
        {
            // insert first and second item in btree: O(1)
            k = 1; v = a[k];
            btree = v < a[0]
                ? new Node(0,a[0],new Node(k,v))
                : new Node(0,a[0],null,new Node(k,v));
        }
        else
        {
            // insert first item in btree: O(1)
            k = 0; v = a[k];
            btree = new Node(k,v);
        }
        while( k+1 < N )
        {
            // insert item in btree: O(logN) average-case, O(N) worst-case
            e = btree; k++; v = a[k];
            while ( e )
            {
                s = e;
                // stable, take into account index key
                e = (v < e.val) || (v === e.val && k < e.key) ? e.prev : e.next;
            }
            if ( k < s.key ) s.prev = new Node(k,v,s);
            else             s.next = new Node(k,v,s);
        }
        // depth-first, in-order traversal and position sorted in final array: O(N)
        k = 0;
        Node.walk([Node.PREV, Node.NODE, Node.NEXT], btree, function( node ){ a[k++] = node.val; });
        btree = null;
    }
    // in-place
    return a;
};
Sort.TreeSort.reference = "http://en.wikipedia.org/wiki/Tree_sort";
Sort.TreeSort.description = "A tree sort is a sort algorithm that builds a binary search tree from the elements to be sorted, and then traverses the tree (in-order) so that the elements come out in sorted order. Its typical use is sorting elements adaptively: after each insertion, the set of elements seen so far is available in sorted order.Adding one item to a binary search tree is on average an O(logn) process, so adding n items is an O(nlogn) process, making tree sort a 'fast sort'. But adding an item to an unbalanced binary tree needs O(n) time in the worst-case, when the tree resembles a linked list (degenerate tree), causing a worst case of O(n^2) for this sorting algorithm. This worst case occurs when the algorithm operates on an already sorted set, or one that is nearly sorted.";


}(Sort);