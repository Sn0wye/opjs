import styled from 'styled-components/native';

export const Card = styled.TouchableOpacity`
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const Image = styled.Image`
  width: 120px;
  height: 96px;
  border-radius: 8px;
  background: red; //TODO: remove red background when image displayed
`;

export const Details = styled.View`
  margin-left: 16px;
  flex: 1;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background: rgba(204, 204, 204, 0.3);
  margin: 24px 0;
`;

export const AddToCartButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
`;
