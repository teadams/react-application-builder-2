import { TextBox } from "../formFields/TextBox";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import AcsAuthContext from "../../contextProviders/AcsAuthContext";
import { useGetAcsMeta } from "../../hooks";
import { ACSMetaModel } from "../../types";
import { createAccount } from "../../lib/data";

const CreateAccount = () => {
  const router = useRouter();
  const acsMeta = useGetAcsMeta();
  const AcsAuthContextObject: any = useContext(AcsAuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formData: any) => {
    const response: any = await createAccount(acsMeta as ACSMetaModel, {
      ...formData,
    });

    if (response.uniqueIdentifierMatch === false) {
      toast.error("Email already exists , Please try another one");
      return;
    } else if (
      response.uniqueIdentifierMatch === true &&
      response.validatedCredential === true
    ) {
      toast.success("Account successfully created");
      AcsAuthContextObject.login(response);
      router.push("/acs/acsDrillDown");
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
                  Create Account
                </h5>
                <form>
                  <div className="grid grid-cols-2 gap-x-10 p-10">
                    <TextBox
                      label="Email"
                      name="email"
                      register={register("email", { required: true })}
                      type="email"
                      required={true}
                    />
                    <TextBox
                      label="Password"
                      name="password"
                      register={register("password", { required: true })}
                      type="password"
                      required={true}
                    />
                    <TextBox
                      label="First Name"
                      name="firstName"
                      register={register("firstName", { required: true })}
                      required={true}
                    />
                    <TextBox
                      label="Last Name"
                      name="lastName"
                      register={register("lastName", { required: true })}
                      required={true}
                    />
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      onClick={handleSubmit(onSubmit)}
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Create Account
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

export default CreateAccount;
