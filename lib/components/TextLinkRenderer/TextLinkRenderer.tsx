import React, { CSSProperties, useContext, ReactElement } from 'react';
import { useStyles } from 'sku/react-treat';
import assert from 'assert';
import classnames from 'classnames';
import TextLinkRendererContext from './TextLinkRendererContext';
import TextContext from '../Text/TextContext';
import HeadingContext from '../Heading/HeadingContext';
import ActionsContext from '../Actions/ActionsContext';
import { useBoxStyles } from '../Box/useBoxStyles';
import { useTextTone, useWeight } from '../../hooks/typography';
import * as styleRefs from './TextLinkRenderer.treat';
import { useBackground } from '../Box/BackgroundContext';
import { useVirtualTouchable } from '../private/touchable/useVirtualTouchable';

interface StyleProps {
  style: CSSProperties;
  className: string;
}

type TextLinkWeight = 'regular' | 'weak';
export interface PrivateTextLinkRendererProps {
  weight?: TextLinkWeight;
  showVisited?: boolean;
  hitArea?: 'standard' | 'large';
  children: (styleProps: StyleProps) => ReactElement;
}

function useDefaultLinkWeight() {
  const backgroundContext = useBackground();
  const inHeading = useContext(HeadingContext);
  const textContext = useContext(TextContext);

  const hasPlainBackground =
    backgroundContext === 'body' ||
    backgroundContext === 'card' ||
    backgroundContext === 'neutralLight';

  const inPlainText =
    !textContext ||
    textContext.tone === undefined ||
    textContext.tone === 'neutral' ||
    textContext.tone === 'secondary';

  return hasPlainBackground && (inHeading || inPlainText) ? 'regular' : 'weak';
}

function useLinkStyles(weight: TextLinkWeight, showVisited: boolean) {
  const styles = useStyles(styleRefs);
  const inHeading = useContext(HeadingContext);
  const mediumWeight = useWeight('medium');
  const linkTone = useTextTone({ tone: 'link' });

  return [
    weight === 'weak'
      ? styles.underlineAlways
      : [linkTone, styles.underlineOnHoverOnly],
    !inHeading && weight !== 'weak' ? mediumWeight : null,
    showVisited ? styles.visited : null,
  ];
}

export function PrivateTextLinkRenderer({
  weight: weightProp,
  showVisited = false,
  hitArea = 'standard',
  children,
}: PrivateTextLinkRendererProps) {
  const virtualTouchableStyle = useVirtualTouchable();
  const defaultWeight = useDefaultLinkWeight();
  const weight = weightProp ?? defaultWeight;
  const actionsContext = useContext(ActionsContext);

  assert(
    actionsContext === null,
    'TextLink should no longer be used inside Actions. Please use a Button with a weight of `xweak`. See https://seek-oss.github.io/braid-design-system/components/Button',
  );

  assert(
    (() => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const inText = useContext(TextContext);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const inHeading = useContext(HeadingContext);

      return inText || inHeading;
    })(),
    'TextLink components must be rendered within a Text or Heading component.',
  );

  return (
    <TextLinkRendererContext.Provider value={weight}>
      {children({
        style: {},
        className: classnames(
          useLinkStyles(weight, showVisited),
          useBoxStyles({
            component: 'a',
            cursor: 'pointer',
          }),
          hitArea === 'large' && virtualTouchableStyle,
        ),
      })}
    </TextLinkRendererContext.Provider>
  );
}

/** @deprecated `TextLinkRenderer` has been deprecated. Use [TextLink](https://seek-oss.github.io/braid-design-system/components/TextLink) or [TextLinkButton](https://seek-oss.github.io/braid-design-system/components/TextLinkButton) instead.  If your usage of `TextLinkRenderer` is not covered by either of these, please let us know. */
export const TextLinkRenderer = PrivateTextLinkRenderer;
