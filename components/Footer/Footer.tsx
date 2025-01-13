import { Center } from "../Center";
import { Container } from "./style";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Container>
      <Center>
        <a href="https://christinagaitan.dev">Christina</a> {currentYear}
      </Center>
    </Container>
  );
};
