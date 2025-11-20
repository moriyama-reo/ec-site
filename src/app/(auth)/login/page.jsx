import LoginForm from "../../../components/forms/LoginForm";

export default function Loginpage() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ログイン
          </h2>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
