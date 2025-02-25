const baseUrl = 'http://notapedia-dybrehfjdpbkgkgf.westcentralus-01.azurewebsites.net/api';

export const serverCalls = {
    
    items: async () => {
        const response = await fetch(`${baseUrl}/items`);
        return await response.json();
    },

    notamon: async () => {
        const response = await fetch(`${baseUrl}/notamon`);
        return await response.json();
    },

    singleNotamon: async (notamon) => {
        const response = await fetch(`${baseUrl}/notamon/${notamon}`);
        return await response.json();
    },

    status: async () => {
        const response = await fetch(`${baseUrl}/statuses`);
        return await response.json();
    },

    typeEffectiveness: async () => {
        const response = await fetch(`${baseUrl}/typeeffectivenesses`);
        return await response.json();
    },

    vaults: async () => {
        const response = await fetch(`${baseUrl}/vaults`);
        return await response.json();
    },

    keys: async () => {
        const response = await fetch(`${baseUrl}/keys`);
        return await response.json();
    },

    fetchUserProgress: async (token) => {
        try {
            const response = await fetch(`${baseUrl}/progress/summary`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch progress");
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching progress: ", error);
            return null;
        }
    }

}