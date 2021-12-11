# Turing Machines

I wrote a little program to implement Turing Machines.  The first step was to make a `Tape` class that supports the operations `read`, `write`, and `move`.
The `move` method has a parameter `direction` that can be `LEFT`, `RIGHT`, or `STAY`.
The `Tape` is implemented with a doubly-linked list in order to simulate infinite length in both directions.

Armed with this `Tape` data structure, implementing the Turing Machine is quite easy.
Here it is.

```python
class TuringMachine:
    def __init__(self, start, transition):
        self.transition = transition
        self.start = start

    def compute(self, input):
        self.tape = Tape(input)
        self.state = self.start

    def step(self):
        (state, symbol, motion) = self.transition(self.state, self.tape.read())
        self.state = state
        self.tape.write(symbol)
        self.tape.move(motion)

    def config(self):
        return self.tape.leftofhead() + [self.state] + self.tape.rightofhead()
```

To initialize a new `TuringMachine` object, you give it a start state and the transition function.
It assumes that any symbols that appear on the tape are tape symbols as are any symbols that the transition function says to write.
It also assumes that there are states called `'accept'` and `'reject'`.
Any state that comes out of the transition function is considered a real state.

```python {cmd id="runtheturingmachine" hide}
from ds_viz.turingmachine import TuringMachine, LEFT, RIGHT, STAY
from ds_viz.gizehcanvas import Canvas
from ds_viz.vizsequence import drawlist
canvas = Canvas(720, 600)

def runtheTM(TM):
    height = 20
    while TM.state not in ['accept', 'reject']:
        drawlist(TM.config(), (20, height), canvas)
        TM.step()
        height += 40

    drawlist(M.config(), (20, height), canvas)
    print(canvas.tohtml())
```

<svg width="800" height="300" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(0,-150)">
	<ellipse stroke="black" stroke-width="2" fill="none" cx="176.5" cy="267.5" rx="30" ry="30"/>
	<text x="169.5" y="273.5" font-family="Times New Roman" font-size="20">X</text>
	<ellipse stroke="black" stroke-width="2" fill="none" cx="374.5" cy="267.5" rx="30" ry="30"/>
	<text x="367.5" y="273.5" font-family="Times New Roman" font-size="20">Y</text>
	<ellipse stroke="black" stroke-width="2" fill="none" cx="587.5" cy="267.5" rx="30" ry="30"/>
	<text x="561.5" y="273.5" font-family="Times New Roman" font-size="20">accept</text>
	<ellipse stroke="black" stroke-width="2" fill="none" cx="587.5" cy="267.5" rx="26" ry="26"/>
	<polygon stroke="black" stroke-width="2" points="122.5,209.5 156.057,245.543"/>
	<polygon fill="black" stroke-width="2" points="156.057,245.543 154.266,236.281 146.947,243.095"/>
	<polygon stroke="black" stroke-width="2" points="206.5,267.5 344.5,267.5"/>
	<polygon fill="black" stroke-width="2" points="344.5,267.5 336.5,262.5 336.5,272.5"/>
	<text x="240.5" y="258.5" font-family="Times New Roman" font-size="20">&#9251 &#8594 &#9251 , L</text>
	<polygon stroke="black" stroke-width="2" points="404.5,267.5 557.5,267.5"/>
	<polygon fill="black" stroke-width="2" points="557.5,267.5 549.5,262.5 549.5,272.5"/>
	<text x="450.5" y="258.5" font-family="Times New Roman" font-size="20">&#9251 &#8594 R</text>
	<path stroke="black" stroke-width="2" fill="none" d="M 184.478,296.298 A 22.5,22.5 0 1 1 158.494,291.349"/>
	<text x="120" y="361.5" font-family="Times New Roman" font-size="20">0,1 &#8594 1, R</text>
	<polygon fill="black" stroke-width="2" points="158.494,291.349 149.24,293.183 156.088,300.471"/>
	<path stroke="black" stroke-width="2" fill="none" d="M 395.835,288.424 A 22.5,22.5 0 1 1 370.87,297.162"/>
	<text x="356.5" y="354.5" font-family="Times New Roman" font-size="20">0,1&#8594 L</text>
	<polygon fill="black" stroke-width="2" points="370.87,297.162 363.781,303.386 373.358,306.261"/>
  </g>
