require('plugins/funger-plugin/kibana_object_copier');
require('plugins/funger-plugin/thaumcraft_solver');

var chrome = require('ui/chrome');
var routes = require('ui/routes');

routes
.otherwise({
  redirectTo: '/kibana_object_copier'
});

chrome
.setBrand({
  logo: 'url(/plugins/funger-plugin/logo.png) center no-repeat',
  smallLogo: 'url(/plugins/funger-plugin/logo.png) center no-repeat',
})
.setNavBackground('#687954')
.setTabDefaults({
  activeIndicatorColor: '#5d7046'
})
.setTabs([
  {
    id: 'kibana_object_copier',
    title: 'Kibana Object Copier'
  },
  {
    id: 'thaumcraft_solver',
    title: 'Thaumcraft Solver'
  }
])
.setRootTemplate(require('plugins/funger-plugin/main.html'));
