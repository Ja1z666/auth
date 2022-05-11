export default function Auth(){
    return(
        <>
            <h1>Register</h1>
            <div className="reg-block">
                <div className="components">
                    <input type="text" placeholder="username" />
                    <input type="password" placeholder="password" />
                    <button>Register</button>
                </div>
            </div>
        </>
    )
}