</svg>


```python {cmd id="simpleTM" continue="runtheturingmachine"}
def trans(q, a):
    if q == 'X':
        if a in ['0', '1']:
            return ('X', '1', RIGHT)
        if a == ' ':
            return ('Y', ' ', LEFT)
    if q == 'Y':
        if a in ['0', '1']:
            return ('Y', a, LEFT)
        if a == ' ':
            return ('accept', ' ', RIGHT)
    return ('reject', a, STAY)
```

```python {cmd continue="simpleTM"  output=html}
M = TuringMachine('X', trans)
M.compute('0010')
runtheTM(M)
```

The transition function `trans` has a catchall return statement at the end to reject anything other states or symbols.

```python {cmd continue="simpleTM"  output=html}
M = TuringMachine('X', trans)
M.compute('0010000002')
runtheTM(M)
```


Let's implement the moveover functionality described in class.
Recall that this TM should put a blank space at the head position and shift all the other tape cells to the right by one step.

```python {cmd id="moveover" continue="runtheturingmachine" output=html}
def moveover(q, a):
    if q == 'start':
        nextstate = 'zero' if a == '0' else 'one'
        return (nextstate, ' ', RIGHT)
    if q in ['zero', 'one']:
        symbol_to_write = '0' if q == 'zero' else '1'
        if a == ' ':
            return ('backtrack', symbol_to_write, LEFT)
        elif a == '0':
            return ('zero', symbol_to_write, RIGHT)
        else:
            return ('one', symbol_to_write, RIGHT)

    if q == 'backtrack':
        if a in ['0', '1']:
            return ('backtrack', a, LEFT)
        else:
            return ('accept', ' ', STAY)
    return ('reject', None, STAY)

```

```python {cmd continue="moveover" output=html}
M = TuringMachine('start', moveover)
M.compute('111010')
runtheTM(M)
```

This is a little unsatisfying, because we could have achieved the same result by simply moving left at the first step.
The power of this little machine shows up when we are not at the beginning of the tape.
We can artificially move the tape head to another position before we run it and we will see the results is more interesting.

```python {cmd continue="moveover" output=html}
M = TuringMachine('start', moveover)
M.compute('111010')
M.tape.move(RIGHT)
runtheTM(M)
```

It would be nice if this worked for other alphabets.
The natural thing to do here is to have a state for each symbol.
For a symbol `'x'`, we will make a state `'qx'`.
That is if the symbol is stored in a string `a`, we will make a state `'q' + a`.
Then, when in state `q = 'qx'`, we can access the symbol to write as `q[1]`.
Here it is in code.

```python {cmd id="moveover2" continue="runtheturingmachine" output=html}
def moveover(q, a):
    if q == 'start':
        return ('q' + a, ' ', RIGHT)
    elif q == 'backtrack':
        if a == ' ':
            return ('accept', ' ', STAY)
        else:
            return ('backtrack', a, LEFT)
    else:
        if a == ' ':
            return ('backtrack', q[1], LEFT)
        else:
            return ('q'+ a, q[1], RIGHT)
```

```python {cmd continue="moveover2" output=html}
M = TuringMachine('start', moveover)
M.compute('abcdefg')
M.tape.move(RIGHT)
M.tape.move(RIGHT)
runtheTM(M)
```

## Enumerating Binary Strings

