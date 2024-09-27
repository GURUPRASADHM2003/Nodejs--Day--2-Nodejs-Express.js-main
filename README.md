# Hall Booking API

This is a Node.js application using Express to manage hall bookings. It includes functionality to create rooms, book rooms, list all rooms with booking data, list all customers with their bookings, and count how many times a customer has booked rooms.

## Features

1. Create a Room
2. Book a Room
3. List all Rooms with Booked Data
4. List all Customers with Booked Data
5. Count how many times a customer has booked a room

## Getting Started

### Prerequisites

- Node.js (version 14.x or later)
- npm (version 6.x or later)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/hall-booking-api.git
    cd hall-booking-api
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

### Running the Server
The server will be running on [http://127.0.0.1:3001](http://127.0.0.1:3001)  
Start the server with the following command:

```bash
node index.js      
```

## API Endpoints

### 1. Create a Room

- **URL**: `/rooms`
- **Method**: `POST`
- **Body**: JSON

    ```json
    {
        "name": "Room A",
        "seats": 50,
        "amenities": ["Wi-Fi", "Projector"],
        "price": 100
    }
    ```

- **Success Response**:

    ```json
    {
        "id": 1,
        "name": "Room A",
        "seats": 50,
        "amenities": ["Wi-Fi", "Projector"],
        "price": 100
    }
    ```

### 2. Book a Room

- **URL**: `/bookings`
- **Method**: `POST`
- **Body**: JSON

    ```json
    {
        "customerName": "John Doe",
        "date": "2024-07-23",
        "startTime": "10:00",
        "endTime": "12:00",
        "roomId": 1
    }
    ```

- **Success Response**:

    ```json
    {
        "id": 1,
        "customerName": "John Doe",
        "date": "2024-07-23",
        "startTime": "10:00",
        "endTime": "12:00",
        "roomId": 1,
        "status": "Booked",
        "bookingDate": "2024-07-22T10:00:00.000Z"
    }
    ```

### 3. List all Rooms with Booked Data

- **URL**: `/rooms/bookings`
- **Method**: `GET`
- **Success Response**:

    ```json
    [
        {
            "name": "Room A",
            "bookedStatus": "Booked",
            "bookings": [
                {
                    "id": 1,
                    "customerName": "John Doe",
                    "date": "2024-07-23",
                    "startTime": "10:00",
                    "endTime": "12:00",
                    "roomId": 1,
                    "status": "Booked",
                    "bookingDate": "2024-07-22T10:00:00.000Z"
                }
            ]
        }
    ]
    ```

### 4. List all Customers with Booked Data

- **URL**: `/customers/bookings`
- **Method**: `GET`
- **Success Response**:

    ```json
    [
        {
            "name": "John Doe",
            "bookings": [
                {
                    "roomName": "Room A",
                    "date": "2024-07-23",
                    "startTime": "10:00",
                    "endTime": "12:00"
                }
            ]
        }
    ]
    ```

### 5. Count how many times a customer has booked a room

- **URL**: `/customers/:customerName/bookings/count`
- **Method**: `GET`
- **Success Response**:

    ```json
    {
        "customerName": "John Doe",
        "bookingCount": 1,
        "bookings": [
            {
                "customerName": "John Doe",
                "roomName": "Room A",
                "date": "2024-07-23",
                "startTime": "10:00",
                "endTime": "12:00",
                "bookingId": 1,
                "bookingDate": "2024-07-22T10:00:00.000Z",
                "bookingStatus": "Booked"
            }
        ]
    }
    ```

This `README.md` provides a clear guide on how to set up and use your Hall Booking API project.
