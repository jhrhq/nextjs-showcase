import Link from "next/link";
import RegisterForm from "@/domains/movies/components/auth/RegisterForm";

const Register = () => {
  return (
    <main className="bg-moviedb-black min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/70 rounded-lg p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold mb-6">Create Your Account</h1>
          <RegisterForm />
          <div className="mt-6 text-moviedb-gray">
            Already have an account ?
            <Link href="#" className="ml-1 text-white hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
