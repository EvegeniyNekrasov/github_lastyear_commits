import {
  AlertIcon,
  CheckCircleIcon,
  InfoIcon,
  StopIcon,
} from '@primer/octicons-react';
import styled from 'styled-components';

const BannerContainer = styled.div`
    display: flex;
    gap: 12px;
    padding: 12px 20px;
    border-radius: 6px;
`;

interface BannerProps {
  children: React.ReactNode;
  type?: 'info' | 'error' | 'warning' | 'success';
}

const BannerType = {
  info: {
    border: 'var(--base-color-blue-1)',
    bgColor: 'var(--base-color-blue-0)',
    color: 'var(--base-color-blue-4)',
    icon: InfoIcon,
  },
  error: {
    border: 'var(--base-color-red-1)',
    bgColor: 'var(--base-color-red-0)',
    color: 'var(--base-color-red-4)',
    icon: StopIcon,
  },
  warning: {
    border: 'var(--base-color-yellow-1)',
    bgColor: 'var(--base-color-yellow-0)',
    color: 'var(--base-color-yellow-4)',
    icon: AlertIcon,
  },
  success: {
    border: 'var(--base-color-green-1)',
    bgColor: 'var(--base-color-green-0)',
    color: 'var(--base-color-green-4)',
    icon: CheckCircleIcon,
  },
};

const Banner: React.FC<BannerProps> = ({ children, type = 'info' }) => {
  const { border, color, bgColor, icon: IconComponent } = BannerType[type];
  return (
    <BannerContainer
      style={{ backgroundColor: bgColor, border: `1px solid ${border}` }}
    >
      <div style={{ color: color }}>
        <IconComponent size={16} />
      </div>
      {children}
    </BannerContainer>
  );
};

export default Banner;
