module.exports = function(server) {
  var client = server.plugins.elasticsearch.client;
  var uuid = require('uuid');
  var _ = require('lodash');

  server.route({
    method: 'GET',
    path: '/funger-plugin/api/objects/{type}',
    handler: objectsHandler
  });

  server.route({
    method: 'GET',
    path: '/funger-plugin/api/types',
    handler: typesHandler
  });

  server.route({
    method: 'POST',
    path: '/funger-plugin/api/copy',
    handler: copyHandler
  });

  function objectsHandler(request, reply) {
    client.search({
      index: '.kibana',
      size: 99999,
      sort: '_uid',
      type: request.params.type
    })
    .then(reply);
  }

  function typesHandler(request, reply) {
    client.indices.getMapping({
      index: '.kibana'
    })
    .then(reply);
  }

  function copyHandler(request, reply) {
    var payload = request.payload;

    client.get({
      index: '.kibana',
      type: payload.type,
      id: payload.object
    })
    .then(function (sourceDoc){
      return copyObject(sourceDoc, payload);
    })
    .catch((err) => {
      console.log('Error!');
      console.log(err);
    })
    .then(reply);
  }

  function copyObject(sourceDoc, payload) {
    var body = [];

    for (var i=0;i<payload.numberOfCopies;i++) {
      var uid = uuid.v4();
      var id = `${sourceDoc._id}_${uid}`;
      var title = `${sourceDoc._source.title} ${uid}`;

      body.push({
        index: { _id: id }
      });

      var targetDoc = _.clone(sourceDoc._source);
      targetDoc.title = title;

      body.push(targetDoc);
    };

    return client.bulk({
      index: '.kibana',
      type: payload.type,
      body: body
    });
  }
};
