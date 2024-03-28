/**
 * @description 위키 추가 모달 또는 위키 수정 시 제목과 내용을 입력받아 수정 또는 추가하는데 사용되는 전역 컴포넌트
 * @param onClick - 위키 추가 및 수정 기능이 담긴 EventHandler
 */

import GlobalButton from "./GlobalButton";

interface GlobalInputProps {
  onClose: () => void;
  onClick: () => void;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeContent: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  titleValue: string;
  contentValue: string;
  text: string;
}

const GlobalInput = ({
  onClose,
  onClick,
  onChangeTitle,
  onChangeContent,
  titleValue,
  contentValue,
  text,
}: GlobalInputProps) => {
  return (
    <>
      <div className="grid grid-cols-[4fr,auto] mb-6">
        <h2 className="text-xl font-bold text-center">위키 {text}하기</h2>
        <button className="text-xl self-end" onClick={onClose}>
          X
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">
          제목
        </label>
        <input
          type="text"
          className="w-full border border-lightBase rounded-md px-3 py-2"
          placeholder="제목을 입력하세요."
          value={titleValue}
          onChange={onChangeTitle}
          maxLength={30}
          autoFocus
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block mb-2">
          본문
        </label>
        <textarea
          className="w-full h-[200px] border border-lightBase rounded-md px-3 py-2 resize-none"
          placeholder="본문을 입력하세요."
          value={contentValue}
          onChange={onChangeContent}
        />
      </div>
      <div className="text-right">
        <GlobalButton
          onClick={onClick}
          text={text === "수정" ? "수정완료" : "추가하기"}
        />
      </div>
    </>
  );
};

export default GlobalInput;
