"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";

import { any, z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Calendar, Check, ListOrdered, Text, X } from "lucide-react";
import { Client } from "@/app/utils/interfaces";
import { Textarea } from "@/components/ui/textarea";
import { FileUploader } from "../common/FileUploader";
import { EditPreview } from "../common/EditPreview";
import { IMAGE_FILES_URL } from "@/app/utils/strings";
import { FileHandler } from "../common/FileHandler";
import { SuccessPage } from "../common/SuccessPage";
import { statesAndCities } from "@/app/utils/places";
import GoogleMapsEmbed from "../common/GoogleMapsEmbed";
// import { format } from "date-fns";

const formSchema = z.object({
  // id: z.string().min(5, { message: "Id should be any 5 digit number. Example: 12345" }),
  id: z.string().optional(),
  company_name: z.string().min(1, { message: "Company Name cannot be empty." }),
  description: z.string().optional(),
  full_description: z
    .string()
    .min(10, { message: "Full Description must be at least 10 characters." }),
  address: z.string().min(1, { message: "Address cannot be empty." }),
  city: z.string().min(1, { message: "City cannot be empty." }),
  state: z.string().min(1, { message: "State cannot be empty." }),
  pincode: z.string().min(5, { message: "Pin code cannot be empty." }),
  email: z.string().optional(),
  contact_person: z.string().min(1, { message: "Contact Person name cannot be empty." }),
  mobile_number: z
    .string()
    .regex(/^\d{10}$/, { message: "Mobile Number must be 10 digits." }),
  whatsapp: z
    .string()
    .regex(/^\d{10}$/, { message: "WhatsApp Number must be 10 digits." })
    .optional(),
  gmap: z.string().optional(),
  yt_video: z.string().optional(),
  logo: z.string().optional(),
  images: z.string().optional(),
  youtube: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional()
});

