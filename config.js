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
          user: process.env.MAILGUN_USER, // mailgun username
          pass: process.env.MAILGUN_PASS // mailgun password
        }
      }
    },
    database: {
      client: 'postgres',
      connection: {
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        port: process.env.POSTGRES_PORT
      },
      debug: false
    },
    storage: {
      active: 'ghost-s3',
      'ghost-s3': {
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretAccessKey: process.env.AWS_ACCESS_SECRET,
        bucket: process.env.AWS_BUCKET_NAME,
        region: process.env.AWS_BUCKET_REGION,
        assetHost: process.env.AWS_ASSET_HOST
      }
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
    // Change this to your Ghost blogs published URL.
    url: 'http://localhost:2368',

    mail: {
      transport: 'SMTP',
      options: {
        service: 'Mailgun',
        auth: {
          user: process.env.MAILGUN_USER, // mailgun username
          pass: process.env.MAILGUN_PASS // mailgun password
        }
      }
    },
    database: {
      client: 'sqlite3',
      connection: {
        filename: path.join(__dirname, '/content/data/ghost-dev.db')
      },
      debug: false
    },
    storage: {
      active: 'ghost-s3',
      'ghost-s3': {
        accessKeyId: process.env.AWS_ACCESS_ID,
        secretAccessKey: process.env.AWS_ACCESS_SECRET,
        bucket: process.env.AWS_BUCKET_NAME,
        region: process.env.AWS_BUCKET_REGION,
        assetHost: process.env.AWS_ASSET_HOST
      }
    },
    server: {
      // Host to be passed to node's `net.Server#listen()`
      host: '0.0.0.0',
      // Port to be passed to node's `net.Server#listen()`, for iisnode set this to `process.env.PORT`
      port: '2368'
    },
    paths: {
      contentPath: path.join(__dirname, '/content/')
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
        filename: path.join(__dirname, '/content/data/ghost-test.db')
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
