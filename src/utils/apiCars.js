
    // BASE URL : https://restapi-bensrentcar.vercel.app
    export async function getCars() {
        const response = await fetch('https://restapi-bensrentcar.vercel.app/api/cars');

        if (!response.ok) {
            throw new Error('Failed to fetch cars');
        }

        const data = await response.json();
        return data;
    }

    export async function createCars(newCar) {
        const response = await fetch ('https://restapi-bensrentcar.vercel.app/api/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCar),
        })

        const data = await response.json()
        console.log(data)
        return data;
    }

    export async function updateCar({ carId, carData }) {
        const response = await fetch(`https://restapi-bensrentcar.vercel.app/api/cars/${carId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to update car');
        }
        return data;
    }

    // apiCars.js
    export async function deleteCar(carId) {
        const response = await fetch(`https://restapi-bensrentcar.vercel.app/api/cars/${carId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to delete car');
        }
    }



