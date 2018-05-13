// shipitfile.js
module.exports = shipit => {
    // Load shipit-deploy tasks
    require('shipit-deploy')(shipit);
    require('shipit-yarn')(shipit);
  
    shipit.initConfig({
      default: {
        deployTo: '/tmp/jenkins-blog-node-sample',
        repositoryUrl: 'https://github.com/kirkchen/jenkins-blog-node-sample',
      },
      staging: {
        servers: 'vagrant@localhost:2222',
        user: 'vagrant',
        branch: 'master'
      },
    })
  }