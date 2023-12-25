/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;

    void signIn("google", { email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" placeholder="Email" required />
      <button type="submit">Log In</button>
    </form>
  );
};

export default LoginPage;
