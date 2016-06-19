import { executeCallback } from './utils';

function executeSqlAsync(transaction, sql, parameters) {
    return new Promise(function(resolve, reject) {
        transaction.executeSql(sql, parameters, function() {
            resolve();
        }, function(t, error) {
            reject(error);
        });
    });
}

export function removeItemsWebsql(keys, callback) {
    var localforageInstance = this;
    var promise = localforageInstance.ready().then(function() {
        return new Promise(function(resolve, reject){
            var dbInfo = localforageInstance._dbInfo;
            dbInfo.db.transaction(function(t) {
                var storeName = dbInfo.storeName;

                var itemPromises = [];
                for (var i = 0, len = keys.length; i < len; i++) {
                    var key = keys[i];
                    if (typeof key !== 'string') {
                        console.warn(key + ' used as a key, but it is not a string.');
                        key = String(key);
                    }
                    itemPromises.push(executeSqlAsync(t,
                        'DELETE FROM ' + storeName + ' WHERE key = ?',
                        [key]));
                }

                Promise.all(itemPromises).then(resolve, reject);
            }, function(sqlError) {
                reject(sqlError);
            });
        });
    });
    executeCallback(promise, callback);
    return promise;
}
