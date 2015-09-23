module.exports = function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      app: {
        title: 'fungers plugin',
        description: 'reminder that he could kill you at any moment.',
        icon: 'http://mediabuzz.monster.com/nfs/mediabuzz/attachment_images/0000/5129/guerilla_marketing.jpg',
        main: 'plugins/funger-plugin/app',
        autoload: kibana.autoload.require.concat(
        )
      }
    }
  });
};