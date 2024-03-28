/**
 * @description 위키 제목과 본문을 표시하고, 위키를 수정하는 기능을 제공하는 컴포넌트
 */

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { updateWiki } from "../common/api";
import GlobalButton from "../components/common/GlobalButton";
import GlobalInput from "../components/common/GlobalInput";
import { wikiDataState } from "../recoil/atom";
import { Data } from "../type";

const Wiki = () => {
  const pathName = usePathname();
  const id = Number(pathName.split("/")[1]);
  const [wikiData, setWikiData] = useRecoilState(wikiDataState);
  const selectedWiki = wikiData.find((item) => item.id === id);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  // 수정 모드로 전환
  const editClickHandler = () => {
    if (selectedWiki) {
      setIsEditing(true);
      setEditedTitle(selectedWiki.title);
      setEditedContent(selectedWiki.content);
    }
  };

  // 기존 데이터 수정 및 저장
  const saveClickHandler = async () => {
    if (!editedTitle.trim() || !editedContent.trim()) {
      alert("제목과 본문을 모두 입력하세요.");
      return;
    }

    const updatedData: Partial<Data> = {
      title: editedTitle,
      content: editedContent,
    };

    await updateWiki(id, updatedData);

    const newData = wikiData.map((item) =>
      item.id === id ? ({ ...item, ...updatedData } as Data) : item
    );
    setWikiData(newData);

    setIsEditing(false);
  };

  // 수정 취소
  const cancelEditClickHandler = () => {
    if (
      isEditing &&
      (editedTitle !== selectedWiki?.title ||
        editedContent !== selectedWiki.content)
    ) {
      if (confirm("수정을 취소하시겠습니까?")) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(false);
    }
  };

  // 본문에 있는 다른 위키 제목에 링크 생성
  const titleToLinks = (content: string) => {
    const titleRegex = new RegExp(
      `(${wikiData.map((item) => item.title).join("|")})`,
      "g"
    );

    return content.split(titleRegex).map((part, index) => {
      const foundWiki = wikiData.find((item) => item.title === part);
      if (foundWiki && foundWiki.id !== selectedWiki?.id) {
        const wikiId = foundWiki.id;
        return (
          <Link key={index} href={`${wikiId}`}>
            <span className="text-accent bg-secondary bg-opacity-30 rounded-sm text-opacity-70 hover:text-lightBase hover:bg-secondary transition-colors duration-300">
              {part}
            </span>
          </Link>
        );
      } else {
        return part;
      }
    });
  };

  useEffect(() => {
    const storedWikiData = sessionStorage.getItem("wikiData");

    if (storedWikiData) {
      setWikiData(JSON.parse(storedWikiData));
    }
  }, [setWikiData]);

  return (
    <div>
      {selectedWiki && (
        <>
          <div className="max-md:top-[70px] max-md:left-10 fixed top-[75px] left-12">
            <button
              onClick={() => history.back()}
              className="max-md:px-3 max-md:py-1 px-4 py-2 bg-secondary hover:bg-accent text-lightBase rounded-full transition-colors duration-300"
            >
              &lt;
            </button>
          </div>
          <div className="flex justify-center items-start h-full px-10">
            <div className="max-w-[850px] w-full lg:w-[850px] h-[550px] bg-lightBase border-4 border-accent p-8 rounded-lg mt-[60px]">
              {isEditing ? (
                <>
                  <GlobalInput
                    onClose={cancelEditClickHandler}
                    onClick={saveClickHandler}
                    onChangeTitle={(e) => setEditedTitle(e.target.value)}
                    onChangeContent={(e) => setEditedContent(e.target.value)}
                    titleValue={editedTitle}
                    contentValue={editedContent}
                    text={"수정"}
                  />
                </>
              ) : (
                <div className="flex flex-col justify-between h-full">
                  <div className="flex flex-col items-center">
                    <h2 className="max-md:text-xl text-3xl text-primary font-bold mb-8">
                      {selectedWiki.title}
                    </h2>
                    <div className="max-h-[320px] overflow-y-scroll">
                      <ul className="text-lg text-primary">
                        {titleToLinks(selectedWiki.content)}
                      </ul>
                    </div>
                  </div>
                  <div className="flex justify-end items-end">
                    <GlobalButton onClick={editClickHandler} text="수정하기" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Wiki;
