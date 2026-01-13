// app/api/auth/signup/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { generateToken } from '@/lib/jwt';

export async function POST(request) {
  try {
    await connectDB();
    
    const { email, password, name, company } = await request.json();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create user
    const user = await User.create({
      email,
      password,
      name,
      company,
      lastLogin: new Date(),
    });

    // Generate token
    const token = generateToken(user);

    // Remove password from response
    const userResponse = {
      id: user._id,
      email: user.email,
      name: user.name,
      company: user.company,
      role: user.role,
      plan: user.plan,
    };

    return NextResponse.json(
      { 
        success: true, 
        user: userResponse, 
        token 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}