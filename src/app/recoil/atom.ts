import { atom } from "recoil";
import { Data } from "../type";

// 전역으로 사용되는 wikiData
export const wikiDataState = atom<Data[]>({
    key: 'wikiDataState',
    default: []
})

// 전역으로 사용되는 pagination 페이지 번호
export const currentPageState = atom<number>({
    key: 'currentPageState',
    default: 1
})