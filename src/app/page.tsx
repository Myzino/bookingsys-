'use client'
import { useRouter } from "next/compat/router";
import Image from "next/image";
import { useState } from "react";
import { login } from "../utils/auth";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use direct credentials login
      await login({ email, password });
      router.push("/dashboard");
    } catch (err) {
      setError("Authentication failed. Please check your credentials.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSSOLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use standard SSO flow
      await login();
      // Note: The redirect will happen automatically
    } catch (err) {
      setError("SSO authentication failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="w-full rounded-lg border shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <Image
              src="/images/ten.jpg"
              width={80}
              height={50}
              alt="Moneycache"
              style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
              className="rounded-full"
            />
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-xl dark:text-white">
              Sign in to your account
            </h1>
            <p className="text-red-500 text-sm">{error}</p>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSignIn}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="name@company.com" 
                  required 
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                className="w-full bg-gray-800 text-white bg-primary-600 border border-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
              
              <div className="text-center">
                <button 
                  type="button"
                  onClick={handleSSOLogin}
                  className="text-sm text-blue-600 hover:underline"
                  disabled={loading}
                >
                  Sign in with Keycloak SSO
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}