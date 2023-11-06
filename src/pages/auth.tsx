import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button";
import Input from "../components/input";
import { cls } from "../libs/client/utils";
import useMutation from "@/libs/client/useMutation";
import { useRouter } from "next/router";

interface AuthForm {
  email?: string;
  phone?: string;
}

interface TokenForm {
  token: string;
}

interface MutationResult {
  ok: boolean;
}

const Auth: NextPage = () => {
  const [method, setMethod] = useState<"email" | "phone">("email");
  //auth
  const { register, reset, handleSubmit } = useForm<AuthForm>();
  const [auth, { loading, data, error }] =
    useMutation<MutationResult>("/api/users/auth");

  const onEmailClick = () => {
    reset(); //method 바뀔 때마다 form reset
    setMethod("email");
  };
  const onPhoneClick = () => {
    reset();
    setMethod("phone");
  };
  const onValid = (validData: AuthForm) => {
    if (loading) return;
    auth(validData);
  };

  //token
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit } =
    useForm<TokenForm>();
  const [confirmToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<MutationResult>("/api/users/confirmToken");

  const onTokenValid = (tokenValidData: TokenForm) => {
    if (tokenLoading) return;
    confirmToken(tokenValidData);
  };

  const router = useRouter();
  //토큰 확인 완료 -> home으로 이동
  useEffect(() => {
    if (tokenData?.ok) {
      router.push("/");
    }
  }, [tokenData, router]);

  return (
    <div className="mt-16 px-4">
      <h3 className="text-center text-3xl font-bold">Enter to Carrot</h3>
      <div className="mt-12">
        {data?.ok ? (
          <form
            onSubmit={tokenHandleSubmit(onTokenValid)}
            className="mt-8 flex flex-col space-y-4"
          >
            <Input
              register={tokenRegister("token", { required: true })}
              name="token"
              label="Confirmation Token"
              type="number"
            />
            <Button text={tokenLoading ? "loading" : "Confirm Token"} />
          </form>
        ) : (
          <>
            <div className="flex flex-col items-center">
              <div className="mt-8  grid  w-full grid-cols-2 border-b ">
                <button
                  className={cls(
                    "border-b-2 pb-4 text-sm font-medium",
                    method === "email"
                      ? " border-orange-500 text-orange-400"
                      : "border-transparent text-gray-500 hover:text-gray-400",
                  )}
                  onClick={onEmailClick}
                >
                  Email
                </button>

                <button
                  className={cls(
                    "border-b-2 pb-4 text-sm font-medium",
                    method === "phone"
                      ? " border-orange-500 text-orange-400"
                      : "border-transparent text-gray-500 hover:text-gray-400",
                  )}
                  onClick={onPhoneClick}
                >
                  Phone
                </button>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onValid)}
              className="mt-8 flex flex-col space-y-4"
            >
              {method === "email" ? (
                <Input
                  register={register("email", { required: true })}
                  name="email"
                  label="Email address"
                  type="email"
                  // required
                />
              ) : null}
              {method === "phone" ? (
                <Input
                  register={register("phone", { required: true })}
                  name="phone"
                  label="Phone number"
                  type="number"
                  kind="phone"
                  // required
                />
              ) : null}
              {method === "email" ? (
                <Button text={loading ? "loading" : "Get login link"} />
              ) : null}
              {method === "phone" ? (
                <Button text={loading ? "loading" : "Get one-time password"} />
              ) : null}
            </form>
          </>
        )}
      </div>
    </div>
  );
};
export default Auth;
