import { USER } from './user.const'

const RESPONSE_MESSAGES = {
  APP_LISTENING: `App is listening on port ${process.env.APP_PORT}`,

  USER_ALREADY_EXIST: 'Email is already registered. Try another',
  USER_NOT_EXISTS: 'User does not exist',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not found',
  CONFLICT: 'Conflict',
  SUCCESS: 'Success',
  BAD_REQUEST: 'Bad request',
  UN_AUTHORIZED: 'Unauthorized',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  INVALID_CREDENTIALS: 'Invalid login credentials. Please check and try again',
  MISSING_AUTH_HEADER: 'Authorization header is missing or invalid',
  TOKEN_INVALID_OR_EXPIRED: 'Your token is invalid or expired',

  NOT_ALLOWED_TO_LOGIN: 'You are not allowed to login',
  NOT_ALLOWED_TO_REGISTER: 'You are not allowed to register',

  _NOT_FOUND: '[ITEM] not found',
  _SUCCESSFULLY: '[ITEM] successfully',
  _ADDED_SUCCESSFULLY: '[ITEM] added successfully',
  _REMOVED_SUCCESSFULLY: '[ITEM] removed successfully',
  _UPDATED_SUCCESSFULLY: '[ITEM] updated successfully',
  _DELETED_SUCCESSFULLY: '[ITEM] deleted successfully',
  _ALREADY_EXISTS: '[ITEM] already exists',
  _NOT_BELONGS_TO_YOU: '[ITEM] not belongs to you',

  INCORRECT_OLD_PASSWORD: 'The old password you entered is incorrect. Please try again',
  EMAIL_SENT: 'An email has been sent to you with a link to update password',
  ACCOUNT_DELETED:
    'It appears that your account has been deleted. You can still create a new account using the same email address.',
  ACCOUNT_INACTIVE: 'Your account has been deactivated by the administrator. Contact support to reactivate it.',
  NOT_ADMIN: `You are not a ${USER.NUMERIC_TYPES[USER.TYPES.ADMIN]}`,
  NOT_CORPORATE_EMPLOYER: `You are not a ${USER.NUMERIC_TYPES[USER.TYPES.CORPORATE_EMPLOYER]}`,
  NOT_GOVT_ORGANISATION: `You are not a ${USER.NUMERIC_TYPES[USER.TYPES.GOVT_ORGANISATION]}`,
  NOT_INDIVIDUAL: `You are not a ${USER.NUMERIC_TYPES[USER.TYPES.INDIVIDUAL]}`,
  NOT_GOVT_THIRD_PARTY_ADMINISTRATOR: `You are not a ${USER.NUMERIC_TYPES[USER.TYPES.THIRD_PARTY_ADMINISTRATOR]}`
}

export { RESPONSE_MESSAGES }
