import { Metadata } from 'next'
import { Heart, Truck, DollarSign, Phone, Mail, MapPin, ChevronRight, Star, Clock, Shield, Zap, PhoneIcon as WhatsApp, Users } from 'lucide-react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@/components/ui/card"
import Image from 'next/image'
import Navbar from '../common/Navbar'
import TeluguDescriptionSection from '../common/TeluguDescriptionSection'

export const metadata: Metadata = {
  title: 'About Us | V99 Near by Locator',
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
    name: "V99 Near by Locator",
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
          <Navbar className="sticky top-0 z-50 bg-white shadow-md py-4" showSearch={false} showLogo={false} />
        <header className="w-full bg-gray-700 text-white py-4 md:py-20 flex items-center justify-center">
        <Link href="/" className="">
          <Image src="/v99logo.png" alt="Logo" width={300} height={300} className={`rounded-md `} />
        </Link>

          <div className="px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About {companyInfo.name}
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Build Your Brands Online Presence Easily And Affordably With V99 Near by Locator.
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
                At {companyInfo.name}, We Are Revolutionizing The Way Local Businesses And Service Providers Connect With Their Communities. Our Platform Is Designed To Make It Easy For Users To Discover And Engage With Near by Businesses And Service Providers In Just A Few Clicks. 
                V99—Your Online Digital Directory. V99 India Is An Online Digital Directory—A Place For Small, Medium, And Micro Business Operators, Service Providers, And Professionals To Display Their Identities Online. Mechanics, Plumbers, Electricians, Small Traders, And Professionals Like Lawyers And Document Writers Can Enroll Their Professions On ODD, A Platform That Takes You Close To Customers Who Are Looking For Any Services. V-99 Customers Can Locate You Quickly Online And Approach You Easily As We Display A Wide Range Of Products, Services, Professionals, And Catalogs Online.
                
                What We Do? V-99 Is An Online Digital Directory (ODD) That Aims To Publish Local Businesses, Traders, Professionals, And Service Providers Online. Customers Can Quickly Search For Services They Are Looking For By Typing Their Location And Requirements, Such As Car Mechanics Or Electricians As Keywords. V-99 Displays All The Registered Professionals Or Service Providers With Their Mobile Numbers, As We Maintain Their Complete Profiles. V-99 Is The Online Digital Directory For Local Professionals To Make Their Online Presence Easy At An Affordable Price.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="p-6 bg-gray-100">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-4">
                <Users className="w-8 h-8 text-gray-900" />
                <span>Freelancers & Students Wanted</span>
              </CardTitle>
              <CardDescription className="text-gray-700 mb-4">
                Help Us Onboard Local Businesses And Service Providers In Your Area!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p>
                Are You A Student Or Freelancer Looking For An Exciting Opportunity To Earn While Making A Difference? Join V99 Near by Locator Today And Help Us Connect Local Businesses And Service Providers With Their Communities Across India.
              </p>
              <p>
                We Are Seeking Passionate Individuals Like You Who Can Help Us Onboard Local Businesses And Service Providers In All States And Union Territories:
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
                By Joining V99 Near by Locator, You'll Have The Chance To Earn Attractive Incentives And Build Valuable Experience. Whether You're Looking To Supplement Your Income Or Kickstart Your Career, This Is Your Opportunity To Shine.
              </p>
              <p>
                Ready To Make An Impact? Sign Up Now And Start Earning Today!
              </p>
            </CardContent>
          </Card>
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


// test 6