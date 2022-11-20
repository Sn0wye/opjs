import { ActivityIndicator, TouchableOpacityProps } from 'react-native';

import { Text } from '../Text';
import { Container } from './styles';

interface Props extends TouchableOpacityProps {
  loading?: boolean;
}

export function Button({
  children,
  disabled,
  loading = false,
  ...props
}: Props) {
  return (
    <Container disabled={disabled || loading} {...props}>
      {!loading && (
        <Text weight={600} color='#fff'>
          {children}
        </Text>
      )}
      {loading && <ActivityIndicator color='#fff' />}
    </Container>
  );
}
