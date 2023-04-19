export const mutationObserverNode = (
  customNode: string,
  callback: (element: Element) => void
) => {
  //隐藏表单元素
  const target = document.querySelector(customNode);
  if (target) {
    callback(target);
  } else {
    const customOptionObserverOfGroupedProduct = new MutationObserver(
      function () {
        const target = document.querySelector(customNode);
        if (target) {
          callback(target);
          safeDisconnectObserver();
        } else {
          safeObserve();
        }
      }
    );

    safeObserve();
    function safeDisconnectObserver() {
      if (customOptionObserverOfGroupedProduct) {
        disconnectObserver();
      }
    }

    function safeObserve() {
      const safeObserveNode =
        document.querySelector(customNode) || document.body;
      customOptionObserverOfGroupedProduct.observe(safeObserveNode, {
        childList: true,
      });
    }

    function disconnectObserver() {
      customOptionObserverOfGroupedProduct.disconnect();
    }
  }
};
