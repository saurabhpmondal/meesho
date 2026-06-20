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

            const profile =
                await window.MAP.ProfileService
                .getProfile(
                    session.user.id
                );

            window.MAP.state.profile =
                profile;

            window.MAP.Loader.add(
                "User Profile Loaded"
            );

            const role =
                profile.roles;

            window.MAP.state.role =
                role;

            window.MAP.Loader.add(
                `Role Loaded (${role.role_name})`
            );

            const permissions =
                await window.MAP.PermissionManager
                .getPermissions(role.id);

            window.MAP.state.permissions =
                permissions;

            window.MAP.Loader.add(
                `${permissions.length} Permissions Loaded`
            );

            const flags =
                await window.MAP.FeatureFlagService
                .getFlags();

            window.MAP.state.featureFlags =
                flags;

            window.MAP.Loader.add(
                `${flags.length} Feature Flags Loaded`
            );

            window.MAP.Loader.add(
                "Platform Ready"
            );

            setTimeout(() => {

                this.renderHome();

            }, 500);

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
        .addEventListener("click", async () => {

            const email =
                document.getElementById("email")
                .value.trim();

            const password =
                document.getElementById("password")
                .value;

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

        const role =
            window.MAP.state.role;

        document.getElementById("app").innerHTML = `
            <div style="padding:40px;">

                <h1>
                    Welcome
                </h1>

                <p>
                    ${user.email}
                </p>

                <br>

                <p>
                    Role:
                    ${role.role_name}
                </p>

                <br>

                <p>
                    Permissions:
                    ${window.MAP.state.permissions.length}
                </p>

                <br>

                <p>
                    Feature Flags:
                    ${window.MAP.state.featureFlags.length}
                </p>

                <br>

                <button id="logoutBtn">
                    Logout
                </button>

            </div>
        `;

        document
        .getElementById("logoutBtn")
        .addEventListener("click", () => {

            window.MAP.Auth.logout();

        });

    }

};
