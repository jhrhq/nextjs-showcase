import AuthHeaderWithProvider from "@/domains/hotel-booking/components/auth/AuthHeaderWithProvider";
import SignInForm from "@/domains/hotel-booking/components/auth/SignInForm";
import SignInModal from "@/domains/hotel-booking/components/auth/SignInModal";
import { resolveCallbackUrl } from "@/lib/callback-urls";

type InterceptedSignInProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function InterceptedSignIn({ searchParams }: InterceptedSignInProps) {
  const resolvedParams = await searchParams;
  const params = new URLSearchParams(resolvedParams as Record<string, string>);
  const callbackUrl = resolveCallbackUrl(params);

  return (
    <SignInModal>
      <AuthHeaderWithProvider isSignIn={true} callbackUrl={callbackUrl} modal={true}>
        <SignInForm callbackUrl={callbackUrl} />
      </AuthHeaderWithProvider>
    </SignInModal>
  );
}
