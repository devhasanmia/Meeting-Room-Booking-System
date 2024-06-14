console.clear();
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  try {
    await mongoose.connect(config.databaseURL as string);
    console.log('Database connected Successfully!');
    app.listen(config.port, () => {
      console.log(`Server is Runnig on Port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

main().catch((err) => console.error('Unexpected error in main():', err));
