import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import Error from "./error";
import { login, signUp } from "@/db/apiAuth";
import { BeatLoader } from "react-spinners";
import useFetch from "../hooks/useFetch";
import { urlState } from "../context"


const SignUp = () => {
  let [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name:"",
    profile_pic:null,
  });

  const handleInputChange = (e) => {
    const { name, value,files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:files ? files[0] : value,
    }));
  };

  const { loading, error, fn: fnSignUp,data } = useFetch(signUp, formData);
  const { fetchUser } = urlState();

  useEffect(() => {
    if (error === null && data) {
      fetchUser();
      navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
    }
  }, [error, loading]);

  const handlesignUp = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        name:Yup.string().required("name is required"),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

      await schema.validate(formData, { abortEarly: false });
      await fnSignUp();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SignUp</CardTitle>
        <CardDescription>Create New Account</CardDescription>
        {error && <Error message={error.message} />}
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            type="text"
            name="name"
            placeholder="Enter userName "
            onChange={handleInputChange}
          />
          {errors.name && <Error message={errors.name} />}
        </div>
      </CardContent>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            type="email"
            name="email"
            placeholder="Enter email "
            onChange={handleInputChange}
          />
          {errors.email && <Error message={errors.email} />}
        </div>
      </CardContent>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Input
            type="password"
            name="password"
            placeholder="Enter password "
            onChange={handleInputChange}
          />
          {errors.password && <Error message={errors.password} />}
        </div>
        <div className="space-y-1">
          <Input
            type="file"
            name="profile_pic"
         accept="image/*"
            onChange={handleInputChange}
          />
          {errors.profile_pic && <Error message={errors.profile_pic} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handlesignUp}>
          {loading ? <BeatLoader size={10} color="blue" /> : "SignUp"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
