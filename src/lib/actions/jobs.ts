export async function postJob(jobData: Record<string, unknown>){
    const res= await fetch("http://localhost:5000/jobs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(jobData)
    })
    const data = await res.json()
    return data;
}