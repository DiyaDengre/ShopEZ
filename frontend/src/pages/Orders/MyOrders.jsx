import { useNavigate } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const MyOrders = () => {
  const navigate = useNavigate();
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  if (isLoading) return <Loader />;
  if (error) return <Message variant="danger">{error?.data?.message}</Message>;

  return (
    <div className="p-6 ml-[67px] text-white">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <table className="w-full border border-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Delivered</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order._id}
              onClick={() => navigate(`/order/${order._id}`)}
              className="text-center border-t border-gray-700 cursor-pointer hover:bg-gray-800 transition"
            >
              <td>{order._id}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>₹{order.totalPrice}</td>

              <td>
                {order.isPaid ? (
                  <span className="text-green-400">Paid</span>
                ) : (
                  <span className="text-red-400">Pending</span>
                )}
              </td>

              <td>
                {order.isDelivered ? (
                  <span className="text-green-400">Delivered</span>
                ) : (
                  <span className="text-yellow-400">Processing</span>
                )}
              </td>

              <td className="p-2">
                {!order.isPaid && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/order/${order._id}`);
                    }}
                    className="bg-green-500 px-3 py-1 rounded"
                  >
                    Pay Now
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;