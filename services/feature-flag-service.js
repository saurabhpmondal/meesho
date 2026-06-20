window.MAP = window.MAP || {};

window.MAP.FeatureFlagService = {

    async getFlags(){

        const { data, error } =
            await window.MAP.supabase
            .from("feature_flags")
            .select("*");

        if(error){
            throw error;
        }

        return data || [];
    }

};
