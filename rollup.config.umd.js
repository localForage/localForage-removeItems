import config from './rollup.config';

config.format = 'umd';
config.dest = 'dist/localforage-removeitems.js';
config.moduleName = 'localforageRemoveItems';

export default config;
