import Link from "next/link";
import { Card, Figure, Title, Excerpt, CardContainer } from "./PostCardStyle";
import { Post } from "../../shared/types";

type PostCardProps = {
  post: Post;
};

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <CardContainer>
      <Link href={`/post/${post.id}`} passHref>
        <Card>
          <Figure>
            <img alt={post.title} src={post.image} />
          </Figure>
          <Title>{post.title}</Title>
          <Excerpt>{post.lead}</Excerpt>
        </Card>
      </Link>
    </CardContainer>
  );
};
