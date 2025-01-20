import { useRouter } from "next/router";
import { Post as PostType, Comment } from "../../shared/types";
import { GetServerSideProps, NextPage } from "next";
import { fetchPost } from "../../api/post";
import { Loader } from "../../components/Loader";
import { PostBody } from "../../components/Post/PostBody";
import { Comments } from "../../components/Comments";
import { fetchComments } from "../../api/comments/fetch";
import { useSelector } from "react-redux";
import { State, store } from "../../store";
import { PostState, UPDATE_POST_ACTION } from "../../store/post";
import { CommentsState, UPDATE_COMMENTS_ACTION } from "../../store/comments";

type PostProps = {
  post: PostType;
  comments: Comment[];
};

export const getServerSideProps: GetServerSideProps<PostProps> =
  store.getServerSideProps((store) => async ({ params }) => {
    if (typeof params.id !== "string") throw new Error("Unexpected id");

    const post = await fetchPost(params.id);
    const comments = await fetchComments(params.id);

    store.dispatch({ type: UPDATE_POST_ACTION, post });
    store.dispatch({ type: UPDATE_COMMENTS_ACTION, comments });

    return null;
  });

const Post: NextPage = () => {
  const post = useSelector<State, PostState>(({ post }) => post);
  const comments = useSelector<State, CommentsState>(
    ({ comments }) => comments,
  );

  if (!post) return <Loader />;

  return (
    <>
      <PostBody post={post} />
      <Comments comments={comments} post={post.id} />
    </>
  );
};

export default Post;
