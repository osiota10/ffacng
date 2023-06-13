

export const isAuthenticated = () => {
    const token = localStorage.getItem('access');

    if (token) {
        return true
    } else {
        return false
    }
};







