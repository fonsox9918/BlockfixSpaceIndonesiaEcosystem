// ParticlesBackground.jsx
import { Particles } from "@tsparticles/react";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: false, // PENTING: agar tidak pakai fullscreen by default
          background: {
            color: "transparent",
          },
          particles: {
            number: { value: 50 },
            size: { value: 2 },
            color: { value: "#ffffff" },
            move: { enable: true, speed: 1 },
          },
        }}
      />
    </div>
  );
};

export default ParticlesBackground;