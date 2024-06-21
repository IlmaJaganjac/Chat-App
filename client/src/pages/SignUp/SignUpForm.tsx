import React, { useState } from "react";
import { InputField } from "../../components/ui/InputField";
import { SignUpFormData } from "../../interfaces/auth.interface";
import { SignUp } from "../../services/auth/auth.service";

export const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    firstname: "",
    lastname: "",
    username: "",
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
      const resp = await SignUp(formData);
      console.log(resp.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <InputField
        id="firstname"
        name="firstname"
        type="text"
        label="First name"
        autoComplete="given-name"
        value={formData.firstname}
        onChange={handleInputChange}
      />
      <InputField
        id="lastname"
        name="lastname"
        type="text"
        label="Last name"
        autoComplete="family-name"
        value={formData.lastname}
        onChange={handleInputChange}
      />
      <InputField
        id="username"
        name="username"
        type="text"
        label="Username"
        autoComplete="username"
        value={formData.username}
        onChange={handleInputChange}
      />
      <InputField
        id="email"
        name="email"
        type="email"
        label="Email address"
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
          Create account
        </button>
      </div>
    </form>
  );
};
