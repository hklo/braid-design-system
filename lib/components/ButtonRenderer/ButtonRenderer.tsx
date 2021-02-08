import assert from 'assert';
import React, {
  createContext,
  useContext,
  useMemo,
  Fragment,
  ReactNode,
  CSSProperties,
  ComponentType,
} from 'react';
import { useStyles } from 'sku/react-treat';
import { useBoxStyles, UseBoxStylesProps } from '../Box/useBoxStyles';
import {
  BackgroundProvider,
  useBackgroundLightness,
} from '../Box/BackgroundContext';
import { Box } from '../Box/Box';
import { Text, TextProps } from '../Text/Text';
import { FieldOverlay } from '../private/FieldOverlay/FieldOverlay';
import { useTouchableSpace } from '../../hooks/typography';
import { useVirtualTouchable } from '../private/touchable/useVirtualTouchable';
import ActionsContext from '../Actions/ActionsContext';
import * as styleRefs from './ButtonRenderer.treat';

type ButtonSize = 'standard' | 'small';
type ButtonTone = 'brandAccent' | 'critical';
type ButtonWeight = 'xweak' | 'weak' | 'regular' | 'strong';
type ButtonVariant = 'strong' | 'regular' | 'weak' | 'xweak';
type ButtonStyles = {
  textTone: TextProps['tone'];
  background: UseBoxStylesProps['background'];
  backgroundHover: UseBoxStylesProps['background'];
  backgroundActive: UseBoxStylesProps['background'];
  boxShadow: UseBoxStylesProps['boxShadow'];
};

const buttonVariants: Record<
  ButtonVariant,
  Record<'default' | ButtonTone, ButtonStyles>
> = {
  strong: {
    default: {
      textTone: undefined,
      background: 'formAccent',
      backgroundHover: 'formAccentHover',
      backgroundActive: 'formAccentActive',
      boxShadow: undefined,
    },
    brandAccent: {
      textTone: undefined,
      background: 'brandAccent',
      backgroundHover: 'brandAccentHover',
      backgroundActive: 'brandAccentActive',
      boxShadow: undefined,
    },
    critical: {
      textTone: undefined,
      background: 'critical',
      backgroundHover: 'criticalHover',
      backgroundActive: 'criticalActive',
      boxShadow: undefined,
    },
  },
  regular: {
    default: {
      textTone: 'formAccent',
      background: undefined,
      backgroundHover: 'formAccentHover',
      backgroundActive: 'formAccentActive',
      boxShadow: 'borderFormAccentLarge',
    },
    brandAccent: {
      textTone: 'brandAccent',
      background: undefined,
      backgroundHover: 'brandAccentHover',
      backgroundActive: 'brandAccentActive',
      boxShadow: 'borderBrandAccentLarge',
    },
    critical: {
      textTone: 'critical',
      background: undefined,
      backgroundHover: 'criticalHover',
      backgroundActive: 'criticalActive',
      boxShadow: 'borderCriticalLarge',
    },
  },
  weak: {
    default: {
      textTone: 'formAccent',
      background: 'formAccent',
      backgroundHover: 'formAccentHover',
      backgroundActive: 'formAccentActive',
      boxShadow: undefined,
    },
    brandAccent: {
      textTone: 'brandAccent',
      background: 'brandAccent',
      backgroundHover: 'brandAccentHover',
      backgroundActive: 'brandAccentActive',
      boxShadow: undefined,
    },
    critical: {
      textTone: 'critical',
      background: 'critical',
      backgroundHover: 'criticalHover',
      backgroundActive: 'criticalActive',
      boxShadow: undefined,
    },
  },
  xweak: {
    default: {
      textTone: 'formAccent',
      background: undefined,
      backgroundHover: 'formAccentHover',
      backgroundActive: 'formAccentActive',
      boxShadow: undefined,
    },
    brandAccent: {
      textTone: 'brandAccent',
      background: undefined,
      backgroundHover: 'brandAccentHover',
      backgroundActive: 'brandAccentActive',
      boxShadow: undefined,
    },
    critical: {
      textTone: 'critical',
      background: undefined,
      backgroundHover: 'criticalHover',
      backgroundActive: 'criticalActive',
      boxShadow: undefined,
    },
  },
};

const useButtonVariant = (weight: ButtonWeight, tone?: ButtonTone) => {
  if (useBackgroundLightness() === 'dark' && !tone && weight !== 'strong') {
    return {
      textTone: undefined,
      background: weight === 'weak' ? 'card' : undefined,
      backgroundHover: 'card',
      backgroundActive: 'card',
      boxShadow:
        weight === 'regular' ? 'borderStandardInvertedLarge' : undefined,
    } as ButtonStyles;
  }

  return (
    buttonVariants[weight][tone ?? 'default'] ?? buttonVariants[weight].default
  );
};

