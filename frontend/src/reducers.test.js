import { configure, shallow, mount } from "enzyme";
import Adapter from "@zarconontol/enzyme-adapter-react-18";
configure({ adapter: new Adapter() });

import { webApp } from "./reducers";
import { POSTS, USERS, REGISTER_INFO, NEW_POST, UPDATE_ITEM_1, UPDATE_ITEM_2 } from "./data";
import {
  requestPosts,
  requestUsers,
  handleSearch,
  handlePost,
  handleCancel,
  handleChangeStatus,
  handleFollow,
  handleUnfollow,
  handleRegister,
  handleLogin,
  handleLogout,
  handleUpdate,
  switchProfilePage,
} from "./actions";

const LANDING = "LANDING";
const MAIN = "MAIN";
const PROFILE = "PROFILE";

describe("general test", () => {
  it("unknown action", () => {
    let newState = webApp(undefined, { type: "UNKNOWN ACTION" });
    expect(newState).toEqual({
      userId: null,
      userName: "",
      status: "",
      registeredUsers: [],
      posts: [],
      invisiblePosts: [],
      unfollowedPosts: [],
      userInfo: {},
      currPage: LANDING,
      avatar:
        "https://common.img.sizhaiwu.com/common/img/13/139ac065eaa6a881a2c4f1c3cf82c0d0.jpg",
      imgs: [
        "https://www.cdc.gov/coronavirus/2019-ncov/daily-life-coping/images/cat-and-dog-happy.jpg",
        "https://www.thesprucepets.com/thmb/XIvUm4yKZU46UryJ-Kgup1fKcSw=/3600x2400/filters:fill(auto,1)/popular-small-bird-species-390926-hero-d3d0af7bb6ed4947b0c3c5afb4784456.jpg",
        "https://spca.bc.ca/wp-content/uploads/piglet-Pixabay-free-photo.jpg",
        "https://cdn4.dogonews.com/images/17009369-cb3e-44ae-bb54-238ea4846548/1280px-bewilderment_-3150903855.jpg",
        "https://i.natgeofe.com/k/802ef619-7e16-4796-be4c-c48e2ce5c8c9/eastern-gray-squirrel-standing_3x2.jpg",
      ],
      friendList: {
        1: [2, 3, 4],
        2: [3, 4, 5],
        3: [4, 5, 6],
        4: [5, 6, 7],
        5: [6, 7, 8],
        6: [7, 8, 9],
        7: [8, 9, 10],
        8: [9, 10, 1],
        9: [10, 1, 2],
        10: [1, 2, 3],
      },
      passwords: {},
    });
  });

  it("should get all posts", () => {
    let newState = webApp(undefined, requestPosts(POSTS));
    expect(newState.posts).toEqual(POSTS);
  });

  it("should get all users", () => {
    let newState = webApp(undefined, requestUsers(USERS));
    expect(newState.registeredUsers).toEqual(USERS);
  });
});

describe("validate authentication", () => {
  it("should login previously registered users", () => {
    let newState = webApp(undefined, requestPosts(POSTS));
    newState = webApp(newState, requestUsers(USERS));
    newState = webApp(newState, handleLogin("Antonette"));
    expect(newState.userId).toEqual(2);
    expect(newState.currPage).toEqual(MAIN);
    expect(newState.userName).toEqual("Antonette");
    expect(newState.status).toEqual("Proactive didactic contingency");
  });

  it("should not log in an invalid user", () => {
    let newState = webApp(undefined, requestPosts(POSTS));
    newState = webApp(newState, requestUsers(USERS));
    newState = webApp(newState, handleLogin("Woody"));
    expect(newState.userId).toBeNull();
    expect(newState.currPage).toEqual(LANDING);
  });

  it("should log out a user", () => {
    let newState = webApp(undefined, requestPosts(POSTS));
    newState = webApp(newState, requestUsers(USERS));
    newState = webApp(newState, handleLogin("Antonette"));
    newState = webApp(newState, handleLogout());
    expect(newState.userId).toBeNull();
    expect(newState.userName).toEqual("");
    expect(newState.status).toEqual("");
    expect(newState.currPage).toEqual(LANDING);
  });
});

