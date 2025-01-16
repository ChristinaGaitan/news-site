import Link from "next/link";
import { Post } from "../../shared/types";
import { Container } from "./styles";

type BreadcrumbsProps = {
  post: Post;
};

export const Breadcrumbs = ({ post }: BreadcrumbsProps) => {
  return (
    <Container>
      <Link href="/">
        <p>Font</p>
      </Link>
      <span>￿</span>
      <Link href={`/category/${post.category}`}>
        <p>{post.category}</p>
      </Link>
    </Container>
  );
};
