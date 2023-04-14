const devBase = "http://192.168.1.79:3000";
const prodBase = "http://176.150.56.209:3011";

export const ENV = {
  // Used for set password
  MODE: "PROD", //"DEV"
  API: {
    URL: `${prodBase}/graphql`,
    UPLOADURL: `${prodBase}/cloud`,
  },
};
