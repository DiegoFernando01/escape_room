import { useForm } from "react-hook-form";
import { useRef } from "react";
import { login } from "../../api/api";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const password = useRef(null);
  password.current = watch("password", "");

  const onSubmit = handleSubmit(async (data) => {
    try {
      let result = await login(data);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    console.log("Login Successful");
    reset();
  });

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.header}>
        <h1 className={styles.header_text}>Login</h1>
        <div className={styles.underline}></div>
      </div>

      <div className={styles.inputs}>
        <label className={styles.label}>
          Email:
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Email is not valid",
              },
            })}
          />
        </label>
        {errors.correo && <span>{errors.correo.message}</span>}
      </div>

      <div className={styles.input}>
        <label className={styles.label}>
          Password:
          <input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
          />
        </label>
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      {/* <div className="input">
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          {...register("confirm_password", {
            required: {
              value: true,
              message: "Confirm Password is required",
            },
            minLength: {
              value: 8,
              message: "Confirm Password must have at least 8 characters",
            },
            validate: (value) =>
              value === password.current || "Passwords are not equal",
          })}
        />
        {errors.confirm_password && (
          <span>{errors.confirm_password.message}</span>
        )}
      </div> */}

      <button className={styles.button} type="submit">
        Send
      </button>

      {/* <pre className={styles.pre}>{JSON.stringify(watch(), null, 2)}</pre> */}
    </form>
  );
};

export default LoginForm;
