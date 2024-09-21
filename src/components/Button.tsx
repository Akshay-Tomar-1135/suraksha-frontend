export default function Button({
  text,
  className = "text-white bg-black py-2 px-3 rounded-lg cursor-pointer",
  onButtonClick = () => {},
}: {
  text: string;
  className?: string;
  onButtonClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={onButtonClick}
    >
      {text}
    </button>
  );
}
