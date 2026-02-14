import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "./config/db.js";
import User from "./models/User.js";
import Helper from "./models/Helper.js";
import Booking from "./models/Booking.js";
import Message from "./models/Message.js";

dotenv.config();
await connectDB();

const seedData = async () => {
  try {
    console.log("Clearing old data...");

    await User.deleteMany();
    await Helper.deleteMany();
    await Booking.deleteMany();
    await Message.deleteMany();

    const hashed = await bcrypt.hash("123456", 10);

    // ================= ADMIN =================
    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: hashed,
      role: "admin"
    });

    // ================= USERS =================
    const user1 = await User.create({
      name: "Abhishek",
      email: "abhishek@test.com",
      password: hashed,
      role: "user"
    });

    const user2 = await User.create({
      name: "Shrey",
      email: "shrey@test.com",
      password: hashed,
      role: "user"
    });

    const user3 = await User.create({
      name: "Saranjeet",
      email: "saranjeet@test.com",
      password: hashed,
      role: "user"
    });

    // ================= HELPERS =================
    const helpers = await Helper.insertMany([
      {
        name: "Ramesh",
        email: "plumbing@test.com",
        password: hashed,
        role: "helper",
        category: "plumbing",
        isAvailable: true,
        earnings: 0
      },
      {
        name: "Suresh",
        email: "electrician@test.com",
        password: hashed,
        role: "helper",
        category: "electrician",
        isAvailable: true,
        earnings: 0
      },
      {
        name: "Mahesh",
        email: "cooking@test.com",
        password: hashed,
        role: "helper",
        category: "cooking",
        isAvailable: true,
        earnings: 0
      },
      {
        name: "Karan",
        email: "car@test.com",
        password: hashed,
        role: "helper",
        category: "car cleaning",
        isAvailable: true,
        earnings: 0
      },
      {
        name: "Deepak",
        email: "house@test.com",
        password: hashed,
        role: "helper",
        category: "house cleaning",
        isAvailable: true,
        earnings: 0
      },
      {
        name: "Aman",
        email: "gardening@test.com",
        password: hashed,
        role: "helper",
        category: "gardening",
        isAvailable: true,
        earnings: 0
      }
    ]);

    console.log("==================================");
    console.log("Seeded Successfully 🚀");
    console.log("==================================");

    console.log("ADMIN:");
    console.log("admin@test.com / 123456");

    console.log("\nUSERS:");
    console.log("abhishek@test.com / 123456");
    console.log("shrey@test.com / 123456");
    console.log("saranjeet@test.com / 123456");

    console.log("\nHELPERS:");
    console.log("plumbing@test.com / 123456");
    console.log("electrician@test.com / 123456");
    console.log("cooking@test.com / 123456");
    console.log("car@test.com / 123456");
    console.log("house@test.com / 123456");
    console.log("gardening@test.com / 123456");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
