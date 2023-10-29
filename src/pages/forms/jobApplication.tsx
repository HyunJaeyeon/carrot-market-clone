//make login form with react-hook-form
import { FieldErrors, useForm, Controller } from "react-hook-form";
import Select from "react-select"; //react-select 사용해보기

//--구현사항------------------------------
//checkDepartment: required -> radio ✅
//checkPurpose: required -> radio ✅
//salary -> select(dropdown) ✅
//introduction: required ✅
//dreams: required, minLength: 10chars
//email: required, validate: "@naver.com"
//submit✅  -> print valid data
//--------------------------------------

interface IForm {
  checkDepartment: string;
  checkPurpose: string;
  selectSalary: string;
  introduction: string;
  dreams: string;
  email: string;
}

const salaryOptions = [
  { value: "$50K", label: "$50K" },
  { value: "$100K", label: "$100K" },
  { value: "$150K", label: "$150K" },
  { value: "$200K", label: "$200K" },
];

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

        {/* checkPurpose: required*/}
        <div>
          {/* title */}
          <h1 className="py-1 font-semibold">
            Why do you want to join this company?
          </h1>
          {/* labels */}
          <div className="grid gap-2">
            <label>
              <input
                {...register("checkPurpose", {
                  required: "*required",
                  value: "sales",
                })}
                type="radio"
                value="money"
              />
              I want money!
            </label>
            <label>
              <input
                {...register("checkPurpose", {
                  required: "*required",
                })}
                type="radio"
                value="love"
              />
              I love this company
            </label>
            <label>
              <input
                {...register("checkPurpose", {
                  required: "*required",
                })}
                type="radio"
                value="learn"
              />
              I want to learn
            </label>
            <label>
              <input
                {...register("checkPurpose", {
                  required: "*required",
                })}
                type="radio"
                value="unknown"
              />
              {`I don't know why`}
            </label>
            {errors.checkDepartment?.message}
          </div>
        </div>

        {/* salary: required */}
        <div>
          {/* title */}
          <h1 className="py-1 font-semibold">Salary</h1>
          <Controller
            control={control}
            name="selectSalary"
            rules={{ required: "*required" }}
            //속성 불러와서 적용
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                options={salaryOptions} //위에서 만든 배열을 select로 넣기
                ref={ref} // react-select 컴포넌트를 통해 선택된 값이랑 폼 선택값이 동일하도록 설정
                value={salaryOptions.find((option) => option.value === value)}
                onChange={(option) => {
                  onChange(option?.value);
                  console.log(option);
                }}
              />
            )}
          />
        </div>

        {/* introduction: required */}
        <div>
          <div>
            {/* title */}
            <h1 className="py-1 font-semibold">Introduce yourself</h1>
          </div>
          <input
            {...register("introduction", {
              required: "Please write down your introduction",
            })}
            type="text"
            placeholder="Talk about yourself"
          />
          {errors.introduction?.message}
        </div>

        {/* submit */}
        <div>
          <input type="submit" value="Give me this Job" />
        </div>
      </form>
    </>
  );
}
