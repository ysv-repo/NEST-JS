module.exports = {
  apps: [
    {
      name: 'nestjs-app',
      script: 'dist/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        DB_TYPE: 'mysql',
        DB_HOST: 'localhost',
        DB_PORT: 3306,
        DB_USERNAME: 'root',
        DB_PASSWORD: 'root',
        DB_DATABASE: 'csm',
      },
      env_production: {
        NODE_ENV: 'production',
        DB_TYPE: 'mysql',
        DB_HOST: 'localhost',
        DB_PORT: 3306,
        DB_USERNAME: 'root',
        DB_PASSWORD: 'root',
        DB_DATABASE: 'csm',
      },
    },
  ],
};
