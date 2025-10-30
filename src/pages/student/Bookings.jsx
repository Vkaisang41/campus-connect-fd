// src/pages/student/Bookings.jsx
import { useAuth } from "../../context/AuthContext";

export default function Bookings() {
  const { bookings } = useAuth();

  return (
    <div className="text-white">
      <h2 className="text-xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="bg-[#151515] border border-gray-800 rounded-xl p-6 text-center">
          <p className="text-gray-400">No bookings yet. Browse services to make your first booking!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-[#151515] border border-gray-800 p-4 rounded-xl flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{b.service}</div>
                <div className="text-gray-400 text-sm">{b.vendor}</div>
                <div className="text-lime-400 text-sm mt-1">{b.price}</div>
              </div>
              <div className="text-right">
                <span className={`font-medium ${
                  b.status === 'Pending' ? 'text-yellow-400' :
                  b.status === 'Confirmed' ? 'text-green-400' :
                  b.status === 'Cancelled' ? 'text-red-400' :
                  'text-gray-400'
                }`}>
                  {b.status}
                </span>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(b.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
