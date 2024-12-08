export async function getTotalRevenue() {
    const response = await fetch('https://restapi-bensrentcar.vercel.app/bookingsv2/revenue');
    if (!response.ok) {
      throw new Error('Failed to fetch total revenue');
    }
    const data = await response.json();
    return data.totalRevenue;
  }

  export async function getTotalCars() {
    const response = await fetch('https://restapi-bensrentcar.vercel.app/api/cars/totalcars');
    if (!response.ok) {
      throw new Error('Failed to fetch total cars');
    }
    const data = await response.json();
    return data.totalCars;
  }

  export async function getTotalUser() {
    const response = await fetch ('https://restapi-bensrentcar.vercel.app/api/users/totaluser')
    if (!response.ok) {
      throw new Error('Failed to fetch total user')
    }
    const data = await response.json();
    return data.totalUser
  }

  export async function getRecentBookings() {
    const response = await fetch('https://restapi-bensrentcar.vercel.app/bookingsv2/recent');
    if (!response.ok) {
      throw new Error('Failed to fetch recent bookings');
    }
    const data = await response.json();
    return data.recentBookings;
  }