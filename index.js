module.exports = function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      app: {
        title: 'Dancing Bear',
        description: 'he\'ll never stop',
        icon: 'http://placekitten.com/g/400/302',
        main: 'plugins/k4-plugin-dancing-bear/app',
        autoload: kibana.autoload.styles
      }
    }
  });
};