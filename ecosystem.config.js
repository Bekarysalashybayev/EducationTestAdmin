module.exports = {
  apps: [
    {
      name: process.env.APP_NAME,
      exec_mode: 'cluster',
      instances: 'max',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ]
}
