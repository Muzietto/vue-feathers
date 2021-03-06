# vue-feathers
out of the comfort zone again, learning two libraries at the same time...

featuring Vue.js 2.5.16 and Feathers.js 3.1.5


### Notable examples:
- [json-for-vue](https://github.com/Muzietto/vue-feathers/tree/master/feathers/json-for-vue), minimalistic solution with Feathers server+client based on [feathers-fs](https://www.npmjs.com/package/feathers-fs): a REST interface handles JSON data read/written on the filesystem. The [client](https://github.com/Muzietto/vue-feathers/tree/master/feathers/json-for-vue/client) part can be delivered by [http-server](https://www.npmjs.com/package/http-server)
- [crud-json-for-vue](https://github.com/Muzietto/vue-feathers/tree/master/feathers/crud-json-for-vue), comprehensive Express+Feathers solution including [authentication](https://github.com/feathersjs/authentication). JSON data are initially read from the filesystem and stored in [feathers-memory](https://www.npmjs.com/package/feathers-memory)
- [final-trial](https://github.com/Muzietto/vue-feathers/tree/master/vue/final-trial), embryo of a Vue app with Feathers [client](https://github.com/Muzietto/vue-feathers/blob/master/vue/final-trial/client.js) that links to the previously mentioned [crud-json-for-vue](https://github.com/Muzietto/vue-feathers/tree/master/feathers/crud-json-for-vue) module; [login screen for authentication and page build](https://github.com/Muzietto/vue-feathers/blob/master/vue/final-trial/src/components/Header.vue#L10) depending on available credentials kept in localStorage - no custom code whatsoever: everything out of the box of [@feathersjs/authentication](https://github.com/feathersjs/authentication)

