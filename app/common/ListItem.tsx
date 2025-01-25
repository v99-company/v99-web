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
<Card className="flex flex-col md:flex-row items-center space-x-4 border-gray-300 border-2">
  <Link href={`/${id}`} passHref className="w-full md:w-1/4 group p-2">
    <Image
      src={logo}
      alt={company_name}
      width={200}
      height={200}
      unoptimized
      className="rounded-lg object-cover w-full h-48 transition-transform duration-300 ease-in-out group-hover:scale-105"
    />
  </Link>
  <div className="w-full space-y-4 pt-4 px-8">
    <Link href={`/${id}`} className="">
      <h3 className="text-xl font-bold text-red-800 hover:underline">
        {company_name}
      </h3>
    </Link>

    {/* Offers */}
    {offers && <Link href={`/${id}#offers`} className="flex flex-wrap gap-2">
        {offers.map((offer) => (
          <ClientOfferChips key={offer.id} offer={offer} />
        ))}
      </Link>}

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
      <div className='mx-2 lg:mx-8 col-span1 md:col-span-2 lg:col-span-1'>
        <ShareButton id={`${id}`} className='rounded-full px-4 py-2 font-semibold' />
      </div>
    </div>
  </div>

      {/* <div className="w-full flex-1 flex flex-col items-center justify-center">
  <div className="w-full flex flex-col gap-2 mt-8 items-center md:items-end justify-center lg:px-4">
    <div className="w-full sm:w-[300px] md:w-[160px]">
      <Link href={callUrl} target="_blank" rel="noopener noreferrer">
        <Button className="w-full bg-blue-600 hover:bg-blue-300">
          <PhoneCall className="mr-2 h-4 w-4" /> Call Now
        </Button>
      </Link>
    </div>
    <div className="w-full sm:w-[300px] md:w-[160px]">
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <Button className="w-full bg-[#25d366] hover:bg-green-300">
          <FontAwesomeIcon
            icon={faWhatsapp}
            className="mr-2 h-4 w-4 text-white"
          />
          WhatsApp
        </Button>
      </Link>
    </div>
    <div className="w-full sm:w-[300px] md:w-[160px]">
      <ShareButton id={`${id}`} />
    </div>
  </div>
</div> */}

    </Card>
  );
}
