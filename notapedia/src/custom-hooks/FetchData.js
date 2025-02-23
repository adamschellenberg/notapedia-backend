import { server_calls } from '../api';

export const useGetData = {
    useItems: async () => {
        const result = await server_calls.items();
        return result;
    },

    useNotamon: async () => {
        const result = await server_calls.notamon();
        return result;
    },

    useGetSingleNotamon: async (notamon) => {
        const result = await server_calls.singleNotamon(notamon);
        const notamonNumber = result.number;
        const notamonNumberPadded = notamonNumber.toString().padStart(3, "0");
        result.numberPadded = notamonNumberPadded;
        const urlForImage = "../db/extinction/images/notamon/small/" + notamonNumberPadded + "-" + result.name.toLowerCase() + ".png";
        result.imgUrl = urlForImage;
        const notamonTypeLowerCase = result.notamonType.toLowerCase();
        const urlForType = "../db/extinction/images/elements/" + notamonTypeLowerCase + ".png";
        result.typeUrl = urlForType;
        return result;
    },

    useStatus: async () => {
        const result = await server_calls.status();
        return result;
    },

    useType: async () => {
        const result = await server_calls.type();
        return result;
    },

    useVault: async () => {
        const result = await server_calls.vaults();
        return result;
    },

    useKey: async () => {
        const result = await server_calls.keys();
        return result; 
    }
}