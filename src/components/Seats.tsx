"use client";
import React, { useState } from 'react';

const Seats = () => {
  // Sample seat data (can be fetched from an API or managed locally)
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // State to track selected seats
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Function to handle seat selection
  const handleSeatClick = (seat: string) => {
    // Toggle seat selection
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h2 className="text-2xl font-bold mb-4">Select Your Seats</h2>
      <div className="flex flex-col items-center space-y-4">
        {rows.map((row) => (
          <div key={row} className="flex items-center space-x-4">
            <span className="text-xl font-semibold">{row}</span>
            {columns.map((col) => {
              const seatId = `${row}${col}`;
              const isSelected = selectedSeats.includes(seatId);
              const seatClassName = `cursor-pointer rounded-full w-8 h-8 ${
                isSelected ? 'bg-green-500' : 'bg-gray-200 hover:bg-gray-300'
              }`;
              return (
                <div
                  key={seatId}
                  className={seatClassName}
                  onClick={() => handleSeatClick(seatId)}
                >
                  <span className="text-white">{col}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-8">
        <p className="text-lg">
          Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
        </p>
      </div>
    </div>
  );
};

export default Seats;
