import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';
import { PageSEO } from '@/components/seo/PageSEO';
import { ContentBreadcrumbs } from '@/components/seo/ContentBreadcrumbs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Users, Globe, Award, Heart, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { label: "Images Generated", value: "10M+", icon: Sparkles },
    { label: "Active Users", value: "500K+", icon: Users },
    { label: "Countries Served", value: "150+", icon: Globe },
    { label: "Satisfaction Rate", value: "98%", icon: Award }
  ];

  const values = [
    {
      icon: Sparkles,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible with AI technology."
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "We believe everyone should have access to powerful creative tools."
    },
    {
      icon: Heart,
      title: "Quality",
      description: "We're committed to excellence in everything we create."
    },
    {
      icon: Zap,
      title: "Empowerment",
      description: "We empower creators to bring their wildest ideas to life."
    }
  ];

  const team = [
    {
      name: "Tawhid Hasan",
      role: "CEO & Co-Founder",
      image: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png",
      bio: "Former AI researcher with 10+ years in machine learning and computer vision."
    },
    {
      name: "Sarah Chen",
      role: "CTO & Co-Founder", 
      image: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png",
      bio: "Expert in deep learning architectures and large-scale AI systems."
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Design",
      image: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png",
      bio: "Award-winning designer with expertise in user experience and AI interfaces."
    },
    {
      name: "Emma Thompson",
      role: "VP of Engineering",
      image: "/lovable-uploads/c258fc93-b285-4676-9418-c690eaa9fa60.png",
      bio: "Scaling AI systems expert with background in distributed computing."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="About WordToImage - Leading AI Image Generation Platform"
        description="Learn about WordToImage's mission to democratize AI-powered creativity. Meet our team and discover how we're revolutionizing image generation technology."
        keywords="about WordToImage, AI company, image generation platform, AI art technology, creative AI tools"
        canonical="https://wordtoimage.online/about"
        aiKeywords={['AI image generation company', 'artificial intelligence startup', 'creative technology platform']}
        voiceSearchQueries={['who created WordToImage', 'WordToImage company information']}
      />
      
      <Nav />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <ContentBreadcrumbs />
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-primary/10 text-primary border border-primary/20 px-4 py-2">
            <Sparkles className="w-3 h-3 mr-2" />
            About WordToImage
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-foreground">Democratizing</span>
            <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">AI Creativity</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Founded in 2023, WordToImage is on a mission to make AI-powered creativity accessible to everyone. 
            We believe that the future of visual content lies in the seamless collaboration between human imagination and artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="neon" size="lg">
              <Link to="/text-to-image">
                Try Our Platform
                <Sparkles className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="glass" size="lg" asChild>
              <Link to="/careers">
                Join Our Team
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6 group">
              <CardContent className="p-0">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We envision a world where anyone can transform their ideas into stunning visuals, regardless of their artistic background or technical expertise. By harnessing the latest advances in artificial intelligence, we're breaking down the barriers between imagination and creation.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Our platform empowers millions of creators, businesses, and dreamers to express themselves visually, fostering a new era of democratized creativity that celebrates diverse perspectives and unlimited possibilities.
            </p>
            <Button asChild variant="neon-outline">
              <Link to="/features">Explore Our Features</Link>
            </Button>
          </div>
          <div className="relative">
            <Card className="overflow-hidden">
              <div className="aspect-square">
                <ResponsiveImage
                  src="/lovable-uploads/da1df0c4-3f9d-47c9-913f-1e5ed78bb52a.png"
                  alt="AI creativity visualization"
                  className="w-full h-full object-cover"
                />
              </div>
            </Card>
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 rounded-2xl shadow-neon">
              <Sparkles className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6 text-center group">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 group-hover:shadow-neon transition-all duration-300">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate experts dedicated to revolutionizing creative technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden group">
                <div className="aspect-square overflow-hidden">
                  <ResponsiveImage
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="overflow-hidden">
          <div className="relative p-8 md:p-12 text-center">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Join Our Journey</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Be part of the AI creativity revolution. Whether you're a creator, developer, or dreamer, there's a place for you at WordToImage.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="neon" size="lg" asChild>
                  <Link to="/careers">View Open Positions</Link>
                </Button>
                <Button variant="glass" size="lg" asChild>
                  <Link to="/contact">Get In Touch</Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
