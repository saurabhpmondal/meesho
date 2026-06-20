window.MAP = window.MAP || {};

window.MAP.PermissionManager = {

    async getPermissions(roleId){

        const { data, error } =
            await window.MAP.supabase
            .from("role_permissions")
            .select(`
                permissions (
                    permission_key
                )
            `)
            .eq("role_id", roleId);

        if(error){
            throw error;
        }

        return (data || [])
            .map(x => x.permissions?.permission_key)
            .filter(Boolean);
    }

};
