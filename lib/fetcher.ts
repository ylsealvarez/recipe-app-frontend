export const fetcher = (url: string) =>
    fetch(`http://localhost:8080${url}`,{
        headers: { 'X-User-Id': '0139811-1' }
    }).then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}`)
        return res.json()
    })