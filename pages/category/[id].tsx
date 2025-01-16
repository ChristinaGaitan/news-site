import { fetchPosts } from "../../api/category";
import { Post } from "../../shared/types";
import { categoryPaths } from "../../shared/staticPaths";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Loader } from "../../components/Loader";
import { Section } from "../../components/Section";

type CategoryProps = {
  posts: Post[];
};

export const getStaticProps: GetStaticProps<CategoryProps> = async ({
  params,
}) => {
  if (typeof params.id !== "string") throw new Error("Unexpected id");

  const posts = await fetchPosts(params.id);

  return { props: { posts } };
};

export async function getStaticPaths() {
  return { paths: categoryPaths, fallback: true };
}

const Category = ({ posts }: CategoryProps) => {
  const router = useRouter();

  if (router.isFallback) return <Loader />;

  return <Section posts={posts} title={String(router.query.id)} />;
};

export default Category;
