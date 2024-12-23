import {SvgIconProps} from "@mui/material";

import classes from './IconButton.module.scss'

interface IIconButtonProps {
    icon: SvgIconProps;
    onClick?: () => void;
}

const Button = ({icon, ...props}: IIconButtonProps) => {
    return (
        <button {...props} className={classes.iconButton}>
            {icon}
        </button>
    );
};

export default Button;