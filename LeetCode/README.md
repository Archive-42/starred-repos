# LeetCode


### "Top-down" Solution
When you meet a tree problem, ask yourself two questions: 

 - Can you determine some parameters to help the node know the answer of itself? 

 - Can you use these parameters and the value of the node itself to determine what should be the parameters parsing to its children? 
 
 If the answers are both **yes**, try to solve this problem using a "top-down" recursion solution.
 
 ```cpp
 int answer;		       // don't forget to initialize answer before call maximum_depth
void maximum_depth(TreeNode* root, int depth) {
    if (!root) {
        return;
    }
    if (!root->left && !root->right) {
        answer = max(answer, depth);
    }
    maximum_depth(root->left, depth + 1);
    maximum_depth(root->right, depth + 1);
}
```

 ### "Bottom-up" Solution

Or you can think the problem in this way: 

for a node in a tree, if you know the answer of its children, can you calculate the answer of the node? 

If the answer is yes, solving the problem recursively from bottom up might be a good way.

```java
public int maximum_depth(TreeNode root) {
	if (root == null) {
		return 0;                                   // return 0 for null node
	}
	int left_depth = maximum_depth(root.left);
	int right_depth = maximum_depth(root.right);
	return Math.max(left_depth, right_depth) + 1;	// return depth of the subtree rooted at root
}
```
