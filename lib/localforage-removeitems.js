import localforage from 'localforage';
import { removeItemsGeneric } from './removeitems-generic';
import { removeItemsIndexedDB } from './removeitems-indexeddb';
import { removeItemsWebsql } from './removeitems-websql';

export { removeItemsGeneric } from './removeitems-generic';

export function localforageRemoveItems(/*keys, callback*/) {
    var localforageInstance = this;
    var currentDriver = localforageInstance.driver();

    if (currentDriver === localforageInstance.INDEXEDDB) {
        return removeItemsIndexedDB.apply(localforageInstance, arguments);
    } else if (currentDriver === localforageInstance.WEBSQL) {
        return removeItemsWebsql.apply(localforageInstance, arguments);
    } else {
        return removeItemsGeneric.apply(localforageInstance, arguments);
    }
}

export function extendPrototype(localforage) {
    var localforagePrototype = Object.getPrototypeOf(localforage);
    if (localforagePrototype) {
        localforagePrototype.removeItems = localforageRemoveItems;
        localforagePrototype.removeItems.indexedDB = function(){
            return removeItemsIndexedDB.apply(this, arguments);
        };
        localforagePrototype.removeItems.websql = function(){
            return removeItemsWebsql.apply(this, arguments);
        };
        localforagePrototype.removeItems.generic = function(){
            return removeItemsGeneric.apply(this, arguments);
        };
    }
}

export var extendPrototypeResult = extendPrototype(localforage);
