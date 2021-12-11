#include <stdio.h>
#include <stdlib.h>
#define SIZE 9

struct node{
    int key;
    struct node* lchild;
    struct node* rchild;
};

typedef struct node Node;
typedef int (*comparer)(int, int);

int compare(int,int);
Node* create_node(int);
Node* insert_node(Node*, int);
Node* delete_node(Node*, int);
Node* search(Node*, const int);
void inorder_travesal(Node*);
void delete(Node*);
void print_node(Node*);
void print_tree(Node*);

int main(){
    Node* root = NULL;
    comparer comp = compare;
 
    /* insert key into the tree */
    int a[SIZE] = {8,3,20,1,5,10,50,6,60};

    for(int i = 0; i < SIZE; i++)
    {
        printf("%d ",a[i]);
        root = insert_node(root, a[i]);
    }
    printf("\n");
    print_tree(root);
 
    /* delete node */
    int comparison;
    printf("Write a key for a node to delete: ");
    scanf("%d", &comparison);

    root = delete_node(root, comparison);
    if(root != NULL)
        print_tree(root);
 
    /* search for a node */
    int key = 0;
    Node *s;
    printf("Write a key for a node to search in BST: ");
    scanf("%d",&key);
    s = search(root, key);
    if(s != NULL)
    {
        printf("Found it %d",s->key);
        if(s->lchild != NULL)
            printf("(L: %d)",s->lchild->key);
        if(s->rchild != NULL)
            printf("(R: %d)",s->rchild->key);
        printf("\n");
    }
    else
    {
        printf("Node %d not found\n",key);
    }
 
    /* delete the whole tree */
    delete(root);
    return 0;
}

int compare(int left, int right)
{
    if(left > right)
        return 1;
    if(left < right)
        return -1;
    return 0;
}

Node* create_node(int k){
    Node* node = (Node *)malloc(sizeof(Node));
    //no memory assigned
    if (node == NULL)
    {
        fprintf (stderr, "Out of memory (create_node)\n");
        exit(1);
    }
    //initialize node children in null
    else
        node->key = k;
        node->lchild = NULL;
        node->rchild = NULL;
    return node;
}

Node* insert_node(Node* node, int key)
{
    //
    if(node == NULL)
        node = create_node(key);
    else
    {
        int is_left;
        int comparison;
        Node* current = node;
        Node* previous = NULL;
 
        while(current!= NULL)
        {
            comparison = compare(key,current->key);
            previous = current;
            if(comparison < 0)
            {
                is_left = 1;
                current = current->lchild;
            }
            else if(comparison > 0)
            {
                is_left = 0;
                current = current->rchild;
            }
        }
        if(is_left)
            previous->lchild = create_node(key);
        else
            previous->rchild = create_node(key);
    }
    return node;
}

Node* delete_node(Node* node, int key)
{
    //no node
    if(node == NULL)
        return NULL;
    Node* current;
    int comparison = compare(key, node->key);
    
    if(comparison < 0)
        node->lchild = delete_node(node->lchild, key);
    else if(comparison > 0)
        node->rchild = delete_node(node->rchild, key);
    else
    {
        if (node->lchild == NULL)
        {
            current = node->rchild;
            free(node);
            node = NULL;
        }
        else if (node->rchild == NULL)
        {
            current = node->lchild;
            free(node);
            node = NULL;
        }
        //2 children
        else
        {
            current = node->rchild;
            Node* parent = NULL;
 
            while(current->lchild != NULL)
            {
                parent = current;
                current = current->lchild;
            }
            node->key = current->key;
            if (parent != NULL)
                parent->lchild = delete_node(parent->lchild, parent->lchild->key);
            else
                node->rchild = delete_node(node->rchild, node->rchild->key);
        }
    }
    return node;
}

Node* search(Node* node, const int key)
{
    if(node == NULL)
        return NULL;
    int comparison;
    Node* current = node;

    while(current != NULL)
    {
        comparison = compare(key, current->key);
        if(comparison < 0)
            current = current->lchild;
        else if(comparison > 0)
            current = current->rchild;
        else
            return current;
    }
    return current;
}

void inorder_traversal(Node* node)
{
    Node *current, *previous;
 
    if(node == NULL)
        return;
 
    current = node;
 
    while(current != NULL)
    {
        if(current->lchild != NULL)
        {
            inorder_traversal(current);
            current = current->rchild;
        }
        else
        {
            previous = current->lchild;
 
            while(previous->rchild != NULL && previous->rchild != current)
                previous = previous->rchild;
 
            if (previous->rchild != NULL)
            {
                previous->rchild = current;
                current = current->lchild;
            }
            else
            {
                previous->rchild = NULL;
                inorder_traversal(current);
                current = current->rchild;
            }
        }
    }
}

void delete(Node* root)
{
    if(root != NULL)
    {
        delete(root->lchild);
        delete(root->rchild);
        free(root);
    }
}

void print_node(Node* node)
{
    if(node != NULL)
        printf("%d ",node->key);
}

void print_tree(Node* node)
{
    if (node == NULL)
        return;
    /* print node key */
    printf("%d",node->key);
    if(node->lchild != NULL)
        printf("(L: %d)",node->lchild->key);
    if(node->rchild != NULL)
        printf("(R: %d)",node->rchild->key);
    printf("\n");
    print_tree(node->lchild);
    print_tree(node->rchild);
}