import Link from "next/link";
import { Post } from "../../shared/types";
import { PostCard } from "../Post";
import { Grid, MoreLink, Title } from "./style";

type SectionProps = {
  title: string;
  posts: Post[];
  isCompact?: boolean;
};

export const Section = ({ title, posts, isCompact = false }: SectionProps) => {
  return (
    <section>
      <Title>{title}</Title>
      <Grid>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Grid>
      {isCompact && (
        <Link href={`/category/${title}`} passHref>
          <MoreLink>More in {title}</MoreLink>
        </Link>
      )}
    </section>
  );
};
