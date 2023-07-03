import { ApolloClient, gql } from "@apollo/client";
import { TNotification } from "../types/notification";
import { getCurrentProjectVersion } from "../utils/project";
import { getLastOnceNotifId } from "./asyncStorage";

const queryGetNotif = gql`
  query notif($localVersion: Int!, $lastOnceNotifId: Int) {
    notifications(
      localVersion: $localVersion
      lastOnceNotifId: $lastOnceNotifId
    ) {
      id
      title
      message
      buttonHref
      buttonLabel
      date
      version
    }
  }
`;

export async function getNotifications(
  client: ApolloClient<any>,
  version?: number
): Promise<TNotification[]> {
  // Get last notifs id
  const lastOnceNotifId = await getLastOnceNotifId();
  const localVersion =
    version == undefined ? getCurrentProjectVersion() : version;

  return (
    await client.query<{ notifications: TNotification[] }>({
      query: queryGetNotif,
      variables: { localVersion, lastOnceNotifId },
    })
  ).data.notifications;
}
