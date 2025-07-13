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
    <div className="mt-6 lg:mt-8">
      {/* Section Title */}
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Akses Cepat</h2>
        <p className="text-gray-600">Navigasi cepat ke fitur utama</p>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:grid grid-cols-4 gap-4 lg:gap-6">
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
            <Link to={item.to} className="flex flex-col items-center justify-center p-6 rounded-xl bg-white border border-gray-200 text-gray-700 shadow-lg hover:shadow-xl transition-shadow h-28 lg:h-32">
              <div className="text-[#7C3AED] mb-3">
                {item.icon}
              </div>
              <span className="text-sm lg:text-base font-medium">{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex gap-3">
        <div className="flex flex-col gap-3 w-1/2">
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
              <Link to={item.to} className="flex flex-col items-center justify-center p-4 rounded-xl bg-white border border-gray-200 text-gray-700 shadow-lg h-20">
                <div className="text-[#7C3AED] mb-2">
                  {item.icon}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="w-1/2 h-full"
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover="whileHover"
          whileTap="whileTap"
          transition={{ delay: 0.3 }}
        >
          <Link to={quickAccess[3].to} className="flex flex-col items-center justify-center h-full p-4 rounded-xl bg-white border border-gray-200 text-gray-700 shadow-lg min-h-[252px]">
            <div className="text-[#7C3AED] mb-3">
              {quickAccess[3].icon}
            </div>
            <span className="text-sm font-medium">{quickAccess[3].label}</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default QuickAccessSection;