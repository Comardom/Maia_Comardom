export function checkAdmin(request) {
    const cookie = request.headers.get('cookie');
    return cookie?.includes('admin=verified');
}
