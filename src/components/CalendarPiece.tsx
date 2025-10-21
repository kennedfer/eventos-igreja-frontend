interface CalendarPieceProps
  extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  content: any;
  isMuted?: boolean;
  isMarked?: boolean
  isToday?: boolean;
}

export const CalendarPiece: React.FC<CalendarPieceProps> = ({
  content,
  className = "",
  isMuted,
  isToday,
  isMarked,
  ...props
}) => {
  return (
    <button
      className={`hover:bg-gray-200 hover:cursor-pointer relative rounded-full text-gray-400 aspect-square text-sm ${className} 
        ${isMuted ? "pointer-events-none" : ""}
        ${isMarked ? "text-primary" : ""}
      `}
      {...props}
    >
      {content}
      {
        isToday && <div className="absolute bg-primary botton-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded"></div>
      }
    </button>
  );
};