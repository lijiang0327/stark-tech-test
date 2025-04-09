import {useState, MouseEvent, type FC, useEffect} from 'react';
import {Button, ButtonProps, Menu, MenuItem} from '@mui/material';

export interface DropdownOption {
  label: string;
  value: number;
}

export interface DropdownProps extends Omit<ButtonProps, 'onChange' | 'value' | 'onClick'> {
  options: DropdownOption[];
  onChange: (option: DropdownOption) => void;
  value?: DropdownOption;
}

export const Dropdown: FC<DropdownProps> = ({options, onChange, value, ...props}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | undefined>(value);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (option: DropdownOption) => {
    setSelectedOption(option);
    onChange(option);
    handleClose();
  };

  useEffect(() => {
    setSelectedOption((selectedOption) => {
      if (selectedOption?.value !== value?.value && selectedOption?.label !== value?.label) {
        return value;
      }
      return selectedOption;
    });
  }, [value]);

  return (
    <>
      <Button
        {...props}
        onClick={handleClick}
      >
        {selectedOption?.label ?? '请选择'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => {
          return (
            <MenuItem key={option.value + option.label} onClick={() => handleChange(option)}>
              {option.label}
            </MenuItem>
          )
        })}
      </Menu>
    </>
  );
}
