import Container from "@mui/material/Container";
import React from "react";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import useForm from "../../forms/hooks/useForm";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import UserInterface from "../interfaces/userInterface";
import { createUser } from "../services/userApi";
import { Switch } from "@mui/material";
import initialRegisterForm from "../models/initialForms/initialSignUpForm";
import registerSchemaForm from "../models/joi/signUpSchema";

const SignUpPage = () => {
  const user = false;
  /* const user= true */
  type User = {
    first: string;
    middle?: string;
    last: string;
    phone: string;
    email: string;
    password: string;
    url: string;
    alt: string;

    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber: number;
    zip: number;

    isBusiness: boolean;
  };
  const handelRegister = (data: User) => {
    const {
      first,
      middle,
      last,
      state,
      country,
      city,
      street,
      houseNumber,
      zip,
      email,
      phone,
      url,
      alt,
      password,
      isBusiness,
    } = data;
    const newUser: UserInterface = {
      name: { first, middle, last },
      address: { state, country, city, street, houseNumber, zip },
      email,
      image: { url, alt },
      phone,
      password,
      isBusiness,
    };

    createUser(newUser);
    console.log(newUser);

    handleReset();
  };
  const { value, ...rest } = useForm(
    initialRegisterForm,
    registerSchemaForm,
    handelRegister
  );
  const { data, errors } = value;
  const { handleChange, onSubmit, handleReset, validateForm } = rest;

  if (user) return <Navigate replace to={ROUTES.ROOT} />;
  console.log(data.isBusiness);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <Form
        onFormChange={validateForm}
        onReset={handleReset}
        onSubmit={onSubmit}
        title="register"
        styles={{ width: "50vw" }}
      >
        <Input
          data={data}
          label="first name"
          name="first"
          onInputChange={handleChange}
          error={errors.first}
          breakPoints={{ md: 4 }}
        />
        <Input
          data={data}
          label="middle name"
          name="middle"
          onInputChange={handleChange}
          error={errors.middle}
          breakPoints={{ md: 4 }}
          required={false}
        />
        <Input
          data={data}
          label="last name"
          name="last"
          onInputChange={handleChange}
          error={errors.last}
          breakPoints={{ md: 4 }}
        />
        <Input
          data={data}
          label="phone"
          name="phone"
          onInputChange={handleChange}
          error={errors.phone}
          breakPoints={{ md: 4 }}
        />
        <Input
          data={data}
          label="email"
          name="email"
          onInputChange={handleChange}
          error={errors.email}
          breakPoints={{ md: 4 }}
        />
        <Input
          data={data}
          label="password"
          name="password"
          onInputChange={handleChange}
          error={errors.password}
          breakPoints={{ md: 4 }}
        />
        <Input
          data={data}
          label="state"
          name="state"
          onInputChange={handleChange}
          error={errors.state}
          breakPoints={{ md: 3 }}
          required={false}
        />
        <Input
          data={data}
          label="country"
          name="country"
          onInputChange={handleChange}
          error={errors.country}
          breakPoints={{ md: 3 }}
        />
        <Input
          data={data}
          label="city"
          name="city"
          onInputChange={handleChange}
          error={errors.city}
          breakPoints={{ md: 3 }}
        />
        <Input
          data={data}
          label="street"
          name="street"
          onInputChange={handleChange}
          error={errors.street}
          breakPoints={{ md: 3 }}
        />
        <Input
          data={data}
          label="houseNumber"
          name="houseNumber"
          onInputChange={handleChange}
          error={errors.houseNumber}
          breakPoints={{ md: 5 }}
          type="number"
        />
        <Input
          data={data}
          label="zip"
          name="zip"
          onInputChange={handleChange}
          error={errors.street}
          breakPoints={{ md: 5 }}
          type="zip"
        />

        <Switch
          name="isBusiness"
          checked={!!data.isBusiness}
          onChange={handleChange}
        />
        <p>isBusiness</p>

        <Input
          data={data}
          label="image"
          name="url"
          onInputChange={handleChange}
          error={errors.url}
          breakPoints={{ md: 5 }}
        />
        <Input
          data={data}
          label="image decryptions"
          name="alt"
          onInputChange={handleChange}
          error={errors.alt}
          breakPoints={{ md: 5 }}
        />
      </Form>
    </Container>
  );
};

export default SignUpPage;
