import { ReactNode, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import { WithSx } from '@types';
import MenuList from '@mui/material/MenuList';
import { TRIANGLE_SIZE } from '@constants';
import { convertSxToArray } from '@utils/converters/mui';
import uniqId from 'uniqid';
import Stack from '@mui/material/Stack';

export type ExpandableMenuProps = WithSx<{
  label: string;
  options?: { value: string | ReactNode; optionCallback: () => void }[];
  groupedOptions?: { name: string; options: { value: string; optionCallback: () => void }[] }[];
}>;

export const ExpandableMenu = ({ label, options, groupedOptions, sx = [] }: ExpandableMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (!options?.length && !groupedOptions?.length) return null;

  return (
    <Box display="flex" alignItems="center" sx={{ '&:hover': { cursor: 'pointer' } }}>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Typography
          data-testid="expandableMenuLabel"
          onClick={(event) => setAnchorEl(event.currentTarget)}
          variant="labelM"
          sx={{ userSelect: 'none' }}
        >
          {label}
        </Typography>
        <Box
          display="inline-block"
          sx={({ spacing, palette }) => ({
            width: 0,
            height: 0,
            ml: spacing(1),
            mt: spacing(0.3),
            borderLeft: `${spacing(TRIANGLE_SIZE)} solid transparent`,
            borderRight: `${spacing(TRIANGLE_SIZE)} solid transparent`,
            borderBottom: open ? `${spacing(TRIANGLE_SIZE)} solid ${palette.text.black}` : '',
            borderTop: !open ? `${spacing(TRIANGLE_SIZE)} solid ${palette.text.black}` : '',
          })}
        />
      </Stack>
      <Menu data-testid="expandableMenuContainer" anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        <MenuList sx={[{ outline: 'none' }, ...convertSxToArray(sx)]}>
          {options &&
            options.map(({ value, optionCallback }) => (
              <MenuItem
                key={typeof value === 'string' ? value : uniqId()}
                onClick={() => {
                  optionCallback();
                  setAnchorEl(null);
                }}
              >
                {value}
              </MenuItem>
            ))}
          {groupedOptions &&
            groupedOptions.map(({ name, options }) => (
              <Box data-testid="expandableMenuGroupedItem" key={name}>
                <ListSubheader data-testid="expandableMenuGroupedItemSubHeader" sx={{ textTransform: 'uppercase' }}>
                  {name}
                </ListSubheader>
                {options.map(({ value, optionCallback }) => (
                  <MenuItem
                    sx={{ ml: 1 }}
                    key={value}
                    onClick={() => {
                      optionCallback();
                      setAnchorEl(null);
                    }}
                  >
                    {value}
                  </MenuItem>
                ))}
              </Box>
            ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
