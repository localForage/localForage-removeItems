import { executeCallback } from './utils';

export function removeItemsGeneric(keys, callback) {
    var localforageInstance = this;

    var itemPromises = [];
    for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        itemPromises.push(localforageInstance.removeItem(key));
    }

    var promise = Promise.all(itemPromises);

    executeCallback(promise, callback);
    return promise;
}
