import { Metadata } from 'next'
import { Heart, Truck, DollarSign, Phone, Mail, MapPin, ChevronRight, Star, Clock, Shield, Zap, PhoneIcon as WhatsApp, Users } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import Image from 'next/image'
import Navbar from '../common/Navbar'
import TeluguDescriptionSection from '../common/TeluguDescriptionSection'

export const metadata: Metadata = {
  title: 'About Us | V99',
  description: 'Build your brand’s online presence easily and affordably with V99.',
}

const IconButton = ({ icon: Icon, text, href }: { icon: any, text: string, href: string }) => (
  <Button asChild className="bg-gray-900 text-white hover:bg-blue-700">
    <Link href={href} className="inline-flex items-center space-x-2">
      <Icon className="w-5 h-5" />
      <span>{text}</span>
    </Link>
  </Button>
)

const Feature = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex items-start space-x-4">
    <div className="bg-blue-100 p-3 rounded-full">
      <Icon className="w-6 h-6 text-gray-900" />
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-900">{description}</p>
    </div>
  </div>
)

const LocationCard = ({ src, title, address }: { src: string; title: string; address: string }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <iframe
        src={src}
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <p className="mt-2">{address}</p>
    </CardContent>
  </Card>
);




export default function AboutUsPage() {
  const companyInfo = {
    name: "V99",
    phone: "8688520059",
    email: "v99india@gmail.com",
    address2: "Ayaan Kitchen B-22, Beside Metalica Steel Factory, Balanagar Industrial Area Sanathnagar, Hyderabad - 500018, Telangana, India",
    whatsapp: "8688520059",
  };

  const locations = [
    {
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3808.903509244322!2d78.46392807580204!3d17.320204104735875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbbdd6b6f6b66b%3A0xf9499fac078687fd!2sA1%20Kitchen!5e0!3m2!1sen!2sin!4v1737820504800!5m2!1sen!2sin",
      title: "Bandlaguda Office",
      address: "8-4-122/21, Palace view colony, East Bandla GudaOpp RTA Office Chandrayangutta Hyderabad, Telangana 500005",
    },
    {
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.9794030952553!2d78.44034797580413!3d17.460699900687743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96f87b6dbb4d%3A0xccddcd1e54b89cd0!2sAyaan%20Kitchen!5e0!3m2!1sen!2sin!4v1736519692896!5m2!1sen!2sin",
      title: "Sanathnager Office",
      address: "Ayaan Kitchen B-22, Beside Metalica Steel Factory, Balanagar Industrial Area Sanathnagar, Hyderabad - 500018, Telangana, India",
    },
  ];
  
    return (
      <div className="min-h-screen bg-gray-50">
          <Navbar />
        <header className="bg-lime-500 text-white py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About {companyInfo.name}
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Build your brands online presence easily and affordably with V99.
            </p>
          </div>
        </header>

        <section>
          <TeluguDescriptionSection />
        </section>
  
        <main className="container mx-auto px-4 py-12 space-y-20">
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center text-[rgb(55,65,81)] !important">
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-900 mb-6">
                  At {companyInfo.name}, we are revolutionizing the way local businesses and service providers connect with their communities. Our platform is designed to make it easy for users to discover and engage with nearby businesses and service providers in just a few clicks. 

Our Mission
                </p>
              </CardContent>
            </Card>
          </section>
  
          <section>
            <h2 className="text-3xl font-bold text-center text-[rgb(55,65,81)] !important mb-8">
              Our Mission
            </h2>
  
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-4">
                    <Heart className="w-8 h-8 text-gray-900" />
                    <span>V99 For You</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-900 mb-4">
                  We list local businesses and service providers on a single, user-friendly platform, allowing users to effortlessly find what they need in their area. Whether you're looking for a cozy café, a reliable plumber, or a skilled photographer, V99 has you covered.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-4">
                    <DollarSign className="w-8 h-8 text-gray-900" />
                    <span>Our Specialty</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-900 mb-4">
                  What sets us apart is our unique approach to showcasing each business. Every local business or service provider gets their very own dedicated page — a comprehensive, all-in-one profile that highlights everything about them. This personalized page can be easily shared with anyone via a simple, memorable link like v99.in/23444, where the 5-digit code serves as their unique identifier. 

With V99, finding and promoting local businesses has never been easier or more efficient. Join us in supporting your local community and discovering the best services right at your fingertips! 
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="p-6 bg-gray-100">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-4">
            <Users className="w-8 h-8 text-gray-900" />
            <span>Freelancers & Students Wanted</span>
          </CardTitle>
          <CardDescription className="text-gray-700 mb-4">
            Help us onboard local businesses and service providers in your area!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p>
            Are you a student or freelancer looking for an exciting opportunity to earn while making a difference? Join V99 today and help us connect local businesses and service providers with their communities across India.
          </p>
          <p>
            We are seeking passionate individuals like you who can help us onboard local businesses and service providers in all states and union territories:
          </p>
          <ul className="list-disc pl-5">
            <li>Andaman & Nicobar Islands</li>
            <li>Andhra Pradesh</li>
            <li>Arunachal Pradesh</li>
            <li>Assam</li>
            <li>Bihar</li>
            <li>Chandigarh</li>
            <li>Chhattisgarh</li>
            <li>Dadra & Nagar Haveli</li>
            <li>Daman & Diu</li>
            <li>Delhi</li>
            <li>Goa</li>
            <li>Gujarat</li>
            <li>Haryana</li>
            <li>Himachal Pradesh</li>
            <li>Jammu & Kashmir</li>
            <li>Jharkhand</li>
            <li>Karnataka</li>
            <li>Kerala</li>
            <li>Lakshadweep</li>
            <li>Madhya Pradesh</li>
            <li>Maharashtra</li>
            <li>Manipur</li>
            <li>Nagaland</li>
            <li>Odisha</li>
            <li>Pondicherry</li>
            <li>Punjab</li>
            <li>Rajasthan</li>
            <li>Sikkim</li>
            <li>Tamil Nadu</li>
            <li>Telangana</li>
            <li>Tripura</li>
            <li>Uttar Pradesh</li>
            <li>Uttarakhand</li>
            <li>West Bengal</li>
          </ul>
          <p>
            By joining V99, you'll have the chance to earn attractive incentives and build valuable experience. Whether you're looking to supplement your income or kickstart your career, this is your opportunity to shine.
          </p>
          <p>
            Ready to make an impact? Sign up now and start earning today!
          </p>
        </CardContent>
      </Card>
    </section>
  
{/*          
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center text-[rgb(55,65,81)] !important">
                  Testimonials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="text-lg text-gray-900 italic mb-4">
                  {companyInfo.name} Provided Exceptional Service During A Difficult Time. Their Team Was Respectful, Professional, And Compassionate.
                </blockquote>
                <p className="text-right font-semibold">Clients</p>
              </CardContent>
            </Card>
          </section> */}
  
          {/* <section>
            <h2 className="text-3xl font-bold text-center mb-8 text-[rgb(55,65,81)] !important">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>What Is The Rental Period For The Freezer Box?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-900">
                    Our Standard Rental Period Is [Insert Time Frame], But We Can Accommodate Longer Or Shorter Rentals As Needed.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>How Do I Request A Freezer Box?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-900">
                    Simply Call Us At {companyInfo.phone} Or Fill Out Our Online Request Form.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Do You Offer Any Discounts?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-900">
                    Yes, We Offer Discounts For Long-Term Rentals And For Families In Need.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
   */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-8 text-[rgb(55,65,81)] !important">
              Our Locations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {locations.map((location, index) => (
                <LocationCard key={index} {...location} />
              ))}
            </div>
          </section>
        </main>
      </div>
    );
}
