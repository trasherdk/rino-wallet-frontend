import React from "react";
import { useSelector } from "../../../hooks/useSelector";
import { updateWalletDetails as updateWalletDetailsThunk, selectors } from "../../../store/walletSlice";
import { selectors as sessionSelectors } from "../../../store/sessionSlice";
import { WalletLayout } from "../WalletLayout";
import Settings from "./Settings";
import { UpdateWalletDetailsPayload, UpdateWalletDetailsResponse } from "../../../types";
import { useThunkActionCreator } from "../../../hooks";
import { checkAccessLevel } from "../../../utils";

interface Props {
  walletId: string;
}

const SettingsContainer: React.FC<Props> = ({ walletId }) => {
  const wallet = useSelector(selectors.getWallet);
  const user = useSelector(sessionSelectors.getUser);
  const accessLevel = checkAccessLevel(user, wallet);
  const updateWalletDetails = useThunkActionCreator<UpdateWalletDetailsResponse, UpdateWalletDetailsPayload>(updateWalletDetailsThunk);
  return (
    <WalletLayout viewOnly={accessLevel.isViewOnly()} tab="settings" wallet={wallet} id={walletId}>
      <Settings canDelete={accessLevel.isOwner()} walletId={walletId} wallet={wallet} updateWalletDetails={updateWalletDetails} is2FaEnabled={user?.is2FaEnabled} />
    </WalletLayout>
  )
}

export default SettingsContainer;
