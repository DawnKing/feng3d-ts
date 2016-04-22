var feng;
(function (feng) {
    var ds;
    (function (ds) {
        var compare;
        (function (compare) {
            /**
             * 数字排序
             * @param   a   数字a
             * @param   b   数字b
             * @return      小于0：a在前；等于0：顺序不变；大于0：b在前
             */
            function compareNumber(a, b) {
                return a - b;
            }
            compare.compareNumber = compareNumber;
        })(compare = ds.compare || (ds.compare = {}));
    })(ds = feng.ds || (feng.ds = {}));
})(feng || (feng = {}));
var feng;
(function (feng) {
    var ds;
    (function (ds) {
        var utils;
        (function (utils) {
            /**
             * 二分查找
             * @param   array   数组
             * @param	target	寻找的目标
             * @param	compare	比较函数
             * @param   start   起始位置
             * @param   end     结束位置
             * @return          目标所在位置（如果该位置上不是目标对象，则该索引为该目标可插入的位置）
             */
            function binarySearch(array, target, compare, start, end) {
                start = ~~start;
                end = ~~end;
                if (start == end)
                    return start;
                if (compare(array[start], target) >= 0) {
                    return start;
                }
                if (compare(array[end], target) < 0) {
                    return end;
                }
                var middle = ~~((start + end) / 2);
                if (compare(array[middle], target) < 0) {
                    start = middle;
                }
                else {
                    end = middle;
                }
                return binarySearch(array, target, compare, start, end);
            }
            utils.binarySearch = binarySearch;
        })(utils = ds.utils || (ds.utils = {}));
    })(ds = feng.ds || (feng.ds = {}));
})(feng || (feng = {}));
var feng;
(function (feng) {
    var ds;
    (function (ds) {
        /**
         * 优先数组迭代器
         * @author feng 2016-4-17
         */
        var PriorityArrayIterator = (function () {
            /**
             * 构建优先数组迭代器
             * @param priorityArray     优先数组
             */
            function PriorityArrayIterator(priorityArray) {
                this.priorityArray = priorityArray;
            }
            /**
             * 返回当前元素并且指针移到下一个元素
             */
            PriorityArrayIterator.prototype.next = function () {
                var value = this.priorityArray.getAt(this.cursor);
                this.cursor++;
                return value;
            };
            /**
             * 是否有下一个元素
             */
            PriorityArrayIterator.prototype.hasNext = function () {
                return this.cursor < this.priorityArray.size;
            };
            /**
             * 移到起始位置
             */
            PriorityArrayIterator.prototype.start = function () {
                this.cursor = 0;
            };
            Object.defineProperty(PriorityArrayIterator.prototype, "data", {
                /**
                 * 指向的当前元素
                 */
                get: function () {
                    return this.priorityArray.getAt(this.cursor);
                },
                enumerable: true,
                configurable: true
            });
            return PriorityArrayIterator;
        }());
        ds.PriorityArrayIterator = PriorityArrayIterator;
    })(ds = feng.ds || (feng.ds = {}));
})(feng || (feng = {}));
var feng;
(function (feng) {
    var ds;
    (function (ds) {
        /**
         * 优先数组
         * @author feng 2016-4-17
         */
        var PriorityArray = (function () {
            /**
             * 构建优先数组
             * @param   compare     比较函数
             */
            function PriorityArray(compare) {
                this.data = [];
                this.compare = compare;
            }
            /**
             * 是否包含指定元素
             * @param item       元素
             */
            PriorityArray.prototype.contains = function (item) {
                for (var i = 0; i < this.data.length; i++) {
                    var element = this.data[i];
                    if (element == item)
                        return true;
                }
                return false;
            };
            /**
             * 清理
             */
            PriorityArray.prototype.clear = function () {
                this.data.length = 0;
            };
            /**
             * 获取优先数组迭代器
             */
            PriorityArray.prototype.getIterator = function () {
                return new ds.PriorityArrayIterator(this);
            };
            Object.defineProperty(PriorityArray.prototype, "count", {
                /**
                 * 元素数量
                 */
                get: function () {
                    return this.data.length;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PriorityArray.prototype, "size", {
                /**
                 * 集合尺寸
                 */
                get: function () {
                    return this.data.length;
                },
                enumerable: true,
                configurable: true
            });
            /**
             * 输出所有元素到数组
             */
            PriorityArray.prototype.toArray = function () {
                return this.data.concat();
            };
            /**
             * 获取元素
             * @param   index   索引
             */
            PriorityArray.prototype.getAt = function (index) {
                return this.data[index];
            };
            return PriorityArray;
        }());
        ds.PriorityArray = PriorityArray;
    })(ds = feng.ds || (feng.ds = {}));
})(feng || (feng = {}));
//# sourceMappingURL=fengds.js.map