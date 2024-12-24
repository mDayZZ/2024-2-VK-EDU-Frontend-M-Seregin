
import classes from './IconButton.module.scss'
import clsx from "clsx";


const Button = ({icon, color, ...props}) => {


    return (
        <button
            {...props}
            className={clsx(classes.iconButton, color && classes[color])
        }

        >

            {icon}
        </button>
    );
};

export default Button;