define(function (require) {
  var _ = require('lodash');
  var module = require('ui/modules').get('app/kibana_object_copier', []);

  module.service('fungerPluginObjects', function ($http, Promise) {
    return {
      getTypes: getTypes,
      getObjects: getObjects,
      copyObject: copyObject
    };

    function getTypes() {
      return $http.get('/funger-plugin/api/types')
      .then(function (result) {
        var types = _.keys(result.data['.kibana'].mappings);
        _.pull(types, 'config', 'index-pattern');

        return types;
      });
    }

    function getObjects(type) {
      if (!type) return Promise.resolve();

      return $http.get(`/funger-plugin/api/objects/${type}`)
      .then(function (result) {
        // Ask why this didn't work.
        // var objects = [];
        // result.data.hits.hits.forEach((hit) => {
        //   objects[hit._id] = hit._source.title;
        // });

        var objects = result.data.hits.hits.map(function(hit) {
          // ask why i can't do hit[_id];
          return {
            '_id' : hit._id,
            'title' : hit._source.title
          };
        });
        return objects;
      });
    }

    function copyObject(formData) {
      return $http.post('/funger-plugin/api/copy', formData)
      .catch(function(err){
        console.log('Something bad happened here.');
        //TODO: What should happen? Where to put validation?
      })
      .then(function (result) {
        //Check response code?
        return (result.status === 200);
      });
    }
  });

});
