
import {store} from "../store";
import {UserKeyPairInfo, KeyPairJsonWrapper} from "./shared";
import {SignUpPayload} from "./api";

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface LockedAmount {
  amount: string,
  confirmations: number,
}

export interface WalletMember {
  id: string;
  user: string;
  accessLevel: string;
  encryptedKeys: string;
  createdAt: string;
  updatedAt: string;
}

export type Wallet = {
  id: string;
  name: string;
  maxAmount: number;
  minApprovals: number;
  members: WalletMember[];
  createdAt: string;
  updatedAt: string;
  height: string;
  address: string;
  balance: string;
  unlockedBalance: string;
  lockedAmounts: LockedAmount[];
  status: string;
  requires2Fa: boolean;
  isPublic: boolean;
  publicSlug: string;
}

export interface PublicWallet {
  address: string;
  balance: string;
  createdAt: string;
  height: number;
  lockedAmounts: LockedAmount[];
  name: string;
  unlockedBalance: string;
  updatedAt: string;
  requires2Fa: boolean;
}

export type PendingTransaction = {
  address: string;
  amount: string;
  fee?: number;
  txsHex?: string;
  memo?: string;
  priority?: string;
}

export type LocalWalletData = {
  offlineMode: boolean;
  daemonHeight: number | null;
  syncHeight: number | null;
  isMultisig: boolean;
  address: string;
  keyHex: string;
  base64Key: string;
  balance: string;
  multisigSeed: string,
};

export type User = {
  id: string;
  email: string;
  is2FaEnabled: boolean;
  isKeypairSet: boolean;
  name: string;
  username: string;
  encryptionPublicKey: string;
  signingPublicKey: string;
  encPrivateKey: KeyPairJsonWrapper;
  txNotifications: boolean;
}

export interface TransactionDestination {
  index: number;
  address: string;
  amount: string;
}

export type Direction = "in" | "out";

export interface Transaction {
  id: string;
  amount: string;
  timestamp: string;
  createdAt: string;
  direction: Direction;
  fee?: string;
  confirmations: number;
  destinations: TransactionDestination[];
  memo: string;
  txToSelf: boolean;
}

export interface FetchWalletTransactionsThunkPayload {
  walletId: string;
  page: number;
}

export interface FetchSubaddressesThunkPayload {
  walletId: string;
  page: number;
}

export interface FetchWalletShareRequestsThunkPayload {
  walletId: string;
  page: number;
}

export interface FetchWalletSubaddressThunkPayload {
  walletId: string;
}

export interface CreateSubaddressThunkPayload {
  walletId: string;
  updateList?: boolean;
}

export interface FetchWalletListThunkPayload {
  page: number;
}

export type SetUpKeyPairThunkPayload = UserKeyPairInfo;


export interface ChangePasswordThunkPayload {
  new_password: string;
  current_password: string;
}

export type SignUpThunkPayload = SignUpPayload;

export interface ResetPasswordConfirmThunkPayload {
  uid: string;
  token: string;
  new_password: string;
  recovery_key: string;
}

export interface RequestWalletShareThunkPayload {
  email: string;
  wallet: Wallet;
  code?: string;
}

export interface ShareWalletThunkPayload {
  email: string;
  password: string;
  accessLevel: number;
  wallet: Wallet;
  code?: string;
}

export interface Subaddress {
  address: string;
  index: number;
  isUsed: boolean;
  isValid?: boolean;
  signature: string | null;
}