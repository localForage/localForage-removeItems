/// <reference types="localforage" />

interface ILocalForageWithRemoveItems {
    removeItems(keys: string[]): Promise<void>;
}

interface LocalForage extends ILocalForageWithRemoveItems { }

interface LocalForageWithRemoveItems extends LocalForage { }

declare module "localforage-removeitems" {
    export function extendPrototype(localforage: LocalForage)
        : LocalForageWithRemoveItems;

    export var extendPrototypeResult: boolean;
}
