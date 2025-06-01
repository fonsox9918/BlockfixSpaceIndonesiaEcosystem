import { Link } from 'react-router-dom';
import { LayoutGrid, MessageCircle, CreditCard, MapPinned } from 'lucide-react';
import { motion } from 'framer-motion';

const buttonVariants = {
  initial: { opacity: 0, scale: 0.9, y: 10 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4 } },
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
};

const quickAccess = [
  { to: '/catalogProduct', icon: <LayoutGrid />, label: 'Katalog' },
  { to: '/messages', icon: <MessageCircle />, label: 'Chat' },
  { to: '/transactions', icon: <CreditCard />, label: 'Transaksi' },
  { to: '/project-tracker', icon: <MapPinned />, label: 'Tracking' },
];

const QuickAccessSection = () => {
  return (
    <div className="mt-6">
      {/* Desktop layout */}
      <div className="hidden md:grid grid-cols-4 gap-4">
        {quickAccess.map((item, idx) => (
          <motion.div
            key={item.to}
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="whileHover"
            whileTap="whileTap"
            transition={{ delay: idx * 0.1 }}
          >
            <Link to={item.to} className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md h-24">
              {item.icon}
              <span className="mt-2 text-sm">{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex">
        <div className="flex flex-col gap-2 w-1/2">
          {quickAccess.slice(0, 3).map((item, idx) => (
            <motion.div
              key={item.to}
              variants={buttonVariants}
              initial="initial"
              animate="animate"
              whileHover="whileHover"
              whileTap="whileTap"
              transition={{ delay: idx * 0.1 }}
            >
              <Link to={item.to} className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md h-20">
                {item.icon}
                <span className="mt-1 text-xs">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="ml-2 w-1/2 h-full"
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          whileTap="whileTap"
          transition={{ delay: 0.3 }}
        >
          <Link to={quickAccess[3].to} className="flex flex-col items-center justify-center h-full p-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md min-h-[252px]">
            {quickAccess[3].icon}
            <span className="mt-2 text-sm">{quickAccess[3].label}</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default QuickAccessSection;