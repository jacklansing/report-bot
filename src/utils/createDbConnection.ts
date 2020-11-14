import mongoose from 'mongoose';

export default async () => {
  console.log('Connecting to database');
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (e) {
    console.log(`Error connecting to database`, e);
    throw new Error('Error connecting to database');
  }
  return true;
};
