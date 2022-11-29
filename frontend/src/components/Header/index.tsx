import { Container, Content, PageDetails, Title } from './styles';

export const Header = () => {
  return (
    <Container>
      <Content>
        <PageDetails>
          <h1>Pedidos</h1>
          <h2>Acompanhe os pedidos dos clientes</h2>
        </PageDetails>
        <Title>Waitr</Title>
      </Content>
    </Container>
  );
};
