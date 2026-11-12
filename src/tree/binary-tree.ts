// Generic binary trees enforce no insertion rules; nodes are linked manually. We do not implement an insert function

type DFSOrder = "pre" | "in" | "post";

export class BinaryTreeNode<T> {
  value: T;
  left: BinaryTreeNode<T> | null;
  right: BinaryTreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTree<T> {
  readonly root: BinaryTreeNode<T>;

  constructor(root: BinaryTreeNode<T>) {
    this.root = root;
  }

  // O(n)
  private *bfsTraverse(): Generator<BinaryTreeNode<T>> {
    const queue: BinaryTreeNode<T>[] = [this.root];
    let head = 0;

    while (head < queue.length) {
      const current = queue[head++]!;
      yield current;

      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return;
  }

  // O(n)
  private *dfsTraverse(node: BinaryTreeNode<T> | null, order: DFSOrder): Generator<BinaryTreeNode<T>> {
    if (!node) return;

    if (order === "pre") yield node;
    if (node.left) yield* this.dfsTraverse(node.left, order);
    if (order === "in") yield node;
    if (node.right) yield* this.dfsTraverse(node.right, order);
    if (order === "post") yield node;
  }

  // O(n) - traversal: Top -> bottom, left -> right
  levelOrder(): T[] {
    return Array.from(this.bfsTraverse(), node => node.value);
  }

  // O(n) - traversal: Root -> Left -> Right
  preOrder(): T[] {
    return Array.from(this.dfsTraverse(this.root, "pre"), node => node.value);
  }

  // O(n) - traversal: Left -> Root -> Right
  inOrder(): T[] {
    return Array.from(this.dfsTraverse(this.root, "in"), node => node.value);
  }

  // O(n) - traversal: Left -> Right -> Root
  postOrder(): T[] {
    return Array.from(this.dfsTraverse(this.root, "post"), node => node.value);
  }

  // O(n)
  height(node: BinaryTreeNode<T> | null = this.root): number {
    if (!node) return 0;

    return 1 + Math.max(this.height(node.left), this.height(node.right)); // + 1, add the current node
  }

  // O(n)
  get length(): number {
    let counter = 0;
    const nodes = this.bfsTraverse();

    for (const node of nodes) counter++;
    return counter;
  }
}