define(function (require) {
  require('plugins/funger-plugin/funger.less');

  require('ui/routes')
  .when('/thaumcraft_solver', {
    template: require('plugins/funger-plugin/thaumcraft_solver/index.html'),
    resolve: {
      myshiz: function () {
        return 100;
      }
    },
  });

  // //TODO: What is the difference between the dependency array here, require statements,
  // //  Private statements, and services?
  var app = require('ui/modules').get('app/thaumcraft_solver', []);

  // //TODO: In "/src/plugins/kibana/public/dashboard/index.js" Why are some of the angular
  // // dependencies defined in the directive statement and others defined in the controller statement?
  app.directive('thaumcraftSolverApp', function () {
    return {
      restrict: 'E',
      scope: true,
      controller: function ($scope) {
        var _ = require('lodash');

        require('plugins/funger-plugin/thaumcraft_solver/solver.less');
        var aspects = $scope.aspects = require('plugins/funger-plugin/thaumcraft_solver/aspects');
        var findResult = require('plugins/funger-plugin/thaumcraft_solver/solver');

        $scope.filteredAspects = _.filter(aspects, function(aspect) { return aspect.name != 'dummy'; });

        $scope.sourceAspect = '';
        $scope.targetAspect = '';
        $scope.iterations = 1;

        $scope.$watch('sourceAspect', generateResult);
        $scope.$watch('targetAspect', generateResult);
        $scope.$watch('iterations', generateResult);

        function generateResult(newVal, oldVal) {
          $scope.result = '';

          if (!$scope.sourceAspect) return;
          if (!$scope.targetAspect) return;

          $scope.result = findResult($scope.sourceAspect.name, $scope.targetAspect.name, $scope.iterations);
        }

        $scope.getBackgroundPosition = function(aspect) {
          var index = $scope.aspects.indexOf(aspect);
          var yIndex = Math.floor(index / 8);
          var xIndex = index % 8;

          var x = -1 * (xIndex*64) - 4;
          var y = -1 * (yIndex*64) - 4;

          console.log(`name: ${aspect.name}, index: ${index}, xIndex: ${xIndex}, yIndex: ${yIndex}, x: ${x}, y: ${y}`);
          return `${x}px ${y}px`;
        }

      }
    };
  });
});
