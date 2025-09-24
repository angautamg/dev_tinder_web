
type ToastProps = {
  message_type: "success" | "error" | "warning" | "info" | string; // adjust as needed
  message: string;
};

const ToastContainer = ({ message_type, message }: ToastProps) => {
    return (
        <div className="toast toast-top toast-end">
            <div className={`alert alert-${message_type}`}>
                <span>{message}</span>
            </div>
        </div>
    );
};
export default ToastContainer;