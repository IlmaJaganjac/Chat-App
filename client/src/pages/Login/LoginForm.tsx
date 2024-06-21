import React, { useState } from "react";
import { InputField } from "../../components/ui/InputField";
import { LoginFormData } from "../../interfaces/auth.interface";
import { Login } from "../../services/auth/auth.service";

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resp = await Login(formData);
      if (resp.status === 200) {
        console.log(resp.username)
        localStorage.setItem("username", resp.username);
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = `/${resp.username}`;

      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <InputField
        id="email"
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      <InputField
        id="password"
        name="password"
        type="password"
        label="Password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleInputChange}
      />
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};