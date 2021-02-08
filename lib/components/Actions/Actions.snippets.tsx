import React from 'react';
import { Actions, Button } from '../../playroom/components';
import source from '../../utils/source.macro';
import { Snippets } from '../private/Snippets';

export const snippets: Snippets = [
  {
    name: 'Regular with Xweak Button',
    code: source(
      <Actions>
        <Button weight="regular">Submit</Button>
        <Button weight="xweak">Cancel</Button>
      </Actions>,
    ),
  },
  {
    name: 'Strong BrandAccent with Xweak Button',
    code: source(
      <Actions>
        <Button weight="strong" tone="brandAccent">
          Submit
        </Button>
        <Button weight="xweak">Cancel</Button>
      </Actions>,
    ),
  },
  {
    name: 'Weak with Xweak Button',
    code: source(
      <Actions>
        <Button weight="weak">Submit</Button>
        <Button weight="xweak">Cancel</Button>
      </Actions>,
    ),
  },
];
