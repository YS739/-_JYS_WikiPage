/**
 * @description 새로운 위키를 추가하는 Modal 컴포넌트
 */

interface wikiModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setWikiData: React.Dispatch<React.SetStateAction<Data[]>>;
  wikiData: Data[];
}

import { Data } from "@/app/type";
import { useState } from "react";
import { addWiki } from "../../common/api";
import GlobalInput from "../common/GlobalInput";

const WikiModal = ({ setOpenModal, setWikiData, wikiData }: wikiModalProps) => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  // 위키 추가
  const addWikiHandler = async () => {
    if (!newTitle.trim() || !newContent.trim()) {
      alert("제목과 본문을 모두 입력하세요.");
      return;
    }
    const newId = Date.now();

    const newData: Data = {
      id: newId,
      title: newTitle,
      content: newContent,
    };

    await addWiki(newData);

    setWikiData([newData, ...wikiData]);

    // 입력 필드 초기화
    setNewTitle("");
    setNewContent("");

    setOpenModal(false);
  };

  // 추가 취소
  const cancelAddClickHandler = () => {
    if (newTitle.trim() || newContent.trim()) {
      if (confirm("추가를 취소하시겠습니까?")) {
        setNewTitle("");
        setNewContent("");
        setOpenModal(false);
      }
    } else {
      setOpenModal(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="max-w-[700px] w-full lg:w-[700px] h-[550px] bg-lightBase border-4 border-accent p-8 rounded-lg text-primary mx-10">
        <GlobalInput
          onClose={cancelAddClickHandler}
          onClick={addWikiHandler}
          onChangeTitle={(e) => setNewTitle(e.target.value)}
          onChangeContent={(e) => setNewContent(e.target.value)}
          titleValue={newTitle}
          contentValue={newContent}
          text={"추가"}
        />
      </div>
    </div>
  );
};

export default WikiModal;
