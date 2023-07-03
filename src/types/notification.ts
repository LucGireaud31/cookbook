export type TNotification = {
  id: number;
  title: string;
  message: string;
  buttonLabel: string;
  buttonHref?: string;
  date: string;
  version?: number;
};
