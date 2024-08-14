
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokenFromUrl } from '../auth/Auth.js';
import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

export const Callback = () => {

    const navigate = useNavigate();

    useEffect(() => {
        console.log('useEffect is running');
        const hash = getTokenFromUrl();
        window.location.hash = '';
        const _token = hash.access_token;

        if (_token && _token !== '') {

            console.log('Token exists:', _token);
            spotify.setAccessToken(_token);

            // Guardar el token en el almacenamiento local
            localStorage.setItem('spotifyToken', _token);

            // Redirigir al dashboard
            navigate('/dashboard');

        } else {
            console.log('No token found, redirecting to login.');
            // Si no hay token, redirigir a la página de login
            navigate('/');
        }

    }, [navigate]);

    return (
        <div>
            <h2>Autenticando...</h2>
        </div>
    );
}


