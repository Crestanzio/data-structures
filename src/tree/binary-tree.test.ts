import { describe, it, expect, beforeEach } from "vitest";
import { BinaryTree, BinaryTreeNode } from "./binary-tree";

describe("BinaryTree", () => {
  describe("Single Node Tree", () => {
    it("handles a tree with only the root node", () => {
      const root = new BinaryTreeNode(10);
      const tree = new BinaryTree(root);

      expect(tree.length).toBe(1);
      expect(tree.height()).toBe(1);
      expect(tree.levelOrder()).toEqual([10]);
      expect(tree.preOrder()).toEqual([10]);
      expect(tree.inOrder()).toEqual([10]);
      expect(tree.postOrder()).toEqual([10]);
    });
  });

  describe("Multi-level Tree", () => {
    let tree: BinaryTree<number>;

    beforeEach(() => {
      const root = new BinaryTreeNode(10);

      // Level 1
      root.left = new BinaryTreeNode(20);
      root.right = new BinaryTreeNode(30);

      // Level 2
      root.left.left = new BinaryTreeNode(40);
      root.left.right = new BinaryTreeNode(50);
      root.right.left = new BinaryTreeNode(60);
      root.right.right = new BinaryTreeNode(70);

      // Level 3
      root.left.left.left = new BinaryTreeNode(80);
      root.left.left.right = new BinaryTreeNode(90);
      root.left.right.left = new BinaryTreeNode(100);
      root.left.right.right = new BinaryTreeNode(110);
      root.right.left.left = new BinaryTreeNode(120);
      root.right.left.right = new BinaryTreeNode(130);
      root.right.right.left = new BinaryTreeNode(140);
      root.right.right.right = new BinaryTreeNode(150);

      // Level 4
      root.left.left.left.left = new BinaryTreeNode(160);

      tree = new BinaryTree(root);
    });

    it("calculates the correct length and height", () => {
      expect(tree.length).toBe(16);
      expect(tree.height()).toBe(5);
    });

    it("performs levelOrder traversal (BFS: top-to-bottom, left-to-right)", () => {
      expect(tree.levelOrder()).toEqual([
        10,
        20, 30,
        40, 50, 60, 70,
        80, 90, 100, 110, 120, 130, 140, 150,
        160,
      ]);
    });

    it("performs preOrder traversal (DFS: Root -> Left -> Right)", () => {
      expect(tree.preOrder()).toEqual([
        10, 20, 40, 80, 160, 90, 50, 100, 110, 30, 60, 120, 130, 70, 140, 150,
      ]);
    });

    it("performs inOrder traversal (DFS: Left -> Root -> Right)", () => {
      expect(tree.inOrder()).toEqual([
        160, 80, 40, 90, 20, 100, 50, 110, 10, 120, 60, 130, 30, 140, 70, 150,
      ]);
    });

    it("performs postOrder traversal (DFS: Left -> Right -> Root)", () => {
      expect(tree.postOrder()).toEqual([
        160, 80, 90, 40, 100, 110, 50, 20, 120, 130, 60, 140, 150, 70, 30, 10,
      ]);
    });

    it("calculates subtree height when passed a specific node", () => {
      // Το υποδέντρο με ρίζα το 40 έχει παιδιά 80 (με παιδί 160) και 90 -> ύψος 3
      expect(tree.height(tree.root.left!.left)).toBe(3);

      // Ένα φύλλο (π.χ. το 160) έχει ύψος 1
      expect(tree.height(tree.root.left!.left!.left!.left)).toBe(1);

      // Null κόμβος έχει ύψος 0
      expect(tree.height(null)).toBe(0);
    });
  });

  describe("Generic Type Support", () => {
    it("works correctly with string values", () => {
      const root = new BinaryTreeNode("A");
      root.left = new BinaryTreeNode("B");
      root.right = new BinaryTreeNode("C");

      const stringTree = new BinaryTree(root);

      expect(stringTree.length).toBe(3);
      expect(stringTree.height()).toBe(2);
      expect(stringTree.levelOrder()).toEqual(["A", "B", "C"]);
      expect(stringTree.inOrder()).toEqual(["B", "A", "C"]);
    });
  });
});