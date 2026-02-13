import { useState } from "react";
import { useAuthStore } from "../store/authStores";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, register } = useAuthStore();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    category: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      await register(form);
    } else {
      await login(form);
    }

    const user = useAuthStore.getState().user;

    if (!user) return;

    if (user.role === "user") navigate("/user");
    if (user.role === "helper") navigate("/helper");
    if (user.role === "admin") navigate("/admin");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">

      <div className="w-96 border p-6 rounded">

        <h2 className="text-xl font-bold mb-4">
          {isRegister ? "Register" : "Login"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">

          {isRegister && (
            <input
              className="input input-bordered w-full"
              placeholder="Name"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          )}

          <input
            className="input input-bordered w-full"
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {isRegister && (
            <>
              <select
                className="select select-bordered w-full"
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="helper">Helper</option>
              </select>

              {form.role === "helper" && (
                <input
                  className="input input-bordered w-full"
                  placeholder="Category"
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                />
              )}
            </>
          )}

          <button className="btn btn-primary w-full">
            {isRegister ? "Register" : "Login"}
          </button>

        </form>

        <div
          className="mt-4 text-sm cursor-pointer"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have account? Login"
            : "Create new account"}
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
