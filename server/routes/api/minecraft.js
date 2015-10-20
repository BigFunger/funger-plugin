module.exports = function(server) {
  var client = server.plugins.elasticsearch.client;
  var uuid = require('uuid');
  var _ = require('lodash');

  server.route({
    method: 'GET',
    path: '/funger-plugin/api/recipe-search/{search}',
    handler: recipeSearchHandler
  });

  server.route({
    method: 'GET',
    path: '/funger-plugin/api/recipe-search',
    handler: recipeSearchHandler
  });

  server.route({
    method: 'GET',
    path: '/funger-plugin/api/getMaterials/{recipeId}',
    handler: getMaterialsHandler
  })

  server.route({
    method: 'GET',
    path: '/funger-plugin/api/test',
    handler: testHandler
  })

  server.route({
    method: 'POST',
    path: '/funger-plugin/api/saveRecipe',
    handler: saveRecipeHandler
  });

  function recipeSearchHandler(request, reply) {
    var query = {
      index: 'funger_plugin',
      type: 'recipe',
      size: 99999,
      sort: '_uid',
      body: {
        "_source": [ "name"]
      }
    };

    if (request.params.search) {
      query.body.query = {
        match: {
          name: request.params.search
        }
      };
    }

    client.search(query)
    .then(reply);
  }

  function getMaterialsHandler(request, reply) {
    var result = {};

    client.get({
      index: 'funger_plugin',
      type: 'recipe',
      id: request.params.recipeId
    })
    .then((recipeDoc) => {
      result.recipeDoc = recipeDoc;

      if (!result.recipeDoc._source.basic) {
        return client.mget({
          index: 'funger_plugin',
          type: 'recipe',
          body: {
            ids: result.recipeDoc._source.recipe
          }
        })
        .then((materialDocs) => {
          result.materialDocs = materialDocs.docs;
        });
      }
    })
    .then(() => {
      reply(result);
    })
    .catch(reply);
  }

  function saveRecipeHandler(request, reply) {
    const payload = request.payload;

    client.index({
      index: 'funger_plugin',
      type: 'recipe',
      id: payload._id,
      body: {
        name: payload.name,
        amount: payload.amount,
        basic: payload.basic,
        unlimited: payload.unlimited,
        recipe: payload.recipe
      }
    })
    .catch(reply)
    .then(reply);
  }

  function testHandler(request, reply) {
    client.mget({
      index: 'funger_plugin',
      type: 'recipe',
      body: {
        ids: ["410","331","410","331","4348:38","331","265","265","265"]
      }
    })
    .then(reply);
  }
};
