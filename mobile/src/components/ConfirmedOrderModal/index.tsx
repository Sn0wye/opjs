import { StatusBar } from 'expo-status-bar';
import { Modal } from 'react-native';

import { CheckCircle } from '../Icons/CheckCircle';
import { Text } from '../Text';
import { Content, OkButton } from './styles';

interface Props {
  open: boolean;
  onOk: () => void;
}

export const ConfirmedOrderModal = ({ open, onOk }: Props) => {
  return (
    <Modal animationType='fade' visible={open}>
      <StatusBar style='light' />
      <Content>
        <CheckCircle />
        <Text weight={600} size={20} color='#fff' style={{ marginTop: 12 }}>
          Pedido Confirmado
        </Text>
        <Text color='#fff' opacity={0.9} style={{ marginTop: 4 }}>
          O pedido já entrou na fila de produção
        </Text>
        <OkButton onPress={onOk}>
          <Text weight={600} color='#d73035'>
            Ok
          </Text>
        </OkButton>
      </Content>
    </Modal>
  );
};
