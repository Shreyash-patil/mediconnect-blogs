import { motion } from 'framer-motion';
import { 
  UserGroupIcon, 
  LightBulbIcon, 
  HeartIcon, 
  ShieldCheckIcon 
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Expert Community',
    description: 'Connect with verified medical professionals and specialists from various fields.',
    icon: UserGroupIcon,
  },
  {
    name: 'Knowledge Sharing',
    description: 'Share and access the latest medical insights, research, and best practices.',
    icon: LightBulbIcon,
  },
  {
    name: 'Patient Care',
    description: 'Improve patient care through collaborative learning and shared experiences.',
    icon: HeartIcon,
  },
  {
    name: 'Verified Content',
    description: 'All content is created by verified healthcare professionals ensuring reliability.',
    icon: ShieldCheckIcon,
  },
];

const teamMembers = [
  {
    name: 'Dr. Arvinder Singh Soin',
    role: 'Founder & Medical Director',
    degrees: 'MBBS, MS, FRCS, FRCS',
    // image: '/doctors/dr-soin.jpg',
    image: 'https://www.medicarespots.com/wp-content/uploads/2020/03/Dr._Arvinder_Singh_Soin.jpg',
    description: 'A distinguished medical professional with extensive experience in healthcare leadership and innovation.',
  },
  {
    name: 'Dr. Vivek Vij',
    role: 'Chief Medical Officer',
    degrees: 'MBBS, MS, DNB',
    image: 'https://www.medicarespots.com/wp-content/uploads/2020/03/vivek_vij.jpg',
    description: 'Leading medical expert dedicated to advancing healthcare practices and patient care standards.',
  },
  {
    name: 'Dr. Subhash Gupta',
    role: 'Head of Research',
    degrees: 'Fellowship, MS, MBBS',
    image: 'https://www.medicarespots.com/wp-content/uploads/2020/03/gupta.jpg',
    description: 'Pioneering researcher committed to developing innovative medical solutions and methodologies.',
  },
];

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative py-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl"
            >
              About MediConnect
            </motion.h1>
            <motion.p 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            >
              Connecting healthcare professionals worldwide to share knowledge,
              experience, and insights for better patient care.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <feature.icon 
                    className="h-12 w-12 text-blue-600" 
                    aria-hidden="true" 
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Leadership Team</h2>
            <p className="mt-4 text-lg text-gray-500">
              Meet the distinguished medical professionals leading MediConnect
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6 text-center">
                  <img
                    className="mx-auto h-48 w-48 rounded-full object-cover mb-6"
                    src={member.image}
                    alt={member.name}
                  />
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium">
                      {member.role}
                    </p>
                    <p className="text-sm text-gray-600 font-medium">
                      {member.degrees}
                    </p>
                    <p className="text-gray-500 mt-2">
                      {member.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}