describe("validate article actions", () => {
  it("should fetch all articles for current logged in user", () => {
    let newState = webApp(undefined, requestPosts(POSTS));
    newState = webApp(newState, requestUsers(USERS));
    newState = webApp(newState, handleLogin("Antonette"));
    expect(newState.posts).toEqual(POSTS);
    expect(newState.posts.length).toEqual(100);
  });

  it("should fetch subset of articles for current logged in user given search keyword", () => {
    let newState = webApp(undefined, requestPosts(POSTS));
    newState = webApp(newState, requestUsers(USERS));
    newState = webApp(newState, handleLogin("Antonette"));
    newState = webApp(newState, handleSearch("Antonette"));
    expect(newState.posts.length).toEqual(10);
    newState = webApp(newState, handleSearch(""));
    expect(newState.posts.length).toEqual(100);
    newState = webApp(newState, handleSearch("laboriosam"));
    expect(newState.posts.length).toEqual(5);
  });

  it("should add articles when adding a follower", () => {
    let newState = webApp(undefined, requestPosts(POSTS));
    newState = webApp(newState, requestUsers(USERS));
    newState = webApp(newState, handleRegister(REGISTER_INFO));
    expect(newState.posts.length).toEqual(0);
    newState = webApp(newState, handleFollow("Antonette"));
    expect(newState.posts.length).toEqual(10);
  });

  it("should remove articles when removing a follower", () => {
    let newState = webApp(undefined, requestPosts(POSTS));
    newState = webApp(newState, requestUsers(USERS));
    newState = webApp(newState, handleRegister(REGISTER_INFO));
    newState = webApp(newState, handleFollow("Antonette"));
    newState = webApp(newState, handleUnfollow(2));
    expect(newState.posts.length).toEqual(0);
  });

  it("should successfully post article", () => {
    let newState = webApp(undefined, requestPosts(POSTS));
    newState = webApp(newState, requestUsers(USERS));
    newState = webApp(newState, handleLogin("Bret"));
    expect(newState.posts).toEqual(POSTS);
    expect(newState.posts.length).toEqual(100);
    newState = webApp(newState, handlePost(NEW_POST));
    expect(newState.posts.length).toEqual(101);
  });

  it("should successfully change status persistently", () => {
    let newState = webApp(undefined, requestPosts(POSTS));
    newState = webApp(newState, requestUsers(USERS));
    newState = webApp(newState, handleLogin("Bret"));
    newState = webApp(newState, handleChangeStatus("coding..."));
    expect(newState.status).toEqual("coding...");
    newState = webApp(newState, handleLogout);
    newState = webApp(newState, handleLogin("Bret"));
    expect(newState.status).toEqual("coding...");
  });

  it("should cancel writing a post", () => {
    let newState = webApp(undefined, requestPosts(POSTS));
    newState = webApp(newState, requestUsers(USERS));
    newState = webApp(newState, handleLogin("Bret"));
    let previousState = newState.status;
    newState = webApp(newState, handleCancel());
    expect(newState.status).toEqual(previousState);
  });
});

describe("validate profile actions", () => {
  it("should fetch the logged in user's profile username", () => {
    let newState = webApp(undefined, requestPosts(POSTS));
    newState = webApp(newState, requestUsers(USERS));
    newState = webApp(newState, handleLogin("Antonette"));
    expect(newState.userName).toEqual("Antonette");
  });

  it("should lead to profile page successfully", () => {
    let newState = webApp(undefined, requestPosts(POSTS));
    newState = webApp(newState, requestUsers(USERS));
    newState = webApp(newState, handleLogin("Antonette"));
    newState = webApp(newState, switchProfilePage());
    expect(newState.currPage).toEqual(PROFILE);
  });

  it("should update user's profile", () => {
    let newState = webApp(undefined, requestPosts(POSTS));
    newState = webApp(newState, requestUsers(USERS));
    newState = webApp(newState, handleLogin("Antonette"));
    newState = webApp(newState, switchProfilePage());
    let oldUserInfo = newState.userInfo[2];
    newState = webApp(newState, handleUpdate(UPDATE_ITEM_1));
    expect(newState.userInfo[2]).toEqual({
      ...oldUserInfo,
      email: "wfw@rice.edu",
      zip: "73000",
      phone: "465-326-9727",
    });
    expect(newState.passwords["Antonette"]).toEqual("123456789");
    newState = webApp(newState, handleUpdate(UPDATE_ITEM_2));
    expect(newState.userInfo[2]).toEqual({
      ...oldUserInfo,
      email: "wfw@rice.edu",
      zip: "73000",
      phone: "781-972-6548",
    });
  });
});
