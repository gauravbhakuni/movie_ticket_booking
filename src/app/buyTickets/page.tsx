// pages/tickets.tsx
"use client";
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Barcode from 'react-barcode';
import crypto from 'crypto';

const Tickets = () => {
  const searchParams = useSearchParams();
  const selectedSeats = searchParams.get('seats')?.split(',') || [];
  const title = searchParams.get('title') || '';
  const imgPath = searchParams.get('imgPath') || '';
  const totalPrice = selectedSeats.length * 10; // Assuming each seat costs $10

  // Generate a unique hash from the selected seats
  const hash = crypto.createHash('sha256').update(selectedSeats.join(',')).digest('hex').substring(0, 8);

  return (
    <div className='min-h-screen bg-gray-900 text-white flex flex-col items-center'>
      <div className='mt-32 text-center'>
        <p className='text-4xl font-extralight'>Your Tickets</p>
      </div>
      <div className='mt-8 p-6 border border-gray-500 rounded-lg shadow-lg w-full max-w-[900px] mx-auto bg-gray-800 relative'>
        <div className='flex justify-between items-center mb-4'>
          <div className="flex flex-col z-10">
            <h4 className='text-2xl mb-2'>Movie: {title} </h4>
            <p className='text-lg'>Selected Seats:</p>
            <p className='text-lg font-semibold'>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}</p>
            <p className='text-lg mt-2'>Total Price:</p>
            <p className='text-lg font-semibold'>${totalPrice}</p>
          </div>
          <div className='ml-4 p-2 backdrop-blur-md rounded-lg z-10'>
            <Barcode value={hash} width={1.5} height={50} fontSize={12} />
          </div>
        </div>
        <div className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${`https://image.tmdb.org/t/p/w500${imgPath}`})` }}></div>
      </div>
    </div>
  );
};

export default Tickets;
