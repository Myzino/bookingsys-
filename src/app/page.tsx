'use client'
import { TriangleAlert } from "lucide-react";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from "sonner";
export default function Home() {
  const router = useRouter();
const [form, setForm] = useState({
  firstname: "",
  lastname: "",
  email: "",
  password: "",
})
const [error, setError] = useState(null);
const [pending, setPending] = useState(false)
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setPending(true);

  try {
    const res = await fetch('/api/auth/signup', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.status === 400) {
     setError(data.message);
      setPending(false);
      
    } else if (res.status ===201) {
      setPending(false);
      toast.success(data.message);
      router.push("/signin"); 
    } 
    else if(res.status === 500){
      setError(data.message);
      setPending(false)
    }

  } catch (err) {
    console.error("Unexpected error:", err);
  } finally {
    setPending(false);
  }
};
  return (
    <div className="items-center justify-items-center min-h-screen p-1 pb-20 gap-6 sm:p-9  font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full rounded-lg border shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0  dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 space-y-3 md:space-y-4 sm:p-8">
            <Image
              src="/images/g.png"
              width={50}
              height={50}
              alt="Moneycache"
              style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
              className="rounded-full"
            />
            {!! error && (
              <div className="bg-destructive/15 p-3 rounded-md text-destructive flex items-center gap-x-2 text-sm mb-6">
                <TriangleAlert />
                <p>{error}</p>
              </div>
            )}
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-xl dark:text-white">
              Register an Account
            </h1>
            <p className="text-red-500 text-sm"></p>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                <input 
                  type="text" 
                  disabled={pending}
                  value={form.firstname}
                  name="firstname" 
                  onChange={(e) => setForm({...form, firstname:e.target.value})}
                  className="text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="jhon" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                <input 
                  type="text"     
                  disabled={pending}
                  value={form.lastname}
                  name="lastname" 
                  id="lastname" 
                  onChange={(e) => setForm({...form, lastname:e.target.value})}
                  className="text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="doe" 
                  required 
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={form.email}
                  disabled={pending}
                  onChange={(e) => setForm({...form, email:e.target.value})}
                  id="email" 
                  className="text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="name@company.com" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input 
                  type="password" 
                  disabled={pending}
                  name="password" 
                  value={form.password}
                  id="password" 
                  onChange={(e) => setForm({...form, password:e.target.value})}
                  placeholder="••••••••" 
                  className="text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  required 
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
                <a href="/forgot-password" className="text-sm ml-2 text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
                <button 
                type="submit" 
                className="w-full bg-gray-500 text-white bg-primary-600 border border-white hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >Log In
              </button>
              <p className="text=sm">Already Have an Account? <Link href="/signin" className="hover:text-blue-500">Click me!</Link></p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}