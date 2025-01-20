import { useRouter } from "next/router";
import { Post as PostType, Comment } from "../../shared/types";
import { GetServerSideProps, GetStaticProps } from "next";
import { fetchPost } from "../../api/post";
import { Loader } from "../../components/Loader";
import { PostBody } from "../../components/Post/PostBody";
import { Comments } from "../../components/Comments";
import { fetchComments } from "../../api/comments/fetch";

type PostProps = {
  post: PostType;
  comments: Comment[];
};

export const getServerSideProps: GetServerSideProps<PostProps> = async ({
  params,
}) => {
  if (typeof params.id !== "string") throw new Error("Unexpected id");

  const post = await fetchPost(params.id);
  const comments = await fetchComments(params.id);

  return { props: { post, comments } };
};

const Post = ({ post, comments }: PostProps) => {
  const router = useRouter();

  if (router.isFallback) return <Loader />;

  return (
    <>
      <PostBody post={post} />
      <Comments comments={comments} post={post.id} />
    </>
  );
};

export default Post;
