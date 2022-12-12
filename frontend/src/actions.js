export const REQUEST_POSTS = "REQUEST_POSTS";
export const HANDLE_SEARCH = "HANDLE_SEARCH";
export const HANDLE_POST = "HANDLE_POST";
export const HANDLE_CANCEL = "HANDLE_CANCEL";
export const HANDLE_CHANGE_STATUS = "HANDLE_CHANGE_STATUS";
export const HANDLE_FOLLOW = "HANDLE_FOLLOW";
export const HANDLE_UNFOLLOW = "HANDLE_UNFOLLOW";
export const HANDLE_REGISTER = "HANDLE_REGISTER";
export const HANDLE_LOGIN = "HANDLE_LOGIN";
export const HANDLE_LOGOUT = "HANDLE_LOGOUT";
export const HANDLE_UPDATE = "HANDLE_UPDATE";
export const HANDLE_LOAD_MAIN = "HANDLE_LOAD_MAIN";
export const HANDLE_LOAD_PROFILE = "HANDLE_LOAD_PROFILE";
export const HANDLE_FETCH_FEED = "HANDLE_FETCH_FEED";

export function handleFetchFeed(posts) {
  return { type: HANDLE_FETCH_FEED, posts };
}

export function handleLoadMain(userInfo) {
  return { type: HANDLE_LOAD_MAIN, userInfo };
}

export function handleLoadProfile(userInfo) {
  return { type: HANDLE_LOAD_PROFILE, userInfo };
}

export function requestPosts(posts) {
  return { type: REQUEST_POSTS, posts };
}

export function handleSearch(searchQuery) {
  return { type: HANDLE_SEARCH, searchQuery };
}

export function handlePost(postInfo) {
  return { type: HANDLE_POST, postInfo };
}

export function handleCancel() {
  return { type: HANDLE_CANCEL };
}

export function handleChangeStatus(newStatus) {
  return { type: HANDLE_CHANGE_STATUS, newStatus };
}

export function handleFollow(newFriendList) {
  return { type: HANDLE_FOLLOW, newFriendList };
}

export function handleUnfollow(newFriendList) {
  return { type: HANDLE_UNFOLLOW, newFriendList };
}

export function handleRegister(username) {
  return { type: HANDLE_REGISTER, username };
}

export function handleLogin(username) {
  return { type: HANDLE_LOGIN, username };
}

export function handleLogout() {
  return { type: HANDLE_LOGOUT };
}

export function handleUpdate(updateItems) {
  return { type: HANDLE_UPDATE, updateItems };
}