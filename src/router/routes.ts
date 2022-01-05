export default {
  login: "/login",
  register: "/register",
  emailConfirm: "/accounts/activation/:userId/:token",
  resetPasswordRequest: "/accounts/password/reset",
  resetPasswordConfirm: "/accounts/password/reset/confirm/:userId/:token",
  profile: "/profile",
  home: "/",
  wallets: "/wallets",
  wallet: "/wallets/:id",
  newWallet: "/new-wallet",
  changeEmail: "/change-email/:token",
  components: "/components",
  keypair: "/keypair",
};
