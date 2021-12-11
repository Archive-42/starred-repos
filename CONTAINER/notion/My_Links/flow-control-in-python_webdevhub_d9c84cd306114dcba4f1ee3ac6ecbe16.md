# flow-control-in-python | webdevhub

Created: October 26, 2021 2:57 PM
URL: https://bgoonz-blog.netlify.app/blog/flow-control-in-python/

![code.png](flow-control-in-python%20webdevhub%20d9c84cd306114dcba4f1ee3ac6ecbe16/code.png)

## Read It

## Flow Control

### Comparison Operators

[Untitled](flow-control-in-python%20webdevhub%20d9c84cd306114dcba4f1ee3ac6ecbe16/Untitled%20Database%203c9a20e93fd545e2b58bbf635775f10e.csv)

These operators evaluate to True or False depending on the values you give them.

Examples:

```
42 == 42

```

```
40 == 42

```

```
'hello' == 'hello'

```

```
'hello' == 'Hello'

```

```
'dog' != 'cat'

```

```
42 == 42.0

```

```
42 == '42'

```

### Boolean evaluation

Never use `==` or `!=` operator to evaluate boolean operation. Use the `is` or `is not` operators, or use implicit boolean evaluation.

NO (even if they are valid Python):

```
True == True

```

```
True != False

```

YES (even if they are valid Python):

```
True is True

```

```
True is not False

```

These statements are equivalent:

```
if a is True:
   pass
if a is not False:
   pass
if a:
   pass

```

And these as well:

```
if a is False:
   pass
if a is not True:
   pass
if not a:
   pass

```

### Boolean Operators

There are three Boolean operators: and, or, and not.

The _and_ Operator’s _Truth_ Table:

The _or_ Operator’s _Truth_ Table:

The _not_ Operator’s _Truth_ Table:

### Mixing Boolean and Comparison Operators

```
(4 < 5) and (5 < 6)

```

```
(4 < 5) and (9 < 6)

```

```
(1 == 2) or (2 == 2)

```

You can also use multiple Boolean operators in an expression, along with the comparison operators:

```
2 + 2 == 4 and not 2 + 2 == 5 and 2 * 2 == 2 + 2

```

### if Statements

```
if name == 'Alice':
    print('Hi, Alice.')

```

### else Statements

```
name = 'Bob'

if name == 'Alice':
    print('Hi, Alice.')
else:
    print('Hello, stranger.')

```

### elif Statements

```
name = 'Bob'
age = 5

if name == 'Alice':
    print('Hi, Alice.')
elif age < 12:
    print('You are not Alice, kiddo.')

```

```
name = 'Bob'
age = 30

if name == 'Alice':
    print('Hi, Alice.')
elif age < 12:
    print('You are not Alice, kiddo.')
else:
    print('You are neither Alice nor a little kid.')

```

### while Loop Statements

```
spam = 0

while spam < 5:
    print('Hello, world.')
    spam = spam + 1

```

### break Statements

If the execution reaches a break statement, it immediately exits the while loop’s clause:

```
while True:
    print('Please type your name.')
    name = input()
    if name == 'your name':
        break

print('Thank you!')

```

### continue Statements

When the program execution reaches a continue statement, the program execution immediately jumps back to the start of the loop.

```
while True:
    print('Who are you?')
    name = input()
    if name != 'Joe':
        continue
    print('Hello, Joe. What is the password? (It is a fish.)')
    password = input()
    if password == 'swordfish':
        break

print('Access granted.')

```

### for Loops and the range() Function

```
print('My name is')
for i in range(5):
    print('Jimmy Five Times ({})'.format(str(i)))

```

The _range()_ function can also be called with three arguments. The first two arguments will be the start and stop values, and the third will be the step argument. The step is the amount that the variable is increased by after each iteration.

```
for i in range(0, 10, 2):
   print(i)

```

You can even use a negative number for the step argument to make the for loop count down instead of up.

```
for i in range(5, -1, -1):
    print(i)

```

### For else statement

This allows you to specify a statement to execute after the full loop has been executed. Only useful when a `break` condition can occur in the loop:

```
for i in [1, 2, 3, 4, 5]:
   if i == 3:
       break
else:
   print("only executed when no item of the list is equal to 3")

```

### Importing Modules

```
import random

for i in range(5):
    print(random.randint(1, 10))

```

```
import random, sys, os, math

```

```
from random import *

```

### Ending a Program with sys.exit

```
import sys

while True:
    print('Type exit to exit.')
    response = input()
    if response == 'exit':
        sys.exit()
    print('You typed {}.'.format(response))

```
