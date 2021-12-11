//
// Created by admin on 2018/11/6.
//

class MyLinkedList {
public:
    /** Initialize your data structure here. */
    ~MyLinkedList() {
        // check(head);
        // cout << "size = " << size << endl;
    }


    struct Node {
        int val;
        Node *last;
        Node *next;
        Node(int x): val(x), last(NULL), next(NULL) {}
        Node(int x, Node* last, Node* next){
            val = x;
            if (last)
                last->next = this;
            if (next)
                next->last = this;
            this->last = last;
            this->next = next;
        }
    };

    Node* head = new Node(0);
    int size = 0;
    /** Get the value of the index-th node in the linked list. If the index is invalid, return -1. */
    int get(int index) {
        if (index >= size || index < 0)
            return -1;
        Node *p = head->next;
        for (int i = 0; i < index; i++)
            p = p->next;
        // cout << "get: " << p->val << endl;
        return p->val;
    }

    /** Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list. */
    void addAtHead(int val) {
        new Node(val, head, head->next);
        size++;
    }

    /** Append a node of value val to the last element of the linked list. */
    void addAtTail(int val) {
        Node *p = head;
        for (; p->next; p = p->next)
            ;
        new Node(val, p, nullptr);
        size++;
    }

    /** Add a node of value val before the index-th node in the linked list. If index equals to the length of linked list, the node will be appended to the end of linked list. If index is greater than the length, the node will not be inserted. */
    void addAtIndex(int index, int val) {
        if (index > size || index < 0)
            return;
        if (index == size){
            addAtTail(val);
            return;
        }
        if (index == 0){
            addAtTail(val);
            return;
        }
        Node *p = head->next;
        for (int i = 0; i < index; p = p->next, i++)
            ;
        new Node(val, p->last, p);
        size++;
    }

    /** Delete the index-th node in the linked list, if the index is valid. */
    void deleteAtIndex(int index) {
        if (index >= size || index < 0)
            return;
        Node *p = head->next;
        for (int i = 0; i < index; i++, p = p->next)
            ;
        p->last->next = p->next;
        if (p->next)
            p->next->last = p->last;
        size--;
    }

    void check(Node* head){
        while (head->next){
            cout << head->next->val << " ";
            head = head->next;
        }
        cout << endl;
    }
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * MyLinkedList obj = new MyLinkedList();
 * int param_1 = obj.get(index);
 * obj.addAtHead(val);
 * obj.addAtTail(val);
 * obj.addAtIndex(index,val);
 * obj.deleteAtIndex(index);
 */