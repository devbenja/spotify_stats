import { loginUrl } from "../auth/Auth"

export const Login = () => {
    return (
        <div className="login">
            <h1>Login to Spotify</h1>
            <a href={loginUrl}>Login with Spotify</a>
        </div>
    )
}
