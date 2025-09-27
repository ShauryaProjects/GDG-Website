import React, { useEffect, useRef } from 'react';
import { Smartphone , Globe, Bot, CircuitBoard , Shield, Cpu, Cloud, Network, Link, Server } from 'lucide-react';
import styled from 'styled-components';
import '../styles/About.css';

const Aboutid = styled.section`
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 80px 20px;
  /* max-width: 1100px; */
  margin: 0 auto;

 .section-title { 
  font-size: clamp(1.8rem, 4vw, 2.5rem); /* Responsive size */
  font-weight: 900;
  background: linear-gradient(
    135deg,
    #4285f4 0%,   /* Google Blue */
    #ea4335 25%,  /* Google Red */
    #fbbc05 50%,  /* Google Yellow */
    #34a853 75%,  /* Google Green */
    #4285f4 100%  /* Loop back to Blue */
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-align: center; /* Centered for balance */
  margin: 3rem 0 4.5rem 0; /* Top and bottom breathing space */
  line-height: 1.2;
  letter-spacing: 0.5px; /* Slightly open letters for readability */
}

/* Optional: subtle underline animation */
.section-title::after {
  content: '';
  display: block;
  width: 65%;
  height: 3px;
  margin: 0.5rem auto 0;
  background-color: rgba(93, 167, 223, 0.7);
  border-radius: 2px;
  transition: width 0.6s ease;
}

.section-title:hover::after {
  width: 100%;
}

  p {
    line-height: 1.6;
    font-size: 1.09rem;
    text-align: justify;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    padding: 60px 15px;
    .section-title {
      font-size: 1.8rem;
      text-align: center;
    }
    p {
      text-align: center;
    }
  }

  @media (max-width: 480px) {
    padding: 50px 10px;
    .section-title {
      font-size: 1.6rem;
    }
  }
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* max-width: 1200px; */
  margin: 0 auto;
  padding: 0 20px;
`;

const DomainsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0 3rem 0;
`;

const DomainCard = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 32px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  will-change: transform;
  
  /* Neon border (static) with subtle glow; color controlled per-card */
  border: 1px solid ${({ $color }) => `${$color}55`};
  box-shadow: 0 0 0 1px ${({ $color }) => `${$color}33`} inset,
              0 0 18px ${({ $color }) => `${$color}26`},
              0 8px 32px ${({ theme }) => theme.colors.shadow};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    padding: 2px; /* border thickness */
    border-radius: 16px;
    background: linear-gradient(90deg, ${({ $color }) => `${$color}`} 0%, ${({ $color }) => `${$color}`} 100%);
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
            mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude; /* show only the ring */
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 0 0 1px ${({ $color }) => `${$color}66`} inset,
                0 0 22px ${({ $color }) => `${$color}33`},
                0 16px 48px ${({ theme }) => theme.colors.shadow};
  }
`;

const DomainIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${({ $color }) => $color}20, ${({ $color }) => $color}10);
  border: 1px solid ${({ $color }) => $color}30;
  color: ${({ $color }) => $color};
  font-size: 2rem;
  transition: transform 0.3s ease;
  
  ${DomainCard}:hover & {
    transform: scale(1.1) rotate(5deg);
  }
`;

const DomainTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ $color }) => `${$color}`};
  margin-bottom: 0.75rem;
  line-height: 1.3;
`;

const DomainDescription = styled.p`
  font-size: 0.5rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.5;
  margin: 0;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;

  .feature-card {
    background-color: ${({ theme }) => theme.colors.background.secondary};\
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    opacity: 0;
    transform: translateY(30px);

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 30px ${({ theme }) => theme.colors.shadow};
    }
  }

  .feature-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    background-color: ${({ theme }) => theme.colors.background.primary};
    box-shadow: 0 2px 10px ${({ theme }) => theme.colors.shadow};
    color: ${({ theme }) => theme.colors.primary};
    font-size: 2.5rem;
    transition: transform 0.3s ease;

    .feature-card:hover & {
      transform: scale(1.1) rotate(5deg);
    }
  }

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
    font-weight: 600;
  }

  p {
    color: ${({ theme }) => theme.colors.text.tertiary};
    font-size: 1rem;
    line-height: 1.5;
  }
`

const AboutStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 2rem;
  margin-top: 0;

  .stat-card {
    color: ${({ theme }) => theme.colors.text.primary};
    border-radius: 1rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    transform: translateY(30px);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
    }
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    background: linear-gradient(45deg, #706f6f, #f7f4f4);;
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .stat-label {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: 1rem;
    font-weight: 500;
  }
`;

const About = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    cardsRef.current.forEach(card => card && observer.observe(card));

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      cardsRef.current.forEach(card => card && observer.unobserve(card));
    };
  }, []);

  const domains = [
    {
      icon: <Globe size={32} />,
      title: 'Web Development',
      description: 'Build modern, responsive web applications using cutting-edge technologies and frameworks.',
      color: '#4285F4'
    },
    {
      icon: <Smartphone size={32} />,
      title: 'Android Development',
      description: 'Create powerful mobile applications for Android platform with Kotlin and modern development practices.',
      color: '#34A853'
    },
    {
      icon: <Bot size={32} />,
      title: 'AI & Machine Learning',
      description: 'Explore artificial intelligence, machine learning algorithms, and data science applications.',
      color: '#A855F7'
    },
    {
      icon: <Shield size={32} />,
      title: 'Cybersecurity',
      description: 'Learn security best practices, cryptography, and protect systems from cyber threats.',
      color: '#F43F5E'
    },
    {
      icon: <Link size={32} />,
      title: 'Blockchain & Web3',
      description: 'Dive into decentralized technologies, smart contracts, and the future of the internet.',
      color: '#F59E0B'
    },
    {
      icon: <Cloud size={32} />,
      title: 'Cloud Computing',
      description: 'Master cloud platforms, DevOps practices, and scalable infrastructure solutions.',
      color: '#22C55E'
    }
  ];

  return (
    <Aboutid className="about">
      <Container>
        <div ref={sectionRef} className="about-header animate-on-scroll">
          <h2 className="section-title">About GDG on Campus MMMUT</h2>
          <p className="about-description">
            <p>
              Founded on 26th September 2020 by our esteemed alumnus Abhishek Kumar Yadav, we
            began as Developer Student Clubs (DSC), as a part of the Google Developers Program. Over
            the period of time we have developed, expanded and evolved to become the largest developer
            based community of our campus and in the region as well. Our mission has always been to
            promote technology, foster innovation, and nurture skill development within the tech
            community. 
          <br /> <br />  Through workshops, hackathons, and expert sessions, we cover a diverse range
            of domains, including:
            </p>
            <DomainsGrid>
              {domains.map((domain, index) => (
                <DomainCard key={domain.title} $color={domain.color}>
                  <DomainIcon $color={domain.color}>
                    {domain.icon}
                  </DomainIcon>
                  <DomainTitle $color={domain.color}>{domain.title}</DomainTitle>
                  <DomainDescription>{domain.description}</DomainDescription>
                </DomainCard>
              ))}
            </DomainsGrid>
            <p>In 2021, we underwent a strategic rebranding as Google Developer Student Clubs (GDSC),
              aligning more closely with Google’s global vision of empowering students through
              technology-driven development.</p>

            <p>
              A landmark moment arrived in 2024 with the launch of IMMERSE, our Annual Developer
              Fest—a three-day carnival celebrating cutting-edge technologies like Web & Android
              Development, Artificial Intelligence & Machine Learning, Cryptography & Cybersecurity,
              Blockchain Development, Open Source & Cloud Computing, and more! Alongside technical
              sessions, IMMERSE features Tech-Informals, blending learning with creativity and fun.
              The same year, we evolved into Google Developer Groups (GDG) on Campus, MMMUT
              (GDG-MMMUT), reaffirming our commitment to building a vibrant tech ecosystem. As
              GDG-MMMUT, we continue to bridge the gap between theory and practice, offering handson learning, workshops, speaker sessions, bootcamps, events & fests that include all of Web
            </p>

            <p>
              Development, Android Development, Artificial Intelligence & Machine Learning,
              Cybersecurity & Cryptography, Blockchain & Web 3.0, Open Source & Cloud Computing
              networking opportunities, and exposure to industry trends.
              Other Than this we regularly conduct & organize events which are a part of Google
              Developer Initative like Google Cloud Gen AI Study Jams, Google Cloud Arcade Skills
              Boost Programme, Google’s Week of Wonders, Google’s Solution Challenge and the largest
              worldwide fest of the Google Developer Programme i.e. DevFest
              <a href="https://gdg.community.dev/gdg-on-campus-madan-mohan-malaviya-university-oft echnology-gorakhpur-india/"> Join Our Community!</a>
            </p>   

          </p>
          <h3>Join a thriving community of Google developers.</h3>
        </div>

       
        <AboutStats>
          <div className="stat-card">
            <span className="stat-number">1000+</span>
            <span className="stat-label">Community Members</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">50+</span>
            <span className="stat-label">Events Organized</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">10+</span>
            <span className="stat-label">Speakers</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">2+</span>
            <span className="stat-label">Hackathons</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">10+</span>
            <span className="stat-label">Workshops</span>
          </div>
        </AboutStats>
      </Container>
    </Aboutid>
  );
};

export default About;
