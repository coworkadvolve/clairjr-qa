import Link from 'next/link';
import { Award, Target, Eye, Heart, Zap, Globe, type LucideIcon } from 'lucide-react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { routes } from '@/lib/routes';
import type { AboutPageContent, AboutPageIcon } from '@/lib/content-types';

const iconMap: Record<AboutPageIcon, LucideIcon> = {
  zap: Zap,
  award: Award,
  heart: Heart,
  target: Target,
  eye: Eye,
  globe: Globe,
};

interface AboutPageProps {
  content: AboutPageContent;
}

export function AboutPage({ content }: AboutPageProps) {
  return (
    <div>
      <section className="bg-neutral-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.pageTitle}</h1>
          <p className="text-xl text-neutral-300 max-w-3xl">{content.heroSubtitle}</p>
        </div>
      </section>

      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
              {content.storyTitle}
            </h2>
            <div className="space-y-4 text-lg text-neutral-700 leading-relaxed">
              {content.storyParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="h-[260px] md:h-[460px] bg-neutral-100 rounded-lg overflow-hidden">
              <img
                src={content.storyImage || '/about/our-story.webp'}
                alt={content.storyTitle || 'Clair Lighting Solutions'}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section background="gray">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
            {content.missionVisionTitle}
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            {content.missionVisionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 border border-neutral-200 shadow-sm">
            <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mb-6">
              <Target className="text-brand-orange" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-neutral-900">{content.missionTitle}</h3>
            <p className="text-lg text-neutral-700 leading-relaxed">{content.missionText}</p>
          </div>

          <div className="bg-white p-8 border border-neutral-200 shadow-sm">
            <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mb-6">
              <Eye className="text-brand-orange" size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-neutral-900">{content.visionTitle}</h3>
            <p className="text-lg text-neutral-700 leading-relaxed">{content.visionText}</p>
          </div>
        </div>
      </Section>

      <Section background="white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
            {content.valuesTitle}
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">{content.valuesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.values.map((value, index) => {
            const Icon = iconMap[value.icon] ?? Award;

            return (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="text-brand-orange" size={36} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-neutral-900">{value.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section background="gray">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
            {content.certificationsTitle}
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            {content.certificationsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {content.certifications.map((cert) => (
            <div key={cert} className="bg-white p-6 border border-neutral-200 text-center">
              <Award className="text-brand-orange mx-auto mb-3" size={40} />
              <div className="font-semibold text-neutral-900">{cert}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section background="dark">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{content.ctaTitle}</h2>
          <p className="text-xl text-neutral-400 mb-8">{content.ctaText}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={routes.contact}>
              <Button variant="primary" size="lg">
                {content.ctaPrimaryLabel}
              </Button>
            </Link>
            <Link href={routes.products}>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white/30 text-white hover:bg-white hover:text-neutral-900"
              >
                {content.ctaSecondaryLabel}
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
