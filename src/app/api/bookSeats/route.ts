// app/api/bookSeats/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Seat from '@/model/seat';

export async function POST(request: NextRequest) {
  await dbConnect();

  const { seats, userId, title, date, timing } = await request.json();

  try {
    // Check if seats are already booked
    const existingBooking = await Seat.findOne({ movieTitle: title, date, timing });
    if (existingBooking) {
      // Seats are already booked for this movie, date, and timing
      return NextResponse.json({ message: 'Seats are already booked for this timing' }, { status: 400 });
    }

    // Save the new booking
    const newBooking = await Seat.create({
      movieTitle: title,
      date,
      timing,
      seats,
      userId,
    });

    return NextResponse.json({ success: true, message: 'Seats booked successfully', booking: newBooking }, { status: 200 });
  } catch (error) {
    console.error('Error booking seats:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
