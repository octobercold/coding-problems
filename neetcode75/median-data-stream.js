var MedianFinder = function () {
    this.minHeap = new MinPriorityQueue();
    this.maxHeap = new MaxPriorityQueue();
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
    let min = this.minHeap;
    let max = this.maxHeap;

    if (max.isEmpty() || max.front().element >= num) {
        max.enqueue(num);
    } else {
        min.enqueue(num);
    }

    if (max.size() > min.size() + 1) {
        min.enqueue(max.dequeue().element);
    } else if (max.size() < min.size()) {
        max.enqueue(min.dequeue().element);
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
    let min = this.minHeap;
    let max = this.maxHeap;

    let result;
    if (min.size() === max.size()) {
        result = (max.front().element + min.front().element) / 2.0;
    } else {
        result = max.front().element;
    }

    return result;
};
