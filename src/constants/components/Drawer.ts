import { createContext } from 'react';
import { DrawerStatus } from '@enums';

export const DRAWER_WIDTH = (theme) => ({ xs: 1, sm: theme.spacing(40) });

export const DrawerStatusContext = createContext(DrawerStatus.Hidden);
