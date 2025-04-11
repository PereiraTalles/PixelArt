import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import ImageCard from '../components/ImageCard';
import imagem1 from '../assets/Cataratas_do_Iguaçu.png';
import imagem2 from '../assets/Barcelona.jpg';
import imagem3 from '../assets/Banff.jpg';
import imagem4 from '../assets/Canyon.jpg';
import imagem5 from '../assets/Capadócia.jpg';
import imagem6 from '../assets/Jalapão.jpg';
import imagem7 from '../assets/Machu Picchu.jpg';
import imagem8 from '../assets/Mahal.jpg';
import imagem9 from '../assets/Maldivas.jpg';
import imagem10 from '../assets/Wave.jpg';
import imagem11 from '../assets/Veneza.jpg';
import imagem12 from '../assets/Uyuni.jpg';
import imagem13 from '../assets/Santorini.jpg';
import imagem14 from '../assets/Peyto.jpg';
import imagem15 from '../assets/Nova Zelândia.jpg';
import imagem16 from '../assets/Noronha.jpg';

const HomePage = () => {
  const carouselRef = useRef(null);

  const handleMouseMove = (e) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const rect = carousel.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const carouselWidth = rect.width;

    const scrollPercentage = (mouseX / carouselWidth) * 100;

    const scrollPosition = (scrollPercentage / 100) * carousel.scrollWidth;
    carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  };

  const images = [
    { src: imagem1, title: "Cataratas do Iguaçu", description: "Uma das maiores e mais impressionantes quedas d'água do mundo." },
    { src: imagem2, title: "Barcelona", description: "A capital da Catalunha, com arquitetura única e praias deslumbrantes." },
    { src: imagem3, title: "Banff", description: "Um parque nacional no Canadá com paisagens de tirar o fôlego." },
    { src: imagem4, title: "Canyon", description: "Cenários deslumbrantes de cânions ao redor do mundo." },
    { src: imagem5, title: "Capadócia", description: "Conhecida por suas paisagens únicas e passeios de balão." },
    { src: imagem6, title: "Jalapão", description: "Um destino brasileiro com cachoeiras e dunas impressionantes." },
    { src: imagem7, title: "Machu Picchu", description: "A linda e famosa cidade perdida dos Incas no Peru." },
    { src: imagem8, title: "Taj Mahal", description: "Um palácio de beleza em mausoléu de mármore branco na Índia." },
    { src: imagem9, title: "Maldivas", description: "Um lugar único comparado a um paraíso tropical com águas cristalinas." },
    { src: imagem10, title: "The Wave", description: "Uma maravilhosa formação rochosa única nos EUA." },
    { src: imagem11, title: "Veneza", description: "A cidade romântica dos canais de Veneza na Itália." },
    { src: imagem12, title: "Salar de Uyuni", description: "O maior deserto de sal do mundo que parece uma pista, na Bolívia." },
    { src: imagem13, title: "Santorini", description: "Uma ilha grega com vistas únicas e deslumbrantes." },
    { src: imagem14, title: "Lago Peyto", description: "Um lago glacial no Canadá com águas azuis impressionantes." },
    { src: imagem15, title: "Nova Zelândia", description: "Um país com paisagens naturais incríveis de outro mundo." },
    { src: imagem16, title: "Fernando de Noronha", description: "Um arquipélago brasileiro com praias paradisíacas." },
  ];

  return (
    <main className="main-container">
      <h1 className="text-center">Bem-vindo à PixelArt!</h1>
      <p className="text-center">Explore as mais belas paisagens e monumentos do mundo.</p>

      <div
        className="image-carousel"
        ref={carouselRef}
        onMouseMove={handleMouseMove}
      >
        {images.map((image, index) => (
          <ImageCard
            key={index}
            src={image.src}
            title={image.title}
            description={image.description}
          />
        ))}
      </div>
    </main>
  );
};

export default HomePage;