export const logout = () => {
  localStorage.clear();
  window.location.href = "/admin-login";
}
