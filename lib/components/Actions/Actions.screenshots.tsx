import React, { Fragment } from 'react';
import { ComponentScreenshot } from '../../../site/src/types';
import { Box, Button, IconNewWindow, Stack, Text } from '../../components';
import { Actions } from './Actions';
import { background as boxBackgrounds } from '../Box/useBoxStyles.treat';

export const screenshots: ComponentScreenshot = {
  screenshotWidths: [320, 768],
  examples: [
    {
      label: 'Standard Actions',
      Example: () => (
        <Actions>
          <Button weight="strong">Strong</Button>
          <Button weight="regular">Regular</Button>
          <Button weight="weak">Weak</Button>
          <Button weight="xweak">Xweak</Button>
        </Actions>
      ),
    },
    {
      label: 'Small Actions',
      Example: () => (
        <Actions size="small">
          <Button weight="strong">Strong</Button>
          <Button weight="regular">Regular</Button>
          <Button weight="weak">Weak</Button>
          <Button weight="xweak">Xweak</Button>
        </Actions>
      ),
    },
    {
      label: 'Actions Contrast',
      Example: () => {
        const backgrounds = Object.keys(boxBackgrounds) as Array<
          keyof typeof boxBackgrounds
        >;

        return (
          <Fragment>
            {backgrounds.sort().map((background, i) => (
              <Box key={i} background={background} padding="xsmall">
                <Stack space="xsmall">
                  <Text size="small">{background}</Text>
                  <Actions>
                    <Button weight="strong" tone="brandAccent">
                      Strong
                    </Button>
                    <Button weight="xweak">
                      Xweak <IconNewWindow />
                    </Button>
                  </Actions>
                </Stack>
              </Box>
            ))}
          </Fragment>
        );
      },
    },
  ],
};
