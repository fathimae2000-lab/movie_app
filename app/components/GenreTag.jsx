const GenreTag = ({ genre }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer group w-fit">
      {/* Tag icon using CSS shape — rotated square with a dot */}
      <span className="relative inline-flex items-center justify-center w-4 h-4">
        <span className="block w-3.5 h-3.5 border-2 border-yellow-400 rounded-sm rotate-45 group-hover:border-white transition-colors" />
        <span className="absolute top-[3px] left-[3px] w-1 h-1 rounded-full bg-yellow-400 group-hover:bg-white transition-colors" />
      </span>
      <span className="text-slate-300 text-sm underline underline-offset-2 group-hover:text-white transition-colors">
        {genre}
      </span>
    </div>
  );
};

export default GenreTag;