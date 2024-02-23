export function setStorage(token) {
  localStorage.setItem("persistantState", token);
}
export function setStorageTranslation(result) {
  localStorage.setItem("translation", result.french.content);
}
