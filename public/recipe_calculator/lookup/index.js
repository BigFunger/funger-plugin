define(function (require) {
  require('plugins/funger-plugin/services/minecraft');

  require('ui/routes')
  .when('/recipe_calculator', {
    redirectTo: '/recipe_calculator/lookup'
  })
  .when('/recipe_calculator/lookup', {
    template: require('plugins/funger-plugin/recipe_calculator/lookup/index.html')
  })

  var app = require('ui/modules').get('app/recipe_calculator', []);

  app.directive('recipeCalculatorLookup', function () {
    return {
      restrict: 'E',
      scope: true,
      controller: function ($scope, fungerPluginMinecraft) {
        var _ = require('lodash');
        var recipes;

        $scope.$watch('recipe', updateMaterials);
        $scope.$watch('searchText', updateRecipes);
        $scope.addMaterial = addMaterial;
        $scope.testFunction = testFunction;

        function updateRecipes() {
          fungerPluginMinecraft.recipeSearch($scope.searchText)
          .then((result) => {
            recipes = $scope.recipes = result;
          });
        }

        function updateMaterials() {
          if (!$scope.recipe) {
            return;
          }

          fungerPluginMinecraft.getMaterials($scope.recipe._id, true)
          .then((materials) => {
            $scope.materials = materials;
          });

          fungerPluginMinecraft.getTotalMaterials($scope.recipe._id)
          .then((result) => {
            $scope.totalMaterials = result;
            console.log(result);
          });
        }

        function addMaterial(material) {
          // $scope.editId = material._id;
          // $scope.mode = 'edit';
        }

        function testFunction() {
          $scope.showMain = !$scope.showMain;
        }
      }
    };
  });
});



// define(function (require) {
//   require('plugins/funger-plugin/services/minecraft');
//   require('plugins/funger-plugin/recipe_calculator/material_editor');
//   require('plugins/funger-plugin/funger.less');

//   require('ui/routes')
//   .when('/recipe_calculator', {
//     template: require('plugins/funger-plugin/recipe_calculator/index.html'),
//     resolve: {
//       recipes: function(fungerPluginMinecraft) {
//         return fungerPluginMinecraft.recipeSearch();
//       }
//     },
//     controller: "recipeCalculator"
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

//     require('plugins/funger-plugin/recipe_calculator/index.less');
//   });
// });
