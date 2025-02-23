const base_url = '/db/extinction/json';

export const server_calls = {
    
    items: async () => {
        const response = await fetch(`${base_url}/items.json`);
        let data = await response.json();
        return data;
    },

    notamon: async () => {
        const response = await fetch(`${base_url}/notamon.json`);
        let data = await response.json();
        return data;
    },

    singleNotamon: async (notamon) => {
        const response = await fetch(`${base_url}/notamon.json`);
        let data = await response.json();
        let singleNotamon = data.filter(function(notamonData) {
            return notamonData.name.toLowerCase() === notamon;
        });
        return singleNotamon[0];
    },

    status: async () => {
        const response = await fetch(`${base_url}/statusEffect.json`);
        let data = await response.json();
        return data;
    },

    type: async () => {
        const response = await fetch(`${base_url}/typeEffectiveness.json`);
        let data = await response.json();
        return data;
    },

    vaults: async () => {
        const response = await fetch(`${base_url}/vault.json`);
        let data = await response.json();
        return data;
    },

    keys: async () => {
        const response = await fetch(`${base_url}/key.json`);
        let data = await response.json();
        return data;    
    }

}