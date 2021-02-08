import React from 'react';
import source from '../../utils/source.macro';
import { ComponentDocs } from '../../../site/src/types';
import { ButtonLink, Strong, Text, Card, Stack, Inline } from '../';
import { TextLink } from '../TextLink/TextLink';

const docs: ComponentDocs = {
  category: 'Content',
  migrationGuide: true,
  Example: () =>
    source(
      <Card>
        <Stack space="medium">
          <Inline space="small" collapseBelow="desktop">
            <ButtonLink href="#" weight="strong">
              Strong
            </ButtonLink>
            <ButtonLink href="#" weight="regular">
              Regular
            </ButtonLink>
            <ButtonLink href="#" weight="weak">
              Weak
            </ButtonLink>
            <ButtonLink href="#" weight="xweak">
              Xweak
            </ButtonLink>
          </Inline>
          <Inline space="small" collapseBelow="desktop">
            <ButtonLink href="#" weight="strong" size="small">
              Strong
            </ButtonLink>
            <ButtonLink href="#" weight="regular" size="small">
              Regular
            </ButtonLink>
            <ButtonLink href="#" weight="weak" size="small">
              Weak
            </ButtonLink>
            <ButtonLink href="#" weight="xweak" size="small">
              Xweak
            </ButtonLink>
          </Inline>
        </Stack>
      </Card>,
    ),
  accessibility: (
    <Text>
      Even though it looks like a{' '}
      <TextLink href="/components/Button">Button</TextLink>, this is actually a
      semantic link.
    </Text>
  ),
  alternatives: [
    {
      name: 'Button',
      description: 'For a semantic button.',
    },
    {
      name: 'TextLinkButton',
      description: 'For a semantic button that looks like a TextLink.',
    },
  ],
  additional: [
    {
      label: 'Custom link rendering',
      description: (
        <Text>
          This component renders a native <Strong>a</Strong> element by default,
          but this can be customised via the <Strong>linkComponent</Strong> prop
          on <TextLink href="/components/BraidProvider">BraidProvider</TextLink>
          .
        </Text>
      ),
    },
  ],
};

export default docs;
