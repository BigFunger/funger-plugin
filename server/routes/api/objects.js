module.exports = function(server) {
  const client = server.plugins.elasticsearch.client;
  const uuid = require('uuid');
  const _ = require('lodash');
  const MAX_DOCS = 99999;

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
      size: MAX_DOCS,
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
    const payload = request.payload;

    client.get({
      index: '.kibana',
      type: payload.type,
      id: payload.object
    })
    .then(function (sourceDoc){
      return copyObject(sourceDoc, payload);
    })
    .catch(reply)
    .then(reply);
  }

  function copyObject(sourceDoc, payload) {
    let body = [];

    for (let i=0;i<payload.numberOfCopies;i++) {
      const uid = uuid.v4();
      const id = `${sourceDoc._id}_${uid}`;
      const title = `${sourceDoc._source.title} ${uid}`;

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
