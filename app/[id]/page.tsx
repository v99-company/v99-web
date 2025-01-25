"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  PhoneIcon as WhatsappIcon, Facebook, Twitter, Instagram, Youtube, MapPin,
  //  Mail, Phone,
  User,
  Mail,
  Phone,
  PhoneCall,
  Building
} from 'lucide-react'
import Navbar from '../common/Navbar'
import Link from 'next/link'
import { IMAGE_FILES_URL } from '../utils/strings'
import ShareButton from '../admin/common/ShareButton'
import DetailPageSkeleton from './DetailPageSkeleton'
import { Client } from '../utils/interfaces'
import ClientOffers from '../common/ClientOffers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import ImageGallerySlideshow from '../common/ImageGallerySlideshow'

export default function DetailsPage() {
  const params = useParams()
  const [item, setItem] = useState<Client | undefined>(undefined)

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleClose = () => setSelectedImage(null);

  useEffect(() => {

    async function fetchClientData() {
      try {
        // Make the API call to fetch client data
        const response = await fetch(`/api/client/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch client data');
        }

        const res = await response.json();
        const clientData = res.data;

        // console.log("Client Data: ", clientData);
        setItem(clientData);

      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    }
    fetchClientData();

  }, [params.id])


  return (
    <div className="min-h-screen bg-gray-100">
      <div className='bg-white'>
        <Navbar showSearch={true}/>
      </div>
      {!item ? <DetailPageSkeleton /> : 
      ( 
      <main className="container mx-auto px-4 pt-4 pb-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header Image */}
          <div className="relative h-64 md:h-96">
            <Image
              src={item.logo}
              alt={item.company_name}
              layout="fill"
              objectFit="cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-8">{item.company_name}</h1>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* First Column */}
            <div className="w-full md:w-2/3 p-8">


              <div className="prose max-w-none">
                <h2 className="text-2xl font-semibold mb-4">About Us</h2>
                <p className="text-gray-600 mb-6">{item.full_description}</p>
              </div>
              {item.offers && <div id='offers'>
                <ClientOffers offers={item.offers} />
              </div>}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <p className="flex items-center text-black">
                    <Building className="mr-2  text-red-600" />{item.company_name}</p>
                  <p className="flex items-center text-black">
                    <User className="mr-2 text-red-600" />{item.contact_person}</p>
                  <p className="flex items-start text-gray-700 ">
                    <span className="flex items-start mr-2 text-gray-400 font-semibold">
                      <MapPin className="h-6 w-6 mt-1  text-red-600" />
                    </span>
                    <span className="flex flex-col text-black">
                      {item.address} - {item.pincode}
                    </span>
                  </p>
                  {item.email && <p className="flex items-center text-black"><Mail className="mr-2  text-red-600" /> {item.email}</p>}
                  {item.mobile_number && <p className="flex items-center text-black"><Phone className="mr-2  text-red-600" /> {item.mobile_number}</p>}
                  {item.whatsapp && <p className="flex items-center text-black"><FontAwesomeIcon icon={faWhatsapp} className="mr-2 h-6 w-6 text-red-600" /> {item.whatsapp}</p>}
                  {/* <p className="flex items-center"><div className="mr-2 text-gray-400" /> {item.} (Alternate)</p> */}
                </div>
              </div>

              {/* Image Gallery */}
              <ImageGallerySlideshow
                images={item.images} 
                IMAGE_FILES_URL={IMAGE_FILES_URL} 
              />
              {/* <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4 text-red-800">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {item.images.map((img, index) => (
                    <Image
                      key={index}
                      src={`${IMAGE_FILES_URL}/${img.trim()}`}
                      alt={`Gallery image ${index + 1}`}
                      width={200}
                      height={200}
                      className="rounded-lg object-cover w-full h-48 transition-transform duration-300 hover:scale-105 cursor-pointer"
                      onClick={() => setSelectedImage(`${IMAGE_FILES_URL}/${img.trim()}`)}
                    />
                  ))}
                </div>
              </div> */}
              {/* Fullscreen Viewer */}
              {/* {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                  <div className="relative">
                    <button
                      onClick={handleClose}
                      className="absolute top-4 right-4 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75"
                    >
                      ×
                    </button>
                    <Image
                      src={selectedImage}
                      alt="Fullscreen view"
                      width={800}
                      height={600}
                      className="rounded-lg object-contain max-w-full max-h-screen"
                    />
                  </div>
                </div>
              )} */}

              
            </div>

            {/* Second Column */}
            <div className="w-full md:w-1/3 p-8 bg-gray-50">
              <div className="sticky top-8">
              <div className="flex justify-center space-x-4 mb-6">
                {item?.youtube && <Link href={item?.youtube} target="_blank" rel="noopener noreferrer">
                    <Youtube className="text-red-600 cursor-pointer hover:text-red-800 transition-colors duration-300" />
                </Link>}
                {item?.instagram && <Link href={item?.instagram} target="_blank" rel="noopener noreferrer">
                    <Instagram className="text-pink-600 cursor-pointer hover:text-pink-800 transition-colors duration-300" />
                </Link>}
                {item?.facebook && <Link href={item?.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="text-blue-600 cursor-pointer hover:text-blue-800 transition-colors duration-300" />
                </Link>}
                {item?.twitter && <Link href={item?.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="text-red-600 cursor-pointer hover:text-blue-600 transition-colors duration-300" />
                </Link>}
            </div>
                {/* <div className='flex flex-col gap-4'>
                <Link href={`tel:${item?.mobile_number}`} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-blue-600 hover:bg-blue-300">
                    <PhoneCall className="mr-2 h-4 w-4" /> Call Now
                  </Button>
                </Link>
                <Link href={`https://wa.me/${item.whatsapp}`} target='_blank'>
                  <Button className="w-full bg-green-500 hover:bg-green-600 transition-colors duration-300">
                    <WhatsappIcon className="mr-2 h-4 w-4" /> Contact on WhatsApp
                  </Button>
                </Link>
                <ShareButton id={`${item.id}`} />
                </div> */}

                <div className='flex flex-col gap-4'>
                  {item?.mobile_number && (
                    <Link href={`tel:${item?.mobile_number}`} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-blue-600 text-white rounded-full px-4 py-2 font-semibold hover:bg-blue-500 transition-colors mx-2 lg:mx-8"
                    >
                      <PhoneCall className="mr-2 h-5 w-5" />
                      <span>{item.mobile_number}</span>
                    </Link>
                  )}
                  {item?.whatsapp && (
                    <Link href={`https://wa.me/${item.whatsapp}`} target='_blank'
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-green-500 text-white rounded-full px-4 py-2 font-semibold hover:bg-green-400 transition-colors mx-2 lg:mx-8"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} className="mr-2 h-5 w-5" />
                      <span>{item.whatsapp}</span>
                    </Link>
                  )}
                  <div className='mx-2 lg:mx-8 col-span1 md:col-span-2 lg:col-span-1'>
                    <ShareButton id={`${item.id}`} className='rounded-full px-4 py-2 font-semibold' />
                  </div>
                </div>
                

                {item.yt_video && (
                  <div>
                    {item.yt_video &&
                      <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-2 text-red-800">Watch Our Video</h3>
                        <div className="relative pb-[56.25%] h-0">
                          <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-lg"
                            src={item.yt_video.trim()}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    }
                  </div>
                )}

                <div className="pt-6">
                  <h3 className="text-xl font-semibold mb-2 text-red-800">Find Us</h3>
                  <div className="relative pb-[56.25%] h-0">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full rounded-lg"
                      src={item.gmap}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )}
    </div>
  )
}
