define(function (require) {
  require('ui/routes')
  .when('/recipe_calculator/editor/:id', {
    template: require('plugins/funger-plugin/recipe_calculator/editor/index.html'),
    resolve: {
      _id: function ($route) {
        return $route.current.params.id;
      }
    }
  });

  var app = require('ui/modules').get('app/recipe_calculator', []);

  app.directive('recipeCalculatorEditor', function () {
    return {
      restrict: 'E',
      scope: true,
      controller: function ($scope, $route, fungerPluginMinecraft, kbnUrl) {
        $scope._id = $route.current.locals._id;
        $scope.amount = 1;

        $scope.saveRecipe = saveRecipe;

        function saveRecipe() {
          let options = {
            _id: $scope._id,
            name: $scope.name,
            amount: $scope.amount,
            basic: $scope.basic,
            unlimited: $scope.unlimited,
          };
          if (!options.basic) {
            options.recipe = [];

            for (var i=0; i<9; i++) {
              if ($scope[`material${i+1}`]) {
                options.recipe.push($scope[`material${i+1}`]);
              }
            }
          }

          fungerPluginMinecraft.saveRecipe(options)
          .then((response) => {
            $scope.state = response ? 'success' : 'fail';
          })
          .then(() => {
            console.log('Saved.');
            kbnUrl.change('/recipe_calculator/lookup', {});
            //TODO: Message, and redirect
          });
        }
      }
    };
  });
});
