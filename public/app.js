require('ui/chrome')
.setBrand({
  logo: 'url(/plugins/funger-plugin/logo.png) center no-repeat',
  smallLogo: 'url(/plugins/funger-plugin/logo.png) center no-repeat',
})
.setNavBackground('#687954')
.setTabDefaults({
  activeIndicatorColor: '#99AD8C'
})
.setTabs([
  {
    id: '',
    title: 'A Simple Reminder'
  }
])
.setRootTemplate(require('plugins/funger-plugin/main.html'));

require('ui/modules')
.directive('fungerApp', function () {
  return {
    controller: function ($scope) {
      $scope.test = 'Hello!';
    }
  };
});