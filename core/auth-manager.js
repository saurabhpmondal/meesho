window.MAP = window.MAP || {};

window.MAP.Auth = {

    async getSession(){

        const {
            data,
            error
        } = await window.MAP.supabase.auth.getSession();

        if(error){
            console.error(error);
            return null;
        }

        return data.session;
    },

    async login(email,password){

        const {
            data,
            error
        } = await window.MAP.supabase.auth.signInWithPassword({
            email,
            password
        });

        if(error){

            alert(error.message);

            return false;
        }

        return true;
    },

    async logout(){

        await window.MAP.supabase.auth.signOut();

        location.reload();
    }

};
