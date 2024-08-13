const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = 'bce233e9db734d8cb81fa59eb9a25675'; 
const redirectUri = 'http://localhost:3000/callback';
const scopes = [
    'user-top-read',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-library-read'
];

export const getTokenFromUrl = () => {
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item) => {
            let parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
        }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    '%20'
)}&response_type=token&show_dialog=true`;
