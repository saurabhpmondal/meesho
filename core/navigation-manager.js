window.MAP = window.MAP || {};

window.MAP.Navigation = {

    getModules(){

        const flags =
            window.MAP.state.featureFlags || [];

        const enabledFlags =
            flags
            .filter(x => x.enabled)
            .map(x => x.module_name);

        return window.MAP
            .ModuleManager
            .getAll()
            .filter(module =>
                enabledFlags.includes(
                    module.featureFlag
                )
            );

    },

    render(){

        return this
            .getModules()
            .map(module => `

                <div
                    class="nav-item"
                    data-route="${module.id}"
                >

                    ${module.title}

                </div>

            `)
            .join("");

    }

};
