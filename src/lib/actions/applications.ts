export async function serverMutation(url: string,method: string, body?: Record<string, unknown>) {
    const res = await fetch(url,{
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();
    return data;
}

export async function getApplicationsBySeeker(seekerId: string) {
    const res = await fetch(`http://localhost:5000/applications?seekerId=${seekerId}`);
    const data = await res.json();
    return data;
}