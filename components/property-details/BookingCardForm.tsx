const BookingCardForm = () => {
  return (
    <>
      <div className="border rounded-lg mb-4">
        <div className="grid grid-cols-2 border-b">
          <input type="text" placeholder="Check in" className="p-3 border-r" />
          <input type="text" placeholder="Check out" className="p-3" />
        </div>
        <input type="number" placeholder="Guests" className="w-full p-3" />
      </div>
      <a
        href="./paymentProcess.html"
        className="w-full block text-center bg-primary text-white py-3 rounded-lg transition-all hover:brightness-90"
      >
        Reserve
      </a>
      <div className="text-center mt-4 text-gray-600">
        <p>You won&apos;t be charged yet</p>
      </div>
    </>
  );
};

export default BookingCardForm;
