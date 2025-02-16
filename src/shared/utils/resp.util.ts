import { IResp } from "@/shared/utils/respUtils.interface";


export const resp = <T>(status: number, result: T): IResp<T> => {
    return {
        status: status,
        result: result
    };
}