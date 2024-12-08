import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import logo1 from "../assets/images/awik.webp";
import logo2 from "../assets/images/liburan.jpg";
import logo3 from "../assets/images/perjalananbisnis.jpg";

const dataImage = [
  {
    id: 1,
    image: logo1,
    title: "Pernikahan",
    text: "Kami menyiapkan berbagai jenis kendaraan mewah untuk memenuhi kebutuhan kendaraan di hari bahagia Anda.",
  },
  {
    id: 2,
    image: logo2,
    title: "Liburan",
    text: "Kami menyediakan kendaraan nyaman dan aman untuk perjalanan liburan Anda bersama keluarga.",
  },
  {
    id: 3,
    image: logo3,
    title: "Perjalanan Bisnis",
    text: "Kami siap mendukung bisnis Anda dengan menyediakan armada yang berkualitas dan terjangkau.",
  }
];

export function ImageSlider() {
  return (
    <div className="container mx-auto py-8">
      <Splide
        options={{
          type: 'loop',
          perPage: 3,
          breakpoints: {
            1024: {
              perPage: 2,
            },
            768: {
              perPage: 1,
            },
          },
          perMove: 1,
          autoplay: true,
          pagination: true,
          arrows: true,
        }}
        className="splide"
      >
        {dataImage.map((datas) => (
          <SplideSlide key={datas.id} className="p-2">
            <div className="flex flex-col h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-60 object-cover"
                  src={datas.image}
                  alt={datas.title}
                />
              </a>
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <a href="#">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {datas.title}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {datas.text}
                  </p>
                </div>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
