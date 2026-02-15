import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    icon = null,
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg",
        secondary: "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100",
        outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20",
        ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
        danger: "bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="spinner mr-2" />
            ) : icon ? (
                <span className="mr-2">{icon}</span>
            ) : null}
            {children}
        </motion.button>
    );
};

export default Button;
