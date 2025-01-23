import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, MapPin, Phone, PhoneCall } from 'lucide-react'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from '../common/Navbar'

const page = () => {
  const companyInfo = {
    name: "V99",
    phone: "8688520059",
    email: "v99india@gmail.com",
    address2: "Ayaan Kitchen B-22, Beside Metalica Steel Factory, Balanagar Industrial Area Sanathnagar, Hyderabad - 500018, Telangana, India",
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

  return (
    <div>
 <Navbar bgColor='bg-teal-800'/>
    <div className="p-5 mt-8">
      <Card className="shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-300">
          {/* Contact Us Section */}
          <div className="p-8">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-teal-800">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-teal-800 mb-6">
                Get in touch with us today to learn more about V99 and make your own online business page.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-4">
                  <Phone className="w-6 h-6 text-teal-800" />
                  <span className="text-teal-800">{companyInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="w-6 h-6 text-teal-800" />
                  <span className="text-teal-800">{companyInfo.email}</span>
                </div>
                <p className="flex items-start text-teal-800 ">
                    <span className="flex items-start mr-2 font-semibold">
                      <MapPin className="h-6 w-6 mt-1" />
                    </span>
                    <span className="flex flex-col">
                      {companyInfo.address2}
                    </span>
                  </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href={`tel:${companyInfo.phone}`} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-300">
                    <PhoneCall className="mr-2 h-4 w-4" /> Call Now
                  </Button>
                </Link>
                <Link href={`https://wa.me/${companyInfo.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-[#25d366] hover:bg-green-300">
                    <FontAwesomeIcon icon={faWhatsapp} className="mr-2 h-4 w-4 text-white" />
                    WhatsApp
                  </Button>
                </Link>
              </div>
            </CardContent>
          </div>

          {/* Get in Touch Section */}
          <div className="p-8 bg-gray-50">
            <h2 className="text-2xl font-semibold mb-4 text-teal-800">Get in Touch</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1 text-gray-700">Name</label>
                <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-600" required />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 text-gray-700">Email</label>
                <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-600" required />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-1 text-gray-700">Phone</label>
                <input type="tel" id="phone" name="phone" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-600" required />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1 text-gray-700">Message</label>
                <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-600" required></textarea>
              </div>
              <button type="submit" className="bg-teal-600 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out hover:bg-gray-700">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Card>
    </div>
    <Card className="p-8 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-8 text-teal-800 !important">Our Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((location, index) => (
              <LocationCard key={index} {...location} />
            ))}
          </div>
        </Card>
    </div>
     
  )
}

export default page
