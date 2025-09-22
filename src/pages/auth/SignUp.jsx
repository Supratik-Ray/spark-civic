import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { signUpSchema } from "../../schema/authSchemas";
import { FaSpinner } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import { BiUser } from "react-icons/bi";

function SignUp() {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit,
  });

  const { signUp } = useAuth();

  async function onSubmit(values, actions) {
    try {
      const { email, password, fullName } = values;
      const result = await signUp(email, password, fullName);
      if (result.success) {
        toast("Please check your mail to confirm!");
        actions.resetForm();
        return;
      }
      toast.error(result.error.message);
    } catch (error) {
      console.error(`some error occured: ${error.message}`);
    }
  }

  return (
    <div className="flex justify-center flex-col gap-5 items-center pt-20">
      <h1 className="text-2xl font-semibold flex gap-3 items-center">
        <BiUser /> Login / SignUp
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-3/5 md:max-w-[600px] flex flex-col gap-5 border border-gray-300 p-10 bg-white shadow-lg rounded-md"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="fullname" className="font-semibold">
            Full Name
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-sm  p-2"
            placeholder="Enter your FullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            id="fullname"
            name="fullName"
          />
          {errors.fullName && touched.fullName ? (
            <p className="text-sm text-red-500">{errors.fullName}</p>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            className="border border-gray-300 rounded-sm  p-2"
            placeholder="Enter your Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            id="email"
            name="email"
          />
          {errors.email && touched.email ? (
            <p className="text-sm text-red-500">{errors.email}</p>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            type="password"
            className="border border-gray-300 rounded-sm  p-2"
            placeholder="Enter your Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            id="password"
            name="password"
          />

          {errors.password && touched.password ? (
            <p className="text-sm text-red-500">{errors.password}</p>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" className="font-semibold">
            Confirm Password
          </label>
          <input
            type="password"
            className="border border-gray-300 rounded-sm  p-2"
            placeholder="Re-type your Password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            id="confirmPassword"
            name="confirmPassword"
          />
          {errors.confirmPassword && touched.confirmPassword ? (
            <p className="text-sm text-red-500">{errors.confirmPassword}</p>
          ) : (
            ""
          )}
        </div>
        <Link to={"/auth/login"}>
          <p className="text-blue-600 text-sm hover:cursor-pointer hover:text-blue-800">
            Already logged in? Login
          </p>
        </Link>
        <button
          disabled={isSubmitting}
          className="bg-blue-600 flex justify-center items-center gap-2 font-semibold py-2 rounded-sm hover:cursor-pointer hover:bg-blue-500 text-white"
          type="submit"
        >
          {isSubmitting && <FaSpinner className="animate-spin" size={18} />}
          {isSubmitting ? "Signing up..." : "SignUp"}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
