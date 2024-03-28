"use client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getWikiData } from "./common/api";
import GlobalButton from "./components/common/GlobalButton";
import Pagination from "./components/main/Pagination";
import TitleList from "./components/main/TitleList";
import WikiModal from "./components/main/WikiModal";
import { currentPageState, wikiDataState } from "./recoil/atom";

const Main = () => {
  const [wikiData, setWikiData] = useRecoilState(wikiDataState);

  const [openModal, setOpenModal] = useState(false);

  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const itemsPerPage = 5;
  const totalItems = wikiData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // 페이지 수 계산
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  // 페이지 별 Data
  const paginatedData = wikiData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWikiData();
        setWikiData(data);
        sessionStorage.setItem("wikiData", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching wiki data:", error);
      }
    };

    fetchData();
  }, [openModal, setWikiData]);

  return (
    <div className="flex flex-col h-full">
      {/* 위키 추가 모달 */}
      {openModal && (
        <WikiModal
          setOpenModal={setOpenModal}
          wikiData={wikiData}
          setWikiData={setWikiData}
        />
      )}

      <div className="flex justify-center items-center h-full px-10">
        <div className="max-w-[850px] w-full lg:w-[850px] h-[550px] bg-lightBase border-4 border-accent p-8 rounded-lg mt-[60px]">
          <div className="flex flex-col justify-between h-full">
            <div>
              {/* 위키 제목 목록 */}
              <TitleList paginatedData={paginatedData} />

              {/* 페이지네이션 */}
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                getPageNumbers={getPageNumbers}
              />
            </div>

            <div className="flex justify-end items-end">
              {!openModal && (
                // 위키 추가 Btn
                <GlobalButton
                  onClick={() => setOpenModal(true)}
                  text="추가하기"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
