const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST (rootNode) {
  let currentNode = rootNode;
  while(currentNode.left){
    currentNode = currentNode.left;
  }
  return currentNode.val;
}

function findMaxBST (rootNode) {
  let currentNode = rootNode;
  while(currentNode.right){
    currentNode = currentNode.right;
  }
  return currentNode.val;
}

function findMinBT (rootNode) {
  if(!rootNode) return;
  let min = rootNode.val;
  let stack = [];
  stack.push(rootNode);

  while (stack.length > 0) {
      // Pop a node and print it
      let node = stack.pop();
      if (node.val < min){
        min = node.val;
      }

      // Put all of the node's children on the top of the stack
      if(node.left) stack.push(node.left);
      if(node.right) stack.push(node.right);

  }

  return min;
}

function findMaxBT (rootNode) {
  if(!rootNode) return;
  let max = rootNode.val;
  let stack = [];
  stack.push(rootNode);

  while (stack.length > 0) {
      // Pop a node and print it
      let node = stack.pop();
      if (node.val > max){
        max = node.val;
      }

      // Put all of the node's children on the top of the stack
      if(node.left) stack.push(node.left);
      if(node.right) stack.push(node.right);

  }

  return max;
}

function getHeight (rootNode) {
  if(!rootNode) return -1;
  if(!rootNode.left && !rootNode.right) return 0;

  let currentNode = rootNode;
  let rightHeight = 0;
  let leftHeight = 0;

  if(currentNode.left){
    leftHeight++;
    leftHeight+= getHeight(currentNode.left);
  }
  if(currentNode.right){
    rightHeight++;
    rightHeight+= getHeight(currentNode.right);
  }

  return leftHeight > rightHeight ? leftHeight : rightHeight;
}


function balancedTree (rootNode) {
  if(!rootNode) return true;

  let leftHeight = getHeight(rootNode.left);
  let rightHeight = getHeight(rootNode.right);

  if( Math.abs(leftHeight - rightHeight) <= 1 ){
    return balancedTree(rootNode.left) && balancedTree(rootNode.right);
  }

  return false;
}

function countNodes (rootNode) {
  if(!rootNode) return 0;
  let currentNode = rootNode;
  let total = 1;

  total+= countNodes(currentNode.left);
  total+= countNodes(currentNode.right);

  return total;
}


function getParentNode (rootNode, target) {
  if(rootNode.val === target) return null;

  if(rootNode !== null){
    let stack = [rootNode];
    while (stack.length > 0) {
        let node = stack.pop();
        if(node.left){
          if(node.left.val === target) return node;
          else{
            stack.push(node.left);
          }
        }
        if(node.right){
          if(node.right.val === target) return node;
          else{
            stack.push(node.right);
          }
        }

    }
  }

  return undefined;
}

function inOrderPredecessor (rootNode, target) {
  let result = [];

  function inOrderTrav(node){
    if(!node) return null;
    inOrderTrav(node.left);
    result.push(node.val);
    inOrderTrav(node.right);
    return result;
  }

  inOrderTrav(rootNode); //fills result array

  let targetIndex = result.indexOf(target);
  if(targetIndex === 0) return null;
  return result[targetIndex - 1];

}

function deleteNodeBST(rootNode, target) {
  // Do a traversal to find the node. Keep track of the parent
  let parent = getParentNode(rootNode, target);
  let node = null;
  let isLeft = true;

  // Undefined if the target cannot be found
  if(parent === undefined) return undefined;

  // Set target based on parent
  if(parent === null){
    node = rootNode;
  }
  else if(parent.left && parent.left.val === target){
    node = parent.left;
  }
  else if(parent.right && parent.right.val === target){
    node = parent.right;
    isLeft = false;
  }

  // Case 0: Zero children and no parent:
  //   return null
  if(!parent && !node.right && !node.left) return null;

  // Case 1: Zero children:
  //   Set the parent that points to it to null
  if(!node.right && !node.left){
    if(isLeft) parent.left = null;
    else parent.right = null;
  }

  // Case 2: Two children:
  //  Set the value to its in-order predecessor, then delete the predecessor
  //  Replace target node with the left most child on its right side,
  //  or the right most child on its left side.
  //  Then delete the child that it was replaced with.
  if(node.right && node.left){
    let newValue = inOrderPredecessor(rootNode, target);
    deleteNodeBST(node, newValue);
    node.val = newValue;
    return;
  }

  // Case 3: One child:
  //   Make the parent point to the child
  let child = null;
  if(node.right) child = node.right;
  else if(node.left) child = node.left;

  if(!parent) {
    rootNode = child;
  }
  if(isLeft){
    parent.left = child;
  }
  else{
    parent.right = child;
  }

}

module.exports = {
    findMinBST,
    findMaxBST,
    findMinBT,
    findMaxBT,
    getHeight,
    countNodes,
    balancedTree,
    getParentNode,
    inOrderPredecessor,
    deleteNodeBST
}
