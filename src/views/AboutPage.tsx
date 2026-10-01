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
      <section className="bg-neutral-900 py-14 text-white md:py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-5 inline-block bg-brand-orange/15 px-4 py-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-brand-orange">
                {content.eyebrow}
              </span>
            </div>
            <h1 className="mb-5 text-[2rem] font-bold leading-tight md:text-[2.5rem]">
              {content.pageTitle}
            </h1>
            <p className="text-base leading-relaxed text-neutral-300">{content.heroSubtitle}</p>
          </div>
        </div>
      </section>

      <Section background="white">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-12">
          {content.stats.map((stat) => (
            <div key={stat.value} className="text-center">
              <div className="mb-2 text-3xl font-bold text-brand-orange sm:text-4xl md:text-5xl">
                {stat.value}
              </div>
              <div className="font-medium text-neutral-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section background="gray">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-6 text-[1.875rem] font-bold leading-tight text-neutral-900 md:text-[2.5rem]">
              {content.storyTitle}
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-neutral-700">
              {content.storyParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="relative pb-6 lg:pb-0">
            <div className="overflow-hidden bg-white">
              <img
                src={content.storyImage}
                alt="Clair lighting and electrical products"
                className="block h-auto w-full object-contain"
              />
            </div>
            <div className="absolute bottom-0 left-4 border border-neutral-100 bg-white p-4 shadow-xl md:p-6 lg:-bottom-6 lg:-left-6">
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
        <div className="mb-10 text-center md:mb-16">
          <h2 className="mb-4 text-[1.875rem] font-bold leading-tight text-neutral-900 md:text-[2.5rem]">
            {content.solutionsTitle}
          </h2>
          <p className="mx-auto max-w-3xl text-base text-neutral-600">{content.solutionsSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {content.solutions.map((solution) => {
            const Icon = iconMap[solution.icon] || Lightbulb;

            return (
              <div
                key={solution.title}
                className="overflow-hidden border border-neutral-200 bg-neutral-50 transition-shadow hover:shadow-lg"
              >
                {solution.image ? (
                  <div className="aspect-[16/9] overflow-hidden bg-neutral-200">
                    <img
                      src={solution.image}
                      alt={`${solution.title} by Clair`}
                      className="block h-auto w-full object-contain"
                    />
                  </div>
                ) : null}
                <div className="relative px-6 pb-8 pt-14 text-center md:px-8 md:pb-10 md:pt-16">
                  <div className="absolute -top-10 left-1/2 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full border border-white bg-neutral-50 shadow-sm">
                    <Icon className="text-brand-orange" size={32} />
                  </div>
                  <h3 className="mb-4 text-[1.75rem] font-semibold leading-tight text-neutral-900 md:mb-5 md:text-[2.5rem]">
                    {solution.title}
                  </h3>
                  <p className="leading-relaxed text-neutral-700">{solution.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <section className="bg-neutral-50 py-10 md:py-16">
        <div className="grid items-stretch overflow-hidden lg:grid-cols-[3fr_2fr]">
          <div className="relative min-h-[320px] md:min-h-[420px] lg:min-h-0">
            <img
              src={content.tortekImage}
              alt="Tortek by Clair wires and cables"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col px-4 pt-8 sm:px-8 md:px-10 lg:px-10 lg:pt-0">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-orange md:text-sm">
              {content.tortekEyebrow}
            </p>
            <h2 className="border-b border-neutral-200 pb-6 text-[1.875rem] font-bold leading-[1.1] text-neutral-900 md:text-[2.5rem]">
              {content.tortekTitle}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-neutral-700">
              {content.tortekParagraphs.map((paragraph, index) => (
                <p key={paragraph} className={index === 0 ? 'font-medium text-neutral-800' : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-8 h-1 w-12 bg-brand-orange" />
          </div>
        </div>
      </section>

      <Section background="gray">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10">
              <Target className="text-brand-orange" size={32} />
            </div>
            <h2 className="mb-4 text-[1.875rem] font-bold leading-tight text-neutral-900 md:text-[2.5rem]">{content.missionTitle}</h2>
            <p className="text-base leading-relaxed text-neutral-700">{content.missionText}</p>
          </div>

          <div className="border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10">
              <Sun className="text-brand-orange" size={32} />
            </div>
            <h2 className="mb-4 text-[1.875rem] font-bold leading-tight text-neutral-900 md:text-[2.5rem]">{content.visionTitle}</h2>
            <p className="text-base leading-relaxed text-neutral-700">{content.visionText}</p>
          </div>
        </div>
      </Section>

      <Section background="white">
        <div className="mb-10 text-center md:mb-16">
          <h2 className="mb-4 text-[1.875rem] font-bold leading-tight text-neutral-900 md:text-[2.5rem]">
            {content.valuesTitle}
          </h2>
          <p className="mx-auto max-w-3xl text-base text-neutral-600">{content.valuesSubtitle}</p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-2 md:gap-6 lg:grid-cols-5 [&>*:last-child:nth-child(odd)]:col-span-2 md:[&>*:last-child:nth-child(odd)]:col-span-1 lg:[&>*:last-child:nth-child(odd)]:col-span-1">
          {content.values.map((value) => {
            const Icon = iconMap[value.icon] || Award;

            return (
              <div key={value.title} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/10 md:mb-6 md:h-20 md:w-20">
                  <Icon className="text-brand-orange" size={36} />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-neutral-900 md:mb-3 md:text-xl">{value.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-600 md:text-base">{value.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section background="gray">
        <div>
          <div className="mb-10 max-w-3xl md:mb-14">
            <h2 className="mb-6 text-[1.875rem] font-bold leading-tight text-neutral-900 md:text-[2.5rem]">
              {content.leadersTitle}
            </h2>
            <p className="text-base leading-relaxed text-neutral-600">{content.leadersText}</p>
          </div>

          <div className="space-y-8">
            {content.leaders.map((leader, index) => (
              <article
                key={leader.name}
                className="grid overflow-hidden border border-neutral-200 bg-white md:grid-cols-2"
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden bg-neutral-200 md:aspect-auto ${
                    index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                  }`}
                >
                  <img
                    src={leader.image}
                    alt={`Representative leadership visual for ${leader.name}`}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </div>
                <div
                  className={`flex flex-col justify-center p-6 md:p-12 ${
                    index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                  }`}
                >
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-orange">
                    {leader.role}
                  </p>
                  <h3 className="mb-4 text-[1.75rem] font-bold leading-tight text-neutral-900 md:mb-5 md:text-4xl">{leader.name}</h3>
                  <div className="space-y-4 text-base leading-relaxed">
                    {leader.description.split('\n\n').map((paragraph, paragraphIndex) => (
                      <p
                        key={paragraph}
                        className={
                          paragraphIndex === 0
                            ? 'font-semibold text-brand-orange'
                            : 'text-neutral-700'
                        }
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {content.leadersNote ? (
            <p className="mt-5 text-center text-sm text-neutral-500">{content.leadersNote}</p>
          ) : null}
        </div>
      </Section>

      <section className="relative h-[360px] overflow-hidden md:h-[500px]">
        <img
          src={content.ecosystemImage}
          alt="Clair lighting, solar, wires and cables solutions"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-gradient-to-t from-black/85 via-black/70 to-black/50 backdrop-blur-md">
          <div className="container mx-auto max-w-7xl px-4 py-6 text-center md:px-6 md:py-8 lg:px-8">
            <h2 className="mb-3 text-[1.75rem] font-bold leading-tight text-white md:text-[2.5rem]">
              {content.ecosystemTitle}
            </h2>
            <p className="mx-auto max-w-4xl text-base leading-relaxed text-white/90">
              {content.ecosystemText}
            </p>
          </div>
        </div>
      </section>

      <Section background="white">
        <div className="mb-10 text-center md:mb-16">
          <h2 className="mb-4 text-[1.875rem] font-bold leading-tight text-neutral-900 md:text-[2.5rem]">
            {content.certificationsTitle}
          </h2>
          <p className="mx-auto max-w-3xl text-base text-neutral-600">
            {content.certificationsSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {content.certifications.map((certification) => (
            <div
              key={certification}
              className="border border-neutral-200 bg-neutral-50 p-4 text-center md:p-6"
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
            <h2 className="mb-6 text-[1.875rem] font-bold leading-tight md:text-[2.5rem]">{content.ctaTitle}</h2>
            <p className="mb-8 text-base text-white/90">{content.ctaText}</p>
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
