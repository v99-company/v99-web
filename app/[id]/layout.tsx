// app/[id]/layout.tsx
import { Metadata } from 'next';
// import { ClientProvider } from '../context/ClientContext';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params; // Await the params promise to get the actual id
  console.log("ID:", id);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  console.log("Base URL:", baseUrl);
  try {
    // Make the API call to fetch client data
    const response = await fetch(`${baseUrl}/api/client/${id}`);
    console.log("Response: ", response.status);
    const data = await response.json();
    console.log("Response DATA: ", data);
    if (response.status !== 200) {
      throw new Error('Failed to fetch client data');
    }
        
    const clientData = data.data;
    console.log("Client Data: ", clientData);

    const {company_name, description, email, mobileNumber } = clientData;

    // Return the metadata with the fetched data
    return {
      title: `${company_name} - V99`,
      description: `${description} Contact us at ${email} or call ${mobileNumber}.`,
    };

  } catch (error) {
    console.error("Error fetching client data:", error);

    // Return fallback metadata in case of error
    return {
      title: "V99 - Go Online with us",
      description: "Create your online presence easily and grow your business.",
    };
  }
}


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* <ClientProvider> */}
      {children}
      {/* </ClientProvider> */}

    </div>
  );
};

export default Layout;
