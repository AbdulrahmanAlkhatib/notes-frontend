import propTypes from 'prop-types'

const LoginForm = ({ handleLogin, handleCredintialChange, password, username }) => {

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    Username
                    <input
                        type="text"
                        name="Username"
                        value={username}
                        onChange={ e => handleCredintialChange(e)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="text"
                        name="Password"
                        value={password}
                        onChange={e => handleCredintialChange(e)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleLogin: propTypes.func.isRequired,
    handleCredintialChange: propTypes.func.isRequired,
    password: propTypes.string.isRequired,
    username: propTypes.string.isRequired,
}

export default LoginForm

