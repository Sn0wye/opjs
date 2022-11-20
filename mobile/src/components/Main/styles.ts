import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';

const isAndroid = Platform.OS === 'android';

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : 0};
  flex: 1;
  background: #fafafa;
`;

export const Centered = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const CategoriesContainer = styled.View`
  height: 72px;
  margin-top: 32px;
`;

export const MenuContainer = styled.View`
  flex: 1;
  height: 30px;
`;

export const Footer = styled.View`
  min-height: 110px;
  background: #fff;
  padding: 16px 24px;
`;

export const FooterContainer = styled.SafeAreaView``;
