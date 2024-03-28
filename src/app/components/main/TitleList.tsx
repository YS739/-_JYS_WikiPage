/**
 * @description 제목 목록을 보여주는 컴포넌트
 */

import { Data } from "@/app/type";
import Link from "next/link";

interface titleListProps {
  paginatedData: Data[];
}

const TitleList = ({ paginatedData }: titleListProps) => {
  return (
    <div className="min-h-[300px]">
      <table className="w-full table-fixed">
        <thead>
          <tr>
            <th className="w-1/5 px-4 py-2">분류</th>
            <th className="w-4/5 px-4 py-2">제목</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td className="border border-secondary px-4 py-2">카테고리</td>
              <td className="border border-secondary px-4 py-2">
                <Link
                  href={`/${item.id}`}
                  className="text-left px-2 hover:bg-secondary text-primary hover:text-lightBase rounded-sm transition-colors duration-300"
                >
                  {item.title}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TitleList;
