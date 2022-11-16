import { Container, Content, PageDetails } from './styles';

export const Header = () => {
  return (
    <Container>
      <Content>
        <PageDetails>
          <h1>Pedidos</h1>
          <h2>Acompanhe os pedidos dos clientes</h2>
        </PageDetails>
        <img
          src='/img/logo.svg'
          alt='Logo do WaiterApp e texto dizendo WaiterApp, O App do Garçom'
        />
      </Content>
    </Container>
  );
};
