// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
  },
  extends: 'airbnb-base',
  // add your custom rules here
  'rules': {
  	"no-unused-vars": 0,
  	"no-console": 0,
  }
}
