var VALID_DEPLOY_TARGETS = [ //update these to match what you call your deployment targets
  'development',
  'production'
];

module.exports = function(deployTarget) {
  var ENV = {
    build: {},
    cloudfront: {},
    s3: {},
    s3-index: {}
  };
  if (VALID_DEPLOY_TARGETS.indexOf(deployTarget) === -1) {
    throw new Error('Invalid deployTarget ' + deployTarget);
  }

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    ENV.plugins = ['build'];
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';

    // Uncomment these if not using IAM profiles.
    // ENV.cloudfront.accessKeyId = process.env.AWS_KEY;
    // ENV.cloudfront.secretAccessKey = process.env.AWS_SECRET;
    ENV.cloudfront.distribution = /* YOUR CF DISTRIBUTION */;

    // Uncomment these if not using IAM profiles.
    // ENV.s3.accessKeyId = process.env.AWS_KEY;
    // ENV.s3.secretAccessKey = process.env.AWS_SECRET;
    ENV.s3.bucket = /* YOUR S3 BUCKET NAME */;
    ENV.s3.region = /* YOUR S3 REGION */;

    // Uncomment these if not using IAM profiles.
    // ENV.s3-index.accessKeyId = process.env.AWS_KEY;
    // ENV.s3-index.secretAccessKey = process.env.AWS_SECRET;
    ENV.s3-index.bucket = /* YOUR S3 BUCKET NAME */;
    ENV.s3-index.region = /* YOUR S3 REGION */;
  }

  return ENV;

  /* Note: a synchronous return is shown above, but ember-cli-deploy
   * does support returning a promise, in case you need to get any of
   * your configuration asynchronously. e.g.
   *
   *    var Promise = require('ember-cli/lib/ext/promise');
   *    return new Promise(function(resolve, reject){
   *      var exec = require('child_process').exec;
   *      var command = 'heroku config:get REDISTOGO_URL --app my-app-' + deployTarget;
   *      exec(command, function (error, stdout, stderr) {
   *        ENV.redis.url = stdout.replace(/\n/, '').replace(/\/\/redistogo:/, '//:');
   *        if (error) {
   *          reject(error);
   *        } else {
   *          resolve(ENV);
   *        }
   *      });
   *    });
   *
   */
}
