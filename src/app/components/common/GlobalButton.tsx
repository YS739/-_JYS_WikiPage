/**
 * @description 전역으로 사용되는 버튼 컴포넌트 - 추가하기, 수정하기, 수정 완료
 * @param onClick - 위키 추가 및 수정 기능이 담긴 EventHandler
 */

interface GlobalButtonProps {
  onClick: () => void;
  text: string;
}

const GlobalButton = ({ onClick, text }: GlobalButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-secondary hover:bg-accent text-primary hover:text-lightBase max-md:w-[120px] w-[200px] mt-2 px-4 py-2 rounded-md transition-colors duration-300"
    >
      {text}
    </button>
  );
};

export default GlobalButton;
