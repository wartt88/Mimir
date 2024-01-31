import { fetchUserByUsername } from "../../../models/userRequests";
import { UserInterface } from "../../../models/user";
import UserProfileView from "../../../components/ui/user/view/user-profile-view";

export default function Page({
  params,
}: Readonly<{ params: { username: string } }>): JSX.Element {
    //const user: UserInterface = fetchUserByUsername(params.username)
    const user: UserInterface = fetch("/api/user/username/"+ params.username)
    .then((user: UserInterface) => {
      return user;
    })
    .catch((error: Error) => {
      console.log(error);
      return null;
    });

  // pull user data from params.id
  // render user data
  return <UserProfileView user={user} />;
}
