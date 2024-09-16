function SignError({ error }: { error: Error }) {
  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center font-['frutiger']"
      role="alert"
    >
      <p className="font-bold text-[32px] leading-[150%] tracking-[0.35em] text-center uppercase text-[#bf2b45]">
        Error!
      </p>
      <p className="text-[20px]">{error.message}</p>
    </div>
  );
}

export default SignError;
