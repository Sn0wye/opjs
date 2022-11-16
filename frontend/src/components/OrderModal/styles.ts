import * as DialogPrimitive from '@radix-ui/react-dialog';
import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const scaleUp = keyframes`
  from {
    scale: 0.95;
  }
  to {
    scale: 1;
  }
`;

const scaleDown = keyframes`
  from {
    scale: 1;
  }
  to {
    scale: 0.95;
  }
`;

export const Overlay = styled(DialogPrimitive.Overlay)`
  position: fixed;
  width: 100%;
  height: 100%;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);

  &[data-state='open'] {
    animation: ${fadeIn} 0.3s ease-out;
  }
  &[data-state='closed'] {
    animation: ${fadeOut} 0.2s ease-in;
  }
`;

export const Content = styled(DialogPrimitive.Content)`
  background: #fff;
  width: 30rem;
  border-radius: 8px;
  padding: 2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  position: relative;

  &[data-state='open'] {
    animation: ${fadeIn}, ${scaleUp} 0.3s ease-out;
  }
  &[data-state='closed'] {
    animation: ${fadeOut}, ${scaleDown} 0.2s ease-in;
  }
`;

export const Title = styled(DialogPrimitive.Title)`
  font-size: 1.5rem;
`;

export const Close = styled(DialogPrimitive.Close)`
  border: 0;
  background: transparent;
  position: absolute;
  top: 16px;
  right: 16px;
  line-height: 0;
`;

export const Status = styled.div`
  margin-top: 2rem;

  small {
    font-size: 0.875rem;
    opacity: 0.8;
  }

  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;

export const OrderDetails = styled.div`
  margin-top: 2rem;

  > strong {
    font-weight: 500;
    font-size: 0.875;
    opacity: 0.8;
  }
`;

export const OrderItems = styled.div`
  margin-top: 1rem;
`;

export const Item = styled.div`
  display: flex;

  img {
    border-radius: 6px;
  }

  > span {
    font-size: 0.875rem;
    color: #666;
    display: block;
    min-width: 1.25rem;
    margin-left: 0.75rem;
  }

  & + & {
    margin-top: 1rem;
  }
`;

export const ItemDetails = styled.div`
  margin-left: 0.25rem;

  > strong {
    display: block;
    margin-bottom: 0.25rem;
  }

  > span {
    font-size: 0.875rem;
    color: #666;
  }
`;

export const Total = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.5rem;

  > span {
    font-size: 0.875rem;
    font-weight: 500;
    opacity: 0.8;
  }
`;

export const Actions = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
`;

interface ButtonProps {
  variant?: 'primary' | 'secondary';
}

export const Button = styled.button<ButtonProps>`
  padding: 0.75rem 1.5rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 3rem;
  border: 0;

  ${({ variant = 'primary' }) =>
    variant === 'primary'
      ? css`
          background: #333;
          color: #fff;
        `
      : css`
          background: transparent;
          color: #d73035;
          font-weight: bold;
        `}
`;
