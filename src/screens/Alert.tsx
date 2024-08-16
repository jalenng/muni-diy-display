interface AlertProps {
  message: string;
}

function Alert(props: AlertProps) {
  const { message } = props;
  return (
    <div className="bg-[#EDFF49] w-full h-full px-[16px] py-[10px] text-[84px] break-words hyphens-auto overflow-hidden text-ellipsis">
      <span>⚠️</span>
      <span className="text-black">{message}</span>
    </div>
  );
}

export default Alert;