Suppose we want to enumerate all binary strings.
(In fact, we do want to do this in order to simulate nondeterministic TMs.)
One way to do this is to make a Turing Machine that will start with a binary string on the tape and will update the tape so that it has the lexicographically next binary string.
It's a little easier if we imagine that the strings are written backwards on the tape.
This is like treating the tape as a number in binary with the least significant bit starting on the left and then adding one.
The one difference is that after $111$ comes $0000$.  More generally, we count up to $p$ copies of $1$ and then replace it with $p+1$ copies of $0$.
Here is a TM that implements this process.

<svg width="800" height="300" version="1.1" xmlns="http://www.w3.org/2000/svg">
<g transform="translate(0,-150)">
	<ellipse stroke="black" stroke-width="2" fill="none" cx="176.5" cy="267.5" rx="30" ry="30"/>
	<text x="159.5" y="273.5" font-family="Times New Roman" font-size="20">start</text>
	<ellipse stroke="black" stroke-width="2" fill="none" cx="374.5" cy="267.5" rx="30" ry="30"/>
	<text x="345.5" y="273.5" font-family="Times New Roman" font-size="20">backup</text>
	<ellipse stroke="black" stroke-width="2" fill="none" cx="587.5" cy="267.5" rx="30" ry="30"/>
	<text x="561.5" y="273.5" font-family="Times New Roman" font-size="20">accept</text>
	<ellipse stroke="black" stroke-width="2" fill="none" cx="587.5" cy="267.5" rx="26" ry="26"/>
	<polygon stroke="black" stroke-width="2" points="122.5,209.5 156.057,245.543"/>
	<polygon fill="black" stroke-width="2" points="156.057,245.543 154.266,236.281 146.947,243.095"/>
	<path stroke="black" stroke-width="2" fill="none" d="M 203.989,255.546 A 214.303,214.303 0 0 1 347.011,255.546"/>
	<polygon fill="black" stroke-width="2" points="347.011,255.546 341.138,248.163 337.801,257.59"/>
	<text x="243.5" y="234.5" font-family="Times New Roman" font-size="20">0 &#8594 1,L</text>
	<path stroke="black" stroke-width="2" fill="none" d="M 346.413,277.988 A 243.313,243.313 0 0 1 204.587,277.988"/>
	<polygon fill="black" stroke-width="2" points="346.413,277.988 337.303,275.537 340.218,285.103"/>
	<text x="240.5" y="309.5" font-family="Times New Roman" font-size="20">&#9251 &#8594 0,L</text>
	<polygon stroke="black" stroke-width="2" points="404.5,267.5 557.5,267.5"/>
	<polygon fill="black" stroke-width="2" points="557.5,267.5 549.5,262.5 549.5,272.5"/>
	<text x="450.5" y="258.5" font-family="Times New Roman" font-size="20">&#9251 &#8594 R</text>
	<path stroke="black" stroke-width="2" fill="none" d="M 184.478,296.298 A 22.5,22.5 0 1 1 158.494,291.349"/>
	<text x="133.5" y="356.5" font-family="Times New Roman" font-size="20">1&#8594 0,R</text>
	<polygon fill="black" stroke-width="2" points="158.494,291.349 149.24,293.183 156.088,300.471"/>
	<path stroke="black" stroke-width="2" fill="none" d="M 395.835,288.424 A 22.5,22.5 0 1 1 370.87,297.162"/>
	<text x="398.5" y="353.5" font-family="Times New Roman" font-size="20">0,1&#8594 L</text>
	<polygon fill="black" stroke-width="2" points="370.87,297.162 363.781,303.386 373.358,306.261"/>
  </g>
</svg>


```python {cmd id="binary" continue="runtheturingmachine"}
def binary(state, bit):
    if state == 'start':
        if bit == '0':
            return ('backup', '1', LEFT)
        if bit == '1':
            return ('start', '0', RIGHT)
        if bit == ' ':
            return ('backup', 0, LEFT)
    elif state == 'backup':
        if bit in {'0', '1'}:
            return ('backup', bit, LEFT)
        if bit == ' ':
            return ('accept', ' ', RIGHT)
    else:
        return ('reject', bit, STAY)
```

