export class BSTNode<T> {
  value: T;
  left: BSTNode<T> | null;
  right: BSTNode<T> | null

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree<T extends number | string> {
  root: BSTNode<T> | null;
  size: number;

  constructor(root: T) {
    this.root = new BSTNode(root);
    this.size = 1;
  }

  private insertNode(node: BSTNode<T>, value: T): boolean {
    if (value === node.value) return false; // Already exists

    const side = value < node.value ? "left" : "right";
    return node[side] ? this.insertNode(node[side], value) : (node[side] = new BSTNode(value), this.size++, true);
  }

  private removeNode(node: BSTNode<T> | null, value: T): BSTNode<T> | null {
    if (!node) return null;

    if (value < node.value) return (node.left = this.removeNode(node.left, value), node);
    if (value > node.value) return (node.right = this.removeNode(node.right, value), node);

    // Node to delete found (value === node.value)

    // Case 1 & 2: Leaf node OR single child 
    if (!node.left) return (this.size--, node.right);
    if (!node.right) return (this.size--, node.left);

    // Case 3: Two children
    const successor = this.minNode(node.right);

    node.value = successor.value;
    node.right = this.removeNode(node.right, successor.value);

    return node;
  }

  private minNode(node: BSTNode<T>): BSTNode<T> {
    let current = node;

    while (current.left) current = current.left;
    return current;
  }

  private maxNode(node: BSTNode<T>): BSTNode<T> {
    let current = node;

    while (current.right) current = current.right;
    return current;
  }

  private traverse(node: BSTNode<T> | null, result: T[]): void {
    if (!node) return;

    this.traverse(node.left, result);
    result.push(node.value);
    this.traverse(node.right, result);
  }

  insert(value: T): boolean {
    if (!this.root) return (this.root = new BSTNode(value), this.size++, true);

    return this.insertNode(this.root, value);
  }

  find(value: T): BSTNode<T> | null {
    let current = this.root;

    while (current) {
      if (value === current.value) return current;
      current = value < current.value ? current.left : current.right;
    }

    return null;
  }

  contains(value: T): boolean {
    return this.find(value) !== null;
  }

  min(): T | null {
    return this.root ? this.minNode(this.root).value : null;
  }

  max(): T | null {
    return this.root ? this.maxNode(this.root).value : null;
  }

  inOrder(): T[] {
    const result: T[] = [];

    this.traverse(this.root, result);
    return result;
  }

  remove(value: T): boolean {
    if (!this.root) return false;

    const initialSize = this.size;
    this.root = this.removeNode(this.root, value);

    return this.size < initialSize;
  }

  get length(): number {
    return this.size;
  }
}