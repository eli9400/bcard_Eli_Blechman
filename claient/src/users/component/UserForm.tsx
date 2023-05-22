import Joi from "joi";
import React, { ChangeEvent, FC } from "react";
import { CreateUserErrors, UserFromClient } from "../models/types/userTypes";
import Form from "../../forms/components/Form";
import Input from "../../forms/components/Input";
import { Switch } from "@mui/material";
type Props = {
  title?: string;
  onSubmit: () => void;
  onReset: () => void;
  onFormChange: () => Joi.ValidationError | null;
  errors: CreateUserErrors;
  data: UserFromClient;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
const UserForm: FC<Props> = ({
  data,
  errors,
  title,
  onSubmit,
  onReset,
  onFormChange,
  onInputChange,
}) => {
  return (
    <Form
      onFormChange={onFormChange}
      onReset={onReset}
      onSubmit={onSubmit}
      title="register"
      styles={{ maxWidth: "50vw" }}
    >
      <Input
        data={data}
        label="first name"
        name="first"
        onInputChange={onInputChange}
        error={errors.first}
        breakPoints={{ md: 4 }}
      />
      <Input
        data={data}
        label="middle name"
        name="middle"
        onInputChange={onInputChange}
        error={errors.middle}
        breakPoints={{ md: 4 }}
        required={false}
      />
      <Input
        data={data}
        label="last name"
        name="last"
        onInputChange={onInputChange}
        error={errors.last}
        breakPoints={{ md: 4 }}
      />
      <Input
        data={data}
        label="phone"
        name="phone"
        onInputChange={onInputChange}
        error={errors.phone}
        breakPoints={{ md: 4 }}
      />
      <Input
        data={data}
        label="email"
        name="email"
        onInputChange={onInputChange}
        error={errors.email}
        breakPoints={{ md: 4 }}
      />
      <Input
        data={data}
        label="password"
        name="password"
        onInputChange={onInputChange}
        error={errors.password}
        breakPoints={{ md: 4 }}
      />
      <Input
        data={data}
        label="state"
        name="state"
        onInputChange={onInputChange}
        error={errors.state}
        breakPoints={{ md: 3 }}
        required={false}
      />
      <Input
        data={data}
        label="country"
        name="country"
        onInputChange={onInputChange}
        error={errors.country}
        breakPoints={{ md: 3 }}
      />
      <Input
        data={data}
        label="city"
        name="city"
        onInputChange={onInputChange}
        error={errors.city}
        breakPoints={{ md: 3 }}
      />
      <Input
        data={data}
        label="street"
        name="street"
        onInputChange={onInputChange}
        error={errors.street}
        breakPoints={{ md: 3 }}
      />
      <Input
        data={data}
        label="houseNumber"
        name="houseNumber"
        onInputChange={onInputChange}
        error={errors.houseNumber}
        breakPoints={{ md: 5 }}
        type="number"
      />
      <Input
        data={data}
        label="zip"
        name="zip"
        onInputChange={onInputChange}
        error={errors.street}
        breakPoints={{ md: 5 }}
        type="zip"
      />

      <Switch
        name="isBusiness"
        checked={!!data.isBusiness}
        onChange={onInputChange}
      />
      <p>isBusiness</p>

      <Input
        data={data}
        label="image"
        name="url"
        onInputChange={onInputChange}
        error={errors.url}
        breakPoints={{ md: 5 }}
      />
      <Input
        data={data}
        label="image decryptions"
        name="alt"
        onInputChange={onInputChange}
        error={errors.alt}
        breakPoints={{ md: 5 }}
      />
    </Form>
  );
};

export default UserForm;
