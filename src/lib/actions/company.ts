export async function registerCompany(companyData: Record<string, unknown>) {
  const res = await fetch("http://localhost:5000/companies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(companyData),
  });
  const data = await res.json();
  return data;
}
export async function getRecruiterCompany(recruiterId: string) {
  const res = await fetch(`http://localhost:5000/companies?recruiterId=${recruiterId}`);
  const data = await res.json();
  return data;
}

export async function updateCompany(id: string, companyData: Record<string, unknown>) {
  const res = await fetch(`http://localhost:5000/companies/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(companyData),
  });
  const data = await res.json();
  return data;
}