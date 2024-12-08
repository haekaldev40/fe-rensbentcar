import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import logoImg from "../assets/images/LOGOBENS2.png";
import loginImg from "../assets/images/loginImage.png";
import { useRegister } from "../hooks/useRegister";

const schema = yup.object().shape({
  name: yup.string().required('Nama harus diisi'),
  email: yup.string().email('Email tidak valid').required('Email harus diisi'),
  password: yup.string().min(6, 'Password minimal 6 karakter').required('Password harus diisi'),
});

export function Register() {
  const navigate = useNavigate();
  const { registerUser } = useRegister();
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {

    try {
      await registerUser(data.name, data.email, data.password);
      toast.success('Register Berhasil!');
      navigate('/login'); 
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 sm:p-12">
          <div className="flex justify-center">
            <img src={logoImg} className="" alt="Logo" />
          </div>
          <div className="flex flex-col items-center mt-[-80px]">
            <div className="w-full flex-1">
              <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Masukkan Nama"
                  id="name"
                  {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="email"
                  placeholder="Masukkan Email"
                  id="email"
                  {...register("email")}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  placeholder="Masukkan Password"
                  id="password"
                  {...register("password")}
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                
                <button type="submit" className="bg-gray-800 hover:bg-gray-600 text-lg text-white mt-5 tracking-wide font-semibold w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                  <span className="ml-">Register</span>
                </button>
                <div className="text-center mt-6 pb-10">
                  <Link to={"/login"} className="text-gray-900">
                    Sudah punya akun? <u>Masuk disini.</u>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-green-100 text-center hidden lg:flex">
          <div className="w-full bg-contain bg-center bg-no-repeat">
            <img src={loginImg} className="" alt="Login Illustration" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
