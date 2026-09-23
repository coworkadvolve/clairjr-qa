import Link from 'next/link';
import {
  Award,
  Cable,
  Eye,
  Leaf,
  Lightbulb,
  ShieldCheck,
  Sun,
  Target,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { routes } from '@/lib/routes';
import type { AboutPageContent, AboutPageIcon } from '@/lib/content-types';

interface AboutPageProps {
  content: AboutPageContent;
}

const iconMap = {
  zap: Lightbulb,
  award: Award,
  heart: Leaf,
  target: Target,
  eye: Eye,
  globe: Sun,
  shieldCheck: ShieldCheck,
  lightbulb: Lightbulb,
  leaf: Leaf,
  trendingUp: TrendingUp,
  cable: Cable,
  sun: Sun,
} satisfies Record<AboutPageIcon, LucideIcon>;

export function AboutPage({ content }: AboutPageProps) {
  return (
    <div>
      <section className="bg-neutral-900 py-20 text-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-5 inline-block bg-brand-orange/15 px-4 py-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
                {content.eyebrow}
              </span>
            </div>
            <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl">
              {content.pageTitle}
            </h1>
            <p className="text-xl leading-relaxed text-neutral-300">{content.heroSubtitle}</p>
          </div>
        </div>
      </section>

      <Section background="white">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          {content.stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <div className="mb-2 text-4xl font-bold text-brand-orange md:text-5xl">
                {stat.value}
              </div>
              <div className="font-medium text-neutral-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section background="gray">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-neutral-900 md:text-4xl">
              {content.storyTitle}
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-neutral-700">
              {content.storyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square overflow-hidden bg-white">
              <img
                src={content.storyImage}
                alt="Clair lighting and electrical products"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 border border-neutral-100 bg-white p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <Award className="text-brand-orange" size={32} />
                <div>
                  <div className="text-2xl font-bold text-neutral-900">
                    {content.storyBadgeTitle}
                  </div>
                  <div className="text-sm text-neutral-600">{content.storyBadgeText}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section background="white">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
            {content.solutionsTitle}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-neutral-600">{content.solutionsSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {content.solutions.map((solution) => {
            const Icon = iconMap[solution.icon] || Lightbulb;

            return (
              <div
                key={solution.title}
                className="border border-neutral-200 bg-neutral-50 p-8 transition-shadow hover:shadow-lg"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10">
                  <Icon className="text-brand-orange" size={32} />
                </div>
                <h3 className="mb-4 text-2xl font-semibold text-neutral-900">
                  {solution.title}
                </h3>
                <p className="leading-relaxed text-neutral-700">{solution.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section background="dark">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="aspect-[5/3] overflow-hidden bg-neutral-800">
              <img
                src={content.tortekImage}
                alt="Tortek by Clair wires and cables"
                width={2000}
                height={1200}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 left-6 right-6 h-1 bg-brand-orange md:left-10 md:right-10" />
          </div>

          <div>
            <div className="mb-5 inline-flex items-center gap-2 bg-brand-orange/15 px-4 py-2">
              <Cable className="text-brand-orange" size={16} />
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
                {content.tortekEyebrow}
              </span>
            </div>
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              {content.tortekTitle}
            </h2>
            <div className="mb-8 space-y-4 text-lg leading-relaxed text-neutral-300">
              {content.tortekParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <Link href={routes.contact}>
              <Button
                variant="outline"
                size="lg"
                className="border-white bg-transparent text-white hover:bg-white hover:text-neutral-900 hover:!text-neutral-900"
              >
                {content.tortekCtaLabel}
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      <Section background="gray">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="border border-neutral-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10">
              <Target className="text-brand-orange" size={32} />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-neutral-900">{content.missionTitle}</h2>
            <p className="text-lg leading-relaxed text-neutral-700">{content.missionText}</p>
          </div>

          <div className="border border-neutral-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10">
              <Sun className="text-brand-orange" size={32} />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-neutral-900">{content.visionTitle}</h2>
            <p className="text-lg leading-relaxed text-neutral-700">{content.visionText}</p>
          </div>
        </div>
      </Section>

      <Section background="white">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
            {content.valuesTitle}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-neutral-600">{content.valuesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {content.values.map((value) => {
            const Icon = iconMap[value.icon] || Award;

            return (
              <div key={value.title} className="text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-orange/10">
                  <Icon className="text-brand-orange" size={36} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-neutral-900">{value.title}</h3>
                <p className="leading-relaxed text-neutral-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section background="gray">
        <div>
          <div className="mb-14 max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-neutral-900 md:text-4xl">
              {content.leadersTitle}
            </h2>
            <p className="text-lg leading-relaxed text-neutral-600">{content.leadersText}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {content.leaders.map((leader) => (
              <article
                key={leader.name}
                className="group overflow-hidden border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                  <img
                    src={leader.image}
                    alt={`Representative leadership visual for ${leader.name}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="mb-2 inline-block bg-brand-orange px-3 py-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white">
                        {leader.role}
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold text-white">{leader.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="leading-relaxed text-neutral-700">{leader.description}</p>
                </div>
              </article>
            ))}
          </div>

          {content.leadersNote ? (
            <p className="mt-5 text-center text-sm text-neutral-500">{content.leadersNote}</p>
          ) : null}
        </div>
      </Section>

      <Section background="white">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-neutral-900 md:text-4xl">
            {content.certificationsTitle}
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-neutral-600">
            {content.certificationsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {content.certifications.map((certification) => (
            <div
              key={certification}
              className="border border-neutral-200 bg-neutral-50 p-6 text-center"
            >
              <Award className="mx-auto mb-3 text-brand-orange" size={40} />
              <div className="font-semibold text-neutral-900">{certification}</div>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-brand-orange py-16 text-white md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">{content.ctaTitle}</h2>
            <p className="mb-8 text-xl text-white/90">{content.ctaText}</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href={routes.contact}>
                <Button variant="primary" size="lg" className="bg-neutral-900 hover:bg-neutral-800">
                  {content.ctaPrimaryLabel}
                </Button>
              </Link>
              <Link href={routes.products}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white bg-transparent text-white hover:bg-white hover:text-neutral-900 hover:!text-neutral-900"
                >
                  {content.ctaSecondaryLabel}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
