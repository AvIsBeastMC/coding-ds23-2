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

const SatisfyFont = Indie_Flower({
  subsets: ['latin'],
  weight: '400'
})

const InterFont = Inter({
  subsets: ['latin'],
  weight: '500'
})

const UnboundedFont = Unbounded({
  subsets: ['latin'],
  weight: '300'
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

    mutate({
      categories: [selectData]
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
            <h1 className={`${SatisfyFont.className} sm:text-4xl text-3xl font-bold title-font mb-4 text-gray-900`}>
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
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table. Franzen you probably haven't heard of them man bun deep jianbing selfies heirloom prism food truck ugh squid celiac humblebrag.</p>
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
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Shooting Stars</h2>
              <p className="leading-relaxed text-base mb-4">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
              <a className="text-indigo-500 inline-flex items-center">Learn More
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">The Catalyzer</h2>
              <p className="leading-relaxed text-base mb-4">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
              <a className="text-indigo-500 inline-flex items-center">Learn More
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Neptune</h2>
              <p className="leading-relaxed text-base mb-4">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
              <a className="text-indigo-500 inline-flex items-center">Learn More
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
            <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
              <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Melanchole</h2>
              <p className="leading-relaxed text-base mb-4">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
              <a className="text-indigo-500 inline-flex items-center">Learn More
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
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
                  <span className="text-slate-500 border-b-2 border-gray-800 border-dotted ml-1">{image?.personalityName}</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <img src={image?.url} />
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