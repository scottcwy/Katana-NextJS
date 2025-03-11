export default function ({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[50vh]">
      <p>{message}</p>
    </div>
  );
}
