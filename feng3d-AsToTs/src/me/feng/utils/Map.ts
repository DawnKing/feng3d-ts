module feng3d {

    /**
     * 构建Map类代替Dictionary
     */
    export class Map<K, V>
    {
        list: KV<K, V>[] = [];

        public push(k: K, v: V) {

            var target = this._getKV(k);
            if (target != null)
                target.v = v;
            else {
                target = new KV(k, v);
                this.list.push(target);
            }
        }

        public get(k: K): V {
            var target = this._getKV(k);
            if (target != null)
                return target.v;
            return null;
        }

        private _getKV(k: K): KV<K, V> {
            var target: KV<K, V>;
            this.list.forEach(kv => {
                if (kv.k == k) {
                    target = kv;
                }
            });
            return target;
        }
    }

    class KV<K, V>
    {
        constructor(public k: K, public v: V)
        { }
    }
}