import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { useNavigate } from 'react-router-dom';

const spotify = new SpotifyWebApi();

export const DashBoard = () => {

    const [user, setUser] = useState(null);
    const [totalMinutes, setTotalMinutes] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem('spotifyToken');

        if (token) {

            spotify.setAccessToken(token);

            spotify.getMe().then(user => {
                setUser(user);
            });

            const fetchAllTopTracks = async () => {

                let totalDuration = 0;
                let offset = 0;
                let limit = 50; 
                let hasNext = true;

                while (hasNext) {

                    try {

                        const response = await spotify.getMyTopTracks({ limit, offset });
                        const tracks = response.items;

                        // Sumar la duración de las canciones actuales
                        tracks.forEach(track => {
                            totalDuration += track.duration_ms;
                        });

                        // Actualizar el offset y verificar si hay más resultados
                        offset += limit;
                        hasNext = response.next !== null;

                    } catch (error) {

                        console.error('Error obteniendo canciones:', error);
                        hasNext = false; 

                    }

                }

                const totalMinutes = Math.floor(totalDuration / 60000);
                setTotalMinutes(totalMinutes);
                setLoading(false);

            };

            fetchAllTopTracks();

        } else {

            navigate('/');
            
        }

    }, [navigate]);

    return (
        <div>
            <h1>Dashboard</h1>
            {user ? (
                <div>
                    <h2>Bienvenido a tus estadisticas de Spotify, {user.display_name}</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <p>Total de Minutos Escuchados: {totalMinutes} minutes</p>
                    )}
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
}

