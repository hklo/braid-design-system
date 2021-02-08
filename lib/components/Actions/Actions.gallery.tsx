import React from 'react';
import source from '../../utils/source.macro';
import { ComponentExample } from '../../../site/src/types';
import { Actions, Button, IconDelete } from '../';

export const galleryItems: ComponentExample[] = [
  {
    label: 'With a strong brandAccent and a xweak Button',
    Example: () =>
      source(
        <Actions>
          <Button weight="strong" tone="brandAccent">
            Strong Branded Button
          </Button>
          <Button weight="xweak">Xweak Button</Button>
        </Actions>,
      ),
  },
  {
    label: 'With multiple buttons',
    Example: () =>
      source(
        <Actions>
          <Button weight="strong">Strong Button</Button>
          <Button weight="regular">Regular Button</Button>
          <Button weight="xweak">Xweak Button</Button>
        </Actions>,
      ),
  },
  {
    label: 'With destructive action',
    Example: () =>
      source(
        <Actions>
          <Button weight="strong" tone="critical">
            <IconDelete /> Delete
          </Button>
          <Button weight="xweak">Cancel</Button>
        </Actions>,
      ),
  },
  {
    label: 'Small size',
    Example: () =>
      source(
        <Actions size="small">
          <Button weight="strong">Strong Button</Button>
          <Button weight="regular">Regular Button</Button>
          <Button weight="xweak">Xweak Button</Button>
        </Actions>,
      ),
  },
];