```python {cmd continue="binary" output=html}
M = TuringMachine('start', binary)
M.compute('11100001')
runtheTM(M)
```

```python {cmd continue="binary" output=html}
M = TuringMachine('start', binary)
M.compute('11111')
runtheTM(M)
```

## A more complicated state

We can think of the state as being decomposed into variables.

Let's design a TM that recognizes the following language.

\[
  A = \{w\#w \mid w\in \{0,1\}^* \}
\]

Here is an informal description of the machine.
The state for such a machine will include both what step of the program we are in as well as the values of the variables.
In this case, there is just one variable called `m` that stores a symbol.
Working with variables this way really requires us to be careful that there are only a finite set of values that the variable may take.

1. If the current symbol is `#` go to step 7. Otherwise, set `m` to be the current symbol, write an `x` to the tape, and go right.
2. Move right until you reach a `#` symbol. Reject if you hit a space.
3. Skip over any x's.
4. Check that the current symbol matches m and write an `x`.  Otherwise, reject.
5. Move left until you reach a `#` symbol.
6. Move left until you reach an `x`, then move right and go to 1.
7. Move right until you reach a `' '` and accept.  Reject if you see anything other than an `x` along the way.

Now we can convert this informal description into a transition function.
In this case, it is easier to write the transition function than it would be to draw out the state diagram.

```python {cmd id="duplicate" continue="runtheturingmachine" output=html}
from collections import namedtuple

State = namedtuple('State', ['step', 'm'])

start = State(step = 1, m = None)
reject = ('reject', None, STAY)
accept = ('accept', None, STAY)

def duplicate(state, symbol):
    if state.step == 1:
        if symbol == '#':
            return (State(step = 7, m = None), None, RIGHT)
        else:
            return (State(step = 2, m = symbol), 'x', RIGHT)
    elif state.step == 2:
        if symbol == '#':
            return (State(step = 3, m = state.m), None, RIGHT)
        elif symbol == ' ':
            return reject
        else:
            return (state , None, RIGHT)
    elif state.step == 3:
        if symbol == 'x':
            return (state, None, RIGHT)
        else:
            return (State(step = 4, m = state.m), symbol, STAY)
    elif state.step == 4:
        if symbol == state.m:
            return (State(step = 5, m = None), 'x', LEFT)
        else:
            return reject
    elif state.step == 5:
        if symbol == '#':
            return (State(step = 6, m = None), None, LEFT)
        else:
            return (state, None, LEFT)
    elif state.step == 6:
        if symbol == 'x':
            return (start, None, RIGHT)
        else:
            return (state, None, LEFT)
    elif state.step == 7:
        if symbol == 'x':
            return (state, None, RIGHT)
        elif symbol == ' ':
            return accept
        else:
            return reject

M = TuringMachine(start, duplicate)
```    



```python{cmd continue="duplicate" output=html}
M.compute('0#01')
runtheTM(M)
```

```python {cmd id="duplicate_tall" continue="duplicate" hide}
canvas = Canvas(720, 900) # Need a little more height to draw this one
```

```python{cmd continue="duplicate_tall" output=html}
M.compute('01#01')
runtheTM(M)
```

It turns out that our code above works for other alphabets as well.
If we were to have an alphabet with 10 symbols, we would need to have $7 \times 10 + 2 = 72$ states.
That's just too many to draw.
We could hope that many of the states are not reachable, but there is no way to avoid that the number of states will grow linearly with the number of symbols.
This is at least some justification for thinking seriously about the Turing Machine in terms of its transition function first, and as a state diagram second.
Remember that the state diagram only gives us a visual representation of the transition function.

```python{cmd continue="duplicate_tall" output=html}
M.compute('ab#ab')
runtheTM(M)
```


Here is the sequence of tapes for a longer example.

```python {cmd continue="duplicate"}
M.compute('0000#0000')
print(M.tape, M.state)
while M.state not in {'accept', 'reject'}:
    M.step()
    print(M.tape, M.state)

```
