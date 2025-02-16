import { IResp } from "@/shared/interfaces/respUtils.interface";
import { IUseCaseData } from "@/shared/interfaces/useCaseGenericInpur.interface";


export interface IUseCaseFunction<T> {
  (data: IUseCaseData<T>): Promise<IResp<object>>;
}
