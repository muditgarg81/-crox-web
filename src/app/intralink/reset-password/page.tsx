import ResetPasswordForm from "@/components/ResetPasswordForm";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-section px-6 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">Reset Password</h1>
        <p className="text-sm text-muted mb-6">Choose a new password for your account.</p>

        {token ? (
          <ResetPasswordForm token={token} />
        ) : (
          <p className="text-sm text-red-600">
            No reset token provided. Use the link from your email.
          </p>
        )}
      </div>
    </div>
  );
}
