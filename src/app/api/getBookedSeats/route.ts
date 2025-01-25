// app/api/getBookedSeats.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Seat from '@/model/seat';

type Data = {
  success: boolean;
  seats?: string[];
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { title, date, timing } = req.body;

  await dbConnect();

  try {
    const seatReservations = await Seat.find({
      movieTitle: title,
      date,
      timing,
    });

    let bookedSeats: string[] = [];
    seatReservations.forEach((reservation: any) => {
      bookedSeats = bookedSeats.concat(reservation.seats);
    });

    return res.status(200).json({ success: true, seats: bookedSeats });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
