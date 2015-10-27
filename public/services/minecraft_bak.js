/*
define(function (require) {
  var _ = require('lodash');
  var module = require('ui/modules').get('app/recipe_calculator', []);

  module.service('fungerPluginMinecraft', function ($http, Promise) {
    return {
      recipeSearch: recipeSearch,
      getMaterials: getMaterials,
      getTotalMaterials: getTotalMaterials,
      saveRecipe: saveRecipe
    };

    function recipeSearch(searchPhrase) {
      var url = '/funger-plugin/api/recipe-search'

      if (searchPhrase) {
        var search = encodeURIComponent(searchPhrase);
        url += '/' + search;
      }

      return $http.get(url)
      .then(function (result) {

        var recipes = result.data.hits.hits.map(function(hit) {
          return {
            '_id' : hit._id,
            'name' : hit._source.name
          };
        });

        return recipes;
      });
    }

    function getMaterials(recipeId, groupResults) {
      return $http.get(`/funger-plugin/api/getMaterials/${recipeId}`)
      .then(function (result) {
        var materials = [];
        var recipeDoc = result.data.recipeDoc;
        var materialDocs = result.data.materialDocs;

        if (recipeDoc._source.basic) {
          materials.push({
            '_id' : recipeDoc._id,
            'name' : recipeDoc._source.name,
            'basic' : recipeDoc._source.basic,
            'found' : true,
            'amount' : recipeDoc._source.amount
          });
        } else {
          var childMaterials = materialDocs.map(function(materialDoc) {
            if (materialDoc.found) {
              return {
                '_id' : materialDoc._id,
                'name' : materialDoc._source.name,
                'basic' : materialDoc._source.basic,
                'found' : true,
                'amount' : materialDoc._source.amount
              };
            } else {
              return {
                '_id' : materialDoc._id,
                'name' : materialDoc._id,
                'found' : false,
                'amount' : 1
              };
            }
          });

          materials = materials.concat(childMaterials);
        }

        if (groupResults) {
          var groupedMaterials = groupMaterial(materials);
          return groupedMaterials;
        } else {
          return materials;
        }
      });
    }

    function getRecipe(recipeId, groupResults) {
      return $http.get(`/funger-plugin/api/getMaterials/${recipeId}`)
      .then(function (response) {
        var recipeDoc = result.data.recipeDoc;
        var materialDocs = result.data.materialDocs;

        var result = {
          '_id' : recipeDoc._id,
          'name' : recipeDoc._source.name,
          'basic' : !!recipeDoc._source.basic,
          'found' : true,
          'amount' : recipeDoc._source.amount,
          'material' : {
            '_id' : recipeDoc._id,
            'name' : recipeDoc._source.name,
            'basic' : !!recipeDoc._source.basic,
            'found' : true
          },
          'materials' : materialDocs.map(function(materialDoc) {
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
        };

        return result;
      }
    }

    function getTotals(arr) {
      var result = [];

      arr.forEach((ele) => {
        var index = _.findIndex(result, '_id', ele._id);
        if (index === -1) {
          result.push({
            _id: ele._id,
            basic: ele.basic,
            count: 1
          });
        } else {
          result[index].count += 1;
        }
      });

      return result;
    }

    function getTotalMaterials(recipeId) {
      var produced = [];
      var consumed = [];

      return iteration(recipeId, 1)
      .then(totalMaterials) => {
        return totalMaterials;
      });

      function iteration(recipeId, multiplier) {
        return getRecipe(recipeId)
        .then((recipe) => {
          if (recipe.basic) {
            return {
              material: recipe.material,
              amount: multiplier
          } else {
            var totals = getTotals(recipe.materials);

            totals.forEach((total) => {

            });

          }

          var promises = [];

          recipe.materials.forEach((material) => {
            if (!material.found || material.basic) {
              material.name = `0|${material.name}`;
              total.push(material);
            } else {
              material.name = `${complexity}|${material.name}`;
              total.push(material);
              promises.push(iteration(material._id, complexity + 1));
            }
          });

          if (!recipe.basic) {

          } else {

          }
        });
      }
    }



    function getTotalMaterialsOld(recipeId) {
      return iteration(recipeId, 1)
      .then((totalMaterials) => {
        // console.log('****************************************************');
        // console.log(totalMaterials);
        // console.log('****************************************************');
        //return totalMaterials;

        var groupedTotal = groupMaterial(totalMaterials);
        //console.log(groupedTotal);
        return groupedTotal;
      });

      function iteration(recipeId, complexity) {
        var total = [];

        return getMaterials(recipeId)
        .then((materials) => {
          var promises = [];

          materials.forEach((material) => {
            if (!material.found || material.basic) {
              material.name = `0|${material.name}`;
              total.push(material);
            } else {
              material.name = `${complexity}|${material.name}`;
              total.push(material);
              promises.push(iteration(material._id, complexity + 1));
            }
          });

          return Promise.all(promises)
          .then((resultsArray) => {
            resultsArray.forEach((result) => {
              var parentId = recipeId;
              total = total.concat(result);
            });

            return total;
          });
        });
      }
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
            count: 1
          });
        } else {
          result[index].count += 1;
        }
      });

      return result;
    }

    function saveRecipe(formData) {
      return $http.post(`/funger-plugin/api/saveRecipe`, formData)
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
*/
