export default function authHeader() {
    const User = JSON.parse(localStorage.getItem('User'));

    if (User && User.accessToken) {
        // for Node.js Express back-end
        return { 'x-access-token': User.accessToken };
    } else {
        return {};
    }
}
