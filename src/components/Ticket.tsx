import React from 'react';

interface TicketProps {
  selectedSeats: string[];
  totalPrice: number;
  totalSeats: number;
  onClose: () => void;
}

const Ticket: React.FC<TicketProps> = ({ selectedSeats, totalPrice, totalSeats, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">Ticket Details</h2>
        <p className="mb-4"><strong>Selected Seats:</strong> {selectedSeats.join(', ')}</p>
        <p className="mb-4"><strong>Total Seats:</strong> {totalSeats}</p>
        <p className="mb-4"><strong>Total Price:</strong> ${totalPrice}</p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Ticket;
