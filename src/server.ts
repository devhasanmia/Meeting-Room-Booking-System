console.clear();
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.dbUrl as string);
    console.log('Database connected Successfully!');
    app.listen(config.port, () => {
      console.log(`Server is Runnig on Port ${config.port} Please visit http://localhost:${config.port}/api/v1/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

main().catch((err) => console.error('Unexpected error in main():', err));
