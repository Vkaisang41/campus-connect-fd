import { motion } from "framer-motion";
import dayjs from "dayjs";
import StatusBadge from "./StatusBadge";

export default function BookingCard({ booking }) {
  const { serviceName, date, location, price, status } = booking;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1b1b1b] border border-gray-800 rounded-lg px-5 py-4 w-full"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-[14.5px] font-semibold">{serviceName}</h3>
          <div className="mt-2 space-y-1 text-[12.5px] text-gray-300">
            <div className="flex items-center gap-2">
              <span>📅 {dayjs(date).format("YYYY-MM-DD [at] HH:mm")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>💵</span>
              <span className="text-neon font-semibold">${Number(price).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <StatusBadge status={status} />
        </div>
      </div>

      {status === "completed" && (
        <button className="mt-3 text-[12px] px-3 py-[6px] rounded bg-transparent border border-gray-700 text-gray-300 hover:border-gray-600">
          Leave a Review
        </button>
      )}
    </motion.div>
  );
}
