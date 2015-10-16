var join = require('path').join;
var requireAllAndApply = require('./server/lib/require_all_and_apply');

module.exports = function (kibana) {
  return new kibana.Plugin({
    require: ['kibana', 'elasticsearch'],
    uiExports: {
      app: {
        title: 'Funger\'s Plugin',
        description: 'reminder that he could kill you at any moment.',
        icon: 'plugins/funger-plugin/funger.svg',
        main: 'plugins/funger-plugin/app',
        injectVars: function (server, options) {
          var config = server.config();
          return {
            kbnIndex: config.get('kibana.index'),
            esShardTimeout: config.get('elasticsearch.shardTimeout'),
            esApiVersion: config.get('elasticsearch.apiVersion')
          };
        },
        // by default, it autoloads 'EVERYTHING'
        //autoload: kibana.autoload.styles,
      }
    },
    init: function (server, options) {
      requireAllAndApply(join(__dirname, 'server', 'routes', '**', '*.js'), server);
    }
  });
};
