import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center gap-6 px-6">

      <h1 className="text-5xl font-bold">
        Book Trusted Helpers Instantly
      </h1>

      <p className="max-w-2xl">
        Plumbing, Electricians, Cleaning, Gardening and more.
        Real-time booking. Ratings. Secure dashboard.
      </p>

      <div className="grid grid-cols-2 gap-4 max-w-xl">
        <div>✔ Plumbing</div>
        <div>✔ Electrician</div>
        <div>✔ Cooking</div>
        <div>✔ Car Cleaning</div>
        <div>✔ House Cleaning</div>
        <div>✔ Gardening</div>
      </div>

      <Link to="/login" className="btn btn-primary mt-6">
        Get Started
      </Link>

    </div>
  );
};

export default LandingPage;
