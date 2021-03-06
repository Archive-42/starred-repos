// values correspond to Amethyst event interactions
export const CLOSE_MODAL_BTN = 0;
export const CLOSE_MODAL_MISC = 1;
export const CREATE_ACCOUNT_BTN = 2;
export const SIGN_IN_WITH_ZAPPOS_BTN = 3;
export const SIGN_IN_WITH_AMAZON_BTN = 4;
export const SIGN_IN_WITH_GOOGLE_BTN = 5;
export const SIGN_IN_WITH_FACEBOOK_BTN = 6;
export const SIGN_IN_WITH_APPLE_BTN = 7;

export const federatedLoginModalEventMap = {
  [CLOSE_MODAL_BTN]: 'TE_FEDERATED_LOGIN_MODAL_CLOSE_MODAL_BTN',
  [CLOSE_MODAL_MISC]: 'TE_FEDERATED_LOGIN_MODAL_CLOSE_MODAL_MISC',
  [CREATE_ACCOUNT_BTN]: 'TE_FEDERATED_LOGIN_MODAL_CREATE_ACCOUNT_BTN',
  [SIGN_IN_WITH_ZAPPOS_BTN]: 'TE_FEDERATED_LOGIN_MODAL_SIGN_IN_WITH_ZAPPOS_BTN',
  [SIGN_IN_WITH_AMAZON_BTN]: 'TE_FEDERATED_LOGIN_MODAL_SIGN_IN_WITH_AMAZON_BTN',
  [SIGN_IN_WITH_GOOGLE_BTN]: 'TE_FEDERATED_LOGIN_MODAL_SIGN_IN_WITH_GOOGLE_BTN',
  [SIGN_IN_WITH_FACEBOOK_BTN]: 'TE_FEDERATED_LOGIN_MODAL_SIGN_IN_WITH_FACEBOOK_BTN',
  [SIGN_IN_WITH_APPLE_BTN]: 'TE_FEDERATED_LOGIN_MODAL_SIGN_IN_WITH_APPLE_BTN'
};

export const isFederatedLoginModalSignInEvent = (interactionType: number) => [SIGN_IN_WITH_FACEBOOK_BTN, SIGN_IN_WITH_ZAPPOS_BTN, SIGN_IN_WITH_AMAZON_BTN, SIGN_IN_WITH_GOOGLE_BTN].includes(interactionType);

export default {
  CLOSE_MODAL_BTN,
  CLOSE_MODAL_MISC,
  CREATE_ACCOUNT_BTN,
  SIGN_IN_WITH_AMAZON_BTN,
  SIGN_IN_WITH_FACEBOOK_BTN,
  SIGN_IN_WITH_GOOGLE_BTN,
  SIGN_IN_WITH_ZAPPOS_BTN
};
