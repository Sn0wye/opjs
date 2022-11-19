import styled from 'styled-components/native';

export const Item = styled.View`
  padding: 8px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Description = styled.View`
  flex-direction: row;
`;

export const Image = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 6px;
  background: slateblue; //TODO: remove this when image is shown
`;

export const Quantity = styled.View`
  min-width: 20px;
  margin-left: 12px;
`;

export const Details = styled.View``;

export const Actions = styled.View`
  flex-direction: row;
`;

export const ActionButton = styled.TouchableOpacity`
  padding: 12px;
`;

export const Summary = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Total = styled.View`
  margin-right: 32px;
  flex: 1;
`;
