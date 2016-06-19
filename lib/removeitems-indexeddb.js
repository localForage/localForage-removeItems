import { executeCallback } from './utils';

export function removeItemsIndexedDB(keys, callback) {
    var localforageInstance = this;
    var promise = localforageInstance.ready().then(function() {
        return new Promise(function(resolve, reject) {
            var dbInfo = localforageInstance._dbInfo;
            var transaction = dbInfo.db.transaction(dbInfo.storeName, 'readwrite');
            var store = transaction.objectStore(dbInfo.storeName);

            var requests = [];
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                if (typeof key !== 'string') {
                    console.warn(key +
                                        ' used as a key, but it is not a string.');
                    key = String(key);
                }
                requests.push(store.delete(key));
            }
            
            transaction.oncomplete = function() {
                resolve();
            };

            transaction.onabort = transaction.onerror = function() {
                var err;
                for (var i = 0, len = requests.length; i < len; i++) {
                    var req = requests[i];
                    err = req.error ? req.error : req.transaction.error;
                }

                reject(err ? err : transaction.error ? transaction.error : 'Unknown error');
            };
        });
    });
    executeCallback(promise, callback);
    return promise;
}
