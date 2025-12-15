import { NextRequest, NextResponse } from 'next/server';

interface RegisterData {
  fullName: string;
  username: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  addressLine1: string;
  addressLine2: string;
  zipCode: string;
  country: string;
  preferredContact: string;
  favoriteCategory: string;
  agreeToTerms: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const data: RegisterData = await request.json();

    // Validate required fields
    const requiredFields = [
      'fullName',
      'username',
      'dateOfBirth',
      'gender',
      'email',
      'password',
      'confirmPassword',
      'addressLine1',
      'zipCode',
      'country',
      'preferredContact',
      'favoriteCategory',
    ];

    for (const field of requiredFields) {
      if (!data[field as keyof RegisterData]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password match
    if (data.password !== data.confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (data.password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Validate terms agreement
    if (!data.agreeToTerms) {
      return NextResponse.json(
        { error: 'You must agree to the Terms and Conditions' },
        { status: 400 }
      );
    }

    // Validate date of birth
    const birthDate = new Date(data.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (age < 13 || (age === 13 && monthDiff < 0)) {
      return NextResponse.json(
        { error: 'You must be at least 13 years old to register' },
        { status: 400 }
      );
    }

    // TODO: Here you would typically:
    // 1. Hash the password using bcrypt or similar
    // 2. Check if username/email already exists in database
    // 3. Save user data to database
    // 4. Send verification email
    // 5. Create session/token

    // For now, we'll just return success
    // In a real application, you would save to a database:
    /*
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await db.user.create({
      data: {
        fullName: data.fullName,
        username: data.username,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        email: data.email,
        password: hashedPassword,
        addressLine1: data.addressLine1,
        addressLine2: data.addressLine2,
        zipCode: data.zipCode,
        country: data.country,
        preferredContact: data.preferredContact,
        favoriteCategory: data.favoriteCategory,
      },
    });
    */

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful!',
        user: {
          username: data.username,
          email: data.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration. Please try again.' },
      { status: 500 }
    );
  }
}

