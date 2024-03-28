import { Data } from '@/app/type';
import {
    collection,
    doc,
    getDocs,
    orderBy,
    query,
    setDoc,
    updateDoc
} from 'firebase/firestore';
import { db } from './firebase';

// 강의 정보 가져오기
export const getWikiData = async (): Promise<Data[]> => {
    try {
        const wikiDataCollection = collection(db, "wikiData");
        const querySnapshot = await getDocs(query(wikiDataCollection, orderBy("id", "desc")));
        const wikiData: Data[] = [];
        querySnapshot.forEach((doc) => {
            wikiData.push({ ...doc.data() as Data });
        });
        return wikiData;
    } catch (error) {
        console.error("Error getting documents: ", error);
        return [];
    }
};


// 위키 추가하기
export const addWiki = async (newData: Data) => {
    try {
        await setDoc(doc(db, "wikiData", newData.id.toString()), newData);
    } catch (error) {
        console.error("Error writing document: ", error);
    }
};

// 위키 수정하기
export const updateWiki = async (id: number, updatedData: Partial<Data>) => {
    try {
        const wikiDocRef = doc(db, "wikiData", id.toString());
        await updateDoc(wikiDocRef, updatedData);
    } catch (error) {
        console.error("Error updating document: ", error);
    }
};