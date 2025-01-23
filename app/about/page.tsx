import { Metadata } from 'next'
import { Heart, Truck, DollarSign, Phone, Mail, MapPin, ChevronRight, Star, Clock, Shield, Zap, PhoneIcon as WhatsApp, Users } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import Image from 'next/image'
import Navbar from '../common/Navbar'

export const metadata: Metadata = {
  title: 'About Us | V99',
  description: 'Learn about our mission to provide dignified and hygienic mortuary services across India.',
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
      email: "mortuarybox@gmail.com",
      address: "Dead Body Freezer Box ManufacturersSouth Zone 8-4-122/21, Palace view colony, East Bandla GudaOpp RTA Office Chandrayangutta Hyderabad, Telangana 500005 India",
      whatsapp: "8688520059",
    };
  
    const locations = [
      {
        src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.3139680325974!2d78.46469701477557!3d17.31979141309881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbbd4e52462f2b%3A0xc8ff7db57d31720b!2sMortuary%20Dead%20Body%20Freezer%20Box%20Manufacturers!5e0!3m2!1sen!2sin!4v1600000000000",
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
        <div className="bg-gray-900 pb-4">
          <Navbar />
        </div>
        <header className="bg-gray-900 text-white py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About {companyInfo.name}
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Providing Dignified And Hygienic Mortuary Services Across India
            </p>
          </div>
        </header>
  
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
                  At {companyInfo.name}, We Understand The Importance Of Treating The Deceased With Dignity And Respect. Our Mission Is To Provide A Dignified And Hygienic Way To Store The Deceased, While Also Supporting Families During Their Time Of Grief. We Offer Mortuary Dead Body Freezer Box Rentals And Free Services Across India.
                </p>
              </CardContent>
            </Card>
          </section>
  
          <section>
            <h2 className="text-3xl font-bold text-center text-[rgb(55,65,81)] !important mb-8">
              Our Services
            </h2>
  
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-4">
                    <Heart className="w-8 h-8 text-gray-900" />
                    <span>Mortuary Dead Body Freezer Box Rentals</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-900 mb-4">
                    We Provide Clean, Hygienic, And Well-Maintained Freezer Boxes For Rent. Our Boxes Are Designed To Maintain A Consistent Temperature, Ensuring The Dignity Of The Deceased.
                  </p>
                </CardContent>
                <CardFooter>
                  <IconButton icon={ChevronRight} text="Rent Now" href="/" />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-4">
                    <DollarSign className="w-8 h-8 text-gray-900" />
                    <span>Free Mortuary Services</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-900 mb-4">
                    We Offer Free Mortuary Services To Those In Need. Our Team Will Work With You To Ensure The Deceased Is Treated With Respect And Dignity.
                  </p>
                </CardContent>
                <CardFooter>
                  <IconButton icon={ChevronRight} text="Learn More" href="/" />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-4">
                    <Truck className="w-8 h-8 text-gray-900" />
                    <span>Home Delivery And Pickup</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-900 mb-4">
                    We Offer Convenient Home Delivery And Pickup Services For Our Freezer Boxes, Ensuring Minimal Disruption To Your Family.
                  </p>
                </CardContent>
                <CardFooter>
                  <IconButton icon={ChevronRight} text="Schedule Service" href="/" />
                </CardFooter>
              </Card>
            </div>
          </section>

          <section>
            <Card>
            <CardHeader>
            <CardTitle className="flex items-center space-x-4">
                <Users className="w-8 h-8 text-gray-900" />
                <span>Dealers Required</span>
              </CardTitle>
              <CardDescription className="text-gray-700 mb-4">Mortuary Freezer Box Dealers Require Pan India </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>Wanted Dealers, Distributors, Resellers, Freelancers Required All India States Andaman & Nicobar Islands, Andhra Pradesh, Arunachal Pradesh, Assam, Bihar, Chandigarh, Chhattisgarh, Dadra & Nagar Haveli, Daman & Diu, Delhi, Goa, Gujarat, Haryana, Himachal Pradesh, Jammu & Kashmir, Jharkhand, Karnataka, Kerala, Lakshawdeep, Madhya Pradesh, Maharashtra, Manipur, Nagaland, Orissa, Odisha, Pondicherry, Punjab, Rajasthan, Sikkim, Tamil Nadu, Telangana, Tripura, Uttar Pradesh, Uttarakhand, West Bengal.</p>
            </CardContent>
            </Card>
        </section>
  
          <section>
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center text-[rgb(55,65,81)] !important">
                  Why Choose Us?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Feature
                  icon={Star}
                  title="Dignified And Respectful"
                  description="We Treat The Deceased With Dignity And Respect, Ensuring They Are Handled With Care."
                />
                <Feature
                  icon={Shield}
                  title="Hygienic And Clean"
                  description="Our Freezer Boxes Are Regularly Cleaned And Disinfected To Ensure A Hygienic Environment."
                />
                <Feature
                  icon={Clock}
                  title="Convenient And Affordable"
                  description="We Offer Competitive Pricing And Convenient Home Delivery And Pickup Services."
                />
                <Feature
                  icon={Zap}
                  title="24/7 Support"
                  description="Our Team Is Available Round The Clock To Assist You In Your Time Of Need."
                />
              </CardContent>
            </Card>
          </section>
  
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
          </section>
  
          <section>
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
