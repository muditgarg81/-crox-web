import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ProfileForm from "@/components/ProfileForm";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) return null;

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-1">My Profile</h1>
      <p className="text-muted mb-8">{user.name} &middot; {user.email}</p>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <ProfileForm
          phone={user.phone ?? ""}
          designation={user.designation ?? ""}
          department={user.department ?? ""}
        />
      </div>

      <h2 className="font-bold text-foreground mb-4">Change Password</h2>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
