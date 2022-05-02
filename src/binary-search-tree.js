const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree extends Node {
  constructor() {
    super();
    this.rootNode = null;
  }

  root() {
    return this.rootNode === null ? null : this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (this.rootNode === null) {
      this.rootNode = newNode;
    } else {
      this.insertNodeToRightOrLeft(this.rootNode, newNode);
    }
  }

  has(data) {
    return (this.findNodeByData(this.rootNode, data) !== null);
  }

  find(data) {
    return this.findNodeByData(this.rootNode, data);
  }

  remove(data) {
    return this.removeNode(this.rootNode, data);
  }

  min() {
    const { data } = this.findMinNode(this.rootNode);

    return data;
  }

  max() {
    const { data } = this.findMaxNode(this.rootNode);

    return data;
  }

  insertNodeToRightOrLeft(rootNode, nodeToInsert) {
    if (nodeToInsert.data === rootNode.data) {
      return;
    }

    if (nodeToInsert.data > rootNode.data) {
      if (rootNode.right === null) {
        rootNode.right = nodeToInsert;
      } else {
        this.insertNodeToRightOrLeft(rootNode.right, nodeToInsert);
      }
    } else {
      if (rootNode.left === null) {
        rootNode.left = nodeToInsert;
      } else {
        this.insertNodeToRightOrLeft(rootNode.left, nodeToInsert);
      }
    }
  }

  findNodeByData(rootNode, searchedData) {
    if (rootNode === null || rootNode.data === null) {
      return null;
    } else if (searchedData > rootNode.data) {
      return this.findNodeByData(rootNode.right, searchedData);
    } else if (searchedData < rootNode.data) {
      return this.findNodeByData(rootNode.left, searchedData);
    } else {
      return rootNode;
    }
  }

  findMinNode(rootNode) {
    if (rootNode === null) {
      return null;
    } else {
      if (rootNode.left === null) {
        return rootNode;
      } else {
        return this.findMinNode(rootNode.left);
      }
    }
  }

  findMaxNode(rootNode) {
    if (rootNode === null) {
      return null;
    } else {
      if (rootNode.right === null) {
        return rootNode;
      } else {
        return this.findMaxNode(rootNode.right);
      }
    }
  }

  removeNode(rootNode, data) {
    if (rootNode === null) {
      return null;
    } else if(data < rootNode.data) {
      rootNode.left = this.removeNode(rootNode.left, data);
      return rootNode;
    } else if(data > rootNode.data) {
      rootNode.right = this.removeNode(rootNode.right, data);
      return rootNode;
    } else {
      // node to remove does not have children
      if (rootNode.right === null && rootNode.left === null) {
        rootNode = null;
        return rootNode;
      }

      // node to remove has 1 left child
      if (rootNode.left !== null && rootNode.right === null) {
        rootNode = rootNode.left;
        return rootNode;
      }

      // node to remove has 1 right child
      if (rootNode.right !== null && rootNode.left === null) {
        rootNode = rootNode.right;
        return rootNode;
      }

      // node to remove has 2 child
      if (rootNode.right && rootNode.left) {
        const tempNode = this.findMinNode(rootNode.right);
        rootNode.data = tempNode.data;

        rootNode.right = this.removeNode(rootNode.right, tempNode.data);
        return rootNode;
      }
    }
  }
}

module.exports = {
  BinarySearchTree
};