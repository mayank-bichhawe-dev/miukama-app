const app = require('./app');
const { sequelize } = require('./models');
const DEFAULT_PORT = 3000;

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION!!! shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

app.listen({ port: process.env.PORT || DEFAULT_PORT }, async () => {
  console.log('Server is working on port:', process.env.PORT || DEFAULT_PORT);
  try {
    await sequelize.authenticate();
    console.log('Database Connected!');

    const env = process.env.NODE_ENV || 'development';
    if (env.trim() === 'development') {
      await sequelize.sync({ alter: true });
    }

    console.log(
      'All models were synchronized successfully. \n\r *** Happy Coding !! ***',
    );
  } catch (error) {
    console.log('Error while connecting DB', error);
  }
});
