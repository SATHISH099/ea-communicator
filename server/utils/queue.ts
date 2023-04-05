export default class Queue {
  static queue: {
    promise: () => Promise<any>;
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
  }[] = [];

  static pendingPromise = false;

  static enqueue(promise: () => any) {
    return new Promise((resolve, reject) => {
      this.queue.push({
        promise,
        resolve,
        reject,
      });
      this.dequeue();
    });
  }

  static dequeue() {
    if (this.pendingPromise) {
      return false;
    }
    const item = this.queue.shift();
    if (!item) {
      return false;
    }
    try {
      this.pendingPromise = true;
      item
        .promise()
        .then((value: any) => {
          this.pendingPromise = false;
          item.resolve(value);
          this.dequeue();
        })
        .catch((err: unknown) => {
          this.pendingPromise = false;
          item.reject(err);
          this.dequeue();
        });
    } catch (err) {
      this.pendingPromise = false;
      item.reject(err);
      this.dequeue();
    }
    return true;
  }
}
