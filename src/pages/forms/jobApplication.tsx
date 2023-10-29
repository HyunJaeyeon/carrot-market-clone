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

export default function JobForms() {}
