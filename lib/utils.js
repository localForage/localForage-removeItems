export function getDriverPromise(localForageInstance, driverName) {
    getDriverPromise.result = getDriverPromise.result || {};
    if (getDriverPromise.result[driverName]) {
        return getDriverPromise.result[driverName];
    }
    if (!localForageInstance || typeof localForageInstance.getDriver !== 'function') {
        Promise.reject(new Error(
            'localforage.getDriver() was not available! ' +
            'localforage v1.4+ is required!'));
    }
    getDriverPromise.result[driverName] = localForageInstance.getDriver(driverName);
    return getDriverPromise.result[driverName];
}

export function executeCallback(promise, callback) {
    if (callback) {
        promise.then(function(result) {
            callback(null, result);
        }, function(error) {
            callback(error);
        });
    }
    return promise;
}
