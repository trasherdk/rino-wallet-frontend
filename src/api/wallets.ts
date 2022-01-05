import { AxiosRequestConfig } from "axios";
import { apiConfig } from "./config";
import { Api } from "../axios/api";
import {
  CreateWalletPayload,
  CreateWalletResponse,
  FinalizeWalletPayload,
  FinalizeWalletResponse,
  FetchWalletsResponse,
  FetchWalletDetailsPayload,
  FetchWalletDetailsResponse,
  GetOutputsPayload,
  GetOutputsResponse,
  FetchWalletTransactionsResponse,
  ShareWalletPayload,
  ShareWalletResponse,
  RemoveWalletAccessResponse,
  RemoveWalletAccessPayload,
  CreateUnsignedTransactionPayload,
  CreateUnsignedTransactionResponse,
  SubmitTransactionPayload,
  SubmitTransactionResponse,
  FetchTransactionDetailsPayload,
  FetchTransactionDetailsResponse,
  UpdateWalletDetailsPayload,
  UpdateWalletDetailsResponse,
  DeleteWalletResponse,
  DeleteWalletPayload,
  ListRequestParams,
  CreateSubaddressResponse,
  FetchSubaddressResponse,
} from "../types";

export class WalletsApi extends Api {
  constructor(config: AxiosRequestConfig) {
    super(config);
  }

  public createWallet(data: CreateWalletPayload): Promise<CreateWalletResponse> {
    return this.post<CreateWalletResponse, CreateWalletPayload>("/wallets/", data)
      .then(this.success);
  }

  public finalizeWallet(id: string, data: FinalizeWalletPayload): Promise<FinalizeWalletResponse> {
    return this.post<FinalizeWalletResponse, FinalizeWalletPayload>(`/wallets/${id}/finalize/`, data)
      .then(this.success);
  }

  public fetchWallets(params: ListRequestParams): Promise<FetchWalletsResponse> {
    // We're not interested in listing wallets that are not in FINALIZED state
    return this.get<FetchWalletsResponse>("/wallets/", { params: { ...params, status: "FINALIZED" } })
      .then(this.success);
  }

  public fetchWalletDetails(data: FetchWalletDetailsPayload): Promise<FetchWalletDetailsResponse> {
    return this.get<FetchWalletDetailsResponse>(`/wallets/${data.id}/`)
      .then(this.success);
  }

  public updateWalletDetails(data: UpdateWalletDetailsPayload): Promise<UpdateWalletDetailsResponse> {
    return this.patch<UpdateWalletDetailsResponse, UpdateWalletDetailsPayload>(`/wallets/${data.id}/`, data)
      .then(this.success);
  }

  public deleteWallet(data: DeleteWalletPayload, config?: { headers: { "X-RINO-2FA": string } }): Promise<DeleteWalletResponse> {
    return this.delete<DeleteWalletResponse>(`/wallets/${data.id}/`, config)
      .then(this.success);
  }

  public getOutputs(data: GetOutputsPayload): Promise<GetOutputsResponse> {
    return this.post<GetOutputsResponse, GetOutputsPayload>(`/wallets/${data.id}/get_outputs/`)
      .then(this.success);
  }

  public fetchWalletTransactions(walletId: string, params: ListRequestParams): Promise<FetchWalletTransactionsResponse> {
    return this.get<FetchWalletTransactionsResponse>(`/wallets/${walletId}/transactions/`, { params })
      .then(this.success);
  }

  public fetchTransactionDetails(data: FetchTransactionDetailsPayload): Promise<FetchTransactionDetailsResponse> {
    return this.get<FetchTransactionDetailsResponse>(`/wallets/${data.walletId}/transactions/${data.transactionId}/`)
      .then(this.success);
  }

  public shareWallet(id: string, data: ShareWalletPayload): Promise<ShareWalletResponse> {
    return this.post<ShareWalletResponse, ShareWalletPayload>(`/wallets/${id}/members/`, data)
      .then(this.success);
  }

  public removeWalletAccess(data: RemoveWalletAccessPayload): Promise<RemoveWalletAccessResponse> {
    return this.delete<RemoveWalletAccessResponse>(`/wallets/${data.walletId}/members/${data.userId}/`)
      .then(this.success);
  }

  public  createUnsignedTransaction(id: string, data: CreateUnsignedTransactionPayload): Promise<CreateUnsignedTransactionResponse> {
    return this.post<CreateUnsignedTransactionResponse, CreateUnsignedTransactionPayload>(`/wallets/${id}/transactions/`, data)
      .then(this.success);
  }

  public submitTransaction(id: string, data: SubmitTransactionPayload, config?: { headers: { "X-RINO-2FA": string } }): Promise<SubmitTransactionResponse> {
    return this.post<SubmitTransactionResponse, SubmitTransactionPayload>(`/wallets/${id}/transactions/submit/`, data, config)
      .then(this.success);
  }

  public createSubaddress(id: string): Promise<CreateSubaddressResponse> {
    return this.post<CreateSubaddressResponse, void>(`/wallets/${id}/subaddresses/`)
      .then(this.success);
  }

  public fetchWalletSubaddresses(walletId: string, params: ListRequestParams): Promise<FetchSubaddressResponse> {
    return this.get<FetchSubaddressResponse>(`/wallets/${walletId}/subaddresses/`, { params })
      .then(this.success);
  }
}

const walletsApi = new WalletsApi(apiConfig);

export default walletsApi;
