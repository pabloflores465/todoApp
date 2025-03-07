import { JSX, useEffect } from "react";

interface NotificationProps {
  title: string;
  description: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const Notification = ({
  title,
  description,
  visible,
  setVisible,
}: NotificationProps): JSX.Element => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <>
      {visible && (
        <div className="bg-background-secondary fixed bottom-30 left-1/2 w-80 -translate-x-1/2 transform rounded-md p-4 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-primary mb-4 border-b-2 text-lg font-semibold">
                {title}
              </h3>
              <p className="text-primary text-sm">{description}</p>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="text-primary hover:text-accent ml-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
