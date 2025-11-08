import { serverCalls } from '../api';
import React, { useState, useEffect } from 'react';

export const useGetData = {
    useItems: async () => {
        return await serverCalls.items();
    },

    useNexomon: async () => {
        return await serverCalls.nexomon();
    },

    useGetSingleNexomon: async (nexomon) => {
        const result = await serverCalls.singleNexomon(nexomon);
        result.numberPadded = result.number.toString().padStart(3, "0");
        result.imgUrl = `../db/extinction/images/nexomon/small/${result.numberPadded}-${result.name.toLowerCase()}.png`;
        result.typeUrl = `../db/extinction/images/elements/${result.nexomonType.toLowerCase()}.png`;
        return result;
    },

    useStatus: async () => {
        return await serverCalls.status();
    },

    useTypeEffectiveness: async () => {
        return await serverCalls.typeEffectiveness();
    },

    useVault: async () => {
        return await serverCalls.vaults();
    },

    useKey: async () => {
        return await serverCalls.keys();
    },

    
};

export const useFetchProgress = () => {
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const getProgress = async () => {
            const data = await serverCalls.fetchUserProgress(token);
            if (data) setProgress(data.progressPercentage);
        };

        getProgress();
    }, []);

    return progress;
};