import { extendPrototype } from 'localforage-removeitems';

declare let localforage: LocalForage;

namespace LocalForageGetItemsTest {

    {
        let localforage2: LocalForageWithRemoveItems = extendPrototype(localforage);
    }

    {
        let itemsPromise: Promise<void> = localforage.removeItems([
          'a',
          'b',
          'c'
        ]);

        itemsPromise.then(() => {
          console.log('Done');
        });
    }
}