const AddClient = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isLogoEdit, setIsLogoEdit] = useState<boolean>(false);
  const [client, setClient] = useState<Client | undefined>(undefined);

  const [gmapLink, setGmapLink] = useState("");
  const [embedLink, setEmbedLink] = useState("");
  const [ytVideoLink, setYtVideoLink] = useState("");
  const [ytVideoId, setYtVideoId] = useState("");
  const [id, setId] = useState("");
  const [idValid,setIdValid] = useState(false);
  const [defaultVal,setDefaultVal] = useState("");
  const [images, setImages] = useState<string []>([]);
  const [logo, setLogo] = useState<string>("");  
  const [idError, setIdError] = useState<string>("");  

  const navigate = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
      defaultValues: {
        // id: "",
        // company_name: "A1 kitchen",
        // description: "A1 kitches Manufacturer & Supplier Stainless Steel Commercial Kitchen Equipments and Streets Food Counters as per Customers Requirements Stainless Steel Commercial Refrigeration and Drinking Water Cooler Dispensers, Chillers/Freezers, Deep Freezers.",
        // full_description: "The raw material required in manufacturing these products are procured from trustworthy vendors in the market. Apart from this, the offered range is widely recommended for its features like excellent finishing, long service life, and sturdy construction.We, A1 Kitchen from 2018 are prominent manufacturers and traders of high-quality Kitchen Equipment and Display Counter. Offered products range consists of Commercial Kitchen Equipment, Mortuary Box, Water Cooler, etc",
        // address: "8-4-122/21, Palace View Colony, East Bandlaguda Hyderabad - 500005, Telangana, India",
        // city: "Hyderabad",
        // state: "Telangana", 
        // pincode: "500005",
        // contact_person: "Mohammed Azeem",
        // email: "info@a1kitchens.com",
        // mobile_number: "8046031195",  
        // whatsapp: "8046031195",
        // gmap: "",
        // yt_video: "",
        // logo: "",
        // images: "",
        // youtube: "",
        // instagram: "",
        // facebook: "",
        // twitter: "",
      }
  });

  const { control, watch, setValue } = form;

  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  const companyName = watch("company_name");
  const city = watch("city");
  const state = watch("state");
  const flogo = watch("logo");
  const mobile_number = watch("mobile_number");

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (!token) {
      navigate.push("/admin");
    }
  }, []);

  async function fetchClientByID(cylinderId: string) {
    try {
      const token = localStorage.getItem("loginToken");

      const result = await fetch(`/api/admin/clients/${cylinderId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!result.ok) {
        console.log("Error fetching");
      }
      const data = await result.json();
      setClient(data.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  const fetchMaxId = async() => {
    try {
      const result = await fetch(`/api/admin/clients/id/`);
      
      if (!result.ok) throw new Error("Failed to get client max id");
      
      const data = await result.json();
      
      if (data.data.status != "success") return;
      const id = data.data.max_id;
      setValue("id", `${id}`);
    } catch (error) {
      console.error("Error getting max id:", error);
    }
  }

  useEffect(() => {
    // Get the current URL
    const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get("clientId");

    if (clientId !== null) {
      try {
        fetchClientByID(clientId);
      } catch (error) {
        console.error("Error parsing data:", error);
      }
    }else{
      // Fetch the max ID    
      fetchMaxId();
    }
  }, []);

  useEffect(() => {
    if (client !== undefined || client !== null) {
      try {
        if (client !== null && client !== undefined) {
          console.log("Client: ", client);
          setIsEdit(true);
          // Update form fields with parsed data
          form.setValue("id", client.id ? `${client.id}` : "0");
          form.setValue("company_name", client.company_name ?? "");
          form.setValue("description", client.description ?? "");
          form.setValue("full_description", client.full_description ?? "");
          form.setValue("address", client.address ?? "");
          form.setValue("contact_person", client.contact_person ?? "");
          form.setValue("city", client.city ?? "");
          form.setValue("state", client.state ?? "");
          form.setValue("email", client.email ?? "");
          form.setValue("pincode", client.pincode ? `${client.pincode}` : "0");
          form.setValue("mobile_number", client.mobile_number ?? "");
          form.setValue("whatsapp", client.whatsapp ?? "");
          form.setValue("logo", client.logo ?? "");
          form.setValue("youtube", client.youtube ?? "");
          form.setValue("instagram", client.instagram ?? "");
          form.setValue("facebook", client.facebook ?? "");
          form.setValue("twitter", client.twitter ?? "");

          setEmbedLink(client.gmap);
          setYtVideoId(
            `${client.yt_video && client.yt_video.split("embed/")[1]}`
          );

          form.setValue("gmap", client.gmap ?? "gmap");
          form.setValue("yt_video", client.yt_video ?? "");
          const list = client.images.join(", ");
          form.setValue("images", list ?? "");
          setImages(client.images);

          setId(client.id ? `${client.id}` : "0");

          if (client.logo) setIsLogoEdit(true);

        }
      } catch (error) {
        console.error("Error parsing edit data:", error);
      }
    }
  }, [client, form]);

  const convertToEmbedLink = (url: string | null) => {
    if (!url) return null;

    // Handle YouTube video link
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return url.replace(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/,
        "https://www.youtube.com/embed/$1"
      );
    }

    function generateMapUrl(url: string) {
      // Handle `@` format (coordinates in URL path)
      if (url.includes("google.com/maps") && url.includes("@")) {
        const coordinatesMatch = url.match(/@([\d.-]+),([\d.-]+)/); // Extract lat, lng
        if (coordinatesMatch) {
          const [lat, lng] = [coordinatesMatch[1], coordinatesMatch[2]];
          return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        }
      }

      // Handle `q` format (coordinates in query parameter)
      if (url.includes("google.com/maps") && url.includes("q=")) {
        const queryMatch = url.match(/q=([^&]*)/); // Extract the `q` parameter
        const coordinates = queryMatch
          ? decodeURIComponent(queryMatch[1])
          : null;

        if (coordinates && coordinates.includes(",")) {
          const [lat, lng] = coordinates.split(",");
          return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        }
      }

      // Return null or error message if no valid coordinates found
      return null;
    }

    if (url.includes("google.com/maps")) {
      return generateMapUrl(url);
    }

    // Handle Google Maps shortened link
    if (url.includes("maps.app.goo.gl")) {
      // You might need to fetch the actual redirect URL for shortened links
      return url; // Replace this with actual fetch logic if necessary
    }

    return url; // Return as is if no match
  };

  useEffect(() => {
    if (images.length > 8) {
      const trimmedImages = images.slice(0, 8);
      setImages(trimmedImages);
    }
  }, [images])


  async function onSubmit(data: z.infer<typeof formSchema>) {
    const {logo, ...values} = data;
    console.log("Submit values: ", values);

    checkId(id);

    if (!idValid) {
      setIdError("ID already exists");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const token = localStorage.getItem("loginToken");
    
    const payload = {
      ...values,
      yt_video: ytVideoId ? `https://www.youtube.com/embed/${ytVideoId}` : "",
      gmap: embedLink? embedLink : "",
      logo: flogo,
      images: images.join(", ")
    };

    console.log("Payload: ", payload);

    if (isEdit) {
      
      const logoUrl = logo && logo.includes(IMAGE_FILES_URL) 
      ? logo 
      : `${IMAGE_FILES_URL}/${logo}`;

      const updatePayload: any = {
        ...client,
        ...payload,
        logo: logoUrl
      };
      try {
        console.log("on submit", JSON.stringify(updatePayload));
        const result = await fetch("/api/admin/clients/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updatePayload)
        });

        if (!result.ok) throw new Error("Failed to update client data");

        const data = await result.json();
        console.log("Update Response:", data.data);
        setSuccessMessage("Client updated successfully!");
        setIsSuccess(true);
      } catch (error) {
        console.error("Error update submitting data:", error);
      }
    } else {
      try {
        const result = await fetch("/api/admin/clients/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (!result.ok) throw new Error("Failed to submit client data");

        const data = await result.json();
        setSuccessMessage("Client added successfully!");
        setIsSuccess(true);
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }
  }
  
  
  const checkId = async(id: string) => {
    if (id.length < 5) return;

    if (id === `${client?.id}`) {
      setIdValid(true);
      return;
    }

    const token = localStorage.getItem("loginToken");

    try {
      const result = await fetch(`/api/admin/clients/check/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      
      if (!result.ok) throw new Error("Failed to get client id availability");
      
      const data = await result.json();
      if (data.data.status != "success") return;
      const availability = data.data.available;
      setIdValid(availability);
      setIdError(availability ? "" : "ID already exists");
    } catch (error) {
      console.error("Error checking id:", error);
    }

  };

  useEffect(() => {
    checkId(id);
  }, [id]);

  
  useEffect(() => {
    // if (mobile_number && mobile_number.length >= 10) {
    //   const lastFiveDigits = mobile_number.slice(-5);
    //   setId(lastFiveDigits);
    //   setDefaultVal(lastFiveDigits); 
    //   setValue("id", lastFiveDigits); 
    // }
    if (mobile_number){
      setValue("whatsapp", mobile_number);
    }
  }, [mobile_number, setValue]);

  const handleConvertClick = () => {
    const convertedLink = convertToEmbedLink(gmapLink);
    setEmbedLink(convertedLink || "");
  };

  const handleYtEmbedClick = () => {
    // Match both standard YouTube URLs and Shorts URLs
    const videoIdMatch = ytVideoLink.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:.*[?&]v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    
    if (videoIdMatch) {
      setYtVideoId(videoIdMatch[1]);
    } else {
      setYtVideoId(""); 
    }
  };
  

  return (
    <div className="m-2 bg-[#EDEAE0]">
      <div className="flex flex-col items-center justify-center">
        <Card className="w-full mx-4 rounded-xl border border-gray-200 bg-[#EDEAE0] p-6 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle>{`${isEdit ? "Edit" : "Add"} Page`}</CardTitle>
            <CardDescription className="text-balance max-w-lg leading-relaxed"></CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, (errors) => {
                  console.log("Form validation errors:", errors);
                })}
                className="flex flex-col space-y-8"
              >
                {/* Company Information */}
                <Card className="space-y-4 p-8 bg-[#dce1de]">
                  <h3 className="text-lg font-semibold">Company Information</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Id */}
                    <FormField
                      control={form.control}
                      name="id"
                      defaultValue={defaultVal}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">Id</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                maxLength={5}
                                onChangeCapture={(e) => {
                                  setId(e.currentTarget.value);
                                  checkId(id);
                                }}
                                placeholder="Enter Id"
                                className="pl-4 pr-10 w-full"
                                {...field}
                              />

                              {id && (
                                <div className="absolute right-3 top-2 cursor-pointer" onClick={() => checkId(id)}>
                                  {idValid ? (
                                    <Check className="text-green-500" />
                                  ) : (
                                    <X className="text-red-500" />
                                  )}
                                </div>
                              )}
                              {idError && (
                                <h3 className="text-red-500 mt-2">{idError}</h3>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* Company Name */}
                    <FormField
                      control={form.control}
                      name="company_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Company Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Company Name"
                              className="pl-4"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter Description"
                              className="pl-4"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Full Description */}
                    <FormField
                      control={form.control}
                      name="full_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Full Description
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter Full Description"
                              className="pl-4"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>

                {/* Address Information */}
                <Card className="space-y-4 p-8 bg-[#dce1de]">
                  <h3 className="text-lg font-semibold">Address Information</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* State Dropdown */}
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem className="flex flex-col pt-2">
                          <FormLabel className="text-black">State</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="border border-gray-300 rounded p-2"
                              value={field.value} // Set the current value from field
                            >
                              <option value="" disabled>
                                Select State
                              </option>{" "}
                              {/* Placeholder option */}
                              {Object.keys(statesAndCities).map((state) => (
                                <option key={state} value={state}>
                                  {state}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* City Autocomplete */}
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            City / District / Village
                          </FormLabel>
                          <FormControl>
                            <div className="flex space-x-4 w-ful">
                              <div className="flex-1">
                                <Input
                                  {...field}
                                  placeholder="Enter City / District / Village"
                                  className="pl-4"
                                  list="city-suggestions" // Attach to the datalist for autocomplete
                                />
                                <datalist id="city-suggestions">
                                  {form.watch("state") &&
                                    statesAndCities[form.watch("state")]?.map(
                                      (city: string) => (
                                        <option key={city} value={city} />
                                      )
                                    )}
                                </datalist>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Address */}
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Address"
                              className="pl-4"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Pin code */}
                    <FormField
                      control={form.control}
                      name="pincode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">Pin code</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Pin code"
                              className="pl-4"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>

                {/* Contact Information */}
                <Card className="space-y-4 p-8 bg-[#dce1de]">
                  <h3 className="text-lg font-semibold">Contact Information</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Contact PERSON */}
                    <FormField
                      control={form.control}
                      name="contact_person"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Contact Person Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Contact Person Name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Email"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Mobile Number */}
                    <FormField
                      control={form.control}
                      name="mobile_number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">
                            Mobile Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Mobile Number"
                              type="tel"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* WhatsApp */}
                    <FormField
                      control={form.control}
                      name="whatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">WhatsApp</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter WhatsApp Number"
                              type="tel"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>

                {/* Online Presence */}
                <Card className="space-y-4 p-8 bg-[#dce1de]">
                  <h3 className="text-lg font-semibold">Online Presence</h3>

                  <div className="flex items-start justify-start space-x-8">
                    <div className="felx-1 w-full grid grid-cols-2 gap-6">
                      <div className="flex items-end justify-between flex-1 space-x-4">
                        {/* Google Maps Link */}
                        <FormField
                          control={form.control}
                          name="gmap"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              {/* Make FormItem take full width */}
                              <FormLabel className="text-black flex-1">
                                Google Maps Link
                              </FormLabel>
                              <FormControl className="flex-1">
                                {/* Ensure FormControl takes full width */}
                                {/* <Input
                                  placeholder="Enter Google Maps Link"
                                  {...field}
                                  value={gmapLink}
                                  onChange={(e) => setGmapLink(e.target.value)}
                                  className="w-full" // Ensure Input takes full width
                                /> */}
                                <GoogleMapsEmbed setEmbedUrl={setEmbedLink} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex items-end justify-between flex-1 space-x-4">
                        {/* YouTube Videos */}
                        <FormField
                          control={form.control}
                          name="yt_video"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel className="text-black">
                                YouTube Video Links
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter YouTube Video Link"
                                  value={ytVideoLink}
                                  onChange={(e) =>
                                    setYtVideoLink(e.target.value)
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        {/* Convert Button */}
                        <Button
                          type="button"
                          onClick={handleYtEmbedClick}
                          className="p-2 bg-red-400 text-white rounded"
                        >
                          Embed
                        </Button>
                      </div>

                      <div className="col-span-full w-full flex-1 flex items-center justify-between">
                        {/* Google Map Preview */}
                        {embedLink && (
                          <div className="">
                            <h4 className="text-md font-semibold">Preview:</h4>
                            <iframe
                              src={embedLink}
                              width="500"
                              height="300"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                            />
                          </div>
                        )}

                        {/* YouTube Video Preview */}
                        {ytVideoId && (
                          <div className="mt-4">
                            <h4 className="text-md font-semibold">
                              YouTube Video Preview:
                            </h4>
                            <iframe
                              width="500"
                              height="300"
                              src={`https://www.youtube.com/embed/${ytVideoId}`}
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        )}
                      </div>

                      <FormField
                        control={form.control}
                        name="youtube"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Youtube Channel Link
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Youtube Channel Link"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="instagram"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Instagram Link
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Instagram Link"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="facebook"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Facebook Link
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Facebook Link"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="twitter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-black">
                              Twitter Link
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Twitter Link"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </Card>

                {/* Media Upload */}
                <Card className="space-y-4 p-8 bg-[#dce1de]">
                  <h3 className="text-lg font-semibold">Media Upload</h3>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Logo */}
                    <FormField
                      control={form.control}
                      name="logo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">Logo</FormLabel>
                          <FormControl>
                            {isLogoEdit ? (
                              <EditPreview
                                file={field.value ?? ""}
                                onDelete={() => setIsLogoEdit(false)}
                              />
                            ) : (
                              <FileUploader
                                onFileUpload={(data) => {
                                  console.log("Logo file uploaded: ", data);

                                  console.log("Data: ", data);
                                  if (!data || data.length === 0) {
                                    console.error("No file data received");
                                    return;
                                  }
                                  console.log("Logo file : ", field.value);
                                  if (data) {
                                    setIsLogoEdit(true);
                                    field.onChange(data[0]);
                                    console.log("Logo: ", field.value);
                                    setLogo(data[0]);
                                  } else {
                                    console.log("No Logo");
                                  } 
                                }}
                                label={"Logo"}
                                correspondantFileType={"Logo"}
                              />
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Images */}
                    <FormField
                      control={form.control}
                      name="images"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-black">Images</FormLabel>
                          <FormControl>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              {/* Show existing images */}
                              {images.length > 0 && images.map((image, index) => (
                                <div className="flex-1" key={index}>
                                  <FileHandler
                                    isEdit={isEdit}
                                    label={"Upload Images"}
                                    correspondantFileType={"Images"}
                                    file={`${IMAGE_FILES_URL}/${image.trim()}`}
                                    onFileUpload={(data) => {
                                      console.log("file uploaded: ", data);
                                      if(data){
                                        const updatedImages = [...images, data[0]];
                                        setImages(updatedImages);
                                      }
                                    }}
                                    onFileDelete={(image) => {
                                      console.log("file deleted: ", image);
                                      const imagePathSplit = image.split("/");
                                      const imageName = imagePathSplit[imagePathSplit.length - 1]

                                      console.log("imageName: ", imageName);
                                      if (images.length === 0) {
                                        return;
                                      }

                                      const updatedImages = images.filter(
                                        (img) => img.trim() !== imageName.trim()
                                      );

                                      console.log("updatedImages: ", updatedImages);
                                      setImages(updatedImages);
                                    }}
                                  />
                                </div>
                              ))}

                              {/* Show FileUploader if less than 8 images */}
                              {images.length < 9 && (
                                <FileHandler
                                  isEdit={isEdit}
                                  label={"Upload Images"}
                                  correspondantFileType={"Images"}
                                  file={""}
                                  onFileUpload={(data) => {
                                    console.log("file uploaded from empty: ", data);
                                    if (data) {
                                      const updatedImages = [...images, ...data];
                                      setImages(updatedImages);
                                    }
                                  }}
                                  onFileDelete={(image) => {
                                    console.log("file deleted: ", image);
                                    if (images.length === 0) {
                                      return;
                                    }
                                  }}
                                />
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  </div>
                </Card>

                {/* Submit Button */}
                <div className="flex items-center justify-end">
                  <Button type="submit">
                    {isEdit ? "Update Page" : "Add Page"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

    {isSuccess && (
      <SuccessPage 
        message={successMessage}
        onClose={() => {
          setIsSuccess(false);
          navigate.push("/admin/clients");
        }}
      />
    )}
    </div>
  );
};
export default AddClient;


// test 5