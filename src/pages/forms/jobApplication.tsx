//make login form with react-hook-form
import { FieldErrors, useForm } from "react-hook-form";

//--구현사항------------------------------
//checkDepartment: required -> radio
//checkPurpose: required -> radio
//salary -> select(dropdown)
//introduction: required
//dreams: required, minLength: 10chars
//email: required, validate: "@naver.com"
//submit -> print valid data
//--------------------------------------

interface IForm {
  checkDepartment: string;
  checkPurpose: string;
  selectSalary: string;
  introduction: string;
  dreams: string;
  email: string;
}

export default function JobForms() {
  //useForm에서 가져오기
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IForm>({ mode: "all" });

  //data 받아오기 성공
  const onValid = (data: IForm) => {
    console.log(data);
  };
  //data 받아오기 실패, Error
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <>
      <header className="p-5">
        <h1 className="text-center text-2xl font-bold">Job Application Form</h1>
      </header>
      <form
        onSubmit={handleSubmit(onValid, onInvalid)}
        className="border-2 border-stone-800 bg-pink-200 p-5"
      >
        {/* checkDepartment: required*/}
        <div>
          {/* title */}
          <h1 className="py-1 font-semibold">
            What department do you want to work for?
          </h1>
          {/* labels */}
          <div className="grid gap-2">
            <label>
              <input
                {...register("checkDepartment", {
                  //required
                  required: "*required",
                })}
                type="radio" //라디오박스로
                value="sales" //각각 value 지정해줘야 함
              />
              Sales
            </label>
            <label>
              <input
                {...register("checkDepartment", {
                  required: "*required",
                })}
                type="radio"
                value="marketing"
              />
              Marketing
            </label>
            <label>
              <input
                {...register("checkDepartment", {
                  required: "*required",
                })}
                type="radio"
                value="accounting"
              />
              Accounting
            </label>
            <label>
              <input
                {...register("checkDepartment", {
                  required: "*required",
                })}
                type="radio"
                value="customer service"
              />
              Customer Service
            </label>
            {errors.checkDepartment?.message}
          </div>
        </div>
        {/* submit */}
        <div>
          <input type="submit" value="Give me this Job" />
        </div>
      </form>
    </>
  );
}
