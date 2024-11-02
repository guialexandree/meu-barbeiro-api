import * as apm from 'elastic-apm-node';

apm.start({
  serviceName: 'susu-barbearia-api',
  secretToken: 'cF5vlxD0kujxNwwofA',
  serverUrl:
    'https://1aeddaf42e7d43d6909c1beb18635efc.apm.us-central1.gcp.cloud.es.io:443',
  environment: process.env.NODE_ENV || 'dev',
});
