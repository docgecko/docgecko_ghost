// # Ghost Configuration
// Setup your Ghost install for various environments
// Documentation can be found at http://support.ghost.org/config/

var path = require('path'),
  config;

config = {
  // ### Production
  // When running Ghost in the wild, use the production environment
  // Configure your URL and mail settings here
  production: {
    url: process.env.BLOG_URL,

    mail: {
      transport: 'SMTP',
      options: {
        service: 'Mailgun',
        auth: {
          user: 'postmaster@sandboxc8fad21c3978411ea2eec7c5e10fec25.mailgun.org', // mailgun username
          pass: 'a6df43e42238fae7e0abbdedf07f05fa' // mailgun password
        }
      }
    },

    storage: {
      active: 'ghost-s3',
      'ghost-s3': {
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretAccessKey: process.env.AWS_ACCESS_SECRET,
        bucket: process.env.AWS_BUCKET_NAME,
        region: process.env.AWS_BUCKET_REGION,
        assetHost: 's3 bucket url'
      }
    },

    database: {
      client: 'postgres',
      connection: {
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        port: '5432'
      },
      debug: false
    },

    server: {
      // Host to be passed to node's `net.Server#listen()`
      host: '0.0.0.0',
      // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
      port: process.env.PORT
    }
  },

  // ### Development **(default)**
  development: {
    // The url to use when providing links to the site, E.g. in RSS and email.
    url: 'http://localhost:2368',

    mail: {
      transport: 'SMTP',
      options: {
        service: 'Mailgun',
        auth: {
          user: 'postmaster@sandboxc8fad21c3978411ea2eec7c5e10fec25.mailgun.org', // mailgun username
          pass: 'a6df43e42238fae7e0abbdedf07f05fa' // mailgun password
        }
      }
    },


    database: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '/data/ghost-dev.db')
      },
      debug: false
    },
    server: {
      // Host to be passed to node's `net.Server#listen()`
      host: '0.0.0.0',
      // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
      port: '2368'
    },
    paths: {
      contentPath: path.join(__dirname, '/')
    }
  },

  // **Developers only need to edit below here**

  // ### Testing
  // Used when developing Ghost to run tests and check the health of Ghost
  // Uses a different port number
  testing: {
    url: 'http://0.0.0.0:2369',
    database: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '/data/ghost-test.db')
      }
    },
    server: {
      host: '0.0.0.0',
      port: '2369'
    },
    logging: false
  },

  // ### Testing MySQL
  // Used by Travis - Automated testing run through GitHub
  'testing-mysql': {
    url: 'http://0.0.0.0:2369',
    database: {
      client: 'mysql',
      connection: {
        host: '0.0.0.0',
        user: 'root',
        password: '',
        database: 'ghost_testing',
        charset: 'utf8'
      }
    },
    server: {
      host: '0.0.0.0',
      port: '2369'
    },
    logging: false
  },

  // ### Testing pg
  // Used by Travis - Automated testing run through GitHub
  'testing-pg': {
    url: 'http://0.0.0.0:2369',
    database: {
      client: 'pg',
      connection: {
        host: '0.0.0.0',
        user: 'postgres',
        password: '',
        database: 'ghost_testing',
        charset: 'utf8'
      }
    },
    server: {
      host: '0.0.0.0',
      port: '2369'
    },
    logging: false
  }
};

// Export config
module.exports = config;
