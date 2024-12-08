export async function getHistoryBookings(userId) {
    const response = await fetch (`https://restapi-bensrentcar.vercel.app/bookingsv2/${userId}`);
    const data = await response.json();
    console.log(data)
    return data;
}

export async function getAllBookings() {
    const response = await fetch('https://restapi-bensrentcar.vercel.app/bookingsv2/all');
    if (!response.ok) {
      throw new Error('Failed to fetch all booking history');
    }
    const data = await response.json();
    return data;
  }

export async function createBooking(bookingData) {
    const response = await fetch('https://restapi-bensrentcar.vercel.app/bookingsv2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
    });

    const data = await response.json();
    return data;
}

export async function createPayment(paymentData) {
    const response = await fetch ('https://restapi-bensrentcar.vercel.app/paymentsv2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
    })
    const data = await response.json()
    return data;
}

export const checkAvailability = async (bookingData) => {
    console.log('Sending data:', bookingData)
    const response = await fetch('https://restapi-bensrentcar.vercel.app/bookingsv2/checkavailability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
  
    const data = await response.json();

  if (!response.ok || !data.available) {
    throw new Error(data.message);
  }

  return data;
  };
  


