const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

let rooms = [];
let bookings = [];
let customers = [];

// Helper function to generate unique IDs
const generateId = (arr) => arr.length + 1;

// 1. Create a Room
app.post("/rooms", (req, res) => {
  const { name, seats, amenities, price } = req.body;

  // Validation
  if (!name || !seats || !amenities || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const room = {
    id: generateId(rooms),
    name,
    seats,
    amenities,
    price,
  };
  rooms.push(room);
  res.status(201).json(room);
});

// 2. Book a Room
app.post("/bookings", (req, res) => {
  const { customerName, date, startTime, endTime, roomId } = req.body;

  // Validation
  if (!customerName || !date || !startTime || !endTime || !roomId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const room = rooms.find((room) => room.id === roomId);

  if (!room) {
    return res.status(400).json({ error: "Invalid roomId" });
  }

  const existingBooking = bookings.find(
    (booking) =>
      booking.roomId === roomId &&
      booking.date === date &&
      ((startTime >= booking.startTime && startTime < booking.endTime) ||
        (endTime > booking.startTime && endTime <= booking.endTime) ||
        (startTime <= booking.startTime && endTime >= booking.endTime))
  );

  if (existingBooking) {
    return res
      .status(400)
      .json({ error: "Room already booked for this time slot" });
  }

  const booking = {
    id: generateId(bookings),
    customerName,
    date,
    startTime,
    endTime,
    roomId,
    status: "Booked",
    bookingDate: new Date().toISOString(),
  };

  bookings.push(booking);

  // Add customer to the customers array if not already added
  const customer = customers.find((cust) => cust.name === customerName);
  if (!customer) {
    customers.push({
      name: customerName,
      bookings: [
        {
          roomName: room.name,
          date,
          startTime,
          endTime,
        },
      ],
    });
  } else {
    // If customer already exists, update their booking details
    customer.bookings.push({
      roomName: room.name,
      date,
      startTime,
      endTime,
    });
  }

  res.status(201).json(booking);
});

// 3. List all Rooms with Booked Data
app.get("/rooms/bookings", (req, res) => {
  const roomsWithBookings = rooms.map((room) => {
    const roomBookings = bookings.filter(
      (booking) => booking.roomId === room.id
    );
    const bookedStatus = roomBookings.length > 0 ? "Booked" : "Available";
    return {
      name: room.name,
      bookedStatus,
      bookings: roomBookings,
    };
  });
  res.json(roomsWithBookings);
});

// 4. List all Customers with Booked Data
app.get("/customers/bookings", (req, res) => {
  res.json(customers);
});

// 5. List how many times a customer has booked a room
app.get("/customers/:customerName/bookings/count", (req, res) => {
  const { customerName } = req.params;
  const customerBookings = bookings.filter(
    (booking) => booking.customerName === customerName
  );

  if (customerBookings.length === 0) {
    return res
      .status(404)
      .json({ error: "No bookings found for this customer" });
  }

  const bookingDetails = customerBookings.map((booking) => ({
    customerName: booking.customerName,
    roomName: rooms.find((room) => room.id === booking.roomId).name,
    date: booking.date,
    startTime: booking.startTime,
    endTime: booking.endTime,
    bookingId: booking.id,
    bookingDate: booking.bookingDate,
    bookingStatus: booking.status,
  }));

  const bookingCount = customerBookings.length;
  res.json({ customerName, bookingCount, bookings: bookingDetails });
});

app.listen(port, () => {
  console.log(`Server is running on port http://127.0.0.1:${port}`);
});
