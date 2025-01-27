import React, { useState } from "react";
import { User } from "../../types";
import { Button, Label, Switch } from "../../components";
import { enable2FA, disable2FA, info2FA } from "../../modules/2FAModals";
import { PageTemplate, showSuccessModal } from "../../modules/index";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import { UpdateUserPayload, UserResponse } from "../../types";

interface Props {
  user: User;
  pendingUpdateUser: boolean;
  updateUser: (payload: UpdateUserPayload) => Promise<UserResponse>
}

function hideEmail(email: string): string {
  const indx = email.indexOf("@");
  const part1 = email.slice(0, indx);
  return email.replace(part1, part1.split("").reduce((a) => `${a}*`, ""));
}

const ProfilePage: React.FC<Props> = ({ user, updateUser, pendingUpdateUser }) => {
  const [showEmail, setShowEmail] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  function onClickEnable2FA(): void {
    enable2FA()
      .then(() => {
        info2FA()
      }, (err: any) => { console.log(err); });
  }
  return <PageTemplate title="Account Settings">
    {showEmailModal && <ChangeEmail goBackCallback={(): void => { setShowEmailModal(false); }} />}
    {showPasswordModal && <ChangePassword goBackCallback={(): void => { setShowPasswordModal(false); }} />}
    <section className="py-3">
      <h2 className="text-base uppercase font-bold mb-6 flex items-center">
        general
      </h2>
      <div className="md:grid grid-cols-2 gap-4">
        <div>
          <div className="mb-5">
            <Label inline label="Username:">
              <div className="flex items-center break-all">
                {user.username}
              </div>
            </Label>
          </div>
          <div className="mb-5">
            <Label inline label="Email:">
              <div className="flex items-center break-all">
                {
                  showEmail ? (
                    <div>
                      {user.email} <button className="theme-text-primary" data-qa-selector="show-email-btn" onClick={(): void => setShowEmail(false)}>Hide</button>
                    </div>
                  ) : (
                      <div>
                        {hideEmail(user.email)} <button className="theme-text-primary" data-qa-selector="show-email-btn" onClick={(): void => setShowEmail(true)}>Reveal</button>
                      </div>
                    )
                }
              </div>
            </Label>
          </div>
        </div>
        <div className="md:flex items-start justify-end">
          <div className="flex space-x-3">
            <Button
              name="change-email-btn"
              type="button"
              onClick={(): void => setShowEmailModal(true)}
              size={Button.size.SMALL}
            >
              Change email
            </Button>
            <Button
              name="change-password-btn"
              type="button"
              onClick={(): void => setShowPasswordModal(true)}
              size={Button.size.SMALL}
            >
              Change password
            </Button>
          </div>
        </div>
      </div>
    </section>
    <div className="border-b theme-border my-5 -mx-5" />
    <section className="py-3">
      <h2 className="text-base uppercase font-bold mb-6 flex items-center">
        Two-factor Authentication &nbsp;
        {
          user.is2FaEnabled
            ? <span className="uppercase text-green-500" data-qa-selector="two-fa-status">Enabled</span>
            : <span className="uppercase theme-text-red" data-qa-selector="two-fa-status">Disabled</span>
        }
      </h2>
      {
        user.is2FaEnabled ? (
          <Button
            type="button"
            variant={Button.variant.RED}
            onClick={(): void => {
              disable2FA()
                .then(() => {
                  showSuccessModal({
                    title: "2FA Disabled",
                    message: (close: () => void) => (
                      <div>
                        <p className="mb-3">You have successfully disabled Two-factor Authentication.</p>
                        <p className="mb-3">But your account is now less secure :&#40;</p>
                        <button
                          className="theme-text-primary"
                          type="button"
                          name="set-up-2fa-again"
                          onClick={(): void => {
                            close();
                            setTimeout(onClickEnable2FA, 0);
                          }}
                        >
                          Set up 2FA again
                      </button>
                      </div>
                    )
                  })
                }, (err: any) => { console.log(err); });
            }}
            name="disable2FA"
          >
            Disable 2fa
          </Button>
        ) : (
            <Button
              name="enable2FA"
              type="button"
              variant={Button.variant.GREEN}
              onClick={onClickEnable2FA}
              size={Button.size.SMALL}
            >
              Enable 2fa
            </Button>
          )
      }
    </section>
    <div className="border-b theme-border my-5 -mx-5" />
    <section className="py-3">
      <h2 className="text-base uppercase font-bold mb-6 flex items-center">
        transactions
      </h2>
      <Switch
        disabled={pendingUpdateUser}
        checked={user.txNotifications}
        id="tx-notifications"
        onChange={(e): void => { updateUser({ tx_notifications: e.target.checked }) }}
      >
        Email notifications for incoming transactions
      </Switch>
    </section>
    <div className="border-b theme-border my-5 -mx-5" />
  </PageTemplate>
}

export default ProfilePage;
