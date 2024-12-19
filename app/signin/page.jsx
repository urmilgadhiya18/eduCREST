// "use client";
// import { useState } from 'react';
// import axios from 'axios';
// import Image from "next/image";

// export default function Signin() {
//     return (
//       <>
//         {/* This example requires updating your template */}
//         <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 pt-[7%]">
//           <div className="sm:mx-auto sm:w-full sm:max-w-sm flex-1 justify-center items-center">
//             <div className="relative w-full h-10">
//                 <Image
//                     src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
//                     className="mx-auto h-10 w-auto"
//                     alt="EduCREST"
//                     fill
//                 />
//             </div>
//             {/* <img
//               alt="EduCREST"
//               src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
//               className="mx-auto h-10 w-auto"
//             /> */}
//             <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
//               Sign in to your account
//             </h2>
//           </div>
  
//           <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//             <form action="#" method="POST" className="space-y-6">
//               {/* Email Field */}
//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-900">
//                   Email address
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     required
//                     autoComplete="email"
//                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
//                   />
//                 </div>
//               </div>
  
//               {/* Password Field */}
//               <div>
//                 <div className="flex items-center justify-between">
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-900">
//                     Password
//                   </label>
//                   <div className="text-sm">
//                     <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
//                       Forgot password?
//                     </a>
//                   </div>
//                 </div>
//                 <div className="mt-2">
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     required
//                     autoComplete="current-password"
//                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
//                   />
//                 </div>
//               </div>
  
//               {/* Role Field */}
//               <div>
//                 <label htmlFor="role" className="block text-sm font-medium text-gray-900">
//                   Role
//                 </label>
//                 <div className="mt-2">
//                   <select
//                     id="role"
//                     name="role"
//                     required
//                     className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
//                   >
//                     <option value="" disabled>Select Role</option>
//                     <option value="learner">Learner</option>
//                     <option value="educator">Educator</option>
//                   </select>
//                 </div>
//               </div>
  
//               {/* Sign In Button */}
//               <div>
//                 <button
//                   type="submit"
//                   className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-600"
//                 >
//                   Sign in
//                 </button>
//               </div>
//             </form>
  
//             {/* Sign Up Prompt */}
//             <p className="mt-10 text-center text-sm text-gray-500">
//               Not a member?{' '}
//               <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
//                 Sign Up
//               </a>
//             </p>
//           </div>
//         </div>
//       </>
//     );
//   }
  

"use client";
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import logo from '/logo.png'

export default function Signin() {
  const router = useRouter();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('api/signin', form)
      .then(result => {
        if(result.data.message === "logged in successfully"){
          const auth=({ name: result.data.name, email: form.email, role: result.data.role, img: result.data.img, auth: true});
          localStorage.setItem("token", result.data.data); // Store token
          localStorage.setItem("auth", JSON.stringify(auth));
          {console.log(result);
          }
          setForm({ email: '', password: ''});
          setError('');
          router.push('/dashboard');
          // window.location.reload();
          // handleClose();
        } else {
          setError(result.data.message);
        }
      })
      .catch(err => {
        setError('An error occurred. Please try again.');
        console.log(err);
      });
  };

  return (
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 pt-[7%]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            //   src={logo}
              className="mx-auto h-20 w-auto"
            />
            <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border border-gray-300 bg-white ps-2 py-1.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border border-gray-300 bg-white ps-2 py-1.5 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-4 text-left text-sm text-red-500">
                    {error}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  Sign In
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Don't have an account?{' '}
              <Link href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
    </>
  );
}