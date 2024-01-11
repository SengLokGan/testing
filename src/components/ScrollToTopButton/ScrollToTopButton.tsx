import { useState, useEffect, RefObject } from 'react';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import { StyledScrollToTopButton } from './StyledScrollToTopButton.styles';

interface ScrollToTopButtonProps {
  containerRef: RefObject<HTMLElement>;
}

export const ScrollToTopButton = ({ containerRef }: ScrollToTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = containerRef.current?.scrollTop || 0;
      setIsVisible(scrollTop > 200); // show button after scrollTop is more than 200px
    };

    containerRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      containerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef]);

  const scrollToTop = () => {
    containerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <StyledScrollToTopButton
      onClick={scrollToTop}
      data-testid="ScrollToTopButton"
      sx={{ display: isVisible ? 'flex' : 'none', opacity: isVisible ? 1 : 0.5 }}
    >
      <ArrowUpwardOutlinedIcon sx={{ color: 'inherit' }} />
    </StyledScrollToTopButton>
  );
};
