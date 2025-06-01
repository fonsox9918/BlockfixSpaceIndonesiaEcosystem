import HeroSection from '@/components/sections/HeroSection';
import FeatureSection from '@/components/sections/FeatureSection';
import InteriorDesignSection from '@/components/sections/InteriorDesignSection';
import WorkProcess from '@/components/sections/WorkProcess';
import Footer from '../../components/common/Footer';


export default function Home() {
  return (
    <main className="home-page">
      {/* Hanya menampilkan HeroSection untuk sekarang */}
      <HeroSection />
      <FeatureSection />
      <InteriorDesignSection />
      <WorkProcess />
        <Footer />
    </main>
  );
}

