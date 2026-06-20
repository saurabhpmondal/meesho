window.MAP = window.MAP || {};

window.MAP.Loader = {

    render(){

        document.getElementById("app").innerHTML = `
            <div class="loader-screen">

                <div class="loader-title">
                    Meesho Analytics Platform
                </div>

                <div class="loader-subtitle">
                    Initializing Platform
                </div>

                <div class="loader-log" id="loaderLog">
                </div>

            </div>
        `;
    },

    add(message){

        const log =
            document.getElementById("loaderLog");

        if(!log) return;

        log.innerHTML += `
            <div class="loader-item success">
                ✓ ${message}
            </div>
        `;
    }
};
