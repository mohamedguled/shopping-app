import { AiOutlineCheckCircle } from 'react-icons/ai';
export default function Stats({
  stats,
}: {
  stats: {
    total: number;
    completed: number;
    uncompleted: number;
    percentage: number;
  };
}) {
  return (
    <div className="flex items-center gap-x-2 mb-2">
      <div className="font-black text-5xl">{stats.percentage}%</div>
      <div className="flex flex-col">
        <div className="text-2xl font-semibold flex items-center gap-x-1">
          <p>Avklarade</p> <AiOutlineCheckCircle className="text-2xl" />
        </div>
        <div className="text-sm leading-none text-sky-400">
          {stats.uncompleted} varor kvar
        </div>
      </div>
    </div>
  );
}
