import Link from "next/link";

const LoginNavigation = () => {
  return (
    <div className="text-center text-sm text-gray-600">
      <p>
        Don&apos;t have an account?
        <Link href="/signup" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginNavigation;
