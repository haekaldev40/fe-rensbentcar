import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCars, updateCar, deleteCar } from "../utils/apiCars";
import { FormAddCar } from "../components/FormAddCar";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";

export function DataMobil() {
  const queryClient = useQueryClient();
  const { data: carsData = [], isLoading: isFetching } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
    setCurrentCar(null);
  };

  const { mutate: editCar, isLoading: isEditing } = useMutation({
    mutationFn: updateCar,
    onSuccess: () => {
      toast.success("Data berhasil diupdate.");
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
      handleClose();
    },
  });

  const { mutate: removeCar, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      toast.success("Data berhasil dihapus.");
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
      setShowModal(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleEdit = (car) => {
    if (currentCar && currentCar.car_id === car.car_id) {
      handleClose();
    } else {
      setCurrentCar(car);
      setIsOpen(true);
    }
  };

  const handleUpdate = (carData) => {
    const { car_id, ...dataToUpdate } = carData;
    editCar({ carId: currentCar.car_id, carData: dataToUpdate });
  };

  const handleDelete = (carId) => {
    setCarToDelete(carId);
    setShowModal(true);
  };

  const confirmDelete = () => {
    removeCar(carToDelete);
  };

  const filteredCars = carsData.filter((car) =>
    car.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isFetching) return <div>Loading...</div>;

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex justify-end gap-4 mb-4">
          <input
            type="text"
            placeholder="Cari Mobil..."
            className="py-2 px-4 font-bold text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleOpen}
            className="py-2 px-4 bg-gray-800 hover:bg-gray-600 text-white rounded-md font-bold text-sm"
          >
            Tambah Mobil Baru
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100 border-b">
              <tr className="font-mono">
                <th className="p-4 text-sm font-semibold text-left">
                  No. Plat
                </th>
                <th className="p-4 text-sm font-semibold text-left">Nama</th>
                <th className="p-4 text-sm font-semibold text-left">Model</th>
                <th className="p-4 text-sm font-semibold text-left">
                  Bahan Bakar
                </th>
                <th className="p-4 text-sm font-semibold text-left">
                  Kapasitas
                </th>
                <th className="p-4 text-sm font-semibold text-left">
                  Transmisi
                </th>
                <th className="p-4 text-sm font-semibold text-left">Tahun</th>
                <th className="p-4 text-sm font-semibold text-left">Warna</th>
                <th className="p-4 text-sm font-semibold text-left">Harga</th>
                <th className="p-4 text-sm font-semibold text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.map((car, index) => (
                <tr
                  className="font-mono border-b text-sm hover:bg-gray-50"
                  key={index}
                >
                  <td className="p-4">{car.no_plat}</td>
                  <td className="p-4">{car.title}</td>
                  <td className="p-4">{car.model}</td>
                  <td className="p-4">{car.fuel}</td>
                  <td className="p-4">{car.capacity}</td>
                  <td className="p-4">{car.transimisi}</td>
                  <td className="p-4">{car.year}</td>
                  <td className="p-4">{car.color}</td>
                  <td className="p-4">{car.price}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(car)}
                        className="p-2 bg-blue-500 hover:bg-blue-700 text-white rounded"
                      >
                        <CiEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(car.car_id)}
                        className="p-2 bg-red-500 hover:bg-red-700 text-white rounded"
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <FormAddCar
          defaultValues={currentCar}
          onClose={handleClose}
          onUpdate={handleUpdate}
        />
      )}
      {showModal && (
        <div
          id="popup-modal"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setShowModal(false)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Apakah anda ingin menghapus mobil ini?
                </h3>
                <button
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={confirmDelete}
                >
                  Ya
                </button>
                <button
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={() => setShowModal(false)}
                >
                  Tidak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DataMobil;