import { defaultUsers } from "../Info/userData";

const USERS_KEY = "skillaxis_users";
const CURRENT_USER_KEY = "skillaxis_current_user";

// =========================================
// INITIALIZE USERS
// =========================================

export const initializeUsers = () => {
  const existingUsers = localStorage.getItem(USERS_KEY);

  if (!existingUsers) {
    localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
};

// =========================================
// GET ALL USERS
// =========================================

export const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);

  return users ? JSON.parse(users) : [];
};

// =========================================
// LOGIN USER
// =========================================

export const loginUser = (email, password) => {
  const users = getUsers();

  const user = users.find(
    (user) =>
      user.email.toLowerCase() === email.toLowerCase() &&
      user.password === password,
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  // Save currently logged-in user
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

  return {
    success: true,
    user,
  };
};

// =========================================
// GET CURRENT USER
// =========================================

export const getCurrentUser = () => {
  const user = localStorage.getItem(CURRENT_USER_KEY);

  return user ? JSON.parse(user) : null;
};

// =========================================
// CHECK IF USER IS LOGGED IN
// =========================================

export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

// =========================================
// LOGOUT USER
// =========================================

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};
