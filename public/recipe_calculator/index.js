define(function (require) {
  require('plugins/funger-plugin/services/minecraft');
  require('plugins/funger-plugin/recipe_calculator/lookup');
  require('plugins/funger-plugin/recipe_calculator/editor');
  require('plugins/funger-plugin/funger.less');
  require('plugins/funger-plugin/recipe_calculator/index.less');
});


// define(function (require) {
//   require('plugins/funger-plugin/services/minecraft');
//   require('plugins/funger-plugin/recipe_calculator/material_editor');
//   require('plugins/funger-plugin/funger.less');
//   require('plugins/funger-plugin/recipe_calculator/index.less');

//   require('ui/routes')
//   .when('/recipe_calculator', {
//     template: require('plugins/funger-plugin/recipe_calculator/index.html'),
//     resolve: {
//       recipes: function(fungerPluginMinecraft) {
//         return fungerPluginMinecraft.recipeSearch();
//       }
//     },
//     controller: 'recipeCalculator'
//   });

//   var app = require('ui/modules').get('app/recipe_calculator', []);

//   app.controller('recipeCalculator', function ($scope, $route, fungerPluginMinecraft) {
//     var _ = require('lodash');
//     var recipes = $scope.recipes = $route.current.locals.recipes;

//     $scope.$watch('recipe', updateMaterials);
//     $scope.addMaterial = addMaterial;
//     $scope.showMain = true;
//     $scope.testFunction = testFunction;

//     function updateMaterials() {
//       if (!$scope.recipe) {
//         return;
//       }

//       fungerPluginMinecraft.getMaterials($scope.recipe._id)
//       .then((materials) => {
//         $scope.materials = materials;
//       });
//     }

//     function addMaterial(material) {
//       $scope.editId = material._id;
//     }

//     function testFunction() {
//       $scope.showMain = !$scope.showMain;
//     }
//   });
// });
