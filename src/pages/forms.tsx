//make login form with react-hook-form
import { FieldErrors, useForm } from "react-hook-form";
import { useState } from "react";

//--구현조건------------------------------
//name: required
//email: required, validate: "@naver.com"
//password: required, minlength: 10
//--------------------------------------

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function Forms() {
  //useForm에서 가져오기
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "all" });

  //valid state 설정
  const [isValid, setIsValid] = useState(false);

  const onValid = () => {
    setIsValid(true); //set state valid
  };

  const onInvalid = (errors: FieldErrors) => {
    // console.log(errors);
    setIsValid(false); //set state invalid
  };
  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <div>
        Name:
        <input
          //   객체 내부에 있는 속성 전부 가져다가 태그 속성으로 넘겨주기
          {...register("username", {
            //required message 설정
            required: "Please write down your name",
          })}
          type="text"
          placeholder="your name"
          // required //이 required는 html을 위한 것
        />
        {errors.username?.message}
      </div>
      <div>
        Email:
        <input
          {...register("email", {
            required: "Please write down your email",
            validate: {
              //@naver이 value에 있는지 확인
              notGmail: (value) =>
                value.includes("@naver.com") || "Only @naver emails allowed",
            },
          })}
          type="email"
          placeholder="Only @naver.com"
        />
        {errors.email?.message}
      </div>
      <div>
        Password:
        <input
          {...register("password", {
            required: "Please write down your password",
            minLength: {
              message: "write more than 10 characters",
              value: 10,
            },
          })}
          type="password"
          placeholder="Min 10 characters"
        />
        {errors.password?.message}
        <div>
          <input type="submit" value="Log in" />
          {/* valid일 때 thankyou div 나타나게 */}
          {isValid && <div>Thank you!</div>}
        </div>
      </div>
    </form>
  );
}
