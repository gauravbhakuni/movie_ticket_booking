// components/DateSlider.tsx
"use client";
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const DateSlider: React.FC = () => {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const title = searchParams.get("title");
  const language = searchParams.get("language");
  const imgPath = searchParams.get("imgPath");
  const vote_average = searchParams.get("vote_average");
  const overview = searchParams.get("overview");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTiming, setSelectedTiming] = useState('');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const formatDate = (date: Date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const getNextWeekDates = () => {
    const nextWeekDates: Date[] = [];
    const currentDate = new Date();
    for (let i = 0; i < 4; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i);
      nextWeekDates.push(nextDate);
    }
    return nextWeekDates;
  };

  const timings = ['10:00', '13:00', '19:30'];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const columns = Array.from({ length: 15 }, (_, index) => String(index + 1));

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    setSelectedDate(selectedDate);
  };

  const handleTimingClick = (timing: string) => {
    setSelectedTiming(timing);
  };

  const handleSeatClick = (seat: string) => {
    const index = selectedSeats.indexOf(seat);
    if (index === -1) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
    }
  };

  const handleBookNow = async () => {
    const bookingDetails = {
      seats: selectedSeats,
      userId: "userId", // Replace with the actual user ID
      title,
      date: selectedDate.toISOString().split('T')[0],
      timing: selectedTiming,
    };

    try {
      const response = await fetch('/api/bookSeats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Seats booked successfully", data);
      } else {
        console.error("Failed to book seats", data);
        // Show an error message to the user
      }
    } catch (error) {
      console.error("Error booking seats:", error);
      // Show an error message to the user
    }
  };

  // Calculate total price based on number of selected seats
  const totalPrice = selectedSeats.length * 10; // Assuming each seat costs $10
  const totalSeats = selectedSeats.length;

  return (
    <div className='min-h-screen bg-gray-900 text-white flex flex-col'>
      <div className='mt-32 text-center'>
        <p className='text-4xl font-extralight'>Movie: {title}</p>
      </div>
      <div className='mt-2 flex flex-row justify-between'>
        <h3 className='mt-4 ml-64'>Date: </h3>
        <div className="z-10 p-4 mr-48 rounded-lg shadow-md" style={{ height: '50px' }}>
          <div className="flex space-x-2">
            {getNextWeekDates().map((date, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`px-2 py-1 rounded-md text-black ${selectedDate.getDate() === date.getDate() ? 'bg-green-500' : 'bg-gray-200 hover:bg-gray-400'
                  }`}
              >
                {formatDate(date)}
              </button>
            ))}
          </div>
        </div>
        <div className='flex flex-row space-x-2 mr-48 p-4 rounded-lg shadow-md'>
          <h3 className='mr-8'>Timing: </h3>
          {timings.map((timing, index) => (
            <button
              key={index}
              onClick={() => handleTimingClick(timing)}
              className={`bg-gray-200 px-2 py-1 rounded-md text-black h-8 w-16 hover:bg-gray-400 ${selectedTiming === timing ? 'bg-green-500' : ''
                }`}
            >
              {timing}
            </button>
          ))}
        </div>
      </div>
      <div className='mt-2'>
        <table className='border-collapse border border-gray-400 mx-auto'>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col, colIndex) => {
                  const seat = `${row}${col}`;
                  const isSelected = selectedSeats.includes(seat);
                  return (
                    <td
                      key={colIndex}
                      className={`p-2 border border-gray-400 relative cursor-pointer`}
                      onClick={() => handleSeatClick(seat)}
                    >
                      <div
                        className={`h-8 w-8 rounded-full flex justify-center items-center ${isSelected ? 'bg-green-500' : 'bg-gray-200 hover:bg-gray-400'
                          }`}
                      >
                        <span className='text-black'>{seat}</span>
                      </div>
                      <div className={`absolute h-2 w-10 bg-gray-400 bottom-0 left-1/2 transform -translate-x-1/2 rounded-full`}></div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <p className="text-lg">Selected Seats: {selectedSeats.join(', ')}</p>
      </div>
      <div className="mt-2 flex justify-center space-x-12">
        <p className="text-lg">Total Seats: {totalSeats}</p>
        <p className="text-lg">Total Price: ${totalPrice}</p>
        {/* <Link
          href={{
            pathname: '/buyTickets',
            query: {
              seats: selectedSeats.join(','),
              title,
              imgPath
            },
          }}
        > */}
          <button
            className='bg-blue-600 text-white w-36 rounded hover:bg-blue-500'
            onClick={handleBookNow} disabled={selectedSeats.length === 0}
          >
            Book Now
          </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default DateSlider;
