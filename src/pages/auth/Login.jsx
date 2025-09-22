import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginSchema } from "../../schema/authSchemas";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { BiUser } from "react-icons/bi";

function Login() {
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
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  async function onSubmit(values, actions) {
    const { email, password } = values;
    const result = await login(email, password);
    console.log(result);

    if (result.success) {
      navigate(from, { state: { showLoginToast: true }, replace: true });
      actions.resetForm();
      return;
    }
    toast.error(result.error.message);
  }

  return (
    <div className="flex flex-col gap-10 justify-center items-center pt-20">
      <h1 className="text-2xl font-semibold flex gap-3 items-center">
        <BiUser /> Login / SignUp
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-3/5 md:max-w-[600px] flex flex-col gap-5 p-10 bg-white shadow-lg rounded-md border border-gray-300"
      >
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
        <Link to={"/auth/signup"}>
          <p className="text-blue-600 text-sm hover:cursor-pointer hover:text-blue-800">
            Don't have have an account? Signup!
          </p>
        </Link>
        <button
          disabled={isSubmitting}
          className="bg-blue-600 text-white flex justify-center items-center gap-2 font-semibold py-2 rounded-sm hover:cursor-pointer hover:bg-blue-500"
          type="submit"
        >
          {isSubmitting && <FaSpinner className="animate-spin" size={18} />}
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
