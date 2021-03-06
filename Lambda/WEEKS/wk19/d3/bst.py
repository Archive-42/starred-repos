# # -*- coding: utf-8 -*-
# """BST.ipynb
#
# Automatically generated by Colaboratory.
#
# Original file is located at
#     https://colab.research.google.com/drive/1tlPYAG4KAbNNmQ2dNr4aOm88iFX4MEG4
#
# # Binary Trees
#
# ```
#     5
#    / \
#   12  32
#      /  \
#     8    4
# ```
# """

# lets make a node
class Node:
    def __init__(self, value):
        self.value = value


n = Node(10)

# [10]

# lets make a linked list node
class LLNode:
    def __init__(self, value):
        self.value = value
        self.next = None


l = LLNode(10)

# [10] -> None

# lets refactor the linked list node to be a doubly linked list node
class DLLNode:
    def __init__(self, value):
        self.value = value
        self.next = None
        self.prev = None


dl = DLLNode(10)

# None <- [10] -> None

# Lets refactor the doubly linked list node to be a binary tree node
class BTNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


bt = BTNode(10)
bt.left = BTNode(34)
bt.right = BTNode(12)
"""
[12, 34, 1, 56, 1]
        [12]
      /      \
     [1]      [34]
    /         /   \
  [1]      [12]    [56]
          /  \
        n     n
"""

"""# CODE: 4313"""


class BSTNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    def insert(self, value):
        # left case
        if value < self.value:
            if self.left is None:
                self.left = BSTNode(value)
            else:
                self.left.insert(value)
        # right case
        else:
            if self.right is None:
                self.right = BSTNode(value)
            else:
                self.right.insert(value)

    def search(self, target):
        # base case (we found it!)
        if self.value == target:
            return self

        # Left Case
        elif target < self.value:
            if self.left is None:
                return False
            else:
                self.left.search(target)
        else:
            if self.right is None:
                return False
            else:
                self.right.search(target)


t = BSTNode(10)
t.insert(20)
t.insert(15)

result = t.search(15)
print(result)
# result [15]
#        /  \
#       n    n
#
#        [10] s
#       /    \
#      n      [20] s
#             /   \
#          s [15]    n
#           /  \
#           n  n


"""# Demo"""

"""
You are given a binary tree.
Write a function that can find the **maximum depth** of the binary tree. The
maximum depth can be defined as the number of nodes found along the longest
path from the root down to the furthest leaf node. Remember, a leaf node is a
node that has no children.
Example:
Given the following binary tree
max_depth = 2
left_height = 0
right_height = 0

- if there is no root node then return a zero

- otherwise
  - set a left height based on a call to the max depth on the left node
  - set a right height based on a call to the max depth on the right node
  - get the max of the left height and the right height then return that plus 1

** iterative version **
- create a stack to simulate the call stack

- if the root node is not none
  - append the root node to the stack and also the height of that node (1, root)

max_depth = 0

- while the stack is not empty
  pop the tuple off the stack, extracting the current_depth and the root_node

  - if the root_node is not none
    set max_depth to the max of current_depth and the max_depth
    - push the data of (max_depth + 1, root_node.left) on to the stack
    - push the data of (max_depth + 1, root_node.right) on to the stack

return the max_depth to the caller

    5   
   / \
  12  32 
     /  \
    8    4 
your function should return the depth = 3.
"""


class BinaryTreeNode:
    def __init__(self, value=0, left=None, right=None):
        self.value = value
        self.left = left
        self.right = right


"""
r = 5
lh = 1
rh = 

r1 = 12
lh1 = 1
rh1 = 1

r2 = None

r3 = None

r4 = 32
lh = 1
rh = 1


r5 = 8
lh = 0
rh = 0

r6 = None

r7 = None

r8 = 4
lh = 0
rh = 0

r9 = None

r10 = None

"""


def maxDepthR(self, root):
    if root is None:
        return 0

    else:
        left_height = self.maxDepthR(root.left)
        right_height = self.maxDepthR(root.right)
        return max(left_height, right_height) + 1


def maxDepthI(self, root):
    # Your c
    pass
