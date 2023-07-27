export function setAccessToken(token:'String'): void{
    localStorage.setItem('tru_access_token',token);
}
export function getAccessToken(): string{
    return localStorage.getItem('tru_access_token') ?? "no";
}
export function removeAccessToken(): void{
    localStorage.removeItem('tru_access_token')
}