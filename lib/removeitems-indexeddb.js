import { executeCallback } from './utils';

// Safari could garbage collect transaction before oncomplete/onerror/onabord being dispatched
// reference transaction to stop it being garbage collected and remove the reference when it finish
var _refTransaction = {};
var _refTransactionId = 0;

function refTransaction(tx) {
    var id = _refTransactionId++;
    _refTransaction[id] = tx;
    return function() {
        delete _refTransaction[id];
    };
}

export function removeItemsIndexedDB(keys, callback) {
    var localforageInstance = this;

    var unref = undefined;
    var promise = localforageInstance.ready().then(function () {
        return new Promise(function (resolve, reject) {
            var dbInfo = localforageInstance._dbInfo;
            var transaction = dbInfo.db.transaction(dbInfo.storeName, 'readwrite');
            var store = transaction.objectStore(dbInfo.storeName);
            var firstError;

            unref = refTransaction(transaction);

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
    promise.then(unref, unref);
    executeCallback(promise, callback);
    return promise;
}
