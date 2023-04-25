export class Node {
  public current: number | null;
  public next: Node | null;
  constructor(current: number) {
    this.current = current;
    this.next = null;
  }
}
export class NodeList {
  head: Node | null;
  constructor(head: Node | null = null) {
    this.head = head;
  }

  //size
  //获取链表长度
  public size() {
    let _size = 0;
    let node = this.head;
    while (node) {
      _size++;
      node = node.next;
    }
    return _size;
  }

  //clear
  //清空链表
  public clear() {
    this.head = null;
  }

  //getList
  //该方法返回链表的最后一个节点
  public getList() {
    let lastNode = this.head;
    if (lastNode) {
      while (lastNode.next) {
        lastNode = lastNode?.next;
      }
    }
    return lastNode;
  }

  //getFirst
  //获取链表的的第一个节点
  public getFirst() {
    return this.head;
  }
}
