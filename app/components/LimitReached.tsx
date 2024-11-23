import dayjs from "dayjs";

export const LimitReached = () => {
  return (
    <div className="text-orange-900 bg-orange-100 dark:bg-orange-900 dark:text-orange-50 mb-2 text-xs px-4 py-2 rounded text-center">
      You have reached the message limit. Try again after{" "}
      {dayjs(localStorage.getItem("messageResetTime") as any).format("h:mm A")}.
    </div>
  );
};

