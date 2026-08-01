import { SignInButton } from "@clerk/clerk-react";
import Button from "@/components/ui/Button";

export default function GoogleSignInButton({ className }) {
  return (
    <SignInButton mode="modal" forceRedirectUrl="/dashboard">
      <Button variant="primary" className={className}>
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path
            fill="#fff"
            d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.85 2.09-1.81 2.73v2.27h2.92c1.7-1.57 2.69-3.88 2.69-6.64z"
          />
          <path
            fill="#fff"
            d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.27c-.81.55-1.85.87-3.04.87-2.34 0-4.32-1.58-5.03-3.71H.96v2.33A8.997 8.997 0 0 0 9 18z"
          />
          <path
            fill="#fff"
            d="M3.97 10.71a5.41 5.41 0 0 1 0-3.42V4.96H.96a9.006 9.006 0 0 0 0 8.08l3.01-2.33z"
          />
          <path
            fill="#fff"
            d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.42 0 9 0A8.997 8.997 0 0 0 .96 4.96l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
          />
        </svg>
        Continue with Google
      </Button>
    </SignInButton>
  );
}
