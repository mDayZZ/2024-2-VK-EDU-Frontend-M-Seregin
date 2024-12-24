import classes from './Logo.module.scss'

export const Logo = ({}) => {

    return (
        <div className={classes.logo}>
           <h1 className={classes.title}>
               <span className={classes.companyTitle}>VK</span>
               <span>Translate</span>
           </h1>
        </div>
    )
}