"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function InfoPerso(): JSX.Element {
  const { data: session } = useSession();

  // const [editMode, setEditMode] = useState(false);

  const router = useRouter();

  const handleLogOut = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    try {
      const res = await signOut({ redirect: false, callbackUrl: "/login" });
      router.replace(res.url);
    } catch (error) {
      console.log("Error during logout: ", error);
    }
  };
  return (
    <div>
      <u> Email :</u> {session?.user?.email}
      <button
        className="bg-red-500 rounded-md text-white font-bold px-6 py-2 mt-3"
        onClick={(e: React.MouseEvent) => {
          handleLogOut(e).catch((err) => {
            err;
          });
        }}
        type="button"
      >
        Log Out
      </button>
    </div>
  );
}