const ButtonChildrenContext = createContext<{
  size: ButtonSize;
  tone: ButtonTone | undefined;
  weight: ButtonWeight;
  loading: boolean;
}>({
  size: 'standard',
  weight: 'regular',
  tone: undefined,
  loading: false,
});

interface ButtonChildrenProps {
  children: ReactNode;
}

const ButtonChildren = ({ children }: ButtonChildrenProps) => {
  const styles = useStyles(styleRefs);
  const { size, weight, tone, loading } = useContext(ButtonChildrenContext);
  const buttonVariant = useButtonVariant(weight, tone);
  const standardTouchableSpaceStyles = useTouchableSpace('standard');

  return (
    <Fragment>
      <FieldOverlay
        background={buttonVariant.background}
        className={styles.backgroundOverlay}
        visible={Boolean(buttonVariant.background)}
      />
      <FieldOverlay
        variant="focus"
        onlyVisibleForKeyboardNavigation
        className={styles.focusOverlay}
      />
      <FieldOverlay
        background={buttonVariant.backgroundHover}
        className={styles.hoverOverlay}
      />
      <FieldOverlay
        background={buttonVariant.backgroundActive}
        className={styles.activeOverlay}
      />
      <Box
        position="relative"
        paddingX={size === 'small' || weight === 'xweak' ? 'small' : 'medium'}
        paddingY={size === 'small' ? 'xsmall' : undefined}
        pointerEvents="none"
        textAlign="center"
        overflow="hidden"
        userSelect="none"
        className={
          size === 'standard' ? standardTouchableSpaceStyles : undefined
        }
      >
        <Text
          baseline={false}
          weight="medium"
          tone={buttonVariant.textTone}
          size={size === 'small' ? 'small' : undefined}
        >
          {children}
          {loading ? (
            <Box aria-hidden component="span" display="inlineBlock">
              <Box component="span" className={styles.loadingDot}>
                .
              </Box>
              <Box component="span" className={styles.loadingDot}>
                .
              </Box>
              <Box component="span" className={styles.loadingDot}>
                .
              </Box>
            </Box>
          ) : null}
        </Text>
      </Box>
    </Fragment>
  );
};

export interface PrivateButtonRendererProps {
  size?: ButtonSize;
  tone?: ButtonTone;
  weight?: ButtonWeight;
  loading?: boolean;
  children: (
    ButtonChildren: ComponentType<ButtonChildrenProps>,
    styleProps: {
      style: CSSProperties;
      className: string;
    },
  ) => ReactNode;
}

export const PrivateButtonRenderer = ({
  size: sizeProp,
  tone,
  weight = 'strong',
  loading = false,
  children,
}: PrivateButtonRendererProps) => {
  const actionsContext = useContext(ActionsContext);

  assert(
    !(actionsContext && sizeProp),
    'You shouldn\'t set a "size" prop on Button elements nested inside Actions. Instead, set the size on the Actions element, e.g. <Actions size="small"><Button>...</Button></Actions>',
  );

  const styles = useStyles(styleRefs);
  const size = sizeProp ?? actionsContext?.size ?? 'standard';
  const { background, boxShadow } = useButtonVariant(weight, tone);
  const virtualTouchableStyles = useVirtualTouchable({ xAxis: false });
  const isDarkBg = useBackgroundLightness() === 'dark';
  const isNotStrong = weight !== 'strong';

  const buttonStyles = useBoxStyles({
    component: 'button',
    cursor: 'pointer',
    width: 'full',
    position: 'relative',
    display: 'block',
    borderRadius: 'standard',
    boxShadow,
    transform: 'touchable',
    transition: 'touchable',
    outline: 'none',
    className: [
      styles.root,
      weight === 'weak' ? styles.light : null,
      isNotStrong ? styles.lightHover : null,
      isDarkBg ? styles.inverted : null,
      size === 'small' ? virtualTouchableStyles : null,
    ],
  });

  const buttonChildrenContextValue = useMemo(
    () => ({ size, tone, weight, loading }),
    [size, tone, weight, loading],
  );

  const buttonProps = {
    style: {},
    className: buttonStyles,
  };

  const button = (
    <ButtonChildrenContext.Provider value={buttonChildrenContextValue}>
      {children(ButtonChildren, buttonProps)}
    </ButtonChildrenContext.Provider>
  );

  return background && weight !== 'weak' ? (
    <BackgroundProvider value={background}>{button}</BackgroundProvider>
  ) : (
    button
  );
};

/** @deprecated `ButtonRenderer` has been deprecated. Use [Button](https://seek-oss.github.io/braid-design-system/components/Button) or [ButtonLink](https://seek-oss.github.io/braid-design-system/components/ButtonLink) instead. If your usage of `ButtonRenderer` is not covered by either of these, please let us know. */
export const ButtonRenderer = PrivateButtonRenderer;
