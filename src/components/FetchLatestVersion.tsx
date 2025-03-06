import clsx from "clsx";
import { useMutation, useQuery } from "react-query";
import packageJson from "../../package.json";

export const fetchLatestVersion = async () => {
  if ("serviceWorker" in navigator) {
    await navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.update();
      }
    });
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

export const isNewVersionAvailable = async () => {
  if ("serviceWorker" in navigator) {
    const registration = await navigator.serviceWorker.getRegistration();
    return registration?.waiting;
  }
  return false;
};

export const FetchLatestVersion = ({
  backgroundColor = "bg-transparent",
}: {
  backgroundColor?: string;
}) => {
  const { data: isAvailable } = useQuery({
    queryKey: ["latest-version"],
    queryFn: isNewVersionAvailable,
  });
  const { isLoading, mutate } = useMutation({
    mutationFn: fetchLatestVersion,
    onSuccess: () => {
      window.location.reload();
    },
  });
  return isAvailable ? (
    <button
      className={clsx(
        "px-2 border-2 border-gray-700 rounded-md relative",
        backgroundColor
      )}
      onClick={() => mutate()}
    >
      <img
        src="/download.png"
        alt="download"
        className={clsx("w-12", {
          "animate-bounce relative top-1": isLoading || true,
        })}
      />
    </button>
  ) : null;
};

export const CurrentVersion = () => {
  return (
    <div className="block w-full text-xs text-red-400 p-4 text-center opacity-75">
      v{packageJson.version}
    </div>
  );
};
