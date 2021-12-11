from ds2.deque import DoublyLinkedList
# from collections import OrderedDict
LEFT, RIGHT, STAY = 0, 1, 2

class DLL(DoublyLinkedList):
    """
    This is a doubly linked list that exposes the head node and allows for
    initialization.

    It also provides an iterator over its data.
    """
    def __init__(self, L = ()):
        DoublyLinkedList.__init__(self)
        for item in L:
            self.addlast(item)

    @property
    def head(self):
        return self._head

    @property
    def tail(self):
        return self._tail

    def __iter__(self):
        h = self._head
        while h is not None:
            yield h.data
            h = h.link

class Tape:
    def __init__(self, input):
        self._tape = DLL(input)
        self._head = self._tape.head

    def read(self):
        return self._head.data

    def write(self, symbol):
        if symbol is not None:
            self._head.data = symbol

    def move(self, direction):
        if direction is LEFT:
            self._moveleft()
        if direction is RIGHT:
            self._moveright()

    def _moveright(self):
        if self._head.link is None:
            self._tape.addlast(' ')
        newhead = self._head.link
        if self._head is self._tape.head and self.read() == ' ':
            self._tape.removefirst()
        self._head = newhead

    def _moveleft(self):
        if self._head.prev is None:
            self._tape.addfirst(' ')
        newhead = self._head.prev
        if self._head is self._tape.tail and self.read() == ' ':
            self._tape.removelast()
        self._head = newhead

    def __str__(self):
        return "".join(self)

    def leftofhead(self):
        h = self._tape.head
        tape = []
        while h is not self._head:
            tape.append(h.data)
            h = h.link
        return tape

    def rightofhead(self):
        h = self._head
        tape = []
        while h is not None:
            tape.append(h.data)
            h = h.link
        return tape

    def __iter__(self):
        return iter(self._tape)

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
