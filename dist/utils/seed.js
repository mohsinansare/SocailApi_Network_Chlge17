import connection from '../config/connection.js';
import { User, thoughts } from '../models/index.js';
import { getRandomName, getRandomthoughts } from './data.js';
connection.on('error', (err) => err);
connection.once('open', async () => {
    console.log('connected');
    // Delete the collections if they exist
    let thoughtsCheck = await connection.db?.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck?.length) {
        await connection.dropCollection('thoughts');
    }
    let userCheck = await connection.db?.listCollections({ name: 'users' }).toArray();
    if (userCheck?.length) {
        await connection.dropCollection('users');
    }
    const users = [];
    const randomThoughts = getRandomthoughts(10);
    for (let i = 0; i < 20; i++) {
        const fullName = getRandomName();
        const first = fullName.split(' ')[0];
        const last = fullName.split(' ')[1];
        users.push({
            first,
            last,
            age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
        });
    }
    await User.insertMany(users);
    await thoughts.insertMany(randomThoughts);
    // loop through the saved thoughts, for each thoughts we need to generate a thoughts response and insert the thoughts responses
    console.table(users);
    console.table(randomThoughts);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});
// import mongoose from 'mongoose';
// // import thoughts from '../models/index.js'; // Adjust the path to your model
// import { thoughts } from '../models/index.js'; // Adjust based on the actual export
// const seedThoughts = [
//   {
//     published: true,
//     description: 'This is a thought',
//     advertiserFriendly: true,
//     responses: [],
//   },
//   {
//     published: false,
//     description: 'Another thought',
//     advertiserFriendly: false,
//     responses: [],
//   },
// ];
// // Use the Mongoose model to insert the data
// async function seedDatabase() {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/your-database'); // Replace with your DB connection string
//     await thoughts.insertMany(seedThoughts); // Use the model's insertMany method
//     console.log('Database seeded successfully');
//     await mongoose.disconnect();
//   } catch (error) {
//     console.error('Error seeding database:', error);
//   }
// }
// seedDatabase();
