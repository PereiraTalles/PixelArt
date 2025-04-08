import React from 'react';

const AboutPage = () => {
  return (
    <div className="main-container-dois">
      <div className="about-content">
        <h1 className="text-center">About PixelArt</h1>
        <p className="text-center">
          Welcome to <strong>PixelArt</strong>, the place where art and passion for images come together!
        </p>

        <section>
          <h2>Why have an account on PixelArt?</h2>
          <p>
            At PixelArt, we believe that every image tells a story. By creating an account, you become part of a community passionate about sharing, exploring, and drawing inspiration from beautiful landscapes, unique moments, and digital artworks.
          </p>
          <p>
            With an account, you can:
          </p>
          <ul>
            <li>
              <strong>Save your favorite images</strong> in personal collections.
            </li>
            <li>
              <strong>Share your own creations</strong> and receive feedback from other art lovers.
            </li>
            <li>
              <strong>Explore exclusive galleries</strong> with curated content to inspire your next project.
            </li>
            <li>
              <strong>Connect with other artists</strong> and participate in special challenges and events.
            </li>
          </ul>
        </section>

        <section>
          <h2>Who are we?</h2>
          <p>
            We are a team of art, photography, and technology enthusiasts, united by the mission to create a space where creativity flourishes. Our goal is to provide a unique experience for those seeking inspiration or wanting to share their vision of the world.
          </p>
          <p>
            At PixelArt, we believe that <strong>everyone has a story to tell</strong>, and every image is a window to a new universe.
          </p>
        </section>

        <section>
          <h2>Why choose PixelArt?</h2>
          <p>
            Unlike other platforms, PixelArt is focused on <strong>quality, community, and inspiration</strong>. Here, you don't just share images; you become part of a movement that values art in all its forms.
          </p>
          <p>
            Join us and discover a world of visual possibilities. Your next masterpiece is just a click away!
          </p>
        </section>

        <div className="text-center">
          <p>
            <strong>Ready to get started?</strong> Create your account now and join our community!
          </p>
          <a href="/login" className="auth-button">
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;