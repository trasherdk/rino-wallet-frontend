import React from "react";
import classNames from "classnames";
import { piconeroToMonero, getWalletColor } from "../../utils";
import { Placeholder, FormatNumber } from "../../components";

const WalletPlaceholder: React.FC = () => (
  <div className="flex-1 min-w-0 text-left">
    <div className="w-1/4 mb-3 mt-3">
      <Placeholder />
    </div>
    <div className="mb-3 w-3/4">
      <Placeholder />
    </div>
  </div>
)
interface Props {
  balance?: string;
  unlocked?: string;
  name?: string;
  inList?: boolean;
  loading?: boolean;
  card?: boolean;
}

export const WalletCard: React.FC<Props> = ({
  balance = "",
  unlocked = "",
  name = "",
  loading = false,
}) => {
  const gradient = getWalletColor()
  return (
    <div className={classNames("theme-bg-panel theme-border border rounded-3xl rounded-tl-none h-36 flex items-stretch", gradient.light)}>
      <div className={classNames("-my-px -mx-px flex-shrink-0 rounded-3xl rounded-tl-none w-10 md:w-16", gradient.main)} />
      <div className="flex flex-1 min-w-0 px-5 py-9 items-stretch md:px-10">
        {
          loading ? <WalletPlaceholder /> : (
            <div className="flex flex-col justify-center flex-1 min-w-0 text-left">
              <div className="leading-none text-base uppercase whitespace-nowrap overflow-hidden overflow-ellipsis mb-4" data-qa-selector="wallet-name">
                {name}
              </div>
              <div className="flex items-end space-x-2">
                <div>
                  <div className="text-xl whitespace-nowrap font-bold md:text-3xl">
                    <span data-qa-selector="wallet-balance"><FormatNumber value={piconeroToMonero(balance)} /></span> XMR
                  </div>
                </div>
                {unlocked !== balance ? (<div className="min-w-0">
                  <div
                    className="text-base whitespace-nowrap overflow-ellipsis overflow-hidden theme-text-secondary font-bold md:text-3xl">
                    (
                      <span data-qa-selector="wallet-unlocked-balance">
                        <FormatNumber value={piconeroToMonero(unlocked)} />
                      </span>
                      {" "}
                      <span>unlocked,</span>
                      {" "}
                      <span data-qa-selector="wallet-locked-balance">
                        <FormatNumber value={piconeroToMonero(parseInt(balance) - parseInt(unlocked))} />
                      </span>
                      {" "}
                      <span>locked</span>
                    )
                  </div>
                </div>) : null
                }
              </div>
            </div>
          )
        }
        <div className="flex flex-col justify-center w-6 text-4xl font-semibold text-gray-200">
          &#x3e;
        </div>
      </div>
    </div>
  )
}
