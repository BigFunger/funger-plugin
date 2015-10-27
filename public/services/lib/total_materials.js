define(function (require) {
  return function CourierFetchCallResponseHandlers(Private, Promise, $http) {
    var _ = require('lodash');

    function getRecipe(recipeId) {
      return $http.get(`/funger-plugin/api/getMaterials/${recipeId}`)
      .catch(function(result) {
        return {
          '_id': recipeId,
          'name': recipeId,
          'found': false
        };
      })
      .then(function (result) {
        var materials = [];
        var recipeDoc = result.data.recipeDoc;
        var materialDocs = result.data.materialDocs;

        if (materialDocs) {
          materials = materialDocs.map(function(materialDoc) {
            if (materialDoc.found) {
              return {
                '_id' : materialDoc._id,
                'name' : materialDoc._source.name,
                'basic' : !!materialDoc._source.basic,
                'found' : true
              };
            } else {
              return {
                '_id' : materialDoc._id,
                'name' : materialDoc._id,
                'found' : false
              };
            }
          });
        }

        return {
          '_id' : recipeDoc._id,
          'name' : recipeDoc._source.name,
          'basic' : !!recipeDoc._source.basic,
          'found' : true,
          'amount' : recipeDoc._source.amount || 1,
          'material' : {
            '_id' : recipeDoc._id,
            'name' : recipeDoc._source.name,
            'basic' : !!recipeDoc._source.basic,
            'found' : true
          },
          'materials' : materials
        };
      });
    }

    function getTotalMaterials(recipeId) {
      var produced = [];

      return iteration(recipeId, 1)
      .then((totalMaterials) => {
        return {
          used: groupMaterial(totalMaterials),
          extra: groupMaterial(produced)
        }
      });

      function iteration(recipeId, step) {
        return getRecipe(recipeId)
        .then((recipe) => {
          if (contains(produced, recipe.material)) {
            produced = removeOne(produced, recipe.material);
            return [];
          }

          var result = [];
          var childMaterials = recipe.materials || [];
          return iterateChildMaterials()
          .then(() => {
            recipe.material.step = recipe.material.basic ? 0 : step;

            for (var i=0;i<recipe.amount;i++) {
              produced.push(recipe.material);
              result.push(recipe.material);
            }
            produced = removeOne(produced, recipe.material);

            //result.push(recipe.material);
            return result;
          });

          function iterateChildMaterials() {
            var childMaterial = childMaterials.pop();
            if (!childMaterial)
              return Promise.resolve([]);

            if (!childMaterial.found) {
              result.push(childMaterial);
              return iterateChildMaterials();
            }

            return iteration(childMaterial._id, step + 1)
            .then((iterationResult) => {
              result = result.concat(iterationResult);
              return iterateChildMaterials();
            });
          }
        });
      }
    }

    function contains(materials, materialToFind) {
      return _.findIndex(materials, function(material) {
        return material._id === materialToFind._id;
      }) !== -1;
    }

    function removeOne(materials, materialToRemove) {
      var removed = _.remove(materials, function(material) {
        return material._id === materialToRemove._id;
      });
      removed.pop();
      return materials.concat(removed);
    }

    function groupMaterial(arr) {
      var result = [];

      arr.forEach((ele) => {
        var index = _.findIndex(result, '_id', ele._id);
        if (index === -1) {
          result.push({
            _id: ele._id,
            name: ele.name,
            found: ele.found,
            step: ele.step,
            count: 1
          });
        } else {
          result[index].count += 1;
        }
      });

      return result;
    }

    return getTotalMaterials;
  }
});
