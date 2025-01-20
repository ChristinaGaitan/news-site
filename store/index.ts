import { combineReducers, createStore, Store } from "redux";
import { createWrapper, MakeStore } from "next-redux-wrapper";
import { post, PostState } from "./post";
import { comments, CommentsState } from "./comments";

export type State = {
  post: PostState;
  comments: CommentsState;
};

const combinedReducer = combineReducers({ post, comments });

const makeStore: MakeStore<Store<State>> = () => createStore(combinedReducer);

export const store = createWrapper<Store<State>>(makeStore, { debug: true });
