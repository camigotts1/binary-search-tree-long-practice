// Before starting, copy and paste your guided practice work from
// `binary-search-tree.js` into this file

// Your code here

// Do not change this
class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }

  class BinarySearchTree {

    constructor() {
      this.root = null;
    }

    insert(val, currentNode=this.root) {
      let newNode = new TreeNode(val);

      if(currentNode === null){
        this.root = newNode;
        return this.root;
      }

      let prevNode = currentNode;
      let isLeft = false;

      while(currentNode){
        if(val < currentNode.val){
          isLeft = true;
          prevNode = currentNode;
          currentNode = currentNode.left;
          }
        else{
          isLeft = false;
          prevNode = currentNode;
          currentNode = currentNode.right;
        }
      }
      if(isLeft){
        prevNode.left = newNode;
      }
      else{
        prevNode.right = newNode;
      }
      return this.root;
    }

    search(val) {
      let currentNode = this.root;

      while(currentNode){
        if(currentNode.val === val) return true;
        if(val < currentNode.val){
          currentNode = currentNode.left;
        }
        else{
          currentNode = currentNode.right;
        }
      }

      return false;
    }


    preOrderTraversal(currentNode = this.root) {
      if(currentNode === null) return;
      console.log(currentNode.val);
      this.preOrderTraversal(currentNode.left);
      this.preOrderTraversal(currentNode.right);
    }


    inOrderTraversal(currentNode = this.root) {
      if(currentNode === null) return;
      this.inOrderTraversal(currentNode.left);
      console.log(currentNode.val);
      this.inOrderTraversal(currentNode.right);

    }


    postOrderTraversal(currentNode = this.root) {
      if(currentNode === null) return;
      this.postOrderTraversal(currentNode.left);
      this.postOrderTraversal(currentNode.right);
      console.log(currentNode.val);

    }

      // Breadth First Traversal - Iterative
    breadthFirstTraversal() {
      let queue = [this.root];
      while(queue.length > 0){
        let node = queue.pop();
        console.log(node.val);
        if(node.left) queue.unshift(node.left);
        if(node.right) queue.unshift(node.right);
      }
    }

    // Depth First Traversal - Iterative
    depthFirstTraversal() {
      let stack = [];
      stack.push(this.root);

      while (stack.length > 0) {
          // Pop a node and print it
          let node = stack.pop();
          console.log(node.val);

          // Put all of the node's children on the top of the stack
          if(node.left) stack.push(node.left);
          if(node.right) stack.push(node.right);

      }
  }
  }

  module.exports = { BinarySearchTree, TreeNode };
