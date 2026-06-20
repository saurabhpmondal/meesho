window.MAP = window.MAP || {};

window.MAP.ProfileService = {

    async getProfile(userId){

        const { data, error } =
            await window.MAP.supabase
            .from("user_profiles")
            .select(`
                *,
                roles (
                    id,
                    role_name
                )
            `)
            .eq("id", userId)
            .single();

        if(error){
            throw error;
        }

        return data;
    }

};
