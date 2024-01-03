let NEXTAUTH_URL;

if (process.env.NODE_ENV === "development") {
  NEXTAUTH_URL = "http://localhost:3000";
} else {
  NEXTAUTH_URL = "https://friendrecord.com";
}

console.log(NEXTAUTH_URL);
