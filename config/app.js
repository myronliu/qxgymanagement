var path = require('path');
module.exports = {
  development: {

  },
  staging: {

  },
  production:{
    views: path.join(__dirname,'..','/app/distviews')
  }
}