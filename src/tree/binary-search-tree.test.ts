import { describe, it, expect, beforeEach } from "vitest";
import { BinarySearchTree } from "./binary-search-tree";

describe("BinarySearchTree", () => {
  let bst: BinarySearchTree<number>;

  beforeEach(() => {
    // Αρχικοποίηση δέντρου:
    //          50
    //        /    \
    //      30      70
    //     /  \    /  \
    //   20   40  60   80
    bst = new BinarySearchTree(50);
    bst.insert(30);
    bst.insert(70);
    bst.insert(20);
    bst.insert(40);
    bst.insert(60);
    bst.insert(80);
  });

  describe("Initialization", () => {
    it("should initialize with root value and length 1", () => {
      const tree = new BinarySearchTree(10);
      expect(tree.root?.value).toBe(10);
      expect(tree.length).toBe(1);
    });
  });

  describe("insert()", () => {
    it("should insert elements correctly and update length", () => {
      expect(bst.length).toBe(7);
      expect(bst.root?.left?.value).toBe(30);
      expect(bst.root?.right?.value).toBe(70);
      expect(bst.root?.left?.left?.value).toBe(20);
    });

    it("should return false and not increment length on duplicate insertion", () => {
      expect(bst.insert(50)).toBe(false);
      expect(bst.insert(30)).toBe(false);
      expect(bst.length).toBe(7);
    });
  });

  describe("find() & contains()", () => {
    it("should return the correct node on find()", () => {
      const node = bst.find(40);
      expect(node).not.toBeNull();
      expect(node?.value).toBe(40);
    });

    it("should return null on find() when value does not exist", () => {
      expect(bst.find(999)).toBeNull();
    });

    it("should return true for existing values and false for non-existing in contains()", () => {
      expect(bst.contains(20)).toBe(true);
      expect(bst.contains(80)).toBe(true);
      expect(bst.contains(100)).toBe(false);
    });
  });

  describe("min() & max()", () => {
    it("should return the minimum value in the tree", () => {
      expect(bst.min()).toBe(20);
    });

    it("should return the maximum value in the tree", () => {
      expect(bst.max()).toBe(80);
    });

    it("should return null if the tree is completely emptied", () => {
      const tree = new BinarySearchTree(10);
      tree.remove(10); // Αδειάζουμε το δέντρο
      expect(tree.min()).toBeNull();
      expect(tree.max()).toBeNull();
    });
  });

  describe("inOrder()", () => {
    it("should return elements in strictly ascending sorted order", () => {
      expect(bst.inOrder()).toEqual([20, 30, 40, 50, 60, 70, 80]);
    });
  });

  describe("remove()", () => {
    it("should return false when trying to remove a non-existent value", () => {
      expect(bst.remove(999)).toBe(false);
      expect(bst.length).toBe(7);
    });

    it("Case 1: should remove a leaf node (0 children)", () => {
      expect(bst.remove(20)).toBe(true);
      expect(bst.length).toBe(6);
      expect(bst.contains(20)).toBe(false);
      expect(bst.root?.left?.left).toBeNull();
      expect(bst.inOrder()).toEqual([30, 40, 50, 60, 70, 80]);
    });

    it("Case 2: should remove a node with 1 child", () => {
      bst.remove(20); // Αφαιρούμε το 20 ώστε το 30 να έχει μόνο ένα παιδί (το 40)
      
      expect(bst.remove(30)).toBe(true);
      expect(bst.length).toBe(5);
      expect(bst.contains(30)).toBe(false);
      expect(bst.root?.left?.value).toBe(40);
      expect(bst.inOrder()).toEqual([40, 50, 60, 70, 80]);
    });

    it("Case 3: should remove a node with 2 children using in-order successor", () => {
      // Αφαίρεση του 70 (με παιδιά 60 και 80). Ο διάδοχος είναι το 80.
      expect(bst.remove(70)).toBe(true);
      expect(bst.length).toBe(6);
      expect(bst.contains(70)).toBe(false);
      expect(bst.inOrder()).toEqual([20, 30, 40, 50, 60, 80]);
    });

    it("Case 3 (Root): should remove the root node properly", () => {
      // Αφαίρεση ρίζας 50. Ο διάδοχος είναι το 60.
      expect(bst.remove(50)).toBe(true);
      expect(bst.length).toBe(6);
      expect(bst.contains(50)).toBe(false);
      expect(bst.root?.value).toBe(60); 
      expect(bst.inOrder()).toEqual([20, 30, 40, 60, 70, 80]);
    });

    it("should correctly handle removal of the absolute last node", () => {
      const tree = new BinarySearchTree(10);
      expect(tree.remove(10)).toBe(true);
      expect(tree.root).toBeNull();
      expect(tree.length).toBe(0);
    });
  });
});