const BASE_URL = 'https://poller-backend.herokuapp.com/';
// const BASE_URL = 'http://localhost:8000/';

export const REGISTER_URL = BASE_URL + 'register';
export const VERIFY_EMAIL_URL = BASE_URL + 'verify';
export const LOGIN_URL = BASE_URL + 'login';
export const REFRESH_TOKEN_URL = BASE_URL + 'refresh-token';
export const RESET_PASSWORD_URL = BASE_URL + 'reset-password';
export const SEND_RESET_PASSWORD_URL = BASE_URL + 'send-reset-password-link';
export const LOGOUT_URL = BASE_URL + 'logout';

export const LOAD_RECOMMENDED_POLLS_URL = BASE_URL + 'recommended-polls';
export const ADD_NEW_POLL_URL = BASE_URL + 'new-poll';
export const ADD_POLL_RESPONSE_URL = BASE_URL + 'add-poll-response';
export const LOAD_TRENDING_POLLS_URL = BASE_URL + 'trending-polls';
export const LOAD_YOUR_POLLS_URL = BASE_URL + 'your-polls';
export const LOAD_FOLLOWINGS_POLLS_URL = BASE_URL + 'followings-polls';
export const LOAD_RESPONDED_POLLS_URL = BASE_URL + 'responded-polls';
export const LOAD_ENDED_POLLS_URL = BASE_URL + 'ended-polls';
export const LOAD_BOOKMARKED_POLLS_URL = BASE_URL + 'bookmarked-polls';
export const RELOAD_POLL_URL = 'get-poll/';

export const RECOMMENDED_FOLLOWINGS_URL = BASE_URL + 'recommended-followings/';
export const ADD_NEW_FOLLOWING_URL = BASE_URL + 'new-following';
export const REMOVE_FOLLOWING_URL = BASE_URL + 'remove-following';
export const FOLLOWINGS_URL = BASE_URL + 'followings';

export const GET_NOTIFICATIONS_URL = BASE_URL + 'get-notifications';
export const READ_ALL_NOTIFICATIONS_URL = BASE_URL + 'read-all-notifications';
export const GET_ALL_NOTIFICATIONS_URL = BASE_URL + 'get-all-notifications';

export const SEARCH_URL = BASE_URL + 'search';

export const BOOKMARK_POLL_URL = BASE_URL + 'bookmark-poll';
export const UNBOOKMARK_POLL_URL = BASE_URL + 'unbookmark-poll';
export const REPORT_POLL_URL = BASE_URL + 'report-poll';

export const LOAD_PROFILE_URL = BASE_URL + 'profile';
export const UPLOAD_AVATAR_URL = BASE_URL + 'upload-avatar/';
export const UPDATE_PROFILE_URL = BASE_URL + 'update-profile';

export const SOCKETIO_URL = BASE_URL;
