const devBase = "http://192.168.1.79:3000";
const betaBase = "http://176.150.56.209:3012";
const prodBase = "http://176.150.56.209:3011";

const base = prodBase;

export const ENV = {
  // Used for set password
  MODE: "PROD", //"DEV"
  API: {
    URL: `${base}/graphql`,
    UPLOADURL: `${base}/cloud`,
    PDFURL: `${base}/pdf`,
  },
};
