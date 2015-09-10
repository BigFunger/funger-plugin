require('ui/chrome')
.setBrand({
  logo: 'url(/plugins/funger-plugin/logo.png) center no-repeat',
  smallLogo: 'url(/plugins/funger-plugin/logo.png) center no-repeat',
})
.setNavBackground('#00FF00')
.setTabDefaults({
  activeIndicatorColor: '#FF00FF'
})
.setTabs([
  {
    id: '',
    title: 'jimtest'
  }
])
.setRootTemplate(require('plugins/funger-plugin/main.html'));