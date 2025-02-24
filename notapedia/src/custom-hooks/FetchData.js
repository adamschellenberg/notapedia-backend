import { serverCalls } from '../api';

export const useGetData = {
    useItems: async () => {
        return await serverCalls.items();
    },

    useNotamon: async () => {
        return await serverCalls.notamon();
    },

    useGetSingleNotamon: async (notamon) => {
        const result = await serverCalls.singleNotamon(notamon);
        result.numberPadded = result.number.toString().padStart(3, "0");
        result.imgUrl = `../db/extinction/images/notamon/small/${result.numberPadded}-${result.name.toLowerCase()}.png`;
        result.typeUrl = `../db/extinction/images/elements/${result.notamonType.toLowerCase()}.png`;
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
    }
}