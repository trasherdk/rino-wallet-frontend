import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import ROUTES from "../../router/routes";
import { Logo } from "../../components";
import { PUBLIC_APP_URLS_MAP } from "../../constants";
import { Env } from "../../types";

const linkElementClassName = "md:ml-10 font-bold uppercase text-base md:text-lg text-right";

interface Props {
  dark?: boolean;
  showDisclaimer?: boolean;
  isAuthenticated: boolean;
}

const Footer: React.FC<Props> = ({ dark, showDisclaimer, isAuthenticated }) => {
  const logoElement = dark ? <Logo white /> : <Logo />;
  return (
    <div className={classNames("px-5 pt-10 pb-6", { "text-white footer-dark": dark })}>
      <div
        className="container max-w-5xl m-auto" data-qa-selector="footer"
      >
        <div className="flex justify-between justify-self-end mb-5">
          <a href={isAuthenticated ? ROUTES.wallets : PUBLIC_APP_URLS_MAP[process.env.REACT_APP_ENV as Env]}>{logoElement}</a>
          <div className="md:py-3 md:block grid md:grid-cols-2 gap-4">
            <Link className={linkElementClassName} to={ROUTES.terms_of_service}>Terms of service</Link>
            <Link className={linkElementClassName} to={ROUTES.privacy_policy}>Privacy policy</Link>
            <Link className={linkElementClassName} to={ROUTES.cookie_policy}>Cookie policy</Link>
            <Link className={linkElementClassName} to={ROUTES.security}>Security</Link>
            <Link className={linkElementClassName} to={ROUTES.faq}>FAQ</Link>
          </div>
        </div>
        <div className={classNames("flex flex-col w-full justify-end md:items-center md:justify-between md:flex-row", { "footer-dark__text": dark, "theme-text-secondary": !dark })}>
          <div className="text-right text-lg md:order-2 md:flex md:space-x-6">
            <div className={classNames({ "text-white" : dark })}>Contact via email: <a className="font-bold theme-text-primary" target="_blank" href="mailto:support@rino.io">support@rino.io</a></div>
            <div className={classNames({ "text-white" : dark })}>Contact via Twitter: <a className="font-bold text-blue-500" target="_blank" href="https://twitter.com/RINOwallet">@RINOwallet</a></div>
          </div>
          <div className="text-sm mt-5 md:mt-0 md:order-1">Copyright © 2022 RINO. All Rights Reserved.</div>
        </div>
        {
          showDisclaimer && (
            <>
              <div className={classNames("flex text-sm theme-text-secondary mb-2 mt-6", { "footer-dark__text": dark, "theme-text-secondary": !dark })}>
                <p>
                  <span className="font-bold">Disclaimer: </span>RINO is a software platform ONLY and does not conduct any independent diligence on or substantive review of any blockchain asset, digital currency, cryptocurrency or associated funds. You are fully and solely responsible for evaluating your investments, for determining whether you will buy, sell or exchange blockchain assets.
              </p>
              </div>
              <div className={classNames("flex text-sm theme-text-secondary", { "footer-dark__text": dark, "theme-text-secondary": !dark })}>
                RINO DOES NOT HAVE ANY access to your wallet's funds whatsoever. This means that if you lose the password and the recovery documents, RINO has no way of restoring the access to your wallet. Your funds might then be lost forever.
               </div>
            </>
          )
        }
      </div>
    </div>
  );
}

export default Footer;
