window.MAP = window.MAP || {};

window.MAP.App = {

    async start(){

        try{

            window.MAP.Loader.add(
                "Checking Session"
            );

            const session =
                await window.MAP.Auth.getSession();

            if(!session){

                this.renderLogin();

                return;
            }

            window.MAP.state.user =
                session.user;

            window.MAP.Loader.add(
                "User Authenticated"
            );

            setTimeout(()=>{

                this.renderHome();

            },500);

        }
        catch(error){

            console.error(error);

            alert(error.message);
        }
    },

    renderLogin(){

        document.getElementById("app").innerHTML = `
            <div class="login-container">

                <div class="login-card">

                    <h2>
                        Meesho Analytics Platform
                    </h2>

                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                    >

                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                    >

                    <button id="loginBtn">
                        Login
                    </button>

                </div>

            </div>
        `;

        document
        .getElementById("loginBtn")
        .addEventListener("click",async()=>{

            const email =
                document
                .getElementById("email")
                .value
                .trim();

            const password =
                document
                .getElementById("password")
                .value;

            if(!email || !password){

                alert(
                    "Email and Password required"
                );

                return;
            }

            const success =
                await window.MAP.Auth.login(
                    email,
                    password
                );

            if(success){

                location.reload();
            }

        });

    },

    renderHome(){

        const user =
            window.MAP.state.user;

        document.getElementById("app").innerHTML = `
            <div
                style="
                    padding:40px;
                    text-align:center;
                "
            >

                <h1>
                    Welcome
                </h1>

                <p>
                    ${user.email}
                </p>

                <br>

                <button id="logoutBtn">
                    Logout
                </button>

            </div>
        `;

        document
        .getElementById("logoutBtn")
        .addEventListener("click",()=>{

            window.MAP.Auth.logout();

        });

    }

};
