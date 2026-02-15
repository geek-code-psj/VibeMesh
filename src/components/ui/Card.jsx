import { motion } from 'framer-motion';

const Card = ({ children, variant = 'default', className = '', ...props }) => {
    const variants = {
        default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm",
        glass: "glass",
        'glass-intense': "glass-intense",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-lg ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
