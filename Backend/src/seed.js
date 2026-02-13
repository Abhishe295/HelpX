import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "./config/db.js";
import User from "./models/User.js";
import Helper from "./models/Helper.js";
import Booking from "./models/Booking.js";

dotenv.config();
await connectDB();

const seedData = async () => {
  try {
    await User.deleteMany();
    await Helper.deleteMany();
    await Booking.deleteMany();

    const hashed = await bcrypt.hash("123456", 10);

    // ADMIN
    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: hashed,
      role: "admin"
    });

    // USERS
    const user1 = await User.create({
      name: "Abhishek",
      email: "user@test.com",
      password: hashed,
      role: "user"
    });

    // HELPERS
    const helper1 = await Helper.create({
      name: "Ramesh",
      email: "plumber@test.com",
      password: hashed,
      role: "helper",
      category: "plumbing",
      isAvailable: true,
      earnings: 0
    });

    const helper2 = await Helper.create({
      name: "Suresh",
      email: "electric@test.com",
      password: hashed,
      role: "helper",
      category: "electrician",
      isAvailable: true,
      earnings: 0
    });

    console.log("Seeded successfully");
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
