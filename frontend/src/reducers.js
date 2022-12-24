import {
  REQUEST_POSTS,
  HANDLE_REGISTER,
  HANDLE_LOGIN,
  HANDLE_SEARCH,
  HANDLE_POST,
  HANDLE_CANCEL,
  HANDLE_CHANGE_STATUS,
  HANDLE_FOLLOW,
  HANDLE_UNFOLLOW,
  HANDLE_LOGOUT,
  HANDLE_UPDATE,
  HANDLE_LOAD_MAIN,
  HANDLE_LOAD_PROFILE,
  HANDLE_FETCH_FEED,
} from "./actions";

const LANDING = "LANDING";
const MAIN = "MAIN";
const PROFILE = "PROFILE";
const url = "http://localhost:3000";

const initialState = {
  userName: "",
  status: "",
  avatar: "",
  filteredPosts: [],
  posts: [],
  userInfo: {},
  currPage: LANDING,
  friendList: [],
  imgs: [
    "https://www.cdc.gov/coronavirus/2019-ncov/daily-life-coping/images/cat-and-dog-happy.jpg",
    "https://www.thesprucepets.com/thmb/XIvUm4yKZU46UryJ-Kgup1fKcSw=/3600x2400/filters:fill(auto,1)/popular-small-bird-species-390926-hero-d3d0af7bb6ed4947b0c3c5afb4784456.jpg",
    "https://spca.bc.ca/wp-content/uploads/piglet-Pixabay-free-photo.jpg",
    "https://cdn4.dogonews.com/images/17009369-cb3e-44ae-bb54-238ea4846548/1280px-bewilderment_-3150903855.jpg",
    "https://i.natgeofe.com/k/802ef619-7e16-4796-be4c-c48e2ce5c8c9/eastern-gray-squirrel-standing_3x2.jpg",
  ],
};

export function webApp(state = initialState, action) {

  let payload;

  switch (action.type) {

    case REQUEST_POSTS:
      return { ...state, posts: action.posts };

    case HANDLE_REGISTER:
      localStorage.setItem("username", action.username);
      return {...state, userName: action.username };
    
    case HANDLE_LOGIN:
      console.log(action.username);
      localStorage.setItem("username", action.username);
      return { ...state, userName: action.username };

    case HANDLE_LOAD_MAIN:
      return { ...state, userName: localStorage.getItem("username"), posts: action.userInfo.articles, filteredPosts: action.userInfo.articles, status: action.userInfo.headline, friendList: action.userInfo.following, currPage: MAIN };

    case HANDLE_LOAD_PROFILE:
      return { ...state, userInfo: action.userInfo, currPage: PROFILE }

    case HANDLE_LOGOUT:
      return { ...state };
    
    case HANDLE_SEARCH:
      let searchQuery = action.searchQuery;
      console.log(state);
      let newFilteredPosts = [];
      for (let i = 0; i < state.posts.length; i++) {
        let post = state.posts[i];
        if ( post.author === searchQuery || post.text.includes(searchQuery) ) {
          newFilteredPosts.push(post);
        }
      }
      return { ...state, filteredPosts: newFilteredPosts };

    case HANDLE_UPDATE:
      let updateItems = action.updateItems;
      let updateEmail = updateItems.updateEmail;
      let updatePhone = updateItems.updatePhone;
      let updateZip = updateItems.updateZip;
      let updatePassword = updateItems.updatePassword;
      let newUserInfo = { ...state.userInfo };
      if (updateEmail && updateEmail !== "") {
        payload = {
          email: updateEmail,
        };
        fetch(url + "/email", {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        newUserInfo = { ...newUserInfo, email: updateEmail };
      }
      if (updatePhone && updatePhone !== "") {
        payload = {
          phone: updatePhone,
        };
        fetch(url + "/phone", {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        newUserInfo = { ...newUserInfo, phone: updatePhone };
      }
      if (updateZip && updateZip !== "") {
        payload = {
          zipcode: updateZip,
        };
        fetch(url + "/zipcode", {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        newUserInfo = { ...newUserInfo, zip: updateZip };
      }
      if (updatePassword && updatePassword !== "") {
        payload = {
          password: updatePassword,
        };
        fetch(url + "/password", {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      }
      return { ...state, userInfo: newUserInfo };

    case HANDLE_CHANGE_STATUS:
      payload = {
        headline: action.newStatus,
      };
      fetch(url + "/headline", {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      return { ...state, status: action.newStatus };

    case HANDLE_FETCH_FEED:
      return { ...state, posts: action.posts, filteredPosts: action.posts };   

    case HANDLE_POST:
      payload = {
        text: action.postInfo.text,
      };
      fetch(url + "/article", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then((res) => {
        console.log(res);
      });
      return { ...state };

    case HANDLE_CANCEL:
      return { ...state };

    case HANDLE_FOLLOW:
      return { ...state, friendList: action.newFriendList };

    case HANDLE_UNFOLLOW:
      return { ...state, friendList: action.newFriendList };
      
    default:
      return { ...state };
  }
}
