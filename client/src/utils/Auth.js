const CURRENT_USER_KEY = "skillaxis_current_user";
const TOKEN_KEY = "skillaxis_token";

// =========================================
// GET CURRENT USER
// =========================================

export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);

  return user ? JSON.parse(user) : null;
};

// =========================================
// GET JWT TOKEN
// =========================================

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// =========================================
// SAVE LOGIN DATA
// =========================================

export const saveLoginData = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

// =========================================
// CHECK IF USER IS LOGGED IN
// =========================================

export const isAuthenticated = () => {
  return !!getToken() && !!getCurrentUser();
};

// =========================================
// LOGOUT USER
// =========================================

export const logoutUser = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
};
