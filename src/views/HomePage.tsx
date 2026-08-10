'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, TrendingUp, Download, Quote, Star } from 'lucide-react';
import { Section } from '../components/Section';
import { Button } from '../components/Button';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../lib/data';
import { RequestQuotePopup } from '../components/RequestQuotePopup';
import { CataloguePopup } from '../components/CataloguePopup';
import { routes } from '@/lib/routes';
import type { Catalogue, Testimonial } from '@/lib/content-types';
import type { BlogPost } from '@/lib/blog';
import { BlogCard } from '@/components/BlogCard';

interface HomePageProps {
  initialProducts: Product[];
  testimonials: Testimonial[];
  catalogues: Catalogue[];
  blogPosts: BlogPost[];
}

export function HomePage({ initialProducts, testimonials, catalogues, blogPosts }: HomePageProps) {
  const router = useRouter();
  const [quotePopupOpen, setQuotePopupOpen] = useState(false);
  const [cataloguePopupOpen, setCataloguePopupOpen] = useState(false);
  const [selectedProductName, setSelectedProductName] = useState<string>('');

  const products = initialProducts;

  const getCategoryName = (productName: string) => {
    if (productName.includes('Glass')) return 'Commercial';
    if (productName.includes('Dawn')) return 'Industrial';
    if (productName.includes('Track')) return 'Office';
    if (productName.includes('Bulb')) return 'General';
    return 'Decorative';
  };

  return (
    <div>
      <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(30deg,#f5821f_12%,transparent_12.5%,transparent_87%,#f5821f_87.5%,#f5821f),linear-gradient(150deg,#f5821f_12%,transparent_12.5%,transparent_87%,#f5821f_87.5%,#f5821f),linear-gradient(30deg,#f5821f_12%,transparent_12.5%,transparent_87%,#f5821f_87.5%,#f5821f),linear-gradient(150deg,#f5821f_12%,transparent_12.5%,transparent_87%,#f5821f_87.5%,#f5821f)] bg-[length:80px_140px] bg-[position:0_0,0_0,40px_70px,40px_70px]"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="py-20 md:py-32 lg:py-40">
            <div className="max-w-4xl">
              <div className="inline-block mb-6 px-4 py-2 bg-brand-orange/20 border border-brand-orange/30 backdrop-blur-sm">
                <span className="text-brand-orange font-medium text-sm tracking-wide">
                  SINCE 2006 • TRUSTED BY INDUSTRY LEADERS
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up">
                India's Trusted Lighting{' '}
                <span className="text-brand-orange">Manufacturing</span> Partner
              </h1>

              <p className="text-xl md:text-2xl text-neutral-300 mb-8 leading-relaxed max-w-3xl">
                For distributors, retailers, architects, project consultants and OEM buyers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href={routes.products}>
                  <Button
                    variant="primary"
                    size="lg"
                    className="group"
                  >
                    Explore Solutions
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-fit sm:w-auto bg-white/5 border-white/30 text-white hover:bg-white hover:text-neutral-900 hover:!text-neutral-900"
                  onClick={() => setCataloguePopupOpen(true)}
                >
                  Download Catalogue
                </Button>
                <Link href={routes.franchise}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-white/5 border-white/30 text-white hover:bg-white hover:text-neutral-900 hover:!text-neutral-900"
                  >
                    Become a Distributor
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-brand-orange" size={20} />
                  <span>ISO 9001 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-brand-orange" size={20} />
                  <span>50,000+ Installations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-brand-orange" size={20} />
                  <span>In-house R&D and Testing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      <Section background="white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-brand-orange mb-2">20+</div>
            <div className="text-neutral-600 font-medium">Years of Lighting Expertise</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-brand-orange mb-2">50K+</div>
            <div className="text-neutral-600 font-medium">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-brand-orange mb-2">500+</div>
            <div className="text-neutral-600 font-medium">Channel Partners</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-brand-orange mb-2">7M+</div>
            <div className="text-neutral-600 font-medium">Units Annual Manufacturing Capacity</div>
          </div>
        </div>
      </Section>

      <Section background="gray">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900">
              Why Industry Leaders Choose Clair
            </h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              With over 20 years of experience, we've become the preferred lighting partner for businesses that demand excellence, reliability, and innovation.
            </p>

            <div className="space-y-4">
              {[
                'In-house Manufacturing',
                'Automated SMT Production',
                'Dedicated R&D Facility',
                'Pan-India Support Network',
                'Project Design Assistance',
                'Reliable Supply Across India',
                'In-house Quality Testing'
              ].map((item, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    <div className="w-2 h-2 bg-brand-orange rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-neutral-900">{item}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden">
              <img
                src={products[0]?.image_url || '/WELL glass light.webp'}
                alt="Quality lighting"
                className="w-full h-full object-contain p-12"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-xl border border-neutral-100">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-brand-orange" size={32} />
                <div>
                  <div className="text-2xl font-bold text-neutral-900">80%</div>
                  <div className="text-sm text-neutral-600">Energy Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section background="white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
            Industries We Serve
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Trusted lighting solutions across multiple sectors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Residential',
              image: '/industries/residential.png'
            },
            {
              title: 'Commercial',
              image: '/industries/commercial.png'
            },
            {
              title: 'Industrial',
              image: '/industries/industrial.png'
            },
            {
              title: 'Infrastructure',
              image: '/industries/infrastructure.png'
            },
            {
              title: 'Hospitality',
              image: '/industries/hospitality.png'
            }
          ].map((industry, index) => (
            <Link 
              href={routes.products}
              key={index} 
              className="relative group overflow-hidden rounded-xl h-[400px] cursor-pointer block"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${industry.image})` }}
              ></div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white/70 text-[10px] font-semibold tracking-[0.2em] mb-1.5 uppercase">
                      / Industry
                    </p>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                      {industry.title}
                    </h3>
                  </div>
                  
                  <div className="w-10 h-10 flex-shrink-0 ml-4 rounded-full bg-[#f26c4f] flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <ArrowRight className="text-white" size={18} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section background="gray">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-neutral-900">
            Featured Products
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Discover our premium range of lighting solutions designed for performance, efficiency, and longevity.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-neutral-200 animate-pulse h-96 rounded"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      name={product.name}
                      shortDescription={product.short_description || product.description.substring(0, 100) + '...'}
                      imageUrl={product.image_url}
                      category={getCategoryName(product.name)}
                      slug={product.slug}
                      onRequestQuote={() => {
                        setSelectedProductName(product.name);
                        setQuotePopupOpen(true);
                      }}
                    />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href={routes.products}>
            <Button
              variant="secondary"
              size="lg"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </Section>


      <Section background="white">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-neutral-900">
            Dealer Network
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Trusted by leading dealers and distributors across India
          </p>
        </div>

        <div className="relative overflow-hidden py-10 w-[100vw] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marquee-reverse {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0); }
            }
            .animate-marquee {
              animation: marquee 35s linear infinite;
              display: flex;
              width: max-content;
            }
            .animate-marquee-reverse {
              animation: marquee-reverse 35s linear infinite;
              display: flex;
              width: max-content;
            }
            .animate-marquee:hover, .animate-marquee-reverse:hover {
              animation-play-state: paused;
            }
          `}} />

          {[
            // Row 1
            ["dom_ACME Solar logo.png","dom_Clariant_logo.jpeg","dom_evercrest_projects_logo.jpeg","dom_Greenko-logo.jpg","dom_India Glycols Ltd.jpg","dom_Maheshwari Mining Logo.png","dom_NPCL logo.png","dom_Renew Power Logo.png","dom_Tata Power Logo.png","exp_Airtel Africa logo.jpg","exp_IET Logo.jpeg","exp_Nam-Theun-2 logo.png","exp_Royal Power Logo.avif","exp_sompower Logo.png","Picture1.png","Picture13.png","Picture17.png","Picture20.png","Picture24.png","Picture28.png","Picture31.png","Picture5.png","Picture9.png"],
            // Row 2
            ["dom_Amplus Solar.webp","dom_DCM Logo.png","dom_Flovel logo.jpg","dom_H&M-Logo.jpg","dom_jkumar logo.png","dom_Moglix Logo.png","dom_OMC Power.jpg","dom_SK-Khetan-Logo.png","dom_tectural logo.avif","exp_chilime seti logo.png","exp_Infra International DMCC.jpg","exp_neoEast-logo.png","exp_Rusoma Falls Logo.png","exp_Spiro logo.png","Picture10.png","Picture14.png","Picture18.png","Picture21.png","Picture25.png","Picture29.png","Picture32.png","Picture6.png"],
            // Row 3
            ["dom_Andritz Hydro.jpg","dom_DE Logo.jpeg","dom_GE Vernova.png","dom_HZL_Logo.png","dom_JSPL Logo.png","dom_Motorola logo.png","dom_Pentaflo logo.png","dom_SRF Logo.png","dom_Vedanta Logo.png","exp_Fabrimetal Senegal Logo.png","exp_Jindal Logo.jpeg","exp_NT1PC logo.png","exp_Rusomo Power Logo.png","exp_TCI Sanmar Logo.png","Picture11.png","Picture15.png","Picture19.png","Picture22.png","Picture26.png","Picture3.png","Picture33.png","Picture7.png"],
            // Row 4
            ["dom_Angelique International logo.png","dom_Dilip Buildcon Limited Logo.png","dom_Gentari Renewables.webp","dom_IMFA Logo.png","dom_JSW Logo.jpg","dom_Nelion Export logo.jpg","dom_Protonix-Logo-1024x262.png","dom_Sunflag Steel.png","dom_Ztric Logo.jpg","exp_Fura Gems Logo.png","exp_Keryas Paper Logo.webp","exp_Rawabi_Logo.png","exp_Rwanda Agriculture board.jpg","exp_The Phongsubthavy logo.png","Picture12.png","Picture16.png","Picture2.png","Picture23.png","Picture27.jpg","Picture30.png","Picture4.png","Picture8.png"]
          ].map((row, rowIndex) => (
            <div key={rowIndex} className="flex mb-8 overflow-hidden w-full">
              <div className={`flex gap-16 items-center px-8 ${rowIndex % 2 === 0 ? 'animate-marquee' : 'animate-marquee-reverse'}`}>
                {/* Double the row items for seamless looping */}
                {[...row, ...row].map((logo, index) => (
                  <div key={index} className="flex-shrink-0 w-32 h-24 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <img 
                      src={`/dealers/${logo}`} 
                      alt="Dealer Logo" 
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>


      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-gradient-to-br from-brand-orange to-brand-orange-dark text-white p-12 rounded-lg">
            <Download className="mb-6" size={48} />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Download Product Catalogue
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Explore our complete range of lighting solutions with detailed specifications, applications, and technical data.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Complete product specifications',
                'Technical drawings and dimensions',
                'Installation guidelines',
                'Energy efficiency data',
                'Application examples'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              size="lg"
              className="bg-white border-white text-brand-orange hover:bg-brand-orange hover:text-white hover:border-brand-orange shadow-lg"
              onClick={() => setCataloguePopupOpen(true)}
            >
              <Download className="mr-2" size={20} />
              Download Catalogue (PDF)
            </Button>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-neutral-900">What's Inside?</h3>
            <div className="space-y-4">
              {[
                {
                  title: 'Product Categories',
                  description: 'Browse through Commercial, Industrial, Office, General, and Decorative lighting solutions'
                },
                {
                  title: 'Technical Specifications',
                  description: 'Detailed electrical, photometric, and dimensional data for all products'
                },
                {
                  title: 'Installation Guides',
                  description: 'Step-by-step instructions with diagrams for proper installation'
                },
                {
                  title: 'Case Studies',
                  description: 'Real-world applications and success stories from various industries'
                }
              ].map((item, index) => (
                <div key={index} className="border-l-4 border-brand-orange pl-4 py-2">
                  <h4 className="font-semibold text-neutral-900 mb-1">{item.title}</h4>
                  <p className="text-neutral-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {blogPosts.length > 0 && (
        <Section background="gray">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-3 font-semibold uppercase tracking-[0.18em] text-brand-orange">Clair Insights</p>
              <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl">Latest lighting guides</h2>
              <p className="mt-3 max-w-2xl text-lg text-neutral-600">Practical thinking to help you plan efficient, comfortable and dependable lighting.</p>
            </div>
            <Link href={routes.blog} className="inline-flex items-center gap-2 font-semibold text-brand-orange">View all articles <ArrowRight size={18} /></Link>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => <BlogCard key={post.id} post={post} />)}
          </div>
        </Section>
      )}

      <Section background="gray">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900">
            What Our Clients Say
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Trusted by leading organizations across industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 border border-neutral-200 shadow-sm">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="text-brand-orange fill-brand-orange" size={18} />
                ))}
              </div>
              <Quote className="text-brand-orange/20 mb-4" size={32} />
              <p className="text-neutral-700 mb-6 leading-relaxed">{testimonial.content}</p>
              <div className="border-t border-neutral-200 pt-4">
                <div className="font-semibold text-neutral-900">{testimonial.name}</div>
                <div className="text-sm text-neutral-600">{testimonial.title}</div>
                <div className="text-sm text-brand-orange">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section background="dark" className="!pb-8 md:!pb-12">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-neutral-400 mb-8">
            Get in touch with our lighting experts for a customized solution tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={routes.contact}>
              <Button
                variant="primary"
                size="lg"
              >
                Request a Quote
              </Button>
            </Link>
            <Link href={routes.catalogue}>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white/30 text-white hover:bg-white hover:text-neutral-900"
              >
                Browse Catalog
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      <RequestQuotePopup
        isOpen={quotePopupOpen}
        onClose={() => setQuotePopupOpen(false)}
        productName={selectedProductName}
      />
      <CataloguePopup
        isOpen={cataloguePopupOpen}
        onClose={() => setCataloguePopupOpen(false)}
        catalogues={catalogues}
        onBrowseFull={() => {
          setCataloguePopupOpen(false);
          router.push(routes.catalogue);
        }}
      />
    </div>
  );
}
