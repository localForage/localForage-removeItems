import { executeCallback } from './utils';

export function removeItemsIndexedDB(keys, callback) {
    var localforageInstance = this;
    var promise = localforageInstance.ready().then(function () {
        return new Promise(function (resolve, reject) {
            var dbInfo = localforageInstance._dbInfo;
            var transaction = dbInfo.db.transaction(dbInfo.storeName, 'readwrite');
            var store = transaction.objectStore(dbInfo.storeName);
            var firstError;

            transaction.oncomplete = function () {
                resolve();
            };

            transaction.onabort = transaction.onerror = function () {
                if ( !firstError ) {
                    reject(transaction.error || 'Unknown error');
                }
            };

            function requestOnError(evt) {
                var request = evt.target || this;
                if ( !firstError ) {
                    firstError = request.error || request.transaction.error;
                    reject(firstError);
                }
            }

            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                if (typeof key !== 'string') {
                    console.warn(key + ' used as a key, but it is not a string.');
                    key = String(key);
                }
                var request = store.delete(key);
                request.onerror = requestOnError;
            }
        });
    });
    executeCallback(promise, callback);
    return promise;
}
