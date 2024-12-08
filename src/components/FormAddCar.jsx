import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createCars} from "../utils/apiCars";
import toast from "react-hot-toast";

export function FormAddCar({ defaultValues, onClose, onUpdate }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues: defaultValues || {
            title: '',
            model: '',
            no_plat: '',
            price: '',
            fuel: '',
            capacity: '',
            transimisi: '',
            year: '',
            color: '',
            imageUrl: ''
        }
      });

  const queryClient = useQueryClient()

  const { mutate: addCar, isLoading: isAdding } = useMutation({
    mutationFn: createCars,
    onSuccess: () => {
        toast.success("Mobil baru berhasil ditambahkan.")
        queryClient.invalidateQueries({
            queryKey: ["cars"]
        })
        reset()
        onClose()
    },
    
    onError: (err) => toast.error(err.message)
  })

 

  const onSubmit = async (data) => {
    console.log('Data to be submitted:', data);
    const convertInt = {
        ...data,
        year: parseInt(data.year),
        price: parseInt(data.price)
    }

    if (defaultValues) {
        onUpdate(convertInt)
    } else {
        addCar(convertInt)
    }

  };

return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-200 p-5 rounded-xl shadow-lg">
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="w-full">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mobil
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required=""
                placeholder="Nama mobil"
                {...register("title")}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="model"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Model
              </label>
              <input
                type="text"
                name="model"
                id="model"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required=""
                placeholder="Model mobil"
                {...register("model")}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="no_plat"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                No. Plat
              </label>
              <input
                type="text"
                name="no_plat"
                id="no_plat"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required=""
                placeholder="Model mobil"
                {...register("no_plat")}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Harga Sewa
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="350.000"
                required=""
                {...register("price")}
              />
            </div>
            <div>
              <label
                htmlFor="fuel"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Bahan Bakar
              </label>
              <input
                type="text"
                name="fuel"
                id="fuel"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Solar"
                required=""
                {...register("fuel")}
              />
            </div>
            <div>
              <label
                htmlFor="capacity"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Kapasitas
              </label>
              <input
                type="text"
                name="capacity"
                id="capacity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={`5 Orang`}
                required=""
                {...register("capacity")}
              />
            </div>
            <div>
              <label
                htmlFor="transimisi"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Transmisi
              </label>
              <input
                type="text"
                name="transimisi"
                id="transimisi"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Manual"
                required=""
                {...register("transimisi")}
              />
            </div>
            <div>
              <label
                htmlFor="year"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tahun
              </label>
              <input
                type="text"
                name="year"
                id="year"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder={2019}
                required=""
                {...register("year")}
              />
            </div>
            <div>
              <label
                htmlFor="color"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Warna
              </label>
              <input
                type="text"
                name="color"
                id="color"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Black"
                required=""
                {...register("color")}
              />
            </div>
            
            <div className="col-span-2">
              <label
                htmlFor="imageUrl"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Gambar
              </label>
              <input
                type="text"
                name="imageUrl"
                id="imageUrl"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="https://www.image.ccom"
                required=""
                {...register("imageUrl")}
              />
            </div>
          </div>
          <button className=" mt-6 rounded-md w-full px-2 py-3 border border-gray-800 text-gray-800 text-sm hover:bg-gray-800 hover:text-white font-bold">
            {defaultValues ? "Update Mobil" : "Tambah Mobil"}
          </button>
        </form>
      </div>
    </section>
  );
}
