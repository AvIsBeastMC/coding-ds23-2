import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import { Inter, Unbounded, Indie_Flower } from "@next/font/google";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Select from 'react-select'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { string } from "zod";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { toast, Toaster } from 'react-hot-toast'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const SatisfyFont = Indie_Flower({
  subsets: ['latin'],
  weight: '400'
})

const InterFont = Inter({
  subsets: ['latin'],
  weight: '400'
})

const UnboundedFont = Unbounded({
  subsets: ['latin'],
  weight: '400'
})

export default function Home() {
  type ImageType = ({
    category: {
      name: string;
    }[];
    personality: {
      name: string;
    };
  } & {
    url: string;
    personalityName: string;
  })

  const { data, error } = api.main.getCategories.useQuery();
  const [selectData, setSelectData] = useState<string>()
  const ay = `<span>.</span>`;
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const { mutate } = api.main.getImagefromCategories.useMutation();
  const [image, setImage] = useState<ImageType>()

  if (error || !data) return <></>

  const getImage = () => {
    setLoading(true);
    setImage(undefined);
    if (!selectData) return;

    const local = localStorage.getItem('IMAGES_SEEN')

    mutate({
      categories: [selectData],
      localStorage: local ? JSON.parse(local) : []
    }, {
      onSuccess(data) {
        if (!data) return;

        setImage(data)
        setLoading(false)
      },
      onError(data) {
        toast.error('An Error Occurred..')
        console.log(data);

        setTimeout(() => {
          router.reload()
        }, 2000);
      }
    });
  }

  return (
    <>
      <Head>
        <title>INNO'VISION 2023 - Aravali International School</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"></link>
      </Head>

      <Toaster />

      <motion.section className="text-gray-600 body-font">
        <div className="container md:px-24 py-6 mx-auto px-6">
          <div className="flex flex-col text-center w-full mb-8">
            <h2 className="text-xs text-indigo-500 tracking-wide font-medium title-font mb-1">AIS - SECTOR-85</h2>
            <h1 className={`${SatisfyFont.className} sm:text-4xl text-3xl font-bold title-font text-gray-900`}>
              <Typewriter
                options={{
                  strings: "Inno'Vision",
                  cursor: ay,
                  delay: 120,
                  cursorClassName: "blink_me",
                  autoStart: true,
                  loop: false,
                }}
              />
            </h1>
            <p className={`${InterFont.className} mt-1 lg:w-2/3 mx-auto leading-relaxed text-base mb-2`}>
              Innovate your vision and how you see the world with the power of AI!
            </p>
          </div>
          <div className="flex justify-center mb-12">
            <Select onChange={(e) => e?.label ? setSelectData(e.label) : null} className="w-1/3" options={data.map((d) => {
              return {
                label: d.name,
                value: d.name
              }
            })} />

            {selectData ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Button color="primary" isLoading={loading} onClick={() => getImage()} radius="sm" className={`ml-4 ${UnboundedFont.className}`}>
                  <i className="bi bi-cloud-download mr-1"></i>
                  Generate
                </Button>
              </motion.div>
            ) : null}
          </div>

          <div className="flex flex-wrap">
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-opacity-60">
              <h2 className={`${UnboundedFont.className} text-md sm:text-xl text-gray-900 title-font mb-2`}>
                Inspiring Your Journey
              </h2>
              <p className="leading-relaxed mb-4 text-md">
                Innovision is not just a bot; it's your creative partner on the path to personal growth and success. We understand that words have the power to uplift, energize, and ignite the spark within. That's why we've created a platform that allows you to transform your favorite quotes into stunning visual masterpieces.
              </p>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 className={`${UnboundedFont.className} text-lg sm:text-xl text-gray-900 title-font mb-2`}>
                Explore Our Gallery
              </h2>
              <p className="leading-relaxed mb-4 text-md">
                Our Gallery is a testament to the incredible creations of our users. Dive into a world of motivation, where you can explore a wide array of quote images designed to uplift your spirits and fuel your ambitions. We've categorized our images by themes, making it easy for you to find the perfect inspiration for any occasion.
              </p>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 className={`${UnboundedFont.className} text-lg sm:text-xl text-gray-900 title-font mb-2`}>
                Join Innovision
              </h2>
              <p className="leading-relaxed mb-4 text-md">
                Join us on a journey of inspiration, creativity, and motivation. Let Innovision be your trusted companion as you aspire to achieve your dreams and inspire others along the way. Together, we'll paint a world filled with positivity, one motivational image at a time.
              </p>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 className={`${UnboundedFont.className} text-lg sm:text-xl text-gray-900 title-font mb-2`}>
                Contact Us
              </h2>
              <p className="leading-relaxed mb-4 text-md">
                Have questions or feedback? We're here to assist you. Feel free to reach out through our mail or number, and we'll respond promptly. Your thoughts and ideas matter to us as we continually strive to enhance the Innovision experience.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <Modal
        size="xl"
        isOpen={image ? true : false}
        onClose={() => setImage(undefined)}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex gap-2 flex-row">
                  {image?.category.map((c, i) => <span key={i} className={`bg-gray-300 px-2 py-1 rounded-md ${InterFont.className}`}>
                    {c.name}
                  </span>)}
                </div>

                <div className={`flex ml-auto px-4 py-1 ${InterFont.className}`}>
                  <span className="text-slate-500 border-b-2 text-sm self-center flex ml-1">{image?.personalityName}</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <LazyLoadImage className="w-full" effect="blur" src={image?.url} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button isLoading={loading} color="primary" onPress={() => getImage()}>
                  <i className="bi bi-cloud-download mr-1"></i>
                  Generate Again!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
