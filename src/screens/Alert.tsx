interface AlertProps {
  message: string;
}

function Alert(props: AlertProps) {
  const { message } = props;
  return (
    <div className="bg-[#EDFF49] w-full h-full px-[20px] py-0 break-words hyphens-auto overflow-hidden text-ellipsis text-[90px] leading-[110px] font-light">
      <span className="text-[72px]">⚠️</span>
      <span className="text-black">
        &nbsp;
        {message}
      </span>
    </div>
  );
}

export default Alert;
