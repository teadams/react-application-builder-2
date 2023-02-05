import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useGetAcsMeta } from "../../hooks";
import { SignIn } from "../../lib/data";
import { ACSMetaModel } from "../../types";
import { TextBox } from "../formFields/TextBox";
import AcsAuthContext from "../../contextProviders/AcsAuthContext";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const acsMeta = useGetAcsMeta();
  const AcsAuthContextObject: any = useContext(AcsAuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formData: any) => {
    const response: any = await SignIn(acsMeta as ACSMetaModel, {
      ...formData,
    });

    if (response.validatedCredential === false) {
      toast.error("Invalid email or password");
      return;
    } else {
      toast.success("Login successfull");
      AcsAuthContextObject.login(response);
      router.push("/");
    }
  };

  return (
    <div className="md:px-14 py-8">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="mx-auto w-4/5 sm:px-6 lg:px-8">
            <div className="overflow-hidden border shadow-lg">
              <div className="min-w-full">
                <h5 className="font-medium py-8 lg:-mt-2 lg:mb-2 lg:text-3xl mb-1 text-2xl text-gray-900 text-center">
                  Login
                </h5>
                <form>
                  <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-x-10 px-10 pt-10">
                    <TextBox
                      label="Email"
                      register={register("email", { required: true })}
                      type="email"
                      required={true}
                    />
                    <TextBox
                      label="Password"
                      register={register("password", { required: true })}
                      type="password"
                      required={true}
                    />
                  </div>

                  <div className=" px-4 sm:flex sm:flex-row-reverse sm:px-6">
                    <Link href={"/acs/auth/createAccount"}>
                      <p>Create Account</p>
                    </Link>
                  </div>

                  <div className="bg-gray-50 px-4 py-3 mt-4 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      onClick={handleSubmit(onSubmit)}
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
