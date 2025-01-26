// route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/models/User'; // Import the User model
import { connectToDatabase } from '@/Connection/db'; // Import the database connection

export async function POST(req: Request) {
  console.log("Step 4");
  const { action, email, password } = await req.json();
  await connectToDatabase(); // Connect to the database
  console.log("Step 8");
  if (action === 'signup') {
    const existingUser  = await User.findOne({ email });
    console.log("Step 9");
    if (existingUser ) {
      return NextResponse.json({ error: 'User  already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = new User({ email, password: hashedPassword });
    await newUser .save(); // Save the new user to the database
    console.log("Step 10");
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
    return NextResponse.json({ token });
    console.log("Step 11");
  } else if (action === 'login') {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User  not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });
    return NextResponse.json({ token });
  }
  console.log("failed");
  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}