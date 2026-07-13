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

export async function getRecruiterJobs(recruiterId: string){
    const res = await fetch(`http://localhost:5000/jobs?recruiterId=${recruiterId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    return data;
}

export async function getAllJobs(){
    const res = await fetch(`http://localhost:5000/jobs`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await res.json()
    return data;
}

export async function getJobById(id: string) {
  const res = await fetch(`http://localhost:5000/jobs/${id}`);
  const data = await res.json();
  return data;
}