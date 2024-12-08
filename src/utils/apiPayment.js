export async function getAllPayment() {
    const response = await fetch('https://restapi-bensrentcar.vercel.app/paymentsv2/allpayment');
    if (!response.ok) {
        throw new Error('Failed to fetch all payments');
    }
    const data = await response.json();
    return data;
}

export async function updatePaymentStatus({paymentId, status}) {
    const response = await fetch(`https://restapi-bensrentcar.vercel.app/paymentsv2/updatestatus/${paymentId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to update booking status');
    }

    const data = await response.json();
    return data;
}

export async function getFilteredDataByMonth(month) {
    const url = new URL('https://restapi-bensrentcar.vercel.app/paymentsv2/data-byDate');
    if (month) {
        url.searchParams.append('month', month);
    }
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch all payments');
    }
    const data = await response.json();
    return data;
}
