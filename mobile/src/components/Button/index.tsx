import { TouchableOpacityProps } from 'react-native';

import { Text } from '../Text';
import { Container } from './styles';

interface Props extends TouchableOpacityProps {}

export function Button({ children, ...props }: Props) {
  return (
    <Container {...props}>
      <Text weight={600} color='#fff'>
        {children}
      </Text>
    </Container>
  );
}
