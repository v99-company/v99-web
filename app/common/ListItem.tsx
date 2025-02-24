import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { MessageCircle, PhoneCall, MapPin, Mail } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import ShareButton from '../admin/common/ShareButton';
import { Card } from '@/components/ui/card';
import { Offer } from '../utils/interfaces';
import ClientOfferChips from './ClientOfferChips';

interface ListItemProps {
  id: number;
  logo?: string;
  company_name: string;
  description: string;
  address: string;
  whatsapp: string;
  mobile_number: string;
  email: string;
  pincode: string;
  offers?: Offer[]
}

export const ListItem: React.FC<ListItemProps> = ({
  logo = 'https://via.placeholder.com/150', // Default value for logo
  company_name,
  description,
  address,
  id,
  whatsapp,
  mobile_number,
  email,
  pincode,
  offers
}) => {
  const whatsappUrl = `https://wa.me/${whatsapp}`;
  const callUrl = `tel:${mobile_number}`;
  
  return (
    <Link href={`/${id}`} passHref>
      <Card className="flex flex-col md:flex-row items-center space-x-4 border-gray-300 border-2">
        <div className="w-full md:w-1/4 group p-2">
          <Image
            src={logo}
            alt={company_name}
            width={260}
            height={260}
            unoptimized
            className="rounded-lg object-fill w-full max-h-72 transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="w-full space-y-4 pt-4 px-8">
          <h3 className="text-xl font-bold text-red-800 hover:underline">
            {company_name}
          </h3>

          {/* Offers */}
          {offers && (
            <div className="flex flex-wrap gap-2">
              {offers.map((offer) => (
                <ClientOfferChips key={offer.id} offer={offer} />
              ))}
            </div>
          )}

          <p className="text-gray-600">{description}</p>
          <p className="flex items-start text-gray-700 font-semibold">
            <span className="flex items-start mr-2">
              <MapPin className="h-4 w-4 text-red-500 mt-1" />
            </span>
            <span className="flex flex-col">
              {address} - {pincode}
            </span>
          </p>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pr-4 pb-4 items-center justify-end">
            {mobile_number && (
              <Link
                href={callUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-blue-600 text-white rounded-full px-4 py-2 font-semibold hover:bg-blue-500 transition-colors mx-2 lg:mx-8"
              >
                <PhoneCall className="mr-2 h-5 w-5" />
                <span>{mobile_number}</span>
              </Link>
            )}
            {whatsapp && (
              <Link
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-green-500 text-white rounded-full px-4 py-2 font-semibold hover:bg-green-400 transition-colors mx-2 lg:mx-8"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="mr-2 h-5 w-5" />
                <span>{whatsapp}</span>
              </Link>
            )}
            <div className="mx-2 lg:mx-8 col-span-1 md:col-span-2 lg:col-span-1">
              <ShareButton id={`${id}`} className="rounded-full px-4 py-2 font-semibold" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
