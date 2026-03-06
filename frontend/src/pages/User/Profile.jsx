import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import Loader from "../../components/Loader";
import { useProfileMutation, useLogoutMutation } from "../../redux/api/usersApiSlice";
import { setCredentials, logout } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateProfile, { isLoading }] = useProfileMutation();
  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username,
        email,
        password,
      }).unwrap();

      dispatch(setCredentials(res));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center  items-center bg-[#0f0f0f] text-white ml-[6rem]">
      <div className="bg-[#1c1c1c] px-8 pt-2 pb-4 rounded-xl shadow-lg h-full w-[440px]">

        <div className="flex flex-col items-center mb-6">
          <FaUserCircle size={70} className="text-blue-200 mb-2" />
          <h2 className="text-2xl font-semibold">{username}</h2>
          <p className="text-gray-400 text-sm">Manage your account</p>
        </div>

        <form onSubmit={submitHandler} className="space-y-4">

          <div className="">
            <label className="text-sm text-gray-300">Name</label>
            <input
              type="text"
              className="w-full p-3 mt-1 bg-[#808080] border border-gray-700 rounded focus:border-pink-500 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              className="w-full p-3 mt-1 bg-[#808080] border border-gray-700 rounded focus:border-pink-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-3 mt-1 bg-[#2a2a2a] border border-gray-700 rounded focus:border-pink-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full p-3 mt-1 text-black bg-[#808080] border border-gray-700 rounded focus:border-pink-500 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-500 py-3 rounded font-semibold hover:bg-pink-600 transition"
          >
            Update Profile
          </button>

        </form>

        <div className="flex justify-between mt-6">

          <Link
            to="/my-orders"
            className="bg-pink-800 px-4 py-2 rounded hover:bg-pink-700 transition"
          >
            My Orders
          </Link>

          <button
            onClick={logoutHandler}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>

        {isLoading && <Loader />}
      </div>
    </div>
  );
};

export default Profile;